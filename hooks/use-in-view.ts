"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  threshold?: number;
  once?: boolean;
}

export const useInView = <T extends HTMLElement>({
  threshold = 0.1,
  once = true,
}: Props = {}) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
};
