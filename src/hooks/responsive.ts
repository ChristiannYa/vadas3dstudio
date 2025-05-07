import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check media query support
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    // Set initial value
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Create handler function
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener for changes
    mediaQuery.addEventListener("change", handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
