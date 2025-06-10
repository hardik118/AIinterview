import WebSocket, { WebSocketServer, WebSocket as WSClient } from 'ws';

export default function setupInterviewWS(wss: WebSocketServer) {
  wss.on('connection', (ws: WebSocket, req) => {
    console.log('🔌 New interview WebSocket connection');

    // Connect to Python microservice WS
    const pythonWS = new WSClient('ws://localhost:8001/ws/transcribe');

    pythonWS.on('open', () => {
      console.log('✅ Connected to Python microservice');
    });

    pythonWS.on('message', (data) => {
      console.log(data);

      // Receive transcription result from Python, forward to frontend
      ws.send(data);
    });

    pythonWS.on('close', () => {
      console.log('⚠️ Python microservice WS closed');
    });

    pythonWS.on('error', (error) => {
      console.error('💥 Python microservice WS error:', error);
    });

    ws.on('message', (message: WebSocket.Data) => {
      // Forward audio chunk from frontend to Python microservice
      if (pythonWS.readyState === WSClient.OPEN) {
        pythonWS.send(message);
      } else {
        console.warn('Python microservice WS is not open');
      }
    });

    ws.on('close', () => {
      console.log('❌ Interview WebSocket disconnected');
      pythonWS.close();
    });

    ws.on('error', (err) => {
      console.error('💥 WebSocket error:', err);
    });
  });
}
