import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
	site: "https://lab.s2n.tech/",
	build: {
		format: "file",
	},
	output: "hybrid",
	adapter: cloudflare({
		imageService: "compile",
	}),
	integrations: [compress()],
});
