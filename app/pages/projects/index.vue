<script setup lang="ts">
const projects = [
	{
		name: "MediLinda",
		slug: "medilinda",
		description:
			"AI-powered pharmacovigilance system combining FastAPI, Nuxt, and MLflow to detect TB drug side effects and send SMS alerts across Kenya.",
		skills: ["AI", "Machine Learning", "Healthcare", "Explainable AI"],
		tools: ["Nuxt", "FastAPI", "Python", "MLflow", "PostgreSQL", "Docker"],
		link: "https://medilinda.vercel.app",
	},
	{
		name: "Gradient Descent Visualiser",
		slug: "gradient-descent-visualiser",
		description:
			"Interactive web app for visualizing linear regression with gradient descent. Nuxt frontend and FastAPI backend. Generate data, run training, and see results live.",
		skills: ["Machine Learning", "Visualization", "Web Development"],
		tools: ["Nuxt", "FastAPI", "Python", "D3.js", "Tailwind CSS"],
		link: "https://gradient-descent-visualiser.vercel.app",
	},
	{
		name: "Diamond Price Predictor",
		slug: "diamond-price-predictor",
		description:
			"Full-stack ML app using FastAPI, Nuxt 4, and MLflow to predict diamond prices with real-time inference and versioned model tracking.",
		skills: ["AI", "Web Development", "MLOps", "Machine Learning"],
		tools: [
			"Nuxt 4",
			"FastAPI",
			"MLflow",
			"scikit-learn",
			"Docker",
			"Databricks",
		],
		link: "https://diamond-price-predictor-coral.vercel.app",
	},
	{
		name: "Image to ASCII Art Converter",
		slug: "image-to-ascii",
		description:
			"Python CLI app that transforms images into ASCII art with adjustable width, grayscale, and color rendering modes.",
		skills: ["Creative Coding", "Image Processing", "CLI Tools"],
		tools: ["Python", "Pillow", "NumPy"],
		link: "https://image-to-ascii-2.onrender.com",
	},
];
</script>

<template>
	<UContainer class="py-12 space-y-8">
		<h2>Projects</h2>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<UCard
				v-for="project in projects"
				:key="project.slug"
				class="hover:shadow-md transition-all duration-200"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-semibold text-primary">
							<NuxtLink :to="`/projects/${project.slug}`">{{
								project.name
							}}</NuxtLink>
						</h3>
						<UIcon
							name="i-heroicons-arrow-top-right-on-square"
							class="w-5 h-5 text-gray-400"
						/>
					</div>
				</template>

				<!-- Static or live preview for all projects using their link property -->
				<div
					v-if="project.link"
					class="mb-4 rounded overflow-hidden border border-gray-200 dark:border-gray-700"
				>
					<div style="overflow: hidden; width: 100%; height: 220px">
						<ULink :to="project.link" target="_blank">
							<iframe
								:src="project.link"
								width="100%"
								height="440"
								style="
									border: 0;
									pointer-events: none;
									width: 200%;
									height: 440px;
									display: block;
									transform: scale(0.5);
									transform-origin: top left;
									overflow: hidden;
								"
								scrolling="no"
								:title="project.name + ' Preview'"
								loading="lazy"
							>
							</iframe>
						</ULink>
					</div>
				</div>

				<p
					class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
				>
					{{ project.description }}
				</p>

				<div class="space-y-3">
					<!-- Skills / Scope -->
					<div class="flex flex-wrap gap-2">
						<UBadge
							v-for="skill in project.skills"
							:key="skill"
							color="primary"
							variant="subtle"
						>
							{{ skill }}
						</UBadge>
					</div>

					<!-- Tools / Languages -->
					<div class="flex flex-wrap gap-2">
						<UBadge
							v-for="tool in project.tools"
							:key="tool"
							variant="solid"
						>
							{{ tool }}
						</UBadge>
					</div>
				</div>
			</UCard>
		</div>
	</UContainer>
</template>
