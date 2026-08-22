<template>
	<USelectMenu
		v-model="selected"
		:items="items"
		value-key="value"
		class="w-32"
	/>
</template>

<script lang="ts" setup>
const { locale, setLocale, t } = useI18n();

const items = computed(() => [
	{ label: t("English"), value: "en" },
	{ label: t("Swahili"), value: "sw" },
]);

const selected = computed({
	get: () => locale.value,
	set: (value) => {
		if (value) setLocale(value as "en" | "sw");
	},
});
</script>

<style></style>
