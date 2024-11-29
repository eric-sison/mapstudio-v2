import { Map } from "ol";
import Layer from "ol/layer/Layer";
import { LayerEntry } from "./types/map";

export class LayerManager {
  private layers: LayerEntry[] = [];
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  add(id: string, layer: Layer) {
    this.layers.push({ id, layer });
    this.map.addLayer(layer);
  }

  remove(id: string) {
    const index = this.layers.findIndex((entry) => entry.id === id);
    if (index !== -1) {
      this.map.removeLayer(this.layers[index].layer);
      this.layers.splice(index, 1);
    }
  }

  removeAll() {
    this.layers = [];
  }

  get(id: string) {
    return this.layers.find((entry) => entry.id === id)?.layer;
  }

  getAllIds() {
    return this.layers.map((entry) => entry.id);
  }

  getVisible() {
    return this.layers.filter((entry) => entry.layer.getVisible()).map((entry) => entry.id);
  }

  setOpacity(id: string, opacity: number) {
    const layer = this.get(id);
    if (layer) {
      layer.setOpacity(Math.max(0, Math.min(1, opacity)));
    }
  }

  toggle(id: string) {
    const layer = this.get(id);
    if (layer) {
      layer.setVisible(!layer.getVisible());
    }
  }
}
