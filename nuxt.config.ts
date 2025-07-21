// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				compatibilityDate: "2025-05-15",
				devtools: { enabled: false },
				modules: [
				 "@nuxtjs/tailwindcss",
				 "@nuxtjs/google-fonts",
				 "@nuxtjs/color-mode",
				 "@nuxt/image",
				],
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
				devServer: {
								host: "0.0.0.0",
				},
});