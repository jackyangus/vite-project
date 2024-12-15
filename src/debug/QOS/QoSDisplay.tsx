import React, { useState, useEffect } from "react";
import { AudioQosData, VideoQosData, VideoStatisticOption, StatisticOption } from "@zoom/videosdk"; // Adjust the import path
import { fakeAudioQosData, fakeVideoQosData, fakeSharingQosData } from "./fakeQos"; // Import the fake data
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MB_TO_B, KB_TO_B } from "./fakeQos";

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
  height: number;
  fullResolution: string;
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
  yAxisFormat?: (value: number) => number;
  unit: string;
  legendFormat: string;
  axisGroup?: "primary" | "bitrate" | "bandwidth" | "height" | "loss" | "time";
}

const METRIC_OPTIONS: (MetricOption & { defaultVisible: boolean })[] = [
  {
    key: "height",
    label: "Resolution",
    color: "#FF2D55",
    defaultVisible: true,
    format: (v) => `${v}p`,
    unit: "p",
    legendFormat: "Resolution Height (p)",
    axisGroup: "height",
  },
  {
    key: "fps",
    label: "FPS",
    color: "#007AFF",
    defaultVisible: true,
    unit: "fps",
    legendFormat: "FPS (frames/s)",
    axisGroup: "primary",
  },
  {
    key: "rtt",
    label: "RTT",
    color: "#34C759",
    defaultVisible: true,
    unit: "ms",
    legendFormat: "RTT (ms)",
    axisGroup: "time",
  },
  {
    key: "jitter",
    label: "Jitter",
    color: "#FF9500",
    defaultVisible: true,
    unit: "ms",
    legendFormat: "Jitter (ms)",
    axisGroup: "time",
  },
  {
    key: "loss",
    label: "Loss",
    color: "#FF3B30",
    defaultVisible: true,
    unit: "%",
    legendFormat: "Packet Loss (%)",
    axisGroup: "loss",
  },
  {
    key: "bandwidth",
    label: "Bandwidth",
    color: "#5856D6",
    format: (v) => (v / MB_TO_B).toFixed(2),
    yAxisFormat: (v) => Math.floor(v),
    unit: "MB/s",
    legendFormat: "Bandwidth (MB/s)",
    defaultVisible: true,
    axisGroup: "bandwidth",
  },
  {
    key: "bitrate",
    label: "Bitrate",
    color: "#AF52DE",
    format: (v) => (v / KB_TO_B).toFixed(2), // Convert bytes to bits, then to Kb
    yAxisFormat: (v) => v / KB_TO_B, // Same conversion for axis
    unit: "Kbps",
    legendFormat: "Bitrate (Kbps)",
    defaultVisible: true,
    axisGroup: "bitrate",
  },
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
  const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(() => {
    const savedPreferences = localStorage.getItem("qosMetricPreferences");
    if (savedPreferences) {
      try {
        return new Set(JSON.parse(savedPreferences));
      } catch (e) {
        console.error("Failed to parse saved preferences");
      }
    }
    return new Set(METRIC_OPTIONS.map((metric) => metric.key));
  });
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
    const kbps = (bps / KB_TO_B).toFixed(2);
    const mbps = (bps / MB_TO_B).toFixed(2);
    if (Number(mbps) > 1) {
      return `${mbps} Mbps`;
    }
    return `${kbps} Kbps`;
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
            height: videoQosData.encode.height,
            fullResolution: `${videoQosData.encode.width}x${videoQosData.encode.height}`,
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
            height: videoQosData.decode.height,
            fullResolution: `${videoQosData.decode.width}x${videoQosData.decode.height}`,
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
            height: 0,
            fullResolution: "",
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
            height: 0,
            fullResolution: "",
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
            height: sharingQosData.encode.height,
            fullResolution: `${sharingQosData.encode.width}x${sharingQosData.encode.height}`,
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
            height: sharingQosData.decode.height,
            fullResolution: `${sharingQosData.decode.width}x${sharingQosData.decode.height}`,
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

  const toggleMetric = (metricKey: string) => {
    const newSelected = new Set(selectedMetrics);
    if (selectedMetrics.has(metricKey)) {
      newSelected.delete(metricKey);
    } else {
      newSelected.add(metricKey);
    }
    setSelectedMetrics(newSelected);
    localStorage.setItem("qosMetricPreferences", JSON.stringify(Array.from(newSelected)));
  };

  const renderMetricControls = () => {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Metrics</h3>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1.5 text-xs rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
              onClick={() => {
                setSelectedMetrics(new Set());
                localStorage.setItem("qosMetricPreferences", JSON.stringify([]));
              }}
            >
              Clear All
            </button>
            <button
              className="px-3 py-1.5 text-xs rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
              onClick={() => {
                const defaultMetrics = new Set(
                  METRIC_OPTIONS.filter((metric) => metric.defaultVisible).map((metric) => metric.key),
                );
                setSelectedMetrics(defaultMetrics);
                localStorage.setItem("qosMetricPreferences", JSON.stringify(Array.from(defaultMetrics)));
              }}
            >
              Reset to Default
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {METRIC_OPTIONS.map((metric) => (
            <button
              key={metric.key}
              className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
                selectedMetrics.has(metric.key)
                  ? `bg-opacity-20 bg-${metric.color} text-${metric.color} ring-1 ring-${metric.color}`
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => toggleMetric(metric.key)}
            >
              {metric.label} ({metric.unit})
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderQoSChart = (data: QoSMetric[], title: string, showResolution = false) => {
    // Get the domain for height values if they exist in the data
    const getHeightDomain = () => {
      if (!data.length) return [0, 100];
      const heights = data.map((d) => d.height).filter((h) => h > 0);
      if (!heights.length) return [0, 100];
      const minHeight = Math.min(...heights);
      const maxHeight = Math.max(...heights);
      // Add some padding to the domain
      return [Math.max(0, minHeight - 100), maxHeight + 100];
    };

    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col space-y-4 mb-6">
          <h3 className="text-lg font-medium">{title}</h3>
          {renderMetricControls()}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
              stroke="#666"
              fontSize={12}
            />
            <YAxis
              yAxisId="height"
              orientation="left"
              stroke="#666"
              fontSize={12}
              domain={getHeightDomain()}
              tickFormatter={(value) => `${value}P`}
              hide={!selectedMetrics.has("height")}
            />

            <YAxis
              yAxisId="primary"
              orientation="left"
              stroke="#666"
              fontSize={12}
              domain={[0, "auto"]}
              hide={
                !Array.from(selectedMetrics).some(
                  (key) => METRIC_OPTIONS.find((m) => m.key === key)?.axisGroup === "primary",
                )
              }
            />
            <YAxis
              yAxisId="time"
              orientation="left"
              stroke="#666"
              fontSize={12}
              domain={[0, 1000]}
              tickFormatter={(value) => `${value}ms`}
              hide={
                !Array.from(selectedMetrics).some(
                  (key) => METRIC_OPTIONS.find((m) => m.key === key)?.axisGroup === "time",
                )
              }
            />
            <YAxis
              yAxisId="loss"
              orientation="right"
              stroke="#666"
              fontSize={12}
              domain={[0, 50]}
              tickFormatter={(value) => `${value}%`}
              hide={
                !Array.from(selectedMetrics).some(
                  (key) => METRIC_OPTIONS.find((m) => m.key === key)?.axisGroup === "loss",
                )
              }
            />

            <YAxis
              yAxisId="bandwidth"
              orientation="right"
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${Math.floor(value / MB_TO_B)}M/s`}
              hide={
                !Array.from(selectedMetrics).some(
                  (key) => METRIC_OPTIONS.find((m) => m.key === key)?.axisGroup === "bandwidth",
                )
              }
            />

            <YAxis
              yAxisId="bitrate"
              orientation="right"
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${Math.floor(value / KB_TO_B)}Kbps`}
              hide={
                !Array.from(selectedMetrics).some(
                  (key) => METRIC_OPTIONS.find((m) => m.key === key)?.axisGroup === "bitrate",
                )
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
                borderRadius: "12px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                padding: "12px",
              }}
              labelFormatter={(timestamp) => new Date(Number(timestamp)).toLocaleTimeString()}
              formatter={(value: number | string, name: string, props) => {
                const metric = METRIC_OPTIONS.find((m) => m.legendFormat === name);
                if (!metric) return [value, name];

                if (metric.key === "height") {
                  return [`${value}p (${props.payload.fullResolution})`, "Resolution"];
                }

                const formattedValue = metric.format ? metric.format(value as number) : value;
                return [`${formattedValue} ${metric.unit}`, metric.label];
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                paddingBottom: "20px",
                fontSize: "12px",
              }}
            />
            {Array.from(selectedMetrics).map((metricKey) => {
              const metric = METRIC_OPTIONS.find((m) => m.key === metricKey);
              if (!metric) return null;

              return (
                <Line
                  key={metric.key}
                  yAxisId={metric.axisGroup || "primary"}
                  type={metric.key === "height" ? "stepAfter" : "monotone"}
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={2}
                  name={metric.legendFormat}
                  dot={metric.key === "height"}
                  activeDot={{ r: metric.key === "height" ? 6 : 4 }}
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
      <div className="flex space-x-2 mb-6 bg-gray-900/50 p-1 rounded-xl backdrop-blur-sm">
        <button
          className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            mainTab === "av" ? "bg-gray-800 text-white shadow-lg" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setMainTab("av")}
        >
          Audio & Video
        </button>
        <button
          className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            mainTab === "all" ? "bg-gray-800 text-white shadow-lg" : "text-gray-400 hover:text-white"
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
      <div className="flex space-x-2 mb-6 bg-gray-900/50 p-1 rounded-xl backdrop-blur-sm">
        {videoQosData && (
          <button
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              subTab === "video" ? "bg-gray-800 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setSubTab("video")}
          >
            Video
          </button>
        )}
        {audioQosData && (
          <button
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              subTab === "audio" ? "bg-gray-800 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setSubTab("audio")}
          >
            Audio
          </button>
        )}
        {sharingQosData && (
          <button
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              subTab === "sharing" ? "bg-gray-800 text-white shadow-lg" : "text-gray-400 hover:text-white"
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
    <div className="rounded-2xl shadow-xl p-6 w-full md:w-3/4 mx-auto bg-black/90 backdrop-blur-xl text-white max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-black/90 backdrop-blur-xl z-10 pb-4 mb-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">QoS Statistics</h2>
          <span className="text-xs text-gray-400 bg-gray-900/50 px-3 py-1.5 rounded-full">
            {new Date().toLocaleString()}
          </span>
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
