import { Map } from "ol";
import { MapFile } from "./types/map";

export class MapExport {
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  public capture() {
    const canvas = this.getMapCanvas();
    return canvas?.toDataURL("image/png");
  }

  public download(mapFile: MapFile, imageData: string | undefined) {
    const canvas = this.getMapCanvas();
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL(imageData);
    link.download = `${mapFile.filename}.${mapFile.format}`;
    link.click();
  }

  private getMapCanvas() {
    return this.map.getViewport().querySelector("canvas");
  }
}
