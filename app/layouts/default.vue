<template>
	<div class="flex justify-around glass-bg">
		<NuxtLink to="/">Home</NuxtLink>
		<ULocaleSelect
			v-model="locale"
			:locales="Object.values(locales)"
			class="w-48"
		/>
		<USelect
			v-model="value"
			:items="items"
			value-key="value"
			:icon="icon"
			class="w-40"
		/>
	</div>

	<slot />
</template>

<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";
import type { SelectItem } from "@nuxt/ui";

const locale = ref("en");

const colorMode = useColorMode();

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

const value = computed({
	get: () => colorMode.preference,
	set: (v) => (colorMode.preference = v),
});

const icon = computed(
	() => items.value.find((item) => item.value === value.value)?.icon
);
</script>

<style scoped>
@reference "assets/css/main.css";

.glass-bg {
	@apply backdrop-filter backdrop-blur-xs;
}
</style>
