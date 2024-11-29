"use client";

import { type PropsWithChildren, type FunctionComponent, useState } from "react";
import { useMapStudio } from "@mapstudio/frontend/hooks/useMapStudio";
import { DrawType } from "@mapstudio/core/types/map";

export const WebMap: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [isClipMode, setIsClipMode] = useState(false);
  const [activeDrawType, setActiveDrawType] = useState<DrawType | null>(null);
  const { mapRef, mapStudio } = useMapStudio();

  const handleAnimationChange = () => {
    //mapStudio?.panTo([0, 0], "inAndOut");
  };

  const print = async () => {
    if (mapStudio) {
      const imageData = mapStudio.captureMap();
      mapStudio.downloadMap({ filename: "my_test_map", format: "jpg" }, imageData);
    }
  };

  const handleClipMode = () => {
    if (!mapStudio) return;

    if (!isClipMode) {
      mapStudio.startClipMode((imageData) => {
        mapStudio.downloadMap({ filename: "clip", format: "png" }, imageData);

        // Exit clip mode after download
        setIsClipMode(false);
        mapStudio.stopClipMode();
      });
      setIsClipMode(true);
    } else {
      mapStudio.stopClipMode();
      setIsClipMode(false);
    }
  };

  const handleDrawClick = (type: DrawType) => {
    if (activeDrawType === type) {
      // If clicking the active tool, stop drawing
      mapStudio?.stopDrawing();
      setActiveDrawType(null);
    } else {
      // Start drawing with the new tool
      mapStudio?.startDrawing(type);
      setActiveDrawType(type);
    }
  };

  const handleClear = () => {
    mapStudio?.clearDrawings();
  };

  const handleStopDrawing = () => {
    mapStudio?.stopDrawing();
  };

  return (
    <div className="relative h-full w-full">
      {/* <WebMapToolbar /> */}
      {/* 
      <button onClick={handleAnimationChange} className="absolute z-20">
        Change Pan Animation
      </button> */}

      {/* <div className="absolute z-20 space-x-5">
        <Button onClick={print} className="">
          Print
        </Button>

        <Button onClick={handleClipMode} className="">
          {isClipMode ? "Exit Clip Mode" : "Enter Clip Mode"}
        </Button>

        <button
          onClick={() => handleDrawClick("Point")}
          className={activeDrawType === "Point" ? "active" : ""}
        >
          Draw Point
        </button>

        <button
          onClick={() => handleDrawClick("LineString")}
          className={activeDrawType === "LineString" ? "active" : ""}
        >
          Draw Line
        </button>

        <button
          onClick={() => handleDrawClick("Polygon")}
          className={activeDrawType === "Polygon" ? "active" : ""}
        >
          Draw Polygon
        </button>

        <button
          onClick={() => handleDrawClick("Circle")}
          className={activeDrawType === "Circle" ? "active" : ""}
        >
          Draw Circle
        </button>

        <button
          onClick={() => handleDrawClick("FreehandLine")}
          className={activeDrawType === "FreehandLine" ? "active" : ""}
        >
          Freehand Line
        </button>

        <button
          onClick={() => handleDrawClick("FreehandPolygon")}
          className={activeDrawType === "FreehandPolygon" ? "active" : ""}
        >
          Freehand Polygon
        </button>

        <button onClick={handleClear}>Clear All</button>

        <button onClick={handleStopDrawing}>Stop</button>
      </div> */}

      <div ref={mapRef} className="absolute bottom-0 top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};
