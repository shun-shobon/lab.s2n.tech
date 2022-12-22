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

  console.log(input);

  return {
    root: "src",
    plugins: [
      react(),
      createHtmlPlugin({
        minify: false,
      }),
    ],
    build: {
      outDir: "../dist",
      rollupOptions: {
        input,
      },
    },
  };
});
