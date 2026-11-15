import { describe, expect, it } from "vitest";
import { buildLlmsTxt } from "../scripts/llms-txt";
import { experiences } from "../app/data/experience";
import { projects } from "../app/data/projects";

describe("buildLlmsTxt", () => {
	const text: string = buildLlmsTxt();

	it("has a skills and tools section", () => {
		expect(text).toContain("## Skills and Tools");
		expect(text).toMatch(/^Skills: .+$/m);
		expect(text).toMatch(/^Tools: .+$/m);
	});

	it("lists a tool that only an experience entry names", () => {
		const projectTools: string[] = projects.flatMap((p) => p.tools);
		const experienceOnlyTool: string | undefined = experiences
			.flatMap((e) => e.tools)
			.find((tool) => !projectTools.includes(tool as never));
		expect(experienceOnlyTool).toBeDefined();
		expect(text).toContain(experienceOnlyTool as string);
	});
});
