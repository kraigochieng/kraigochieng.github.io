<template>
	<div class="page-margin">
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
// Favicon that adjusts to color scheme
useHead({
	link: [
		{
			rel: "icon",
			type: "image/svg+xml",
			href: "/favicon-light-mode.svg",
			media: "(prefers-color-scheme: light)",
		},
		{
			rel: "icon",
			type: "image/svg+xml",
			href: "/favicon-dark-mode.svg",
			media: "(prefers-color-scheme: dark)",
		},
	],
});
</script>

<style>
@reference "tailwindcss";

* {
	font-family: "Inter";
}

.page-margin {
	@apply mx-4 md:mx-16 lg:mx-64;
}
</style>
