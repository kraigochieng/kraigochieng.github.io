// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: false },
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxtjs/google-fonts",
		"@nuxtjs/color-mode",
		"@nuxt/image",
		"@nuxtjs/i18n",
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
		locales: [{ code: "en", name: "English", file: "en.json" }, { code: "sw", name: "Swahili", file: "sw.json" }],
	},
	// Dev Server
	devServer: {
		host: "0.0.0.0",
	},
});
