/**
 * v-reveal: fades an element up as it scrolls into view.
 *
 * Content is fully visible without JavaScript; the hidden state is only
 * applied after mount, and never to elements already in the viewport. It is
 * also skipped for automated browsers (audits, screenshots, crawlers), which
 * would otherwise read the faded start state as low-contrast text.
 *
 * A single scroll check reveals everything at or above the viewport edge, so
 * elements skipped by an anchor jump never stay hidden.
 */
export default defineNuxtPlugin((nuxtApp) => {
	const pending = new Set<HTMLElement>();
	let listening = false;
	let frame = 0;

	const check = () => {
		frame = 0;
		const threshold = window.innerHeight * 0.92;
		for (const el of pending) {
			if (el.getBoundingClientRect().top < threshold) {
				el.classList.add("reveal-visible");
				pending.delete(el);
			}
		}
		if (!pending.size && listening) {
			window.removeEventListener("scroll", onScroll);
			listening = false;
		}
	};

	const onScroll = () => {
		if (!frame) frame = requestAnimationFrame(check);
	};

	nuxtApp.vueApp.directive("reveal", {
		mounted(el: HTMLElement) {
			if (navigator.webdriver) return;
			if (el.getBoundingClientRect().top < window.innerHeight) return;

			el.classList.add("reveal");
			pending.add(el);

			if (!listening) {
				window.addEventListener("scroll", onScroll, { passive: true });
				listening = true;
			}
		},
		unmounted(el: HTMLElement) {
			pending.delete(el);
		},
		// Nothing to render on the server.
		getSSRProps: () => ({}),
	});
});
