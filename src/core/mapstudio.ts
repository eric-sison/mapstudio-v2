import { Map } from "ol";
import { fromLonLat } from "ol/proj";
import { Extent } from "ol/extent";
import type { LayerEntry } from "./types/layers";
import type { MapOptions } from "ol/Map";
import Layer from "ol/layer/Layer";

export class MapStudio {
  private map: Map;
  private layers: LayerEntry[] = [];

  constructor(options: MapOptions) {
    this.map = new Map(options);
  }

  getMap(): Map {
    return this.map;
  }

  public setCenter(lon: number, lat: number) {
    const center = fromLonLat([lon, lat]);
    this.map.getView().setCenter(center);
  }

  public setZoom(level: number): void {
    this.map.getView().setZoom(level);
  }

  public fitToExtent(extent: Extent, options?: { padding?: number[]; duration?: number }): void {
    this.map.getView().fit(extent, options);
  }

  addLayer(id: string, layer: Layer) {
    this.layers.push({ id, layer });
    this.map.addLayer(layer);
  }

  removeLayer(id: string): void {
    const index = this.layers.findIndex((entry) => entry.id === id);

    if (index !== -1) {
      this.map.removeLayer(this.layers[index].layer);
      this.layers.splice(index, 1);
    }
  }

  getLayer(id: string): Layer | undefined {
    return this.layers.find((entry) => entry.id === id)?.layer;
  }

  getAllLayerIds(): string[] {
    return this.layers.map((entry) => entry.id);
  }

  getVisibleLayers(): string[] {
    return this.layers.filter((entry) => entry.layer.getVisible()).map((entry) => entry.id);
  }

  setLayerOpacity(id: string, opacity: number): void {
    const layer = this.getLayer(id);

    if (layer) {
      layer.setOpacity(Math.max(0, Math.min(1, opacity)));
    }
  }

  toggleLayer(id: string): void {
    const layer = this.getLayer(id);
    if (layer) {
      layer.setVisible(!layer.getVisible());
    }
  }

  destroy(): void {
    this.map.setTarget(undefined);
    this.layers = [];
  }
}
