<template>
	<div>
		<UNavigationMenu
			:items="items"
			class="justify-center"
			color="neutral"
			variant="link"
		/>
	</div>
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
