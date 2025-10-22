<template>
	<div
		class=" outline-class h-[var(--nav-height)] mobile larger-than-mobile items-center sticky-nav glass-bg"
	>
		<Logo class="outline-class md:justify-self-start" />
		<Navbar class="outline-class hidden md:block" />
		<div class="outline-class md:justify-self-end flex space-x-2">
			<UDropdownMenu :items="dropdownItems" class="md:hidden">
				<UButton
					icon="i-lucide-menu"
					color="neutral"
					variant="outline"
				/>
			</UDropdownMenu>
			<Locale />
			<UColorModeButton />
		</div>
	</div>

	<slot />
</template>

<script setup lang="ts">
const dropdownItems = ref([
	[
		{ label: "Home", icon: "i-lucide-home", to: "/" },
		{ label: "Projects", icon: "i-lucide-code", to: "/projects" },
		{ label: "Blogs", icon: "i-lucide-book-open", to: "/blogs" },
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

.sticky-nav {
	@apply sticky top-0 z-50;
}

.mobile {
	@apply flex justify-between;
}

.larger-than-mobile {
	@apply md:grid md:grid-cols-3;
}

.outline-class {
	@apply outline outline-red-500
}
</style>
