import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import fg from "fast-glob";

export default defineConfig(async () => {
  const html = await fg("src/**/*.html");
  const input = Object.fromEntries(
    html.map((path) => [
      path.replace(/^src\//, "").replace(/\.html$/, ""),
      path,
    ]),
  );

  return {
    root: "src",
    base: process.env["BASE_PATH"] ?? "/",
    plugins: [
      react(),
      createHtmlPlugin({
        minify: false,
      }),
    ],
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      target: "esnext",
      rollupOptions: {
        input,
      },
    },
  };
});
