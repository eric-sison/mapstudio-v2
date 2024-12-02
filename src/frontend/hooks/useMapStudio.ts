"use client";

import { MapStudio } from "@mapstudio/core/mapstudio";
import { defaults as defaultInteractions } from "ol/interaction";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { XYZ } from "ol/source";

export const useMapStudio = () => {
  const [mapManager, setMapManager] = useState<MapStudio>();

  const mapRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    if (!mapRef.current) return;

    const mapStudio = new MapStudio({
      target: mapRef.current,

      controls: [],

      layers: [
        new TileLayer({
          source: new OSM({ crossOrigin: "anonymous" }),
          // source: new XYZ({
          //   url: "http://localhost:3000/api/v1/map-proxy/memomaps/{z}/{x}/{y}.png",
          //   crossOrigin: "anonymous",
          // }),
        }),
      ],

      view: new View({
        center: [0, 0],
        zoom: 2,
      }),

      interactions: defaultInteractions({
        doubleClickZoom: true,
        dragPan: true,
        mouseWheelZoom: true,
      }),
    });

    // Force render the map
    mapStudio.getMap().renderSync();

    setMapManager(mapStudio);

    // Cleanup function
    return () => {
      mapStudio.destroy();
      mapRef.current = null;
      setMapManager(undefined);
    };
  }, []);

  return { mapStudio: mapManager, mapRef };
};
