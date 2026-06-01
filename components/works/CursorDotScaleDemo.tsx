"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorDotScaleDemo.module.css";

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], [data-cursor-active]';

export function CursorDotScaleDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setIsDesktop(!coarsePointer);

    if (coarsePointer) {
      return;
    }

    const stage = stageRef.current;
    const dot = dotRef.current;
    if (!stage || !dot) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      dot.classList.add(styles.dotStatic);
    }

    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = false;
    let active = false;

    const applyDotState = () => {
      dot.style.left = `${currentX}px`;
      dot.style.top = `${currentY}px`;
      dot.classList.toggle(styles.dotVisible, visible);
      dot.classList.toggle(styles.dotActive, active);
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      applyDotState();
      frameId = window.requestAnimationFrame(updatePosition);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        visible = false;
        active = false;
        applyDotState();
        return;
      }

      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      visible = true;

      const target = document.elementFromPoint(event.clientX, event.clientY);
      active = Boolean(
        target?.closest(CLICKABLE_SELECTOR) &&
          stage.contains(target.closest(CLICKABLE_SELECTOR)),
      );
      applyDotState();
    };

    const handlePointerLeave = () => {
      visible = false;
      active = false;
      applyDotState();
    };

    frameId = window.requestAnimationFrame(updatePosition);
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  if (!isDesktop) {
    return (
      <div className={styles.mobileFallback}>
        该交互适合在桌面端体验。请使用鼠标在演示框内移动，悬停可点击元素时圆点会放大。
      </div>
    );
  }

  return (
    <div ref={stageRef} className={styles.stage}>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.brand}>Cursor Lab</span>
          <nav className={styles.nav} aria-label="演示导航">
            <button type="button" className={styles.navItem}>
              Projects
            </button>
            <button type="button" className={styles.navItem}>
              About
            </button>
            <button type="button" className={styles.ctaButton}>
              Contact
            </button>
          </nav>
        </div>

        <div className={styles.cards}>
          <button type="button" className={styles.card} data-cursor-active>
            <p className={styles.cardTitle}>Hover Item A</p>
            <p className={styles.cardText}>移到可点击元素上，圆点会放大。</p>
          </button>
          <button type="button" className={styles.card} data-cursor-active>
            <p className={styles.cardTitle}>Hover Item B</p>
            <p className={styles.cardText}>颜色会持续循环变化。</p>
          </button>
          <button type="button" className={styles.card} data-cursor-active>
            <p className={styles.cardTitle}>Hover Item C</p>
            <p className={styles.cardText}>效果只在演示框内生效。</p>
          </button>
        </div>

        <p className={styles.hint}>在框内移动鼠标，移到可点击元素上时圆点会放大。</p>
      </div>
    </div>
  );
}
