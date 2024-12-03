import { Hono } from "hono";

export const mapProxyHandler = new Hono().get("/:z/:x/:y", async (c) => {
  const z = c.req.param("z");
  const x = c.req.param("x");
  const y = c.req.param("y");

  const response = await fetch(`https://tileserver.memomaps.de/tilegen/${z}/${x}/${y}.png`);

  const buffer = await response.arrayBuffer();

  return c.newResponse(Buffer.from(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
