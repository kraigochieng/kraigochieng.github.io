import { projects } from "../app/data/projects";
import { experiences } from "../app/data/experience";
import { certifications } from "../app/data/certifications";
import { profile } from "../app/data/profile";

export function buildLlmsTxt(): string {
	const lines: string[] = [];

	lines.push(`# ${profile.name}`, "");
	lines.push(
		"> AI Engineer based in Nairobi, Kenya. Builds AI agents, data pipelines, and full-stack web applications with Python, Nuxt, and FastAPI.",
		""
	);
	lines.push(`Portfolio: ${profile.portfolioUrl}`);
	lines.push(`Contact: ${profile.email} · +${profile.phoneNumber}`);
	lines.push(`GitHub: ${profile.githubUrl}`);
	lines.push(`LinkedIn: ${profile.linkedinUrl}`);
	lines.push("");

	lines.push("## Projects", "");
	for (const project of projects) {
		const linkParts: string[] = [];
		if (project.link) linkParts.push(`Live: ${project.link}`);
		if (project.github) linkParts.push(`Code: ${project.github}`);
		const primaryUrl = project.link || project.github || "";
		const title = primaryUrl
			? `[${project.name}](${primaryUrl})`
			: project.name;
		const suffix = linkParts.length ? ` ${linkParts.join(" · ")}` : "";
		lines.push(`- ${title}: ${project.description}${suffix}`);
	}
	lines.push("");

	lines.push("## Work Experience", "");
	for (const exp of experiences) {
		const end = exp.end ?? "Present";
		const summary = exp.achievements[0] ?? "";
		lines.push(
			`- ${exp.role} at ${exp.company}, ${exp.location} (${exp.start}–${end}, ${exp.employmentType}): ${summary}`
		);
	}
	lines.push("");

	lines.push("## Certifications", "");
	for (const cert of certifications) {
		const expiry = cert.expires ? `, expires ${cert.expires}` : "";
		lines.push(`- ${cert.name}, issued ${cert.issued}${expiry}.`);
	}
	lines.push("");

	return lines.join("\n");
}
