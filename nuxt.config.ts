import tailwindcss from "@tailwindcss/vite";
import { buildLlmsTxt } from "./scripts/llms-txt";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: false },
	hooks: {
		// Regenerate public/llms.txt from the same data the page renders,
		// right before Nitro copies the public/ dir into the build output.
		"build:before": () => {
			const outPath = fileURLToPath(
				new URL("./public/llms.txt", import.meta.url)
			);
			writeFileSync(outPath, buildLlmsTxt());
		},
	},
	// Code
	app: {
		pageTransition: { name: "page", mode: "out-in", appear: true },
		// layoutTransition: {
		// 	name: "slide",
		// 	mode: "out-in", // default
		// },
	},
	css: ["~/assets/css/main.css"],
	modules: ["@nuxt/image", "@nuxtjs/i18n", "@nuxt/ui"],
	// Modules
	colorMode: {
		preference: "system",
		fallback: "light",
	},
	fonts: {
		families: [{ name: "Inter", provider: "google" }],
	},
	i18n: {
		defaultLocale: "en",
		locales: [
			{ code: "en", name: "English", file: "en.json" },
			{ code: "sw", name: "Swahili", file: "sw.json" },
		],
	},
	icon: {
		clientBundle: {
			scan: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	// Dev Server
	devServer: {
		host: "0.0.0.0",
	},
});
