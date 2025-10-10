<template>
	<div class="flex justify-between items-center sticky-nav glass-bg">
		<Logo />
		<Navbar />
		<div class="flex space-x-2">
			<Locale />
			<Theme />
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
