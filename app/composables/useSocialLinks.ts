import { mailtoUrl, profile, telUrl, whatsappUrl } from "@/data/profile";

// `hover` is the icon's brand colour on hover; links without one use neutral.
export const useSocialLinks = () => {
	const { t } = useI18n();

	return computed(() => [
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
			href: telUrl,
			icon: "i-lucide-phone",
			hover: "hover:text-neutral-950 dark:hover:text-white",
		},
		{
			label: t("email_label"),
			href: mailtoUrl,
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
