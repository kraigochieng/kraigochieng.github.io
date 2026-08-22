<template>
	<UCard class="border-2 border-black dark:border-[#c0c0c0]">
		<template #header>
			<h3 class="text-lg font-semibold text-primary">
				{{ experience.role }}
			</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				{{ experience.company }} · {{ experience.employmentType }}
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
				{{ experience.start }} –
				{{ experience.end ?? t("present") }} · {{ experience.duration }}
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">
				{{ experience.location
				}}<template v-if="experience.workType">
					· {{ experience.workType }}</template
				>
			</p>
		</template>

		<ul
			class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4"
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
				size="lg"
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
