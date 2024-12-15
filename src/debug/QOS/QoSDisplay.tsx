import React, { useState, useEffect } from "react";
import { AudioQosData, VideoQosData, VideoStatisticOption, StatisticOption } from "@zoom/videosdk"; // Adjust the import path
import { fakeAudioQosData, fakeVideoQosData, fakeSharingQosData } from "./fakeQos"; // Import the fake data
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface QoSDisplayProps {
  audioQosData?: { encode: AudioQosData; decode: AudioQosData };
  videoQosData?: { encode: VideoQosData; decode: VideoQosData };
  sharingQosData?: { encode: VideoQosData; decode: VideoQosData }; // Assuming it's similar to VideoQosData or AudioQosData, replace `any` with a specific type if needed
  subscribeToVideoStatistic?: (type?: VideoStatisticOption) => void;
  unsubscribeFromVideoStatistic?: (type?: VideoStatisticOption) => void;
  subscribeToAudioStatistic?: (type?: StatisticOption) => void;
  unsubscribeFromAudioStatistic?: (type?: StatisticOption) => void;
}

interface QoSMetric {
  timestamp: number;
  resolution: string;
  fps: number;
  sampleRate: number;
  rtt: number;
  jitter: number;
  loss: number;
  bandwidth: number;
  bitrate: number;
}

interface MetricOption {
  key: keyof Omit<QoSMetric, "timestamp">;
  label: string;
  color: string;
  format?: (value: number) => string;
}

const METRIC_OPTIONS: MetricOption[] = [
  { key: "fps", label: "FPS", color: "#8884d8" },
  { key: "rtt", label: "RTT (ms)", color: "#82ca9d" },
  { key: "jitter", label: "Jitter (ms)", color: "#ffc658" },
  { key: "loss", label: "Loss (%)", color: "#ff7300" },
  { key: "bandwidth", label: "Bandwidth (KB)", color: "#e91e63", format: (v) => (v / 1024).toFixed(2) },
  { key: "bitrate", label: "Bitrate (Mbps)", color: "#2196f3", format: (v) => (v / 1000000).toFixed(2) },
];

type MainTabType = "av" | "all";
type SubTabType = "video" | "audio" | "sharing";

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
  const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(new Set(["fps", "bitrate"]));
  const [encodeHistory, setEncodeHistory] = useState<QoSMetric[]>([]);
  const [decodeHistory, setDecodeHistory] = useState<QoSMetric[]>([]);
  const [mainTab, setMainTab] = useState<MainTabType>("av");
  const [subTab, setSubTab] = useState<SubTabType>("video");
  const [audioEncodeHistory, setAudioEncodeHistory] = useState<QoSMetric[]>([]);
  const [audioDecodeHistory, setAudioDecodeHistory] = useState<QoSMetric[]>([]);
  const [sharingEncodeHistory, setSharingEncodeHistory] = useState<QoSMetric[]>([]);
  const [sharingDecodeHistory, setSharingDecodeHistory] = useState<QoSMetric[]>([]);

  const MAX_HISTORY_POINTS = 30;

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

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = Date.now();

      // Update video history
      if (videoQosData) {
        setEncodeHistory((prev) => {
          const newPoint: QoSMetric = {
            timestamp,
            resolution: `${videoQosData.encode.width}x${videoQosData.encode.height}`,
            fps: videoQosData.encode.fps,
            sampleRate: videoQosData.encode.sample_rate,
            rtt: videoQosData.encode.rtt,
            jitter: videoQosData.encode.jitter,
            loss: videoQosData.encode.avg_loss,
            bandwidth: videoQosData.encode.bandwidth,
            bitrate: videoQosData.encode.bitrate,
          };
          return [...prev, newPoint].slice(-MAX_HISTORY_POINTS);
        });

        setDecodeHistory((prev) => {
          const newPoint: QoSMetric = {
            timestamp,
            resolution: `${videoQosData.decode.width}x${videoQosData.decode.height}`,
            fps: videoQosData.decode.fps,
            sampleRate: videoQosData.decode.sample_rate,
            rtt: videoQosData.decode.rtt,
            jitter: videoQosData.decode.jitter,
            loss: videoQosData.decode.avg_loss,
            bandwidth: videoQosData.decode.bandwidth,
            bitrate: videoQosData.decode.bitrate,
          };
          return [...prev, newPoint].slice(-MAX_HISTORY_POINTS);
        });
      }

      // Update audio history
      if (audioQosData) {
        setAudioEncodeHistory((prev) => {
          const newPoint: QoSMetric = {
            timestamp,
            resolution: "",
            fps: 0,
            sampleRate: audioQosData.encode.sample_rate,
            rtt: audioQosData.encode.rtt,
            jitter: audioQosData.encode.jitter,
            loss: audioQosData.encode.avg_loss,
            bandwidth: audioQosData.encode.bandwidth,
            bitrate: audioQosData.encode.bitrate,
          };
          return [...prev, newPoint].slice(-MAX_HISTORY_POINTS);
        });

        setAudioDecodeHistory((prev) => {
          const newPoint: QoSMetric = {
            timestamp,
            resolution: "",
            fps: 0,
            sampleRate: audioQosData.decode.sample_rate,
            rtt: audioQosData.decode.rtt,
            jitter: audioQosData.decode.jitter,
            loss: audioQosData.decode.avg_loss,
            bandwidth: audioQosData.decode.bandwidth,
            bitrate: audioQosData.decode.bitrate,
          };
          return [...prev, newPoint].slice(-MAX_HISTORY_POINTS);
        });
      }

      // Update sharing history
      if (sharingQosData) {
        setSharingEncodeHistory((prev) => {
          const newPoint: QoSMetric = {
            timestamp,
            resolution: `${sharingQosData.encode.width}x${sharingQosData.encode.height}`,
            fps: sharingQosData.encode.fps,
            sampleRate: sharingQosData.encode.sample_rate,
            rtt: sharingQosData.encode.rtt,
            jitter: sharingQosData.encode.jitter,
            loss: sharingQosData.encode.avg_loss,
            bandwidth: sharingQosData.encode.bandwidth,
            bitrate: sharingQosData.encode.bitrate,
          };
          return [...prev, newPoint].slice(-MAX_HISTORY_POINTS);
        });

        setSharingDecodeHistory((prev) => {
          const newPoint: QoSMetric = {
            timestamp,
            resolution: `${sharingQosData.decode.width}x${sharingQosData.decode.height}`,
            fps: sharingQosData.decode.fps,
            sampleRate: sharingQosData.decode.sample_rate,
            rtt: sharingQosData.decode.rtt,
            jitter: sharingQosData.decode.jitter,
            loss: sharingQosData.decode.avg_loss,
            bandwidth: sharingQosData.decode.bandwidth,
            bitrate: sharingQosData.decode.bitrate,
          };
          return [...prev, newPoint].slice(-MAX_HISTORY_POINTS);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [videoQosData, audioQosData, sharingQosData]);

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

  const renderQoSChart = (data: QoSMetric[], title: string, showResolution = false) => {
    return (
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {METRIC_OPTIONS.map((metric) => (
              <button
                key={metric.key}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  selectedMetrics.has(metric.key)
                    ? "bg-gray-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
                onClick={() => {
                  const newSelected = new Set(selectedMetrics);
                  if (selectedMetrics.has(metric.key)) {
                    newSelected.delete(metric.key);
                  } else {
                    newSelected.add(metric.key);
                  }
                  setSelectedMetrics(newSelected);
                }}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
              stroke="#666"
            />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
              labelFormatter={(timestamp) => new Date(Number(timestamp)).toLocaleTimeString()}
              formatter={(value: number, name: string) => {
                const metric = METRIC_OPTIONS.find((m) => m.label === name);
                return [metric?.format ? metric.format(value) : value, name];
              }}
            />
            <Legend />
            {Array.from(selectedMetrics).map((metricKey) => {
              const metric = METRIC_OPTIONS.find((m) => m.key === metricKey);
              if (!metric) return null;
              return (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  name={metric.label}
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderMainTabs = () => {
    return (
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            mainTab === "av" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
          onClick={() => setMainTab("av")}
        >
          Audio & Video
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            mainTab === "all" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
          onClick={() => setMainTab("all")}
        >
          All Metrics
        </button>
      </div>
    );
  };

  const renderSubTabs = () => {
    return (
      <div className="flex space-x-2 mb-4">
        {videoQosData && (
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              subTab === "video" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setSubTab("video")}
          >
            Video
          </button>
        )}
        {audioQosData && (
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              subTab === "audio" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setSubTab("audio")}
          >
            Audio
          </button>
        )}
        {sharingQosData && (
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              subTab === "sharing" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setSubTab("sharing")}
          >
            Screen Sharing
          </button>
        )}
      </div>
    );
  };

  const renderAVCharts = () => {
    switch (subTab) {
      case "video":
        return (
          <>
            {renderQoSChart(encodeHistory, "Video Encode Metrics", true)}
            {renderQoSChart(decodeHistory, "Video Decode Metrics", true)}
          </>
        );
      case "audio":
        return (
          <>
            {renderQoSChart(audioEncodeHistory, "Audio Encode Metrics", false)}
            {renderQoSChart(audioDecodeHistory, "Audio Decode Metrics", false)}
          </>
        );
      case "sharing":
        return (
          <>
            {renderQoSChart(sharingEncodeHistory, "Screen Sharing Encode Metrics", true)}
            {renderQoSChart(sharingDecodeHistory, "Screen Sharing Decode Metrics", true)}
          </>
        );
    }
  };

  const renderAllMetricsCharts = () => {
    return (
      <div className="space-y-6">
        {videoQosData && (
          <>
            {renderQoSChart(encodeHistory, "Video Encode Metrics", true)}
            {renderQoSChart(decodeHistory, "Video Decode Metrics", true)}
          </>
        )}
        {audioQosData && (
          <>
            {renderQoSChart(audioEncodeHistory, "Audio Encode Metrics", false)}
            {renderQoSChart(audioDecodeHistory, "Audio Decode Metrics", false)}
          </>
        )}
        {sharingQosData && (
          <>
            {renderQoSChart(sharingEncodeHistory, "Screen Sharing Encode Metrics", true)}
            {renderQoSChart(sharingDecodeHistory, "Screen Sharing Decode Metrics", true)}
          </>
        )}
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
        {/* Stats Display */}
        {videoQosData && renderQosStats("Video", videoQosData, true)}
        {audioQosData && renderQosStats("Audio", audioQosData)}
        {sharingQosData && renderQosStats("Screen Sharing", sharingQosData, true)}

        {/* Charts Display */}
        {(videoQosData || audioQosData || sharingQosData) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">QoS Charts</h2>
            {renderMainTabs()}
            {mainTab === "av" ? (
              <>
                {renderSubTabs()}
                {renderAVCharts()}
              </>
            ) : (
              renderAllMetricsCharts()
            )}
          </div>
        )}
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
