/** Switches for optional parts of the site. Set a switch to true to turn it on. */
export interface SiteFeatures {
	/** The tilted KO letters behind the hero. Off until the look ties to the site. */
	heroBackground: boolean;
}

export const features: SiteFeatures = {
	heroBackground: false,
};
