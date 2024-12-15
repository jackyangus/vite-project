// fakeQosData.ts

import { AudioQosData, VideoQosData } from "@zoom/videosdk"; // Adjust the import path

export const fakeAudioQosData: AudioQosData = {
  sample_rate: 48000,
  rtt: 35,
  jitter: 2,
  avg_loss: 0.5,
  max_loss: 3,
  bandwidth: 64000,
  bitrate: 128000,
};

export const fakeVideoQosData: VideoQosData = {
  sample_rate: 90000,
  rtt: 40,
  jitter: 3,
  avg_loss: 1.2,
  max_loss: 5,
  width: 1280,
  height: 720,
  fps: 30,
  bandwidth: 1000000,
  bitrate: 2000000,
};
export const fakeSharingQosData = {
  encode: {
    sample_rate: 90000,
    rtt: 40,
    jitter: 3,
    avg_loss: 1.2,
    max_loss: 5,
    width: 1280,
    height: 720,
    fps: 30,
    bandwidth: 1000000,
    bitrate: 2000000,
  },
  decode: {
    sample_rate: 90000,
    rtt: 40,
    jitter: 3,
    avg_loss: 1.2,
    max_loss: 5,
    width: 1280,
    height: 720,
    fps: 30,
    bandwidth: 1000000,
    bitrate: 2000000,
  },
};
