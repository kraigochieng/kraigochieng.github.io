<template>
	<div class="grid grid-cols-3 items-center sticky-nav glass-bg">
		<Logo class="justify-self-start" />
		<Navbar />
		<div class="justify-self-end flex space-x-2">
			<Locale />
			<UColorModeButton />
		</div>
	</div>

	<slot />
</template>

<script setup lang="ts"></script>

<style scoped>
@reference "assets/css/main.css";

.glass-bg {
	@apply backdrop-filter backdrop-blur-xs;
}

.sticky-nav {
	@apply sticky top-0 z-50;
}
</style>
