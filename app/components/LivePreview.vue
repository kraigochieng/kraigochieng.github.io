<template>
	<div
		v-if="props.url"
		class="mb-4 rounded overflow-hidden border border-gray-200 dark:border-gray-700"
	>
		<div style="overflow: hidden; width: 100%; height: 220px">
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
 */
const props = defineProps<{
	url: string;
	title?: string;
	height?: string;
	loading?: "lazy" | "eager";
}>();
</script>