<template>
	<div>
		<section
			class="flex flex-col items-center justify-center h-[calc(100vh-var(--nav-height))] text-center bg-background text-foreground"
		>
			<h1 class="text-5xl font-bold mb-2">Kraig Ochieng</h1>
			<h2 class="text-xl text-muted-foreground">
				{{ $t("data_scientist") }} / {{ $t("data_analyst") }}
			</h2>
			<p>Data driven recommendations using <UKbd>.py</UKbd>, <UKbd>.sql</UKbd> and <UKbd>.ts</UKbd> </p>
			<div class="flex flex-wrap justify-center items-center gap-4 mt-6">
				<UButton
					v-for="link in links"
					:key="link.label"
					:icon="link.icon"
					:label="link.label"
					:to="link.href"
					target="_blank"
					variant="ghost"
				/>
			</div>
		</section>

		<!-- <h2>{{ $t("work_experience") }}</h2>
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
	</ul> -->
	</div>
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
