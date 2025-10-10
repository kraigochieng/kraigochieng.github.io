import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: false },
	css: ["~/assets/css/main.css"],
	modules: [
		"@nuxtjs/google-fonts",
		"@nuxtjs/color-mode",
		"@nuxt/image",
		"@nuxtjs/i18n",
		"@nuxt/ui",
	],
	// Modules
	googleFonts: {
		families: {
			Inter: true,
			"Fira Code": true,
		},
	},
	colorMode: {
		preference: "system",
		fallback: "light",
	},
	i18n: {
		defaultLocale: "en",
		locales: [
			{ code: "en", name: "English", file: "en.json" },
			{ code: "sw", name: "Swahili", file: "sw.json" },
		],
	},
	vite: {
		plugins: [tailwindcss()],
	},
	// Dev Server
	devServer: {
		host: "0.0.0.0",
	},
});
