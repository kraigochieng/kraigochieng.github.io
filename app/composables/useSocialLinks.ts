import { mailtoUrl, profile, telUrl, whatsappUrl } from "@/data/profile";

export const useSocialLinks = () => {
	const { t } = useI18n();

	return computed(() => [
		{
			label: "GitHub",
			href: profile.githubUrl,
			icon: "i-lucide-github",
		},
		{
			label: "LinkedIn",
			href: profile.linkedinUrl,
			icon: "i-lucide-linkedin",
		},
		{
			label: "X",
			href: profile.twitterUrl,
			icon: "i-simple-icons-x",
		},
		{
			label: "WhatsApp",
			href: whatsappUrl,
			icon: "i-simple-icons-whatsapp",
		},
		{
			label: t("phone_label"),
			href: telUrl,
			icon: "i-lucide-phone",
		},
		{
			label: t("email_label"),
			href: mailtoUrl,
			icon: "i-lucide-mail",
		},
		{
			label: t("buy_me_coffee"),
			href: profile.buyMeACoffeeUrl,
			icon: "i-lucide-coffee",
		},
	]);
};
