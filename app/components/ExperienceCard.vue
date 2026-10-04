<template>
	<UCard class="border border-neutral-300 dark:border-neutral-700 transition-colors hover:border-neutral-900 dark:hover:border-neutral-300">
		<template #header>
			<h3 class="text-xl font-bold tracking-tight text-primary py-0">
				{{ experience.role }}
			</h3>
			<p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
				{{ experience.company }} · {{ experience.employmentType }}
			</p>
			<p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
				{{ experience.start }} –
				{{ experience.end ?? t("present") }} · {{ experience.duration }}
			</p>
			<p class="text-xs text-neutral-500 dark:text-neutral-400">
				{{ experience.location
				}}<template v-if="experience.workType">
					· {{ experience.workType }}</template
				>
			</p>
		</template>

		<ul
			class="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-300 mb-4"
		>
			<li v-for="(point, i) in experience.achievements" :key="i">
				{{ point }}
			</li>
		</ul>

		<div
			v-if="experience.links?.length"
			class="flex flex-wrap gap-3 mb-4 text-sm"
		>
			<a
				v-for="link in experience.links"
				:key="link.href"
				:href="link.href"
				target="_blank"
				>{{ link.label }}</a
			>
		</div>

		<div v-if="experience.skills.length" class="flex flex-wrap gap-1.5">
			<UBadge
				v-for="skill in experience.skills"
				:key="skill"
				color="neutral"
				variant="outline"
				size="md"
			>
				{{ skill }}
			</UBadge>
		</div>
	</UCard>
</template>

<script lang="ts" setup>
import type { Experience } from "@/types";

defineProps<{
	experience: Experience;
}>();

const { t } = useI18n();
</script>

<style></style>
