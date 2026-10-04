<template>
	<article class="grid gap-3 py-8 md:grid-cols-[11rem_1fr] md:gap-10">
		<div class="text-xs text-neutral-500 dark:text-neutral-400">
			<p>
				{{ experience.start }} –
				{{ experience.end ?? t("present") }}
			</p>
			<p>{{ experience.duration }}</p>
			<p class="mt-1">
				{{ experience.location
				}}<template v-if="experience.workType">
					· {{ experience.workType }}</template
				>
			</p>
		</div>

		<div>
			<h3 class="text-xl font-semibold tracking-tight text-primary py-0">
				{{ experience.role }}
			</h3>
			<p
				class="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300"
			>
				{{ experience.company }} · {{ experience.employmentType }}
			</p>

			<ul
				class="mt-4 max-w-prose list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-neutral-700 marker:text-neutral-400 dark:text-neutral-300"
			>
				<li v-for="(point, i) in experience.achievements" :key="i">
					{{ point }}
				</li>
			</ul>

			<div
				v-if="experience.links?.length"
				class="mt-4 flex flex-wrap gap-3 text-sm"
			>
				<a
					v-for="link in experience.links"
					:key="link.href"
					:href="link.href"
					target="_blank"
					>{{ link.label }}</a
				>
			</div>

			<div
				v-if="experience.skills.length"
				class="mt-4 flex flex-wrap gap-1.5"
			>
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
		</div>
	</article>
</template>

<script lang="ts" setup>
import type { Experience } from "@/types";

defineProps<{
	experience: Experience;
}>();

const { t } = useI18n();
</script>

<style></style>
