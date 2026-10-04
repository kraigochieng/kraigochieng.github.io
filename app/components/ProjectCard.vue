<template>
	<UCard
		class="flex flex-col h-full border border-neutral-300 dark:border-neutral-700 transition-colors hover:border-neutral-900 dark:hover:border-neutral-300"
	>
		<template #header>
			<div class="flex items-start justify-between gap-4">
				<div>
					<h3 class="text-xl font-bold tracking-tight text-primary py-0">
						{{ project.name }}
					</h3>
					<p
						class="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1"
					>
						{{ project.domain.join(" • ") }}
					</p>
				</div>

				<div class="flex gap-2">
					<UButton
						v-if="project.link"
						color="primary"
						size="lg"
						icon="i-lucide-globe"
						variant="ghost"
						:to="project.link"
						target="_blank"
						:aria-label="t('live_demo_aria')"
					/>
					<UButton
						v-if="project.github"
						color="neutral"
						size="lg"
						icon="i-lucide-github"
						variant="ghost"
						:to="project.github"
						target="_blank"
						:aria-label="t('github_repo_aria')"
					/>
				</div>
			</div>
		</template>

		<p
			class="text-neutral-800 dark:text-neutral-200 leading-relaxed mb-4 flex-grow"
		>
			{{ project.description }}
		</p>

		<div class="space-y-3 mt-auto">
			<div v-if="project.skills.length">
				<span
					class="text-xs uppercase font-medium tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 block"
					>{{ t("skills_placeholder") }}</span
				>
				<div class="flex flex-wrap gap-1.5">
					<UBadge
						v-for="skill in project.skills"
						:key="skill"
						color="primary"
						variant="subtle"
						size="md"
					>
						{{ skill }}
					</UBadge>
				</div>
			</div>

			<div v-if="project.tools.length">
				<span
					class="text-xs uppercase font-medium tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 block"
					>{{ t("tools_placeholder") }}</span
				>
				<div class="flex flex-wrap gap-1.5">
					<UBadge
						v-for="tool in project.tools"
						:key="tool"
						color="neutral"
						variant="outline"
						size="md"
					>
						{{ tool }}
					</UBadge>
				</div>
			</div>
		</div>
	</UCard>
</template>

<script lang="ts" setup>
import type { Project } from "@/types";

defineProps<{
	project: Project;
}>();

const { t } = useI18n();
</script>

<style></style>
