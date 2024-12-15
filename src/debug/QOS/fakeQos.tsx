// fakeQosData.ts

import { AudioQosData, VideoQosData } from "@zoom/videosdk"; // Adjust the import path

export const MB_TO_B = 1024 * 1024;
export const KB_TO_B = 1024;

export const fakeAudioQosData: { encode: AudioQosData; decode: AudioQosData } = {
  encode: {
    sample_rate: 48000,
    rtt: 35,
    jitter: 2,
    avg_loss: 0.5,
    max_loss: 3,
    bandwidth: 100 * MB_TO_B, // 100M/s
    bitrate: 128 * 1000, // 128Kbps
  },
  decode: {
    sample_rate: 48000,
    rtt: 35,
    jitter: 2,
    avg_loss: 0.5,
    max_loss: 3,
    bandwidth: 100 * MB_TO_B, // 100M/s
    bitrate: 128 * 1000, // 128Kbps
  },
};

export const fakeVideoQosData: { encode: VideoQosData; decode: VideoQosData } = {
  encode: {
    sample_rate: 90000,
    rtt: 40,
    jitter: 3,
    avg_loss: 1.2,
    max_loss: 5,
    width: 1280,
    height: 720,
    fps: 30,
    bandwidth: 100 * MB_TO_B, // 100M/s
    bitrate: 2 * MB_TO_B, // 2Mbps
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
    bandwidth: 100 * MB_TO_B, // 100M/s
    bitrate: 2 * MB_TO_B, // 2Mbps
  },
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
    bandwidth: 100 * MB_TO_B, // 100M/s
    bitrate: 2 * MB_TO_B, // 2Mbps
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
    bandwidth: 100 * MB_TO_B, // 100M/s
    bitrate: 2 * MB_TO_B, // 2Mbps
  },
};
