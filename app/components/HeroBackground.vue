<template>
	<div
		class="hero-field"
		:class="{ 'hero-field-visible': visible }"
		aria-hidden="true"
	>
		<svg
			class="hero-field-links"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMaxYMid slice"
		>
			<line
				v-for="line in lines"
				:key="`${line.x1}-${line.y1}-${line.x2}-${line.y2}`"
				:x1="line.x1"
				:y1="line.y1"
				:x2="line.x2"
				:y2="line.y2"
			/>
			<circle
				v-for="(point, index) in fieldPoints"
				:key="`${point.x}-${point.y}`"
				:cx="point.x"
				:cy="point.y"
				:r="index === highlightedPointIndex ? 0.7 : 0.4"
			/>
		</svg>
	</div>
</template>

<script lang="ts" setup>
import {
	buildFieldLines,
	fieldEdges,
	fieldPoints,
	highlightedPointIndex,
	type FieldLine,
} from "@/data/vectorField";

/** Draws the dot grid and the connected dots behind the hero. */
defineProps<{
	visible: boolean;
}>();

const lines: FieldLine[] = buildFieldLines(fieldPoints, fieldEdges);
</script>
