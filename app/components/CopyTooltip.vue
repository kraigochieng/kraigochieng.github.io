<template>
	<UTooltip :open="isOpen" :text="message" @update:open="onOpenChange">
		<slot :copy="copy" />
	</UTooltip>
	<span class="sr-only" role="status" aria-live="polite">
		{{ status === "idle" ? "" : message }}
	</span>
</template>

<script lang="ts" setup>
/** How long the "copied" message stays on screen, in milliseconds. */
const MESSAGE_DURATION_MS = 2000;

type CopyStatus = "idle" | "copied" | "failed";

/**
 * Wraps a trigger element in a tooltip. The slot receives a `copy` function
 * that writes the text to the clipboard and shows the result. Side effects:
 * writes to the clipboard and sets a timer.
 */
const props = defineProps<{
	text: string;
	name: string;
}>();

const { t } = useI18n();

const status = ref<CopyStatus>("idle");
const hovering = ref<boolean>(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const isOpen = computed<boolean>(
	() => hovering.value || status.value !== "idle",
);

const message = computed<string>(() => {
	if (status.value === "copied")
		return t("copied_to_clipboard", { name: props.name });
	if (status.value === "failed") return t("copy_failed", { name: props.name });
	return t("click_to_copy", { name: props.name });
});

/** Follows the hover and focus state that the tooltip reports. */
const onOpenChange = (open: boolean): void => {
	hovering.value = open;
};

/** Copies the text, then shows the result for a short time. */
const copy = async (): Promise<void> => {
	try {
		await navigator.clipboard.writeText(props.text);
		status.value = "copied";
	} catch {
		// The clipboard can be blocked; tell the visitor instead of failing silently.
		status.value = "failed";
	}
	clearTimeout(resetTimer);
	resetTimer = setTimeout(() => {
		status.value = "idle";
	}, MESSAGE_DURATION_MS);
};

onBeforeUnmount(() => {
	clearTimeout(resetTimer);
});
</script>
