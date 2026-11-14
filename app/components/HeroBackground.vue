<template>
	<div
		ref="fieldElement"
		class="hero-field"
		:class="{ 'hero-field-visible': visible }"
		aria-hidden="true"
	>
		<div class="hero-field-letters" />
		<div class="hero-field-glow" />
	</div>
</template>

<script lang="ts" setup>
/** Where the mouse pointer is, in screen pixels. */
interface PointerPosition {
	x: number;
	y: number;
}

/**
 * Draws the KO letters behind the hero and brightens them near the mouse.
 * Side effects: listens for pointer moves.
 */
const props = defineProps<{
	visible: boolean;
}>();

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
