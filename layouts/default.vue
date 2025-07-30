<template>
	<NuxtLink to="/">Home</NuxtLink>
	<button v-for="locale in locales" @click="setLocale(locale.code)">
		{{ $t(`${locale.name}`) }}
	</button>
	<select v-model="$colorMode.preference">
		<option value="system">System</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
	<slot />
</template>

<script setup lang="ts">
const { locales, setLocale } = useI18n();
</script>
