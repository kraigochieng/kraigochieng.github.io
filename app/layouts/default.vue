<template>
	<div
		class="h-[var(--nav-height)] responsive-columns sticky-nav glass-bg items-center"
	>
		<Logo class="" />
		<Navbar class="hidden md:block" />
		<div class="flex space-x-2 justify-end">
			<Locale />
			<UColorModeButton />
			<UDropdownMenu :items="dropdownItems" class="md:hidden">
				<UButton
					icon="i-lucide-menu"
					color="neutral"
					variant="outline"
				/>
			</UDropdownMenu>
		</div>
	</div>

	<slot />
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const dropdownItems = ref<DropdownMenuItem[]>([
	[
		{ label: "Home", icon: "i-lucide-home", to: "/" },
		{ label: "Projects", icon: "i-lucide-code", to: "/projects" },
		// { label: "Blogs", icon: "i-lucide-book-open", to: "/blogs" },
		{
			label: "Certifications",
			icon: "i-lucide-award",
			to: "/certifications",
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
