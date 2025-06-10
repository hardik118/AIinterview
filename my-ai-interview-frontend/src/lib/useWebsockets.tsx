import { useEffect, useRef, useState } from "react"

export const useWebSockets=(backendConection: string)=>{
    const socketRef= useRef<WebSocket| null>(null);
    const [isConnected, setConnected]=useState<boolean>();
    const [lastMsg, setLastMsg]= useState<Blob| null>(null);;

    useEffect(()=>{
        const socket= new WebSocket(backendConection);
        socket.binaryType= 'arraybuffer';
        socketRef.current= socket;

        //on opening socket
        socket.onopen=()=>{
            setConnected(true);
            console.log('the conneciton is established');

        }

        socket.onmessage=(event: MessageEvent<ArrayBuffer>)=>{
            const interviewAudio=  new Blob([event.data], {type: "audio/webm"});
            setLastMsg(interviewAudio);

        }

        socket.onclose=()=>{
            setConnected(false);
            console.log("the connected is lost or closed");
        }

        socket.onerror = (err )=>{
            console.log('some occured: ', err );    
        }

        // 🧠 Correctly return a cleanup function, not the close() call directly
  return () => {
    socket.close();
  };

    },[backendConection]);

    const sendAudioChunk=(audioData: Blob | ArrayBuffer)=>{
        const socket= socketRef.current;
        if(socket &&  socket.readyState===WebSocket.OPEN){
            socket.send(audioData);
        }else{
            console.warn("the coonection is lot or not established ");

        }

    }

    return {isConnected, lastMsg, sendAudioChunk};
    


}
