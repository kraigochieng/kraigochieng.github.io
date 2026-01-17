<template>
	<UCard
		class="hover:shadow-lg transition-all duration-300 flex flex-col h-full ring-1 ring-gray-200 dark:ring-gray-800"
	>
		<template #header>
			<div class="flex items-start justify-between gap-4">
				<div>
					<h3 class="text-xl font-semibold text-primary">
						{{ project.name }}
					</h3>
					<p
						class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1"
					>
						{{ project.domain.join(" • ") }}
					</p>
				</div>

				<div class="flex gap-2">
					<UButton
						v-if="project.link"
						color="primary"
						size="xs"
						icon="i-lucide-globe"
						variant="ghost"
						:to="project.link"
						target="_blank"
						aria-label="Live Demo"
					/>
					<UButton
						v-if="project.github"
						color="neutral"
						size="xs"
						icon="i-lucide-github"
						variant="ghost"
						:to="project.github"
						target="_blank"
						aria-label="GitHub Repository"
					/>
				</div>
			</div>
		</template>

		<LivePreview
			v-if="project.link"
			:url="project.link"
			:title="`${project.name} – live demo`"
			class="mb-4 rounded-md overflow-hidden border border-gray-100 dark:border-gray-800"
		/>

		<p
			class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-grow"
		>
			{{ project.description }}
		</p>

		<div class="space-y-4 mt-auto">
			<div v-if="project.skills.length">
				<span
					class="text-[10px] uppercase font-bold text-gray-400 mb-2 block"
					>Skills</span
				>
				<div class="flex flex-wrap gap-2">
					<UBadge
						v-for="skill in project.skills"
						:key="skill"
						color="primary"
						variant="subtle"
						size="sm"
					>
						{{ skill }}
					</UBadge>
				</div>
			</div>

			<div v-if="project.tools.length">
				<span
					class="text-[10px] uppercase font-bold text-gray-400 mb-2 block"
					>Tools</span
				>
				<div class="flex flex-wrap gap-2">
					<UBadge
						v-for="tool in project.tools"
						:key="tool"
						color="neutral"
						variant="outline"
						size="xs"
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
</script>

<style></style>
