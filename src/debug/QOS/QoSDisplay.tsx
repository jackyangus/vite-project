import React, { useState, useEffect } from "react";
import { AudioQosData, VideoQosData, VideoStatisticOption, StatisticOption } from "@zoom/videosdk"; // Adjust the import path
import { fakeAudioQosData, fakeVideoQosData, fakeSharingQosData } from "./fakeQos"; // Import the fake data

interface QoSDisplayProps {
  audioQosData?: AudioQosData;
  videoQosData?: VideoQosData;
  sharingQosData?: VideoQosData; // Assuming it's similar to VideoQosData or AudioQosData, replace `any` with a specific type if needed
  subscribeToVideoStatistic?: (type?: VideoStatisticOption) => void;
  unsubscribeFromVideoStatistic?: (type?: VideoStatisticOption) => void;
  subscribeToAudioStatistic?: (type?: StatisticOption) => void;
  unsubscribeFromAudioStatistic?: (type?: StatisticOption) => void;
}

export const QoSDisplay: React.FC<QoSDisplayProps> = ({
  audioQosData = fakeAudioQosData,
  videoQosData = fakeVideoQosData,
  sharingQosData = fakeSharingQosData,
  subscribeToVideoStatistic,
  unsubscribeFromVideoStatistic,
  subscribeToAudioStatistic,
  unsubscribeFromAudioStatistic,
}) => {
  const [isOpen, setIsOpen] = useState({
    general: true,
    video: true,
    audio: true,
    network: true,
    advanced: false,
  });

  const toggleSection = (section) => {
    setIsOpen({ ...isOpen, [section]: !isOpen[section] });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const formatSpeed = (bps: number) => {
    const kbps = (bps / 1000).toFixed(2);
    const mbps = (Number(kbps) / 1000).toFixed(2);
    return `${mbps} Mbps`;
  };

  useEffect(() => {
    subscribeToVideoStatistic?.({ decode: true, encode: true, detailed: true });
    subscribeToAudioStatistic?.({ decode: true, encode: true });
    return () => {
      unsubscribeFromVideoStatistic?.({ decode: true, encode: true, detailed: true });
      unsubscribeFromAudioStatistic?.({ decode: true, encode: true });
    };
  }, [
    subscribeToVideoStatistic,
    unsubscribeFromVideoStatistic,
    subscribeToAudioStatistic,
    unsubscribeFromAudioStatistic,
  ]);
  return (
    <div className="rounded-lg shadow-md p-4 w-full md:w-3/4 mx-auto bg-black text-white">
      <h2 className="text-xl font-semibold mb-2">QoS Statistics</h2>

      {/* General Section */}
      <div className="mb-4 border-b pb-2">
        <button className="flex items-center w-full justify-between py-2" onClick={() => toggleSection("general")}>
          <span className="font-medium">General</span>
          <span>{isOpen.general ? "-" : "+"}</span>
        </button>
        {isOpen.general && (
          <div className="pl-4">
            {videoQosData && (
              <p>
                Video Sample Rate: {videoQosData.sample_rate} | FPS: {videoQosData.fps}
              </p>
            )}
            {audioQosData && <p>Audio Sample Rate: {audioQosData.sample_rate}</p>}

            <p>Date/Time: {new Date().toLocaleString()}</p>
          </div>
        )}
      </div>

      {/* Video Section */}
      {videoQosData && (
        <div className="mb-4 border-b pb-2">
          <button className="flex items-center w-full justify-between py-2" onClick={() => toggleSection("video")}>
            <span className="font-medium">Video</span>
            <span>{isOpen.video ? "-" : "+"}</span>
          </button>
          {isOpen.video && (
            <div className="pl-4">
              <p>
                Resolution: {videoQosData.width} x {videoQosData.height}
              </p>
              <p>
                Round Trip Time: {videoQosData.rtt} ms | Jitter: {videoQosData.jitter} ms
              </p>
              <p>
                Average Loss: {videoQosData.avg_loss} % | Maximum Loss: {videoQosData.max_loss} %
              </p>
              <p>
                Bandwidth: {formatBytes(videoQosData.bandwidth)} | Bitrate: {formatSpeed(videoQosData.bitrate)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Audio Section */}
      {audioQosData && (
        <div className="mb-4 border-b pb-2">
          <button className="flex items-center w-full justify-between py-2" onClick={() => toggleSection("audio")}>
            <span className="font-medium">Audio</span>
            <span>{isOpen.audio ? "-" : "+"}</span>
          </button>
          {isOpen.audio && (
            <div className="pl-4">
              <p>
                Round Trip Time: {audioQosData.rtt} ms | Jitter: {audioQosData.jitter} ms
              </p>
              <p>
                Average Loss: {audioQosData.avg_loss} % | Maximum Loss: {audioQosData.max_loss} %
              </p>
              <p>
                Bandwidth: {formatBytes(audioQosData.bandwidth)} | Bitrate: {formatSpeed(audioQosData.bitrate)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Network Section */}
      <div className="mb-4 border-b pb-2">
        <button className="flex items-center w-full justify-between py-2" onClick={() => toggleSection("network")}>
          <span className="font-medium">Network</span>
          <span>{isOpen.network ? "-" : "+"}</span>
        </button>
        {isOpen.network && (
          <div className="pl-4">
            {videoQosData && <p>Video Bandwidth: {formatSpeed(videoQosData.bandwidth)}</p>}
            {audioQosData && <p>Audio Bandwidth: {formatSpeed(audioQosData.bandwidth)}</p>}
          </div>
        )}
      </div>

      {/* Advanced Section (Optional) */}
      <div className="mb-4">
        <button className="flex items-center w-full justify-between py-2" onClick={() => toggleSection("advanced")}>
          <span className="font-medium">Advanced</span>
          <span>{isOpen.advanced ? "-" : "+"}</span>
        </button>
        {isOpen.advanced && (
          <div className="pl-4">
            {sharingQosData && <pre className="text-xs">{JSON.stringify(sharingQosData, null, 2)}</pre>}
            {videoQosData && <pre className="text-xs">{JSON.stringify(videoQosData, null, 2)}</pre>}
            {audioQosData && <pre className="text-xs">{JSON.stringify(audioQosData, null, 2)}</pre>}
          </div>
        )}
      </div>
    </div>
  );
};

export default QoSDisplay;
