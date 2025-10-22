<template>
	<UNavigationMenu
		:items="items"
		class="justify-center"
		color="neutral"
		variant="link"
	/>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
	{
		label: "Home",
		to: "/",
	},
	{
		label: "Projects",
		to: "/projects",
	},
	{
		label: "Blogs",
		to: "/blogs",
	},
]);
</script>

<style></style>
