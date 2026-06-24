"use client";

import { useCallback, useRef, useState } from "react";

const clampIndex = (index: number, count: number) =>
  Math.max(0, Math.min(index, count - 1));

const getScrollPaddingLeft = (container: HTMLElement) => {
  const styles = getComputedStyle(container);
  return parseFloat(styles.scrollPaddingLeft || "0") || 0;
};

const getCardScrollLeft = (container: HTMLElement, card: HTMLElement) =>
  card.offsetLeft - getScrollPaddingLeft(container);

const isCurrentCardPosition = (
  index: number,
  currentIndex: number,
  currentScrollLeft: number,
  targetScrollLeft: number,
) => index === currentIndex && currentScrollLeft === targetScrollLeft;

/**
 * Shared horizontal snap-scroll controller for the Experience and Projects
 * carousels. Tracks the card closest to the container center and exposes
 * smooth programmatic navigation.
 *
 * The guards here are deliberate: `handleScroll` bails when the nearest card
 * hasn't changed, and `scrollToCard` bails when the target is already current,
 * so native scroll, arrows, and dots don't fight each other or re-fire while a
 * smooth scroll is settling.
 */
export const useSnapCarousel = (count: number) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex === currentIndexRef.current) return;

    currentIndexRef.current = closestIndex;
    setActiveIndex(closestIndex);
  }, []);

  const scrollToCard = useCallback(
    (index: number) => {
      const clampedIndex = clampIndex(index, count);
      const container = scrollContainerRef.current;
      const card = cardsRef.current[clampedIndex];

      if (!container || !card) return;

      const targetLeft = getCardScrollLeft(container, card);

      if (
        isCurrentCardPosition(
          clampedIndex,
          currentIndexRef.current,
          container.scrollLeft,
          targetLeft,
        )
      )
        return;

      currentIndexRef.current = clampedIndex;
      setActiveIndex(clampedIndex);

      container.scrollTo({ left: targetLeft, behavior: "smooth" });
    },
    [count],
  );

  const goPrev = useCallback(
    () => scrollToCard(currentIndexRef.current - 1),
    [scrollToCard],
  );
  const goNext = useCallback(
    () => scrollToCard(currentIndexRef.current + 1),
    [scrollToCard],
  );

  const setCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardsRef.current[index] = el;
    },
    [],
  );

  return {
    scrollContainerRef,
    activeIndex,
    handleScroll,
    scrollToCard,
    goPrev,
    goNext,
    setCardRef,
  };
};
