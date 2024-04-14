import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	compressHTML: true,
	site: "https://lab.s2n.tech/",
	build: {
		format: "file",
	},
	output: "hybrid",
	adapter: cloudflare({
		imageService: "compile",
	}),
});
