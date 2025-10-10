<template>
	<div class="flex justify-between items-center glass-bg">
		<UTooltip text="Kraig Ochieng Portfolio">
			<p
				@mouseup="router.push('/')"
				class="italic text-5xl cursor-pointer"
			>
				k
			</p>
		</UTooltip>

		<Navbar />
		<div class="flex space-x-2">
			<ULocaleSelect
				v-model="locale"
				:locales="[locales.en]"
				class="w-32"
				@update:model-value="val => { if (val) setLocale(val as 'en') }"
			/>

			<UButton
				:icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
				color="neutral"
				variant="ghost"
				:aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
				@click="isDark = !isDark"
			/>
		</div>
	</div>

	<slot />
</template>

<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";
import type { SelectItem } from "@nuxt/ui";
const router = useRouter();
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

const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === "dark";
	},
	set(_isDark) {
		colorMode.preference = _isDark ? "dark" : "light";
	},
});
</script>

<style scoped>
@reference "assets/css/main.css";

.glass-bg {
	@apply backdrop-filter backdrop-blur-xs;
}
</style>
