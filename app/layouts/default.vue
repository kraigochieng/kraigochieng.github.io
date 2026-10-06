<template>
	<a href="#main-content" class="skip-link">{{ t("skip_to_content") }}</a>

	<aside
		class="fixed inset-y-0 left-0 z-40 hidden w-64 overflow-y-auto border-r border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-neutral-900"
	>
		<SidebarContent />
	</aside>

	<header
		class="glass-bg sticky top-0 z-40 flex h-[var(--nav-height)] items-center gap-4 px-6 md:hidden"
	>
		<USlideover
			v-model:open="drawerOpen"
			side="left"
			:title="profile.name"
			:description="t('job_title')"
			:ui="{ content: 'max-w-64' }"
		>
			<UButton
				icon="i-lucide-panel-left"
				color="neutral"
				variant="outline"
				size="xl"
				:aria-label="t('menu_aria')"
			/>
			<template #body>
				<SidebarContent hide-identity />
			</template>
		</USlideover>
		<Logo />
	</header>

	<main
		id="main-content"
		tabindex="-1"
		class="outline-none px-6 md:ml-64 md:px-12 lg:px-16"
	>
		<div class="mx-auto max-w-4xl">
			<slot />
		</div>
	</main>
</template>

<script setup lang="ts">
import { profile } from "@/data/profile";

const { t } = useI18n();
const route = useRoute();

// Shared so the home page call to action can open the drawer on mobile.
const drawerOpen = useState("drawerOpen", () => false);

// Close the drawer after navigating (including same-page hash links).
watch(
	() => route.fullPath,
	() => {
		drawerOpen.value = false;
	},
);
</script>

<style scoped>
@reference "assets/css/main.css";

.glass-bg {
	@apply backdrop-filter backdrop-blur-xs;
}

.skip-link {
	@apply fixed left-4 top-2 z-[100] -translate-y-20 rounded-md bg-white px-4 py-2 text-black shadow-lg focus:translate-y-0;
}
</style>
