import React, { useState, useEffect } from "react";
import QoSDisplay from "./debug/QOS/QoSDisplay";

const QoSApp = () => {
  const [qosData, setQosData] = useState(null); // Initialize state to null

  useEffect(() => {
    // Simulate fetching data (replace with your actual data fetching logic)
    setTimeout(() => {
      setQosData({
        videoId: "hDMSHQ-icfU",
        sCPN: "SMS4 TTDJ QYMN 28TC JRY0",
        date: new Date().toLocaleString(),
        viewport: "1168x657",
        viewportScale: 2.0,
        frames: 2502,
        droppedFrames: 0,
        currentRes: "1920x1080@30",
        optimalRes: "1920x1080@30",
        videoCodec: "av01.0.08M.08 (399)",
        audioCodec: "opus (251)",
        color: "bt709",
        bufferHealth: 52.28,
        volume: "57%",
        normalizedLoudness: "-1.6dB",
        connectionSpeed: 325076,
        networkActivity: 12345,
        mysteryText: { SABR: "some data", vd: "gp", s: 8, t: 18532.12, b: "18450.001-18584.166" },
        pl_i: 24832091,
        vir: 24832110,
        pbs: 4325,
      });
    }, 1000); // Simulate a 1-second delay
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <QoSDisplay />
    </div>
  );
};

export default QoSApp;
