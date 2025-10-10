<template>
	<ULocaleSelect
		v-model="locale"
		:locales="[locales.en]"
		class="w-32"
		@update:model-value="val => { if (val) setLocale(val as 'en') }"
	/>
</template>

<script lang="ts" setup>
import * as locales from "@nuxt/ui/locale";
import type { SelectItem } from "@nuxt/ui";

const { locale, setLocale } = useI18n();

const items = ref([
	{
		label: "System",
		value: "system",
		icon: "i-lucide-monitor",
	},
	{
		label: "Light",
		value: "light",
		icon: "i-lucide-sun",
	},
	{
		label: "Dark",
		value: "dark",
		icon: "i-lucide-moon",
	},
] satisfies SelectItem[]);
</script>

<style></style>
