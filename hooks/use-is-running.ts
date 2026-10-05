"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * True only while the element is on screen and the tab is visible. Endless animations
 * use it to pause, so an idle or backgrounded page does no work. Pass `true` for something
 * that is on screen at load (the hero), so it moves from the first paint instead of waiting
 * for hydration.
 */
export function useIsRunning<T extends Element>(isInitiallyRunning = false): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isRunning, setIsRunning] = useState(isInitiallyRunning);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let isOnScreen = false;
    const update = () => setIsRunning(isOnScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen = entry?.isIntersecting ?? false;
      update();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return [ref, isRunning];
}
