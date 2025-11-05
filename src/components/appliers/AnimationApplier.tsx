"use client";

import { useEffect } from "react";

const AnimationApplier = () => {
  useEffect(() => {
    // Simple function to observe elements
    const observeElements = () => {
      const selectors = [".fade-up", ".fade-down", ".fade-left", ".fade-right"];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(
          `${selector}:not([data-animated])`,
        );

        elements.forEach((element) => {
          // Mark as animated to avoid duplicate observation
          element.setAttribute("data-animated", "true");

          // Create IntersectionObserver
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("active");
                  // Once animated, we can optionally unobserve
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              threshold: 0.1,
              rootMargin: "0px 0px -50px 0px",
            },
          );

          // Check if element is already in viewport
          const rect = element.getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0;

          if (isVisible) {
            // If already visible, add active class immediately
            element.classList.add("active");
          } else {
            // Otherwise, observe it
            observer.observe(element);
          }
        });
      });
    };

    // Initial observation
    observeElements();

    // Watch for new elements (dynamic content)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

export default AnimationApplier;
