<script setup lang="ts">
const project = {
	name: "Diamond Price Predictor",
	tagline: "Full-stack ML app for real-time diamond price estimation",
	description: `A production-ready web application that predicts diamond prices using a
  machine-learning model managed with MLflow and served via FastAPI. The Nuxt 4
  client communicates with the API to generate real-time predictions and visualize results.`,
	scope: ["AI", "Machine Learning", "Web Development", "MLOps"],
	technologies: [
		"Nuxt 4 (Frontend)",
		"FastAPI (Backend)",
		"Python + scikit-learn (Model)",
		"MLflow + Databricks (Tracking & Registry)",
		"Tailwind CSS (Styling)",
		"Docker (Deployment)",
		"Poetry (Package Management)",
	],
	objectives: [
		"Develop an end-to-end machine-learning app for price prediction.",
		"Implement model versioning and reproducibility using MLflow.",
		"Expose a secure, CORS-enabled FastAPI backend for predictions.",
		"Deploy easily using Docker Compose for local and cloud runs.",
	],
	architectureImage: "/diamond-price-predictor/architecture.png",
	github: "https://github.com/kraigochieng/diamond-price-predictor",
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

		<!-- Overview -->
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

		<!-- Scope -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-sparkles" class="text-primary" />
					<span class="font-semibold">Project Scope</span>
				</div>
			</template>
			<div class="flex flex-wrap gap-2">
				<UBadge
					v-for="scope in project.scope"
					:key="scope"
					color="primary"
					variant="subtle"
				>
					{{ scope }}
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
				<UImage
					:src="project.architectureImage"
					alt="Diamond Price Predictor Architecture"
					class="rounded-lg border border-gray-200 dark:border-gray-700"
				/>

				<div class="grid sm:grid-cols-2 gap-4 mt-6">
					<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
						<h3 class="font-semibold mb-2 text-primary">
							Client — Nuxt 4 + Tailwind
						</h3>
						<p class="text-gray-700 dark:text-gray-300">
							Interactive SPA where users enter diamond attributes
							and instantly receive predicted prices. Communicates
							with FastAPI via REST API.
						</p>
					</div>

					<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
						<h3 class="font-semibold mb-2 text-primary">
							API — FastAPI + Pydantic
						</h3>
						<p class="text-gray-700 dark:text-gray-300">
							Handles input validation, model inference, and CORS
							policies. Loads the latest model version directly
							from MLflow’s model registry.
						</p>
					</div>

					<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
						<h3 class="font-semibold mb-2 text-primary">
							ML Package — scikit-learn + MLflow
						</h3>
						<p class="text-gray-700 dark:text-gray-300">
							Provides feature engineering, training, and model
							tracking. Experiments are logged to MLflow, and the
							best model is registered for serving.
						</p>
					</div>

					<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
						<h3 class="font-semibold mb-2 text-primary">
							Deployment — Docker Compose
						</h3>
						<p class="text-gray-700 dark:text-gray-300">
							Orchestrates FastAPI and optional MLflow UI for
							local or cloud deployment. Environment variables
							ensure seamless configuration.
						</p>
					</div>
				</div>

				<p class="text-sm text-gray-500 text-center mt-4">
					Flow: <strong>Nuxt Client</strong> →
					<strong>FastAPI Server</strong> →
					<strong>MLflow Registry</strong> →
					<strong>Model Inference</strong>.
				</p>
			</div>
		</UCard>

		<!-- Objectives -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-flag" class="text-primary" />
					<span class="font-semibold">Objectives</span>
				</div>
			</template>
			<ul
				class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"
			>
				<li v-for="obj in project.objectives" :key="obj">{{ obj }}</li>
			</ul>
		</UCard>

		<!-- Technologies -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon
						name="i-heroicons-cog-6-tooth"
						class="text-primary"
					/>
					<span class="font-semibold">Tech Stack</span>
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

		<!-- How It Works -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-beaker" class="text-primary" />
					<span class="font-semibold">How It Works</span>
				</div>
			</template>
			<ol
				class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300"
			>
				<li>
					The user enters diamond attributes (carat, cut, color,
					clarity).
				</li>
				<li>Client sends data to the FastAPI `/predict` endpoint.</li>
				<li>
					The API loads the registered model from MLflow and performs
					inference.
				</li>
				<li>
					Prediction is returned and rendered on the Nuxt UI
					instantly.
				</li>
				<li>
					All experiments and versions are tracked via MLflow for
					reproducibility.
				</li>
			</ol>
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
