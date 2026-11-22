<template>
	<figure class="mb-10 hidden md:block" :aria-label="t('experience_timeline')">
		<div
			class="relative"
			:style="{ height: `${props.layout.laneCount * laneStepPx}px` }"
		>
			<div
				v-for="zone in props.layout.overlapZones"
				:key="zone.leftPercent"
				aria-hidden="true"
				class="absolute inset-y-0 bg-neutral-900/5 dark:bg-white/5"
				:style="{
					left: `${zone.leftPercent}%`,
					width: `${zone.widthPercent}%`,
				}"
			/>

			<div
				v-for="lane in props.layout.laneCount"
				:key="lane"
				aria-hidden="true"
				class="absolute inset-x-0 border-t border-dashed border-neutral-300 dark:border-neutral-700"
				:style="{ top: `${(lane - 1) * laneStepPx + laneHeightPx / 2}px` }"
			/>

			<button
				v-for="bar in props.layout.bars"
				:key="bar.key"
				type="button"
				class="gantt-bar absolute flex items-center overflow-hidden whitespace-nowrap bg-neutral-900 px-2 text-left font-mono text-[10px] uppercase tracking-widest text-neutral-50 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-neutral-100 dark:text-neutral-950 dark:focus-visible:outline-neutral-100"
				:class="bar.isOpenEnd ? 'gantt-bar-open' : 'gantt-bar-closed'"
				:style="{
					top: `${bar.lane * laneStepPx}px`,
					height: `${laneHeightPx}px`,
					left: `${bar.leftPercent}%`,
					width: `${bar.widthPercent}%`,
				}"
				:title="barLabel(bar)"
				:aria-label="barLabel(bar)"
				@click="emit('select', bar.key)"
			>
				<span class="truncate">{{ bar.company }}</span>
			</button>
		</div>

		<div
			aria-hidden="true"
			class="relative mt-2 h-6 border-t-[1.75px] border-neutral-900 dark:border-neutral-100"
		>
			<span
				v-for="tick in props.layout.yearTicks"
				:key="tick.year"
				class="absolute top-0 h-2 border-l-[1.75px] border-neutral-900 pl-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:border-neutral-100 dark:text-neutral-400"
				:style="{ left: `${tick.leftPercent}%` }"
			>
				{{ tick.year }}
			</span>
		</div>
	</figure>
</template>

<script lang="ts" setup>
import type { GanttBar, GanttLayout } from "@/utils/layoutGantt";

/** Draws the experience timeline as lane bars; emits the key of a clicked bar. */
const props = defineProps<{
	layout: GanttLayout;
}>();

const emit = defineEmits<{
	select: [key: string];
}>();

const { t } = useI18n();

const laneHeightPx: number = 28;
const laneStepPx: number = 36;

/** Builds the full text of one bar for the tooltip and the screen reader. */
const barLabel = (bar: GanttBar): string =>
	`${bar.role}, ${bar.company}, ${bar.startText} – ${bar.endText ?? t("present")}`;
</script>

<style scoped>
/* Chamfered corners cut the bar like a tablet. An open end ends in a point. */
.gantt-bar-closed {
	clip-path: polygon(
		5px 0,
		100% 0,
		100% calc(100% - 5px),
		calc(100% - 5px) 100%,
		0 100%,
		0 5px
	);
}

.gantt-bar-open {
	clip-path: polygon(
		5px 0,
		calc(100% - 12px) 0,
		100% 50%,
		calc(100% - 12px) 100%,
		0 100%,
		0 5px
	);
}
</style>
