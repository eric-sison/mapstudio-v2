import type Layer from "ol/layer/Layer";

export type LayerEntry = {
  id: string;
  layer: Layer;
};

export type DrawType = "Point" | "LineString" | "Polygon" | "Circle" | "FreehandLine" | "FreehandPolygon";

export type MapFile = {
  filename: string;
  format: "jpg" | "png";
};
