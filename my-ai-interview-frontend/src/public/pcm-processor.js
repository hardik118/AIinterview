class PCMProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0]; // Use only the first (mono) channel
      if (channelData && channelData.length > 0) {
        // Send a copy of the data to the main thread
        this.port.postMessage(channelData.slice());
      }
    }

    return true; // keep processor alive
  }
}

registerProcessor('pcm-processor', PCMProcessor);
