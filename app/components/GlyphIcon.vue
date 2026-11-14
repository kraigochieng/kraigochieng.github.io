<template>
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.75"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path v-for="path in glyphPaths[props.name]" :key="path" :d="path" />
	</svg>
</template>

<script lang="ts" setup>
import { glyphPaths, type GlyphName } from "@/data/glyphs";

/** Draws one hand-drawn section glyph in the current text color. */
const props = defineProps<{
	name: GlyphName;
}>();
</script>
