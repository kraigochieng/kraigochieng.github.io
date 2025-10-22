import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: false },
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
			// { code: "sw", name: "Swahili", file: "sw.json" },
		],
	},
	icon: { serverBundle: "remote" },
	vite: {
		plugins: [tailwindcss()],
	},
	// Dev Server
	devServer: {
		host: "0.0.0.0",
	},
});
