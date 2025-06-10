import { useEffect, useRef, useState } from "react";
import ConverteBrowserAudioToPCM16 from "./From32bitTo16bit";

export function RecordAudioFromClient(onChunk: (chunk: ArrayBuffer) => void) {
  const audioRecorderRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const [isRecording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = audioStream;
      console.log("✅ Microphone access granted");

      const audioContext = new AudioContext({ sampleRate: 48000 });
      await audioContext.audioWorklet.addModule("/pcm-processor.js");
      console.log("✅ AudioWorklet module loaded");

      const micSource = audioContext.createMediaStreamSource(audioStream);
      const workletNode = new AudioWorkletNode(audioContext, "pcm-processor");

      workletNode.port.onmessage = (event) => {
        const float32Audio = event.data as Float32Array;

        if (!float32Audio || float32Audio.length === 0) {
          console.warn("⚠️ Received empty audio chunk");
          return;
        }

        const buffer = ConverteBrowserAudioToPCM16(float32Audio, audioContext.sampleRate);
        const pcm16 = new Int16Array(buffer);

        // 🔍 Log amplitude range to check for silence or signal
        const maxAmp = Math.max(...pcm16);
        const minAmp = Math.min(...pcm16);
        const avgAmp = pcm16.reduce((a, b) => a + b, 0) / pcm16.length;

        console.log(`🎧 PCM16 Audio Stats: min=${minAmp}, max=${maxAmp}, avg=${avgAmp.toFixed(2)}, len=${pcm16.length}`);

        // If everything looks good, pass it forward
        onChunk(buffer);
      };

      micSource.connect(workletNode);
      audioRecorderRef.current = audioContext;
      setRecording(true);
      console.log("🎙️ Recording started");

    } catch (err) {
      console.error("❌ Failed to start audio recording:", err);
    }
  };

  const stopAudioRecording = () => {
    audioRecorderRef.current?.close();
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setRecording(false);
    console.log("🛑 Recording stopped and mic closed");
  };

  useEffect(() => {
    return () => {
      audioRecorderRef.current?.close();
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { startRecording, stopAudioRecording, isRecording };
}
