<template>
	<div
		v-if="props.url"
		class="mb-4 rounded overflow-hidden border-2 border-black dark:border-[#c0c0c0]"
	>
		<div
			v-if="props.blocked"
			class="flex flex-col items-center justify-center gap-2 text-center px-4"
			style="height: 220px"
		>
			<UIcon name="i-lucide-eye-off" class="size-6 text-gray-400" />
			<p class="text-sm text-gray-500 dark:text-gray-400">
				{{ t("live_preview_unavailable") }}
			</p>
			<a
				:href="props.url"
				target="_blank"
				class="text-sm underline text-primary"
				>{{ t("live_demo_aria") }}</a
			>
		</div>
		<a
			v-else
			:href="props.url"
			target="_blank"
			class="block"
			style="height: 220px"
		>
			<img
				:src="props.image || screenshotUrl"
				:alt="props.title ?? 'Live preview'"
				loading="lazy"
				class="w-full h-full object-cover object-top"
			/>
		</a>
	</div>
</template>

<script lang="ts" setup>
/**
 * Props
 * -------------------------------------------------
 * url      – the site you want to preview (required)
 * title    – alt text for the screenshot
 * blocked  – skip the screenshot and show a fallback message instead
 * image    – a manually-captured screenshot path, preferred over the live
 *            Microlink screenshot when set (avoids "site is asleep" shots)
 */
const props = defineProps<{
	url: string;
	title?: string;
	blocked?: boolean;
	image?: string;
}>();

const { t } = useI18n();

// Fallback screenshot service instead of an <iframe>, so we're never at the
// mercy of a site's X-Frame-Options/CSP framing policy - just a plain image.
const screenshotUrl = computed(
	() =>
		`https://api.microlink.io/?url=${encodeURIComponent(
			props.url
		)}&screenshot=true&meta=false&embed=screenshot.url`
);
</script>
