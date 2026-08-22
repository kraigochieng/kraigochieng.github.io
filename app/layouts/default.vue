<template>
	<div
		class="h-[var(--nav-height)] responsive-columns sticky-nav glass-bg items-center"
	>
		<Logo class="" />
		<Navbar class="hidden md:block" />
		<div class="flex space-x-2 justify-end">
			<Locale />
			<UColorModeButton size="xl" />
			<UDropdownMenu :items="dropdownItems" size="xl" class="md:hidden">
				<UButton
					icon="i-lucide-menu"
					color="neutral"
					variant="outline"
					size="xl"
				/>
			</UDropdownMenu>
		</div>
	</div>

	<slot />
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { t } = useI18n();
const localePath = useLocalePath();

const dropdownItems = computed<DropdownMenuItem[]>(() => [
	[
		{ label: t("nav_home"), icon: "i-lucide-home", to: localePath("/") },
		{
			label: t("projects"),
			icon: "i-lucide-code",
			to: `${localePath("/")}#projects`,
		},
		{
			label: t("nav_certifications"),
			icon: "i-lucide-award",
			to: `${localePath("/")}#certifications`,
		},
	],
	[
		{
			label: "GitHub",
			icon: "i-lucide-github",
			to: "https://github.com/kraigochieng",
			target: "_blank",
		},
	],
]);
</script>

<style scoped>
@reference "assets/css/main.css";

.glass-bg {
	@apply backdrop-filter backdrop-blur-xs;
}

.responsive-columns {
	@apply grid grid-cols-2 md:grid-cols-3;
}

.sticky-nav {
	@apply sticky top-0 z-50;
}

.outline-class {
	@apply outline outline-red-500;
}
</style>
