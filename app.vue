<template>
	<div class="page-padding">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
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

:root {
	--bg-dark: #171717;
	--text-dark: #dedfe0;
}

.dark-mode body {
	@apply bg-[var(--bg-dark)] text-[var(--text-dark)];
}

.page-padding {
	@apply px-4 md:px-16 lg:px-64;
}
</style>
