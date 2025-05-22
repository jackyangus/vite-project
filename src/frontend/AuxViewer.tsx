import React, { useState, useEffect } from "react";

const AuxViewer = () => {
  const [segmentData, setSegmentData] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      // IMPORTANT: For production, always validate event.origin for security!
      // Example: if (event.origin !== 'http://localhost:3000') return;

      if (event.data && event.data.type === "SEGMENT_UPDATE") {
        setSegmentData(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    // Request initial data from parent, in case this window was reloaded or opened late
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: "AUX_WINDOW_READY" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!segmentData) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center", color: "#555" }}>
        <p>正在等待父窗口数据...</p>
        <p style={{ fontSize: "0.8em", marginTop: "20px" }}>
          如果此窗口已打开且父窗口已导航到其他翻译项目，请关闭此窗口并通过翻译工作台重新打开它。
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "15px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "10px", fontSize: "1.2em", color: "#333" }}>
        辅助信息: 段落 ID {segmentData.id}
      </h2>
      <div
        style={{
          marginBottom: "15px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          fontSize: "0.9em",
        }}
      >
        <strong>源文本:</strong>
        <p style={{ margin: "5px 0 0", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{segmentData.source}</p>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        {segmentData.screenshotUrl ? (
          <img
            src={segmentData.screenshotUrl}
            alt={`截图 - 段落 ${segmentData.id}`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <p style={{ color: "#777" }}>此段落无截图。</p>
        )}
      </div>
    </div>
  );
};

export default AuxViewer;
