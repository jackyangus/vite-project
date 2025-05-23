import React, { useState, useEffect } from "react";
import { ExternalLink, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut, Download } from "lucide-react";

const AuxViewer = () => {
  const [segment, setSegment] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Listen for messages from the parent window
    const handleMessage = (event) => {
      // IMPORTANT: In production, validate event.origin for security!
      if (event.data && event.data.type === "SEGMENT_UPDATE") {
        setSegment(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    // Notify parent window that aux viewer is ready
    if (window.opener) {
      window.opener.postMessage({ type: "AUX_WINDOW_READY" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 25));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    if (segment?.screenshotUrl) {
      const link = document.createElement("a");
      link.href = segment.screenshotUrl;
      link.download = `screenshot-${segment.id}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ExternalLink className="w-5 h-5 text-blue-600" />
          <div>
            <h1 className="font-semibold text-gray-900">辅助查看器</h1>
            {segment && <p className="text-sm text-gray-500">句段: {segment.id}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 25}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="缩小"
          >
            <ZoomOut className="w-4 h-4 text-gray-600" />
          </button>

          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 min-w-[60px] text-center">
            {zoom}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={zoom >= 300}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="放大"
          >
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>

          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="重置缩放"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          <button
            onClick={handleDownload}
            disabled={!segment?.screenshotUrl}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="下载截图"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isFullscreen ? "退出全屏" : "全屏"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-gray-600" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {segment ? (
          <div className="space-y-6">
            {/* Source Text Context */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">源文本上下文</h2>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-800 text-sm leading-relaxed">{segment.source}</p>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span>
                  状态:{" "}
                  <span className="font-medium">
                    {segment.status === "translated" ? "已翻译" : segment.status === "draft" ? "草稿" : "未翻译"}
                  </span>
                </span>
                <span>
                  ID: <span className="font-medium">{segment.id}</span>
                </span>
              </div>
            </div>

            {/* Screenshot/Visual Context */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">视觉上下文</h2>
              <div className="bg-gray-100 rounded-xl overflow-hidden">
                <div
                  className="transition-transform duration-200 origin-top-left flex justify-center items-center min-h-[300px]"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <img
                    src={segment.screenshotUrl}
                    alt="上下文截图"
                    className="max-w-full h-auto shadow-lg rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = target.nextSibling as HTMLElement;
                      target.style.display = "none";
                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                  <div
                    className="hidden flex-col items-center justify-center text-gray-500 p-8"
                    style={{ minHeight: "300px" }}
                  >
                    <ExternalLink className="w-12 h-12 mb-3 opacity-50" />
                    <p className="text-sm">无法加载截图</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Translation */}
            {segment.target && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">当前译文</h2>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-gray-800 text-sm leading-relaxed">{segment.target}</p>
                </div>
              </div>
            )}

            {/* Additional Context */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">额外信息</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">字符数:</span>
                  <span className="font-medium text-gray-800">{segment.source.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">词数 (估算):</span>
                  <span className="font-medium text-gray-800">{segment.source.split(" ").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">翻译类型:</span>
                  <span className="font-medium text-gray-800">人工翻译</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ExternalLink className="w-16 h-16 mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">等待数据加载</h2>
            <p className="text-center max-w-md">请从主翻译界面选择一个句段来查看详细的上下文信息。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuxViewer;
