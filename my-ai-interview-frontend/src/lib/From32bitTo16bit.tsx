export default function ConverteBrowserAudioToPCM16(
  inputAudio: Float32Array,
  inputSampleRate: number
): ArrayBuffer {
  const targetSampleRate = 16000;
  const sampleRatio = inputSampleRate / targetSampleRate;

  if (sampleRatio < 1) {
    throw new Error("Input sample rate must be >= target sample rate");
  }

  const outputLength = Math.floor(inputAudio.length / sampleRatio);
  const output = new Int16Array(outputLength);

  for (let i = 0; i < outputLength; i++) {
    const sourceIndex = i * sampleRatio;
    const leftIndex = Math.floor(sourceIndex);
    const rightIndex = Math.min(leftIndex + 1, inputAudio.length - 1);
    const interpolation = sourceIndex - leftIndex;

    // Linear interpolation between two samples
    const sample =
      (1 - interpolation) * inputAudio[leftIndex] +
      interpolation * inputAudio[rightIndex];

    const clamped = Math.max(-1, Math.min(1, sample));
    output[i] = Math.round(clamped * 32767);
  }

  return output.buffer;
}
