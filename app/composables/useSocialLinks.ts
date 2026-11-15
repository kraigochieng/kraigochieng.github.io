import { phoneText, profile, whatsappUrl } from "@/data/profile";

/** One icon in the sidebar. A copy link copies text; any other link opens a page. */
export interface SocialLink {
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
			label: "GitHub",
			href: profile.githubUrl,
			icon: "i-lucide-github",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			label: "LinkedIn",
			href: profile.linkedinUrl,
			icon: "i-lucide-linkedin",
			hover: "hover:text-[#0A66C2] dark:hover:text-[#70B5F9]",
		},
		{
			label: "X",
			href: profile.twitterUrl,
			icon: "i-simple-icons-x",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			label: "WhatsApp",
			href: whatsappUrl,
			icon: "i-simple-icons-whatsapp",
			hover: "hover:text-[#25D366]",
		},
		{
			label: t("phone_label"),
			copyText: phoneText,
			copyName: t("phone_copy_name"),
			icon: "i-lucide-phone",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			label: t("email_label"),
			copyText: profile.email,
			copyName: t("email_copy_name"),
			icon: "i-lucide-mail",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			label: t("buy_me_coffee"),
			href: profile.buyMeACoffeeUrl,
			icon: "i-lucide-coffee",
			hover: "hover:text-[#FF813F]",
		},
	]);
};
