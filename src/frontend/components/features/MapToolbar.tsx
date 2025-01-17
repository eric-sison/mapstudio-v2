"use client";

import * as Toolbar from "@radix-ui/react-toolbar";
import {
  CircleDot,
  Grid,
  MapPin,
  PencilLine,
  Pentagon,
  Printer,
  Scissors,
  Waypoints,
  Wrench,
} from "lucide-react";
import { useState, type FunctionComponent } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip";
import { MapStudio } from "@mapstudio/core/mapstudio";
import { DrawType } from "@mapstudio/core/types/map";

export const MapToolbar: FunctionComponent<{ mapStudio: MapStudio | undefined }> = ({ mapStudio }) => {
  const [activeDrawType, setActiveDrawType] = useState<DrawType | null>(null);
  const [isClipMode, setIsClipMode] = useState(false);

  const print = () => {
    if (mapStudio) {
      const imageData = mapStudio.captureMap();
      console.log(imageData);

      mapStudio.downloadMap({ filename: "my_test_map", format: "png" }, imageData);
    }
  };

  const handleDraw = (type: DrawType) => {
    if (mapStudio) {
      if (activeDrawType === type) {
        // If clicking the active tool, stop drawing
        mapStudio.stopDrawing();
        setActiveDrawType(null);
      } else {
        // Start drawing with the new tool
        mapStudio.startDrawing(type);
        setActiveDrawType(type);
      }
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

  return (
    <div className="right-5">
      <Toolbar.Root className="absolute left-2 top-2 z-10 flex items-center gap-5 rounded-full bg-neutral-900 px-4 py-3 text-white shadow-md">
        <Toolbar.ToggleGroup type="single" className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Grid className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>Snap to Grid</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => handleDraw("Point")}>
                <Waypoints className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>Point</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => handleDraw("LineString")}>
                <PencilLine className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>Line</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => handleDraw("Circle")}>
                <CircleDot className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>Circle</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => handleDraw("Box")}>
                <Pentagon className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>Polygon</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Toolbar.ToggleGroup>

        <Toolbar.Separator className="h-4 w-[2px] bg-neutral-600" />

        <Toolbar.ToggleGroup type="single" className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MapPin className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>Pin</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Toolbar.ToggleGroup>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => print()}>
              <Printer className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent>Line</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => handleClipMode()}>
              <Scissors className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent>Line</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                const features = mapStudio?.getDrawFeatures();
                console.log({ features });
              }}
            >
              <Wrench className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent>Debug</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Toolbar.Root>
    </div>
  );
};
