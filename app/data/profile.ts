export const profile = {
	name: "Kraig Ochieng",
	email: "kraigochieng@gmail.com",
	// Digits only - no "+", no spaces. Used to derive the wa.me/tel URLs below.
	phoneNumber: "254792701195",
	githubUrl: "https://github.com/kraigochieng",
	linkedinUrl: "https://www.linkedin.com/in/kraig-ochieng-911121215/",
	buyMeACoffeeUrl: "https://coff.ee/kraigochieng",
	portfolioUrl: "https://kraigochieng.github.io",
} as const;

export const whatsappUrl = `https://wa.me/${profile.phoneNumber}`;
export const telUrl = `tel:+${profile.phoneNumber}`;
export const mailtoUrl = `mailto:${profile.email}`;
