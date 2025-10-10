<template>
	<h1>Kraig Ochieng</h1>
	<h2>{{ $t("data_scientist") }} | Web Developer</h2>
	<a href="https://github.com/kraigochieng" target="_blank">Github</a>
	<a
		href="https://www.linkedin.com/in/kraig-ochieng-911121215/"
		target="_blank"
	>
		LinkedIn
	</a>
	<a href="https://coff.ee/kraigochieng">Buy me a Coffee</a>
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
