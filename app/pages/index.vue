<template>
	<section
		class="flex flex-col items-center justify-center min-h-screen text-center bg-background text-foreground"
	>
		<h1 class="text-5xl font-bold mb-2">Kraig Ochieng</h1>
		<h2 class="text-xl text-muted-foreground">
			{{ $t("data_scientist") }} | Web Developer
		</h2>
		<div class="flex justify-center items-center gap-4 mt-6">
			<UTooltip
				v-for="link in links"
				:key="link.label"
				:text="link.label"
				:popper="{ placement: 'top' }"
			>
				<a
					:href="link.href"
					target="_blank"
					rel="noopener noreferrer"
					class="p-2 rounded-full hover:bg-muted transition"
				>
					<UIcon :name="link.icon" class="w-5 h-5 text-foreground" />
				</a>
			</UTooltip>
		</div>
	</section>

	<h2>{{ $t("projects") }}</h2>
	<ul>
		<li>
			<NuxtLink to="/projects/medilinda">
				MediLinda. Web Development with Machine Learning
			</NuxtLink>
		</li>
	</ul>

	<h2>{{ $t("work_experience") }}</h2>
	<ul>
		<li>Software Developer | Intellisoft Consulting</li>
		<ul>
			<li>Experience working with FHIR and FSH</li>
		</ul>
		<li>AI Developer | Chanzo Technologies</li>
	</ul>

	<h2>Skills</h2>
	<ul>
		<li>Web Development</li>
		<li>Machine Learning</li>
		<li>Data Analysis</li>
		<li>Deep Learning</li>
		<li>Web Scraping</li>
		<li>AI Agent Development</li>
		<li>CI/CD</li>
		<li>Containerisation</li>
	</ul>
	<h2>Languages</h2>
	<ul>
		<li>Python</li>
		<li>Javascript</li>
		<li>SQL</li>
	</ul>
	<h2>Agent Tools</h2>
	<ul>
		<li>n8n</li>
	</ul>
	<h2>Hackathons</h2>
	<ul>
		<li>KenyaRE</li>
		<li>Nairobi DSRH</li>
	</ul>
</template>

<script setup lang="ts">
const links = [
	{
		label: "GitHub",
		href: "https://github.com/kraigochieng",
		icon: "i-lucide-github",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/kraig-ochieng-911121215/",
		icon: "i-lucide-linkedin",
	},
	{
		label: "Buy me a Coffee",
		href: "https://coff.ee/kraigochieng",
		icon: "i-lucide-coffee",
	},
];

useHead({ title: "Kraig Ochieng | Data scientist and Web Developer" });
</script>

<style scoped>
@reference "assets/css/main.css";

ol li {
	list-style: decimal;
}

ul li {
	list-style: disc;
}
</style>
