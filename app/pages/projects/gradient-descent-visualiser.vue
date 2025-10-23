<script setup lang="ts">
const project = {
	name: "Gradient Descent Visualiser",
	tagline: "Interactive Linear Regression & Gradient Descent Visualisation",
	description: `A web application for visualizing linear regression using gradient descent. The Nuxt frontend communicates with a FastAPI backend to generate synthetic data, run gradient descent, and visualize the results interactively.`,
	scope: [
		"Machine Learning",
		"Visualization",
		"Web Development",
		"API-Driven",
	],
	features: [
		"Interactive visualization of linear regression fitting using gradient descent.",
		"Generate synthetic linear data with configurable noise.",
		"Adjust learning rate, epochs, initial intercept/slope, and noise.",
		"API-driven: FastAPI backend for training and data generation.",
		"Modern stack: Nuxt 3 (Vue 3, TypeScript, Tailwind CSS) frontend and FastAPI backend.",
	],
	technologies: [
		"Nuxt (Frontend)",
		"FastAPI (Backend)",
		"Python (Gradient Descent Logic)",
		"D3.js (Visualization)",
		"Tailwind CSS (Styling)",
		"TypeScript",
	],
	architectureImage: "/gradient-descent-visualiser/architecture.png",
	github: "https://github.com/kraigochieng/gradient-descent-visualiser",
};
</script>

<template>
	<UContainer class="py-12 space-y-12">
		<!-- Header -->
		<div class="text-center space-y-3">
			<h1 class="text-4xl font-bold text-primary">{{ project.name }}</h1>
			<p class="text-gray-500 text-lg max-w-2xl mx-auto">
				{{ project.tagline }}
			</p>
		</div>

		<!-- Description -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon
						name="i-heroicons-information-circle"
						class="text-primary"
					/>
					<span class="font-semibold">Project Overview</span>
				</div>
			</template>
			<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
				{{ project.description }}
			</p>
		</UCard>

		<!-- Features -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-sparkles" class="text-primary" />
					<span class="font-semibold">Key Features</span>
				</div>
			</template>
			<ul
				class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"
			>
				<li v-for="feature in project.features" :key="feature">
					{{ feature }}
				</li>
			</ul>
		</UCard>

		<!-- Scope -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-flag" class="text-primary" />
					<span class="font-semibold">Project Scope</span>
				</div>
			</template>
			<div class="flex flex-wrap gap-2">
				<UBadge
					v-for="item in project.scope"
					:key="item"
					color="primary"
					variant="subtle"
				>
					{{ item }}
				</UBadge>
			</div>
		</UCard>

		<!-- Architecture -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon
						name="i-heroicons-cube-transparent"
						class="text-primary"
					/>
					<span class="font-semibold">System Architecture</span>
				</div>
			</template>
			<div class="space-y-4">
				<img
					:src="project.architectureImage"
					alt="Gradient Descent Visualiser Architecture Diagram"
					class="rounded-lg border border-gray-200 dark:border-gray-700"
				/>
				<p class="text-sm text-gray-500 text-center">
					Nuxt Frontend &harr; FastAPI Backend &harr; Gradient Descent
					Logic
				</p>
			</div>
		</UCard>

		<!-- Technologies -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon
						name="i-heroicons-cog-6-tooth"
						class="text-primary"
					/>
					<span class="font-semibold">Technologies Used</span>
				</div>
			</template>
			<ul class="grid sm:grid-cols-2 gap-2">
				<li
					v-for="tech in project.technologies"
					:key="tech"
					class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
				>
					<UBadge color="primary" variant="subtle">{{
						tech.split("(")[0]
					}}</UBadge>
					<span class="text-gray-700 dark:text-gray-300">{{
						tech
					}}</span>
				</li>
			</ul>
		</UCard>

		<!-- Usage -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-terminal" class="text-primary" />
					<span class="font-semibold">Usage</span>
				</div>
			</template>
			<ol
				class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300"
			>
				<li>Open the frontend in your browser.</li>
				<li>
					Click "Run Gradient Descent" to generate data and fit a
					linear model.
				</li>
				<li>
					View the scatter plot of data points and the fitted
					regression line.
				</li>
				<li>
					Adjust parameters (learning rate, epochs, etc.) to
					experiment.
				</li>
			</ol>
		</UCard>

		<!-- API -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-cloud" class="text-primary" />
					<span class="font-semibold">API Overview</span>
				</div>
			</template>
			<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
				The backend exposes a <code>/train</code> endpoint for running
				gradient descent on synthetic or user-provided data. Configure
				parameters such as learning rate, epochs, intercept, slope, and
				noise.
			</p>
		</UCard>

		<!-- GitHub -->
		<div class="text-center pt-6">
			<UButton
				color="primary"
				size="lg"
				icon="i-simple-icons-github"
				:to="project.github"
				target="_blank"
			>
				View Source on GitHub
			</UButton>
		</div>
	</UContainer>
</template>
