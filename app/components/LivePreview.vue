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
		<div v-else style="overflow: hidden; width: 100%; height: 220px">
			<ULink :to="props.url" target="_blank">
				<iframe
					:src="props.url"
					width="100%"
					height="440"
					style="
						border: 0;
						pointer-events: none;
						width: 200%;
						height: 440px;
						display: block;
						transform: scale(0.5);
						transform-origin: top left;
						overflow: hidden;
					"
					scrolling="no"
					:title="props.title ?? 'Live Preview'"
					loading="lazy"
				>
				</iframe>
			</ULink>
		</div>
	</div>
</template>

<script lang="ts" setup>
/**
 * Props
 * -------------------------------------------------
 * url      – the site you want to preview (required)
 * title    – alt-text / aria-label for the iframe
 * height   – height of the preview box (default 260px)
 * loading  – "lazy" | "eager" (default lazy)
 * blocked  – skip the iframe and show a fallback message instead
 */
const props = defineProps<{
	url: string;
	title?: string;
	height?: string;
	loading?: "lazy" | "eager";
	blocked?: boolean;
}>();

const { t } = useI18n();
</script>