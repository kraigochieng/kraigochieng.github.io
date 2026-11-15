import { phoneText, profile, whatsappUrl } from "@/data/profile";

/** The stable name of each contact icon. */
export type SocialLinkId =
	| "github"
	| "linkedin"
	| "x"
	| "whatsapp"
	| "phone"
	| "email"
	| "coffee";

/** One contact icon. A copy link copies text; any other link opens a page. */
export interface SocialLink {
	id: SocialLinkId;
	label: string;
	icon: string;
	hover: string;
	href?: string;
	copyText?: string;
	copyName?: string;
}

// `hover` is the icon's brand colour on hover; links without one use neutral.
export const useSocialLinks = (): ComputedRef<SocialLink[]> => {
	const { t } = useI18n();

	return computed<SocialLink[]>(() => [
		{
			id: "github",
			label: "GitHub",
			href: profile.githubUrl,
			icon: "i-lucide-github",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			id: "linkedin",
			label: "LinkedIn",
			href: profile.linkedinUrl,
			icon: "i-lucide-linkedin",
			hover: "hover:text-[#0A66C2] dark:hover:text-[#70B5F9]",
		},
		{
			id: "x",
			label: "X",
			href: profile.twitterUrl,
			icon: "i-simple-icons-x",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			id: "whatsapp",
			label: "WhatsApp",
			href: whatsappUrl,
			icon: "i-simple-icons-whatsapp",
			hover: "hover:text-[#25D366]",
		},
		{
			id: "phone",
			label: t("phone_label"),
			copyText: phoneText,
			copyName: t("phone_copy_name"),
			icon: "i-lucide-phone",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			id: "email",
			label: t("email_label"),
			copyText: profile.email,
			copyName: t("email_copy_name"),
			icon: "i-lucide-mail",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			id: "coffee",
			label: t("buy_me_coffee"),
			href: profile.buyMeACoffeeUrl,
			icon: "i-lucide-coffee",
			hover: "hover:text-[#FF813F]",
		},
	]);
};
