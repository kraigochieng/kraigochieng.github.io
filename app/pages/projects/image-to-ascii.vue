<script setup lang="ts">
const project = {
	name: "Image to ASCII Art Converter",
	scope: ["AI", "Fun", "Image Processing"],
	description: `A Python application that converts images into ASCII art — transforming digital photos into creative text-based visuals. It supports grayscale and color ASCII rendering, adjustable width, and customizable character sets.`,
	tools: ["Python", "Pillow", "NumPy", "CLI", "ASCII Rendering"],
	github: "https://github.com/yourusername/image_to_ascii_2",
};

</script>

<template>
	<UContainer class="py-12 space-y-12">
		<!-- Header -->
		<div class="text-center space-y-4">
			<h1 class="text-4xl font-bold">{{ project.name }}</h1>
			<p class="text-gray-500 text-lg max-w-2xl mx-auto">
				{{ project.description }}
			</p>
		</div>

		<!-- Screenshot -->
		<div
			class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm"
		>
			<UImage
				src="/docs/images/web-screenshot.png"
				alt="Image to ASCII Art Web Screenshot"
				class="w-full"
			/>
		</div>

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
					v-for="item in project.scope"
					:key="item"
					color="primary"
					variant="subtle"
				>
					{{ item }}
				</UBadge>
			</div>
		</UCard>

		<!-- Tools & Skills -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon
						name="i-heroicons-code-bracket"
						class="text-primary"
					/>
					<span class="font-semibold">Tools & Skills</span>
				</div>
			</template>
			<div class="flex flex-wrap gap-2">
				<UBadge
					v-for="tool in project.tools"
					:key="tool"
					variant="solid"
				>
					{{ tool }}
				</UBadge>
			</div>
		</UCard>

		<!-- Description -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-terminal" class="text-primary" />
					<span class="font-semibold">Description</span>
				</div>
			</template>
			<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
				The <code>image_to_ascii_2</code> project transforms standard
				image files into ASCII art by analyzing pixel brightness and
				mapping it to a defined character set. It’s a great exploration
				of how image data can be represented as text — bridging art and
				technology.
			</p>

			<p class="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
				The application supports both grayscale and color ASCII outputs
				and can be run easily from the command line with flexible
				configuration options.
			</p>
		</UCard>

		<!-- Architecture -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-chart-bar" class="text-primary" />
					<span class="font-semibold">Architecture</span>
				</div>
			</template>
			<div class="space-y-3">
				<img
					src="/image-to-ascii/web-screenshot.png"
					alt="Architecture Diagram"
					class="rounded-lg border border-gray-200 dark:border-gray-700"
				/>
				<p class="text-sm text-gray-500 text-center">
					Conceptual flow: Image Input → Pixel Processing → Character
					Mapping → ASCII Output
				</p>
			</div>
		</UCard>

		<!-- GitHub Link -->
		<div class="text-center pt-4">
			<UButton
				color="primary"
				size="lg"
				:to="project.github"
				target="_blank"
				icon="i-simple-icons-github"
			>
				View on GitHub
			</UButton>
		</div>
	</UContainer>
</template>
