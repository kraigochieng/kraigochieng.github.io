<script setup lang="ts">
const projects = [
	{
		name: "MediLinda",
		slug: "medilinda",
		description:
			"Real-time pharmacovigilance platform enabling Kenyan healthcare providers to detect TB drug side effects early, improve patient safety, and trigger instant SMS alerts to medical teams nationwide.",
		skills: ["AI", "Machine Learning", "Healthcare", "Explainable AI"],
		tools: ["Nuxt", "FastAPI", "Python", "MLflow", "PostgreSQL", "Docker"],
		link: "https://medilinda.vercel.app",
		github: "https://github.com/kraigochieng/medilinda",
	},
	{
		name: "Gradient Descent Visualiser",
		slug: "gradient-descent-visualiser",
		description:
			"Interactive learning tool that helps students, educators, and data teams understand how machine learning models optimize predictions through live, visual training simulations.",
		skills: ["Machine Learning", "Visualization", "Web Development"],
		tools: ["Nuxt", "FastAPI", "Python", "D3.js", "Tailwind CSS"],
		link: "https://gradient-descent-visualiser.vercel.app",
		github: "https://github.com/kraigochieng/gradient-descent-visualiser",
	},
	{
		name: "Diamond Price Predictor",
		slug: "diamond-price-predictor",
		description:
			"Enterprise-grade pricing intelligence tool for jewelers and traders, delivering accurate, real-time diamond valuation with transparent model versioning and audit-ready predictions.",
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
		github: "https://github.com/kraigochieng/diamond-price-predictor",
	},
	// {
	// 	name: "Image to ASCII Art Converter",
	// 	slug: "image-to-ascii",
	// 	description:
	// 		"Creative digital tool for designers and developers to instantly convert photos into retro-style ASCII art, supporting grayscale and color outputs for branding, terminals, and fun applications.",
	// 	skills: ["Creative Coding", "Image Processing", "CLI Tools"],
	// 	tools: ["Python", "Pillow", "NumPy"],
	// 	link: "https://image-to-ascii-2.onrender.com",
	// 	github: "https://github.com/kraigochieng/image_to_ascii_2",
	// },
];
</script>

<template>
	<UContainer class="py-12 space-y-8">
		<h2 class="text-3xl font-bold">Projects</h2>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<UCard
				v-for="project in projects"
				:key="project.slug"
				class="hover:shadow-lg transition-all duration-300 flex flex-col"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-semibold text-primary">
							{{ project.name }}
						</h3>
						<div class="flex">
							<UButton
								:key="project.github"
								color="primary"
								size="lg"
								icon="i-lucide-globe"
								:label="`Live`"
								variant="ghost"
								:to="project.github"
								target="_blank"
								class="flex-1"
							/>

							<UButton
								:key="project.github"
								color="primary"
								size="lg"
								icon="i-simple-icons-github"
								variant="ghost"
								:label="`Github`"
								:to="project.github"
								target="_blank"
								class="flex-1"
							/>
						</div>
					</div>
				</template>

				<!-- Live Preview -->
				<LivePreview
					v-if="project.link"
					:url="project.link"
					:title="`${project.name} – live demo`"
					class="mb-4"
				/>
				<!-- Business-Focused Description -->
				<p
					class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 flex-grow"
				>
					{{ project.description }}
				</p>

				<!-- Skills -->
				<div class="flex flex-wrap gap-2 mb-3">
					<UBadge
						v-for="skill in project.skills"
						:key="skill"
						color="primary"
						variant="subtle"
						size="lg"
					>
						{{ skill }}
					</UBadge>
				</div>

				<!-- Tools -->
				<div class="flex flex-wrap gap-2 mb-4">
					<UBadge
						v-for="tool in project.tools"
						:key="tool"
						variant="solid"
					>
						{{ tool }}
					</UBadge>
				</div>
			</UCard>
		</div>
	</UContainer>
</template>
