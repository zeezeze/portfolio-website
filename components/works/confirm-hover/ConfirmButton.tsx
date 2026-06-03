"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from "./confirmButton.module.css";

const PINK = "#F08080";
const WHITE = "#ffffff";
const WIPE_ORIGIN = "100% 50%";
const WIPE_EASE = "power3.inOut";
const WIDTH_MULTIPLIER = 6;

function syncButtonWidth(button: HTMLElement, label: HTMLElement) {
  const textWidth = label.getBoundingClientRect().width;
  if (textWidth > 0) {
    button.style.width = `${textWidth * WIDTH_MULTIPLIER}px`;
  }
}

function setIdle(
  fill: HTMLElement,
  border: HTMLElement,
  label: HTMLElement,
) {
  gsap.set(fill, { scaleX: 0, transformOrigin: WIPE_ORIGIN });
  gsap.set(border, { scaleX: 0, transformOrigin: WIPE_ORIGIN });
  gsap.set(label, { color: WHITE, scale: 1 });
}

export function ConfirmButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoverTweenRef = useRef<gsap.core.Timeline | null>(null);
  const clickTweenRef = useRef<gsap.core.Tween | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const button = buttonRef.current;
    const fill = fillRef.current;
    const border = borderRef.current;
    const label = labelRef.current;
    if (!button || !fill || !border || !label) {
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduced = () => {
      reducedMotionRef.current = mq.matches;
    };
    updateReduced();
    mq.addEventListener("change", updateReduced);

    syncButtonWidth(button, label);
    const resizeObserver = new ResizeObserver(() => {
      syncButtonWidth(button, label);
    });
    resizeObserver.observe(label);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => syncButtonWidth(button, label));
    }

    setIdle(fill, border, label);

    const playHoverIn = () => {
      hoverTweenRef.current?.kill();
      clickTweenRef.current?.kill();

      if (reducedMotionRef.current) {
        gsap.set(label, { color: PINK, scale: 1 });
        gsap.set(fill, { scaleX: 0, transformOrigin: WIPE_ORIGIN });
        gsap.set(border, { scaleX: 0, transformOrigin: WIPE_ORIGIN });
        return;
      }

      gsap.set(fill, { scaleX: 1, transformOrigin: WIPE_ORIGIN });
      gsap.set(border, { scaleX: 1, transformOrigin: WIPE_ORIGIN });
      gsap.set(label, { color: PINK });

      const tl = gsap.timeline();
      hoverTweenRef.current = tl;

      tl.to(
        fill,
        {
          scaleX: 0,
          duration: 0.48,
          ease: WIPE_EASE,
          transformOrigin: WIPE_ORIGIN,
        },
        0,
      );

      tl.to(
        border,
        {
          scaleX: 0,
          duration: 0.28,
          ease: WIPE_EASE,
          transformOrigin: WIPE_ORIGIN,
        },
        0.16,
      );
    };

    const playHoverOut = () => {
      hoverTweenRef.current?.kill();
      clickTweenRef.current?.kill();
      setIdle(fill, border, label);
    };

    const playClickDown = () => {
      clickTweenRef.current?.kill();
      clickTweenRef.current = gsap.to(label, {
        scale: 0.92,
        duration: reducedMotionRef.current ? 0.05 : 0.06,
        ease: reducedMotionRef.current ? "none" : "power2.out",
      });
    };

    const playClickUp = () => {
      clickTweenRef.current?.kill();
      clickTweenRef.current = gsap.to(label, {
        scale: 1,
        duration: reducedMotionRef.current ? 0.05 : 0.1,
        ease: reducedMotionRef.current ? "none" : "back.out(1.2)",
      });
    };

    button.addEventListener("mouseenter", playHoverIn);
    button.addEventListener("mouseleave", playHoverOut);
    button.addEventListener("pointerdown", playClickDown);
    button.addEventListener("pointerup", playClickUp);
    button.addEventListener("pointercancel", playClickUp);

    return () => {
      resizeObserver.disconnect();
      mq.removeEventListener("change", updateReduced);
      button.removeEventListener("mouseenter", playHoverIn);
      button.removeEventListener("mouseleave", playHoverOut);
      button.removeEventListener("pointerdown", playClickDown);
      button.removeEventListener("pointerup", playClickUp);
      button.removeEventListener("pointercancel", playClickUp);
      hoverTweenRef.current?.kill();
      clickTweenRef.current?.kill();
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.button}
      aria-label="确认"
    >
      <span ref={labelRef} className={styles.label}>
        确认
      </span>
      <span ref={fillRef} className={styles.fill} aria-hidden />
      <span ref={borderRef} className={styles.border} aria-hidden />
    </button>
  );
}
