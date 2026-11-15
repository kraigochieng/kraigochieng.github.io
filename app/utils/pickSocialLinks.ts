import type { SocialLink, SocialLinkId } from "@/composables/useSocialLinks";

/**
 * Returns the links with the given ids, in the order of the ids. It skips an
 * id that has no link.
 */
export const pickSocialLinks = (
	links: readonly SocialLink[],
	ids: readonly SocialLinkId[],
): SocialLink[] =>
	ids.flatMap((id: SocialLinkId): SocialLink[] => {
		const found: SocialLink | undefined = links.find((link) => link.id === id);
		return found ? [found] : [];
	});
