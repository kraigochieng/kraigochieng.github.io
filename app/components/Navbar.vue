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

const { t } = useI18n();
const localePath = useLocalePath();

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: t("nav_home"),
		to: localePath("/"),
	},
	{
		label: t("projects"),
		to: `${localePath("/")}#projects`,
	},
	{
		label: t("work_experience"),
		to: `${localePath("/")}#experience`,
	},
	{
		label: t("nav_certifications"),
		to: `${localePath("/")}#certifications`,
	},
]);
</script>

<style></style>
