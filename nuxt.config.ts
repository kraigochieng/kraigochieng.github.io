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
	// The fonts are self-hosted (see main.css), so every font provider is off.
	// Nothing is downloaded at build time.
	fonts: {
		families: [
			{ name: "Inter", provider: "none" },
			{ name: "Bricolage Grotesque", provider: "none" },
			{ name: "JetBrains Mono", provider: "none" },
		],
		providers: {
			adobe: false,
			bunny: false,
			fontshare: false,
			fontsource: false,
			google: false,
			googleicons: false,
		},
	},
	i18n: {
		defaultLocale: "en",
		locales: [
			{ code: "en", name: "English", file: "en.json" },
		],
	},
	icon: {
		clientBundle: {
			// The scan skips plain TypeScript files by default. Icon names also
			// live in composables, so include them. Otherwise the page asks
			// api.iconify.design for those icons at run time.
			scan: {
				globInclude: ["app/**/*.{vue,ts}"],
			},
			// Icons that Nuxt UI draws inside its own components. The scan skips
			// node_modules, so name them here: the check mark in the filter menus.
			icons: ["lucide:check"],
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
