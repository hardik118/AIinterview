from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from vosk import Model, KaldiRecognizer
import json

app = FastAPI()

# local middlewares for local devs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#loading local model 

model= Model('models')
recognizer= KaldiRecognizer(model, 16000)

#creating websockets 

@app.websocket('/ws/transcribe')
async def websocket_endPoint(websocket: WebSocket):
    await websocket.accept()
    print('client is connected')

    try:
        while True:
            data = await websocket.receive_bytes()

            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                result_json = json.loads(result)
                text = result_json.get('text')
                print(text)
                if text:
                    print(text)
                    await websocket.send_text(json.dumps({'text': text}))
            else:
                # Optionally, send partial result
                partial_result = recognizer.PartialResult()
                print(f"Received {len(data)} bytes from client")
                print("partial:", partial_result)
    except Exception as e:
        print('some websocket error has occurred!', e)
        await websocket.close()
