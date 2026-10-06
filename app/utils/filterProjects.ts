import type { Project } from "@/types";

export interface ProjectFilters {
	domains: string[];
	skills: string[];
	tools: string[];
	sort: "asc" | "desc";
}

// An empty filter list matches every project. Within one list, any match
// counts; across lists, all must match.
export const filterProjects = (
	projects: readonly Project[],
	{ domains, skills, tools, sort }: ProjectFilters,
): Project[] => {
	const result = projects.filter(
		(project) =>
			(domains.length === 0 ||
				project.domain.some((d) => domains.includes(d))) &&
			(skills.length === 0 ||
				project.skills.some((s) => skills.includes(s))) &&
			(tools.length === 0 || project.tools.some((t) => tools.includes(t))),
	);

	return result.sort((a, b) =>
		sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
	);
};
