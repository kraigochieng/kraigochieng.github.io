<template>
	<div>
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
* {
	font-family: 'Inter';
}
</style>
