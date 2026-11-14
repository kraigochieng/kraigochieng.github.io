/**
 * Tracks whether the hero fills the top of the screen, so the layout can
 * hide the navigation and let the hero take focus. Pages without a hero
 * never take focus. Side effects: reads the DOM and registers an observer.
 */
export const useHeroFocus = (): Ref<boolean> => {
	const route = useRoute();
	const localePath = useLocalePath();
	const nuxtApp = useNuxtApp();

	// Start focused only on the home page, so the prerendered HTML matches.
	const heroFocused = useState<boolean>(
		"heroFocused",
		() => route.path === localePath("/"),
	);
	let observer: IntersectionObserver | undefined;

	const observeHero = (): void => {
		observer?.disconnect();
		const hero: HTMLElement | null = document.getElementById("hero");
		if (!hero) {
			heroFocused.value = false;
			return;
		}
		observer = new IntersectionObserver(
			(entries) => {
				const latest: IntersectionObserverEntry | undefined = entries.at(-1);
				if (latest) heroFocused.value = latest.isIntersecting;
			},
			// The hero loses focus once less than 60% of the screen shows it.
			{ rootMargin: "-40% 0px 0px 0px" },
		);
		observer.observe(hero);
	};

	onMounted(() => {
		observeHero();
		nuxtApp.hook("page:finish", observeHero);
	});

	onBeforeUnmount(() => {
		observer?.disconnect();
	});

	return heroFocused;
};
