<template>
	<div>
		<h1>Medilinda</h1>
		<h2>Project Description</h2>
		<p>
			This project uses artificial intelligence to help healthcare workers
			quickly and accurately check if TB drugs are causing harmful side
			effects. It also sends important updates through SMS to reach places
			with limited internet. The goal is to make drug safety checks faster
			and easier, especially in areas with fewer resources, to better
			protect patients in Kenya.
		</p>

		<h2>Architecture</h2>
		<NuxtImg src="/medilinda/architecture.png" />
		<p>- describe architecture diagram herehere -</p>
		<h2>Technologies Used</h2>
		<ul>
			<li>Nuxt - frontend</li>
			<li>FastAPI - backend</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: "projects",
});
</script>

<style></style>
