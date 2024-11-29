import { Map } from "ol";
import { Draw, Modify, Snap } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { DrawType } from "./types/map";

export class DrawingTools {
  private map: Map;
  private drawLayer?: VectorLayer<VectorSource>;
  private drawInteraction?: Draw;
  private modifyInteraction?: Modify;
  private snapInteraction?: Snap;

  constructor(map: Map) {
    this.map = map;
  }

  start(type: DrawType) {
    this.initDrawLayer();
    this.stop();

    const drawOptions = this.getDrawOptions(type);

    this.drawInteraction = new Draw({
      source: this.drawLayer!.getSource()!,
      ...drawOptions,
    });

    this.map.addInteraction(this.drawInteraction);
  }

  stop() {
    if (this.drawInteraction) {
      this.map.removeInteraction(this.drawInteraction);
      this.drawInteraction = undefined;
    }
  }

  clear() {
    if (this.drawLayer) {
      this.drawLayer.getSource()?.clear();
    }
  }

  removeLayer() {
    this.stop();
    this.removeInteractions();
    if (this.drawLayer) {
      this.map.removeLayer(this.drawLayer);
      this.drawLayer = undefined;
    }
  }

  getFeatures() {
    return this.drawLayer?.getSource()?.getFeatures() || [];
  }

  private getDrawOptions(type: DrawType) {
    switch (type) {
      case "FreehandLine":
        return { type: "LineString" as const, freehand: true };
      case "FreehandPolygon":
        return { type: "Polygon" as const, freehand: true };
      default:
        return { type };
    }
  }

  private initDrawLayer() {
    if (!this.drawLayer) {
      const source = new VectorSource();
      this.drawLayer = this.createVectorLayer(source);
      this.map.addLayer(this.drawLayer);
      this.initInteractions(source);
    }
  }

  private createVectorLayer(source: VectorSource) {
    return new VectorLayer({
      source,
      style: new Style({
        fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
        stroke: new Stroke({ color: "#ffcc33", width: 2 }),
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: "#ffcc33" }),
        }),
      }),
    });
  }

  private initInteractions(source: VectorSource) {
    this.modifyInteraction = new Modify({ source });
    this.snapInteraction = new Snap({ source });
    this.map.addInteraction(this.modifyInteraction);
    this.map.addInteraction(this.snapInteraction);
  }

  private removeInteractions() {
    if (this.modifyInteraction) {
      this.map.removeInteraction(this.modifyInteraction);
      this.modifyInteraction = undefined;
    }
    if (this.snapInteraction) {
      this.map.removeInteraction(this.snapInteraction);
      this.snapInteraction = undefined;
    }
  }
}
