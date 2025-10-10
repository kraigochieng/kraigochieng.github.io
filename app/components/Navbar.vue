<template>
	 <UNavigationMenu :items="items" class="w-full justify-center" />
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
]);
</script>

<style></style>
