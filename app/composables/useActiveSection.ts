/**
 * Tracks which in-page section is nearest the top of the viewport so the
 * sidebar can mark it as current. Returns "" when none is active (the hero).
 */
export const useActiveSection = (ids: string[]) => {
	const active = ref("");
	let observer: IntersectionObserver | undefined;
	let onScroll: (() => void) | undefined;

	onMounted(() => {
		const visible = new Set<string>();

		// A short last section can never reach the observer band, so when the
		// page is scrolled to the bottom the last section counts as active.
		const atBottom = () =>
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 2;

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(entry.target.id);
					else visible.delete(entry.target.id);
				}
				// Sections are listed in page order; the first visible one wins.
				active.value = atBottom()
					? ids[ids.length - 1]!
					: (ids.find((id) => visible.has(id)) ?? "");
			},
			{ rootMargin: "-20% 0px -60% 0px" },
		);

		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}

		onScroll = () => {
			if (atBottom()) active.value = ids[ids.length - 1]!;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
	});

	onBeforeUnmount(() => {
		observer?.disconnect();
		if (onScroll) window.removeEventListener("scroll", onScroll);
	});

	return active;
};
