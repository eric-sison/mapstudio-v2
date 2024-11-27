"use client";

import { MapStudio } from "@mapstudio/core/mapstudio";
import { View } from "ol";
import { OSM } from "ol/source";
import { type PropsWithChildren, type FunctionComponent, useEffect } from "react";
import TileLayer from "ol/layer/Tile";

export const WebMap: FunctionComponent<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const mapStudio = new MapStudio({
      target: "map",
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      mapStudio.destroy();
    };
  }, []);

  return (
    <div id="map" tabIndex={0}>
      {children}
    </div>
  );
};
