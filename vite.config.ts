import react from "@vitejs/plugin-react";
import fg from "fast-glob";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(async () => {
  const html = await fg("src/**/*.html");
  const input = Object.fromEntries(
    html.map((path) => [
      path.replace(/^src\//u, "").replace(/\.html$/u, ""),
      path,
    ])
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
