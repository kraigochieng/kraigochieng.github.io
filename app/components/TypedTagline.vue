<template>
	<span>
		<!-- Screen readers get every phrase once instead of a constantly changing string. -->
		<span class="sr-only">{{ phrases.join(". ") }}</span>
		<span aria-hidden="true"
			>{{ shown }}<span v-if="animate" class="typed-caret"
		/></span>
	</span>
</template>

<script lang="ts" setup>
/**
 * Cycles through `phrases` with a typing and deleting animation. The first
 * phrase is rendered in full on the server, and users who prefer reduced
 * motion just see it without any animation.
 */
const props = defineProps<{
	phrases: string[];
}>();

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 2600;
const GAP_MS = 350;

const shown = ref(props.phrases[0] ?? "");
const animate = ref(false);

let timer: ReturnType<typeof setTimeout> | undefined;

const run = () => {
	clearTimeout(timer);
	const phrases = props.phrases;
	shown.value = phrases[0] ?? "";
	if (phrases.length < 2) return;

	let index = 0;

	const hold = () => {
		timer = setTimeout(erase, HOLD_MS);
	};

	const erase = () => {
		if (shown.value.length > 0) {
			shown.value = shown.value.slice(0, -1);
			timer = setTimeout(erase, DELETE_MS);
		} else {
			index = (index + 1) % phrases.length;
			timer = setTimeout(type, GAP_MS);
		}
	};

	const type = () => {
		const target = phrases[index] ?? "";
		if (shown.value.length < target.length) {
			shown.value = target.slice(0, shown.value.length + 1);
			timer = setTimeout(type, TYPE_MS);
		} else {
			hold();
		}
	};

	hold();
};

onMounted(() => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	if (reduceMotion) return;

	animate.value = true;
	run();

	// Restart when the phrases change, e.g. after switching language.
	watch(() => props.phrases.join("|"), run);
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<style scoped>
.typed-caret {
	display: inline-block;
	width: 2px;
	height: 0.85em;
	margin-left: 0.1em;
	vertical-align: baseline;
	background: currentColor;
	animation: blink 1s steps(1) infinite;
}

@keyframes blink {
	50% {
		opacity: 0;
	}
}
</style>
