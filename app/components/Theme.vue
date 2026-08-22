<template>
	<UButton
		:icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
		color="neutral"
		variant="ghost"
		class="text-gray-800 dark:text-gray-200"
		:aria-label="isDark ? t('theme_switch_to_light') : t('theme_switch_to_dark')"
		@click="isDark = !isDark"
	/>
</template>

<script lang="ts" setup>
const { t } = useI18n();
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

<style></style>
