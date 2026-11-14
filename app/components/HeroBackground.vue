<template>
	<div
		class="hero-field"
		:class="{ 'hero-field-visible': visible }"
		aria-hidden="true"
	/>
</template>

<script lang="ts" setup>
/** Draws the dot grid behind the hero and fades it with the visible prop. */
defineProps<{
	visible: boolean;
}>();
</script>
