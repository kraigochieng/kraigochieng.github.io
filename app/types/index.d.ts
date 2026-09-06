import type { Domain, ProjectSlug, Skill, Tool } from "../data/taxonomy";

export interface Project {
	name: string;
	slug: ProjectSlug;
	domain: Domain[];
	description: string;
	skills: Skill[];
	tools: Tool[];
	link: string;
	github: string | null;
	previewBlocked?: boolean;
	// Path to a manually-captured screenshot (e.g. "/projects/medilinda.png"),
	// preferred over the live Microlink screenshot when set.
	previewImage?: string;
}

export interface Experience {
	role: string;
	company: string;
	employmentType: string;
	start: string;
	end: string | null;
	duration: string;
	location: string;
	workType: string | null;
	achievements: string[];
	skills: string[];
	links?: { label: string; href: string }[];
}

export interface Certification {
	name: string;
	issuer: string;
	issued: string;
	expires: string | null;
	credentialId: string | null;
	link: string;
}
