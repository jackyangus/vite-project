import React, { useState, useEffect } from "react";
import { AudioQosData, VideoQosData, VideoStatisticOption, StatisticOption } from "@zoom/videosdk"; // Adjust the import path
import { fakeAudioQosData, fakeVideoQosData, fakeSharingQosData } from "./fakeQos"; // Import the fake data

interface QoSDisplayProps {
  audioQosData?: { encode: AudioQosData; decode: AudioQosData };
  videoQosData?: { encode: VideoQosData; decode: VideoQosData };
  sharingQosData?: { encode: VideoQosData; decode: VideoQosData }; // Assuming it's similar to VideoQosData or AudioQosData, replace `any` with a specific type if needed
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

  const renderQosStats = (title: string, data: { encode: any; decode: any }, showResolution = false) => {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-gray-800 rounded-md text-xs">Encode</span>
            <span className="px-2 py-1 bg-gray-800 rounded-md text-xs">Decode</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Encode Column */}
          <div className="space-y-2">
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-2">
                {showResolution && (
                  <>
                    <div className="text-xs text-gray-400">Resolution</div>
                    <div className="text-xs text-right">
                      {data.encode.width}x{data.encode.height}
                    </div>
                    <div className="text-xs text-gray-400">FPS</div>
                    <div className="text-xs text-right">{data.encode.fps}</div>
                  </>
                )}
                <div className="text-xs text-gray-400">Sample Rate</div>
                <div className="text-xs text-right">{data.encode.sample_rate}</div>
                <div className="text-xs text-gray-400">RTT</div>
                <div className="text-xs text-right">{data.encode.rtt} ms</div>
                <div className="text-xs text-gray-400">Jitter</div>
                <div className="text-xs text-right">{data.encode.jitter} ms</div>
                <div className="text-xs text-gray-400">Loss</div>
                <div className="text-xs text-right">{data.encode.avg_loss}%</div>
                <div className="text-xs text-gray-400">Bandwidth</div>
                <div className="text-xs text-right">{formatBytes(data.encode.bandwidth)}</div>
                <div className="text-xs text-gray-400">Bitrate</div>
                <div className="text-xs text-right">{formatSpeed(data.encode.bitrate)}</div>
              </div>
            </div>
          </div>

          {/* Decode Column */}
          <div className="space-y-2">
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-2">
                {showResolution && (
                  <>
                    <div className="text-xs text-gray-400">Resolution</div>
                    <div className="text-xs text-right">
                      {data.decode.width}x{data.decode.height}
                    </div>
                    <div className="text-xs text-gray-400">FPS</div>
                    <div className="text-xs text-right">{data.decode.fps}</div>
                  </>
                )}
                <div className="text-xs text-gray-400">Sample Rate</div>
                <div className="text-xs text-right">{data.decode.sample_rate}</div>
                <div className="text-xs text-gray-400">RTT</div>
                <div className="text-xs text-right">{data.decode.rtt} ms</div>
                <div className="text-xs text-gray-400">Jitter</div>
                <div className="text-xs text-right">{data.decode.jitter} ms</div>
                <div className="text-xs text-gray-400">Loss</div>
                <div className="text-xs text-right">{data.decode.avg_loss}%</div>
                <div className="text-xs text-gray-400">Bandwidth</div>
                <div className="text-xs text-right">{formatBytes(data.decode.bandwidth)}</div>
                <div className="text-xs text-gray-400">Bitrate</div>
                <div className="text-xs text-right">{formatSpeed(data.decode.bitrate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg shadow-md p-6 w-full md:w-3/4 mx-auto bg-black text-white max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-black z-10 pb-4 mb-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">QoS Statistics</h2>
          <span className="text-xs text-gray-400">{new Date().toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-6">
        {videoQosData && renderQosStats("Video", videoQosData, true)}
        {audioQosData && renderQosStats("Audio", audioQosData)}
        {sharingQosData && renderQosStats("Screen Sharing", sharingQosData, true)}
      </div>

      {/* Advanced Section */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <button
          className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
          onClick={() => toggleSection("advanced")}
        >
          <span>{isOpen.advanced ? "Hide" : "Show"} Raw Data</span>
          <span>{isOpen.advanced ? "−" : "+"}</span>
        </button>

        {isOpen.advanced && (
          <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-xs">
              {JSON.stringify(
                {
                  videoQosData,
                  audioQosData,
                  sharingQosData,
                },
                null,
                2,
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default QoSDisplay;
