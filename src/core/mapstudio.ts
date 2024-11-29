import { Map } from "ol";
import { fromLonLat } from "ol/proj";
import { Extent } from "ol/extent";
import { platformModifierKeyOnly } from "ol/events/condition";
import { LayerManager } from "./layerManager";
import { DrawingTools } from "./drawingTools";
import { MapExport } from "./mapExport";
import type { DrawType, MapFile } from "./types/map";
import type { MapOptions } from "ol/Map";
import DragBox from "ol/interaction/DragBox";
import Layer from "ol/layer/Layer";

export class MapStudio {
  private map: Map;
  private layerManger: LayerManager;
  private drawingTools: DrawingTools;
  private mapExport: MapExport;
  private clipInteraction?: DragBox;

  constructor(options: MapOptions) {
    this.map = new Map(options);
    this.layerManger = new LayerManager(this.map);
    this.drawingTools = new DrawingTools(this.map);
    this.mapExport = new MapExport(this.map);
  }

  getMap(): Map {
    return this.map;
  }

  startClipMode(onClipEnd?: (imageData: string) => void) {
    // Remove existing clip interaction if any
    this.stopClipMode();

    // Create new drag box interaction
    this.clipInteraction = new DragBox({
      condition: platformModifierKeyOnly,
    });

    // Handle the clip end
    this.clipInteraction.on("boxend", () => {
      if (!this.clipInteraction) return;

      // Get the pixel coordinates of the box
      const extent = this.clipInteraction.getGeometry().getExtent();
      const topLeft = this.map.getPixelFromCoordinate([extent[0], extent[3]]);
      const bottomRight = this.map.getPixelFromCoordinate([extent[2], extent[1]]);

      if (!topLeft || !bottomRight) return;

      // Get the map canvas
      const mapCanvas = this.map.getViewport().querySelector("canvas");
      if (!mapCanvas) return;

      // Create a temporary canvas for the clipped area
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate clip dimensions
      const width = Math.abs(bottomRight[0] - topLeft[0]);
      const height = Math.abs(bottomRight[1] - topLeft[1]);

      // Set canvas size
      canvas.width = width;
      canvas.height = height;

      // Draw the clipped portion
      ctx.drawImage(
        mapCanvas,
        Math.min(topLeft[0], bottomRight[0]),
        Math.min(topLeft[1], bottomRight[1]),
        width,
        height,
        0,
        0,
        width,
        height,
      );

      // Convert to data URL and trigger callback
      const imageData = canvas.toDataURL("image/png");
      if (onClipEnd) {
        onClipEnd(imageData);
      }
    });

    this.map.addInteraction(this.clipInteraction);
  }

  stopClipMode(): void {
    if (this.clipInteraction) {
      this.map.removeInteraction(this.clipInteraction);
      this.clipInteraction = undefined;
    }
  }

  setCenter(lon: number, lat: number) {
    const center = fromLonLat([lon, lat]);
    this.map.getView().setCenter(center);
  }

  setZoom(level: number): void {
    this.map.getView().setZoom(level);
  }

  fitToExtent(extent: Extent, options?: { padding?: number[]; duration?: number }): void {
    this.map.getView().fit(extent, options);
  }

  destroy(): void {
    this.map.setTarget(undefined);
    this.removeAllLayers();
  }

  // Delegated methods from LayerManager
  addLayer = (id: string, layer: Layer) => this.layerManger.add(id, layer);
  removeLayer = (id: string) => this.layerManger.remove(id);
  removeAllLayers = () => this.layerManger.removeAll();
  getLayer = (id: string) => this.layerManger.get(id);
  getAllLayerIds = () => this.layerManger.getAllIds();
  getVisibleLayers = () => this.layerManger.getVisible();
  setLayerOpacity = (id: string, opacity: number) => this.layerManger.setOpacity(id, opacity);
  toggleLayer = (id: string) => this.layerManger.toggle(id);

  // Delegated methods from DrawingTools
  startDrawing = (type: DrawType) => this.drawingTools.start(type);
  stopDrawing = () => this.drawingTools.stop();
  clearDrawings = () => this.drawingTools.clear();
  removeDrawingLayer = () => this.drawingTools.removeLayer();
  getDrawFeatures = () => this.drawingTools.getFeatures();

  // Delegated methods from MapExport
  captureMap = () => this.mapExport.capture();
  downloadMap = (file: MapFile, data: string | undefined) => this.mapExport.download(file, data);
}
