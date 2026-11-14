<template>
	<div
		ref="fieldElement"
		class="hero-field"
		:class="{ 'hero-field-visible': visible }"
		aria-hidden="true"
	>
		<div class="hero-field-glow" />
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

/** Where the mouse pointer is, in screen pixels. */
interface PointerPosition {
	x: number;
	y: number;
}

/**
 * Draws the dot grid and the connected dots behind the hero, and brightens
 * the grid near the mouse. Side effects: listens for pointer moves.
 */
const props = defineProps<{
	visible: boolean;
}>();

const lines: FieldLine[] = buildFieldLines(fieldPoints, fieldEdges);

const fieldElement = ref<HTMLElement | null>(null);
let latestPosition: PointerPosition | undefined;
let frameHandle = 0;

/** Writes the latest pointer position into the CSS variables. */
const applyPosition = (): void => {
	frameHandle = 0;
	const element: HTMLElement | null = fieldElement.value;
	if (!element || !latestPosition) return;
	element.style.setProperty("--pointer-x", `${latestPosition.x}px`);
	element.style.setProperty("--pointer-y", `${latestPosition.y}px`);
};

/** Records a mouse move, and schedules one write for the next frame. */
const onPointerMove = (event: PointerEvent): void => {
	if (!props.visible || event.pointerType !== "mouse") return;
	latestPosition = { x: event.clientX, y: event.clientY };
	if (!frameHandle) frameHandle = requestAnimationFrame(applyPosition);
};

onMounted(() => {
	window.addEventListener("pointermove", onPointerMove, { passive: true });
});

onBeforeUnmount(() => {
	window.removeEventListener("pointermove", onPointerMove);
	cancelAnimationFrame(frameHandle);
});
</script>
