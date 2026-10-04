<template>
	<a href="#main-content" class="skip-link">{{ t("skip_to_content") }}</a>
	<header
		class="h-[var(--nav-height)] responsive-columns sticky-nav glass-bg items-center"
	>
		<Logo class="" />
		<Navbar class="hidden md:block" />
		<div class="flex items-center justify-end gap-2">
			<div class="hidden md:flex items-center gap-2">
				<Locale />
				<UColorModeButton size="xl" />
			</div>
			<UDropdownMenu :items="dropdownItems" size="xl" class="md:hidden">
				<UButton
					icon="i-lucide-menu"
					color="neutral"
					variant="outline"
					size="xl"
					:aria-label="t('menu_aria')"
				/>
			</UDropdownMenu>
		</div>
	</header>

	<main id="main-content" tabindex="-1" class="outline-none">
		<slot />
	</main>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { t, setLocale } = useI18n();
const localePath = useLocalePath();
const colorMode = useColorMode();

const isDark = computed({
	get: () => colorMode.value === "dark",
	set: (value: boolean) => {
		colorMode.preference = value ? "dark" : "light";
	},
});

const dropdownItems = computed<DropdownMenuItem[]>(() => [
	[
		{ label: t("nav_home"), icon: "i-lucide-home", to: localePath("/") },
		{
			label: t("projects"),
			icon: "i-lucide-code",
			to: `${localePath("/")}#projects`,
		},
		{
			label: t("work_experience"),
			icon: "i-lucide-briefcase",
			to: `${localePath("/")}#experience`,
		},
		{
			label: t("nav_certifications"),
			icon: "i-lucide-award",
			to: `${localePath("/")}#certifications`,
		},
	],
	[
		{
			label: t("language_label"),
			icon: "i-lucide-languages",
			children: [
				{ label: t("English"), onSelect: () => setLocale("en") },
				{ label: t("Swahili"), onSelect: () => setLocale("sw") },
			],
		},
		{
			label: t("dark_mode"),
			icon: isDark.value ? "i-lucide-moon" : "i-lucide-sun",
			type: "checkbox",
			checked: isDark.value,
			onSelect: (e: Event) => e.preventDefault(),
			onUpdateChecked: (checked: boolean) => {
				isDark.value = checked;
			},
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

.skip-link {
	@apply fixed left-4 top-2 z-[100] -translate-y-20 rounded-md bg-white px-4 py-2 text-black shadow-lg focus:translate-y-0;
}

.outline-class {
	@apply outline outline-red-500;
}
</style>
