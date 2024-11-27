import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/providers/db/schema/*",
  out: "./src/providers/db/migrations",
  dbCredentials: {
    url: "",
  },
  verbose: true,
  strict: true,
});
