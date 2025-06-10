import { useState } from 'react';
import { useWebSockets } from '../lib/useWebsockets';
import { RecordAudioFromClient } from '../lib/recordAudio';

const Interview = () => {
  const { isConnected, sendAudioChunk } = useWebSockets("ws://localhost:3000/interview");

  const handleChunk = (chunk: Blob) => {
    if (chunk.size > 0) {
      sendAudioChunk(chunk);
    }
  };

  const { startRecording, stopAudioRecording, isRecording } = RecordAudioFromClient(handleChunk);
  const [seconds, setSeconds] = useState(0);
  const [aiText, setAiText] = useState('AI: Welcome to your interview. Let’s begin.');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-8 flex flex-col items-center">
      
      {/* Header Timer */}
      <div className="text-gray-600 text-sm font-medium mb-4 tracking-wider">
        Interview Time Elapsed
      </div>
      <div className="text-md font-bold text-gray-800 mb-8">{seconds}s</div>

      {/* AI Circle */}
      <div className="relative w-full flex justify-center mb-10">
        <div className="w-20 h-20 bg-purple-500 rounded-full shadow-2xl flex items-center justify-center animate-pulse-scale animate-morph">
          <div className="w-8 h-8 bg-pink-300 rounded-full shadow-[0_0_15px_white] animate-pulse-scale" />
        </div>
      </div>

      {/* AI Chat Bubble */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border text-gray-800 text-lg leading-relaxed font-medium whitespace-pre-line">
          {aiText}
        </div>
      </div>

      <button
        onClick={() => (isRecording ? stopAudioRecording() : startRecording())}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg mt-6"
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default Interview;
