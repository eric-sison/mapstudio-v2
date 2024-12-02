import { healthcheckHandler } from "@mapstudio/server/handlers/healthcheck";
import { mapProxyHandler } from "@mapstudio/server/handlers/mapProxy";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const app = new Hono().basePath("/api");

const routes = app.route("/v1/healthcheck", healthcheckHandler).route("/v1/map-proxy", mapProxyHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
