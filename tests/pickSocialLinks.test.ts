import { describe, expect, it } from "vitest";
import { pickSocialLinks } from "../app/utils/pickSocialLinks";
import type { SocialLink } from "../app/composables/useSocialLinks";

const link = (id: SocialLink["id"]): SocialLink => ({
	id,
	label: id,
	icon: `i-lucide-${id}`,
	hover: "",
});

describe("pickSocialLinks", () => {
	const links: SocialLink[] = [link("github"), link("linkedin"), link("email")];

	it("returns the links in the order of the ids", () => {
		expect(pickSocialLinks(links, ["email", "github"]).map((l) => l.id)).toEqual(
			["email", "github"],
		);
	});

	it("skips an id that has no link", () => {
		expect(pickSocialLinks(links, ["phone", "linkedin"]).map((l) => l.id)).toEqual(
			["linkedin"],
		);
	});

	it("returns an empty list for no ids", () => {
		expect(pickSocialLinks(links, [])).toEqual([]);
	});
});
