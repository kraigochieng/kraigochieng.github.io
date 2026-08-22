<template>
	<UCard
		class="flex flex-col h-full border-2 border-black dark:border-[#c0c0c0]"
	>
		<template #header>
			<div class="flex items-start justify-between gap-4">
				<div>
					<h3 class="text-xl font-semibold text-primary">
						<NuxtLink v-if="detailPath" :to="detailPath">
							{{ project.name }}
						</NuxtLink>
						<template v-else>{{ project.name }}</template>
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

		<LivePreview
			v-if="project.link"
			:url="project.link"
			:title="`${project.name} – live demo`"
			class="mb-4"
		/>

		<p
			class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-grow"
		>
			{{ project.description }}
		</p>

		<div class="space-y-4 mt-auto">
			<div v-if="project.skills.length">
				<span
					class="text-xs uppercase font-bold text-gray-400 mb-2 block"
					>{{ t("skills_placeholder") }}</span
				>
				<div class="flex flex-wrap gap-2">
					<UBadge
						v-for="skill in project.skills"
						:key="skill"
						color="primary"
						variant="subtle"
						size="lg"
					>
						{{ skill }}
					</UBadge>
				</div>
			</div>

			<div v-if="project.tools.length">
				<span
					class="text-xs uppercase font-bold text-gray-400 mb-2 block"
					>{{ t("tools_placeholder") }}</span
				>
				<div class="flex flex-wrap gap-2">
					<UBadge
						v-for="tool in project.tools"
						:key="tool"
						color="neutral"
						variant="outline"
						size="lg"
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
	detailPath?: string;
}>();

const { t } = useI18n();
</script>

<style></style>
