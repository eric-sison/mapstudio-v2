"use client";

import { type PropsWithChildren, type FunctionComponent } from "react";
import { useMapStudio } from "@mapstudio/frontend/hooks/useMapStudio";
import { MapToolbar } from "./MapToolbar";

export const WebMap: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { mapRef, mapStudio } = useMapStudio();

  return (
    <div className="relative h-full w-full">
      <MapToolbar mapStudio={mapStudio} />

      <div ref={mapRef} className="absolute bottom-0 top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};
