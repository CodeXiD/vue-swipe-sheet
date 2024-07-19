export const setPageScrollable = (scrollable: "auto" | "hidden" | "reset") => {
	if (scrollable === "reset") {
		document.documentElement.style.overflow = "";
		document.documentElement.style.overscrollBehaviorY = "";
		return;
	}

	const docElement = document.documentElement;
	const view = document.defaultView || window;
	const scrollPosition = {
		x: view.scrollX || docElement.scrollLeft,
		y: view.scrollY || docElement.scrollTop
	};

	docElement.style.overflow = scrollable;
	docElement.style.overscrollBehaviorY = (scrollable === "auto") ? "auto" : "none";
	view.scrollTo(scrollPosition.x, scrollPosition.y);
};
