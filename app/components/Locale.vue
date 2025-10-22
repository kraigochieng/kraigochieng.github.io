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

const { locale, setLocale } = useI18n();
</script>

<style></style>
