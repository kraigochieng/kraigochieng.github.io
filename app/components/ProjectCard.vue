<template>
	<UCard
		:ui="{ body: 'flex-1' }"
		class="flex flex-col h-full border transition-colors hover:border-neutral-900 dark:hover:border-neutral-300"
		:class="
			featured
				? 'border-neutral-900 dark:border-neutral-300'
				: 'border-neutral-300 dark:border-neutral-700'
		"
	>
		<template #header>
			<h3
				class="font-semibold tracking-tight text-primary py-0"
				:class="featured ? 'text-2xl md:text-3xl' : 'text-xl'"
			>
				{{ project.name }}
			</h3>
			<p
				class="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1"
			>
				{{ project.domain.join(" • ") }}
			</p>
		</template>

		<p
			class="max-w-prose text-neutral-800 dark:text-neutral-200 leading-relaxed mb-4 flex-grow"
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

		<template v-if="project.link || project.github" #footer>
			<div class="flex flex-wrap gap-3">
				<UButton
					v-if="project.link"
					color="primary"
					size="md"
					trailing-icon="i-lucide-arrow-up-right"
					:to="project.link"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{ t("live_demo") }}
				</UButton>
				<UButton
					v-if="project.github"
					color="neutral"
					variant="outline"
					size="md"
					icon="i-lucide-github"
					:to="project.github"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</UButton>
			</div>
		</template>
	</UCard>
</template>

<script lang="ts" setup>
import type { Project } from "@/types";

defineProps<{
	project: Project;
	featured?: boolean;
}>();

const { t } = useI18n();
</script>

<style></style>
