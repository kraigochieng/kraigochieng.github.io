/** Names of the hand-drawn glyphs, one for each section of the page. */
export type GlyphName =
	| "experience"
	| "projects"
	| "certifications";

/**
 * SVG path data for each glyph, drawn on a 24 by 24 grid. Render each path
 * as a round-capped stroke so the glyphs look carved, not printed.
 */
export const glyphPaths: Record<GlyphName, string[]> = {
	// Walking figure: head, body, arms, legs.
	experience: [
		"M10 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
		"M12 7v7",
		"M6 9l6 2 6-2",
		"M12 14l-4 7",
		"M12 14l4 7",
	],
	// Square spiral: reads as a carved meander and as a circuit trace.
	projects: ["M12 12h2v2h-4v-4h6v6h-8v-8h10v10h-12v-12"],
	// Sun: a seal with eight rays.
	certifications: [
		"M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
		"M12 3v3",
		"M12 18v3",
		"M3 12h3",
		"M18 12h3",
		"M5.6 5.6l2.1 2.1",
		"M16.3 16.3l2.1 2.1",
		"M5.6 18.4l2.1-2.1",
		"M16.3 7.7l2.1-2.1",
	],
};
