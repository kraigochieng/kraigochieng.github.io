export const profile = {
	name: "Kraig Ochieng",
	email: "kraigochieng@gmail.com",
	// Digits only - no "+", no spaces. Used to derive the wa.me/tel URLs below.
	phoneNumber: "254792701195",
	githubUrl: "https://github.com/kraigochieng",
	twitterUrl: "https://x.com/kraigochieng",
	linkedinUrl: "https://www.linkedin.com/in/kraig-ochieng-911121215/",
	buyMeACoffeeUrl: "https://coff.ee/kraigochieng",
	portfolioUrl: "https://kraigochieng.github.io",
	// Google Maps place page for Nairobi, without the tracking parameters.
	locationMapUrl:
		"https://www.google.com/maps/place/Nairobi/@-1.4304821,36.6695033,9.37z/data=!4m6!3m5!1s0x182f1172d84d49a7:0xf7cf0254b297924c!8m2!3d-1.2920659!4d36.8219462!16zL20vMDVkNDk",
} as const;

export const whatsappUrl = `https://wa.me/${profile.phoneNumber}`;
export const phoneText = `+${profile.phoneNumber}`;
