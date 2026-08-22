export interface Project {
	name: string;
	slug: string;
	domain: string[];
	description: string;
	skills: string[];
	tools: string[];
	link: string;
	github: string | null;
	previewBlocked?: boolean;
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
