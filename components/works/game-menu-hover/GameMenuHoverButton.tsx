"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useId, useRef } from "react";
import { playFilterGlitchBurst } from "./glitchBurst";
import styles from "./gameMenuHover.module.css";
import {
  ORBIT_R,
  PATH_CIRCLE,
  PATH_SQUARE,
  PATH_TRIANGLE,
  PATH_VIEW_SIZE,
} from "./orbitPaths";

gsap.registerPlugin(MotionPathPlugin);

const PINK = "#F08080";
const BLACK = "#000000";
const ORBIT_DURATION = 5;
const SEGMENT_EASE = "power2.inOut";

type GameMenuHoverButtonProps = {
  label: string;
};

function setIdleState(label: HTMLElement, squares: HTMLElement[]) {
  gsap.set(label, { color: BLACK });
  for (const sq of squares) {
    gsap.set(sq, { scale: 0, rotation: 180, opacity: 0 });
  }
}

function clearWrapTransforms(wraps: HTMLElement[]) {
  for (const wrap of wraps) {
    gsap.set(wrap, { clearProps: "transform" });
  }
}

function snapWrapToPathStart(wrap: HTMLElement, pathEl: SVGPathElement) {
  gsap.set(wrap, {
    motionPath: {
      path: pathEl,
      align: pathEl,
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
      start: 0,
      end: 0,
    },
  });
}

function snapAllWrapsToPathStart(
  redWrap: HTMLElement,
  blackWrap: HTMLElement,
  whiteWrap: HTMLElement,
  pathCircle: SVGPathElement,
  pathTriangle: SVGPathElement,
  pathSquare: SVGPathElement,
) {
  snapWrapToPathStart(redWrap, pathCircle);
  snapWrapToPathStart(blackWrap, pathTriangle);
  snapWrapToPathStart(whiteWrap, pathSquare);
}

function killOrbitTweens(refs: {
  redOrbit: gsap.core.Tween | gsap.core.Timeline | null;
  whiteOrbit: gsap.core.Tween | gsap.core.Timeline | null;
  blackOrbit: gsap.core.Tween | gsap.core.Timeline | null;
  blackSpin: gsap.core.Timeline | null;
}) {
  refs.redOrbit?.kill();
  refs.whiteOrbit?.kill();
  refs.blackOrbit?.kill();
  refs.blackSpin?.kill();
  refs.redOrbit = null;
  refs.whiteOrbit = null;
  refs.blackOrbit = null;
  refs.blackSpin = null;
}

function startCircleOrbit(
  wrap: HTMLElement,
  pathEl: SVGPathElement,
): gsap.core.Tween {
  return gsap.to(wrap, {
    duration: ORBIT_DURATION,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: pathEl,
      align: pathEl,
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
    },
  });
}

function startSegmentedOrbit(
  wrap: HTMLElement,
  pathEl: SVGPathElement,
  segments: number,
  reverse: boolean,
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1 });
  const step = 1 / segments;

  for (let i = 0; i < segments; i += 1) {
    const start = reverse ? 1 - i * step : i * step;
    const end = reverse ? 1 - (i + 1) * step : (i + 1) * step;

    tl.to(wrap, {
      duration: ORBIT_DURATION / segments,
      ease: SEGMENT_EASE,
      motionPath: {
        path: pathEl,
        align: pathEl,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start,
        end,
      },
    });
  }

  return tl;
}

function startBlackSpin(inner: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1 });
  tl.to(inner, { rotation: "+=360", duration: 0.5, ease: "power2.inOut" });
  tl.to(inner, { rotation: "-=360", duration: 0.5, ease: "power2.inOut" }, "+=3");
  return tl;
}

export function GameMenuHoverButton({ label }: GameMenuHoverButtonProps) {
  const uid = useId().replace(/:/g, "");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const redWrapRef = useRef<HTMLDivElement>(null);
  const blackWrapRef = useRef<HTMLDivElement>(null);
  const whiteWrapRef = useRef<HTMLDivElement>(null);
  const redSqRef = useRef<HTMLSpanElement>(null);
  const blackSqRef = useRef<HTMLSpanElement>(null);
  const whiteSqRef = useRef<HTMLSpanElement>(null);
  const blackInnerRef = useRef<HTMLDivElement>(null);
  const pathCircleRef = useRef<SVGPathElement>(null);
  const pathSquareRef = useRef<SVGPathElement>(null);
  const pathTriangleRef = useRef<SVGPathElement>(null);

  const hoverTweenRef = useRef<gsap.core.Timeline | null>(null);
  const glitchCleanupRef = useRef<(() => void) | null>(null);
  const orbitRefs = useRef({
    redOrbit: null as gsap.core.Tween | gsap.core.Timeline | null,
    whiteOrbit: null as gsap.core.Tween | gsap.core.Timeline | null,
    blackOrbit: null as gsap.core.Tween | gsap.core.Timeline | null,
    blackSpin: null as gsap.core.Timeline | null,
  });
  const reducedMotionRef = useRef(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const button = buttonRef.current;
    const labelEl = labelRef.current;
    const canvas = canvasRef.current;
    const zone = zoneRef.current;
    const source = sourceRef.current;
    const redWrap = redWrapRef.current;
    const blackWrap = blackWrapRef.current;
    const whiteWrap = whiteWrapRef.current;
    const redSq = redSqRef.current;
    const blackSq = blackSqRef.current;
    const whiteSq = whiteSqRef.current;
    const blackInner = blackInnerRef.current;
    const pathCircle = pathCircleRef.current;
    const pathSquare = pathSquareRef.current;
    const pathTriangle = pathTriangleRef.current;

    if (
      !button ||
      !labelEl ||
      !canvas ||
      !zone ||
      !source ||
      !redWrap ||
      !blackWrap ||
      !whiteWrap ||
      !redSq ||
      !blackSq ||
      !whiteSq ||
      !blackInner ||
      !pathCircle ||
      !pathSquare ||
      !pathTriangle
    ) {
      return;
    }

    const squareEls = [redSq, blackSq, whiteSq];
    const wrapEls = [redWrap, blackWrap, whiteWrap];

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduced = () => {
      reducedMotionRef.current = mq.matches;
    };
    updateReduced();
    mq.addEventListener("change", updateReduced);

    setIdleState(labelEl, squareEls);
    clearWrapTransforms(wrapEls);
    gsap.set(blackInner, { rotation: 0 });

    const runGlitch = () => {
      glitchCleanupRef.current?.();
      if (reducedMotionRef.current) {
        return;
      }
      glitchCleanupRef.current = playFilterGlitchBurst(
        source,
        zone,
        canvas,
        {
          sourceActive: styles.glitchSourceActive,
          scanlines: styles.glitchScanBurst,
        },
        200,
      );
    };

    const startOrbits = () => {
      killOrbitTweens(orbitRefs.current);

      if (reducedMotionRef.current) {
        gsap.set(wrapEls, { x: 0, y: 0 });
        return;
      }

      orbitRefs.current.redOrbit = startCircleOrbit(redWrap, pathCircle);
      orbitRefs.current.whiteOrbit = startSegmentedOrbit(
        whiteWrap,
        pathSquare,
        4,
        true,
      );
      orbitRefs.current.blackOrbit = startSegmentedOrbit(
        blackWrap,
        pathTriangle,
        3,
        false,
      );
      orbitRefs.current.blackSpin = startBlackSpin(blackInner);
    };

    const playHoverIn = () => {
      if (isHoveredRef.current) {
        return;
      }
      isHoveredRef.current = true;

      hoverTweenRef.current?.kill();
      killOrbitTweens(orbitRefs.current);

      runGlitch();

      snapAllWrapsToPathStart(
        redWrap,
        blackWrap,
        whiteWrap,
        pathCircle,
        pathTriangle,
        pathSquare,
      );

      if (reducedMotionRef.current) {
        gsap.set(labelEl, { color: PINK });
        gsap.set(redSq, { scale: 1, rotation: -6, opacity: 1 });
        gsap.set(blackSq, { scale: 1, rotation: -10, opacity: 1 });
        gsap.set(whiteSq, { scale: 1, rotation: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          if (isHoveredRef.current) {
            startOrbits();
          }
        },
      });
      hoverTweenRef.current = tl;

      tl.to(labelEl, { color: PINK, duration: 0.35, ease: "power2.out" }, 0);
      tl.to(
        redSq,
        {
          scale: 1,
          rotation: -6,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(1.4)",
        },
        0,
      );
      tl.to(
        blackSq,
        {
          scale: 1,
          rotation: -10,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(1.4)",
        },
        0.04,
      );
      tl.to(
        whiteSq,
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(1.4)",
        },
        0.08,
      );
    };

    const playHoverOut = () => {
      isHoveredRef.current = false;
      hoverTweenRef.current?.kill();
      killOrbitTweens(orbitRefs.current);
      glitchCleanupRef.current?.();
      glitchCleanupRef.current = null;

      if (reducedMotionRef.current) {
        setIdleState(labelEl, squareEls);
        clearWrapTransforms(wrapEls);
        gsap.set(blackInner, { rotation: 0 });
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          clearWrapTransforms(wrapEls);
        },
      });
      hoverTweenRef.current = tl;

      tl.to(labelEl, { color: BLACK, duration: 0.28, ease: "power2.inOut" }, 0);
      tl.to(
        squareEls,
        {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.38,
          ease: "power2.in",
          stagger: 0.03,
        },
        0,
      );
      tl.set(blackInner, { rotation: 0 }, 0.38);
    };

    const onEnter = () => playHoverIn();
    const onLeave = () => playHoverOut();
    const onFocus = () => playHoverIn();
    const onBlur = () => playHoverOut();

    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);
    button.addEventListener("focus", onFocus);
    button.addEventListener("blur", onBlur);

    const orbits = orbitRefs.current;

    return () => {
      mq.removeEventListener("change", updateReduced);
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
      button.removeEventListener("focus", onFocus);
      button.removeEventListener("blur", onBlur);
      hoverTweenRef.current?.kill();
      killOrbitTweens(orbits);
      glitchCleanupRef.current?.();
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.menuItem}
      aria-label={label}
    >
      <span className={styles.rule} aria-hidden />
      <div ref={zoneRef} className={styles.contentZone}>
        <canvas ref={canvasRef} className={styles.glitchCanvas} aria-hidden />
        <div ref={sourceRef} className={styles.glitchSource}>
          <div className={styles.orbitLeft}>
            <svg
              className={styles.pathSvg}
              viewBox={`${-ORBIT_R - 2} ${-ORBIT_R - 2} ${PATH_VIEW_SIZE} ${PATH_VIEW_SIZE}`}
              width={PATH_VIEW_SIZE}
              height={PATH_VIEW_SIZE}
              aria-hidden
            >
              <path ref={pathCircleRef} id={`circle-${uid}`} d={PATH_CIRCLE} />
              <path
                ref={pathTriangleRef}
                id={`triangle-${uid}`}
                d={PATH_TRIANGLE}
              />
            </svg>
            <div ref={redWrapRef} className={`${styles.sqWrap} ${styles.sqWrapRed}`}>
              <span
                ref={redSqRef}
                className={`${styles.sq} ${styles.sqRed}`}
              />
            </div>
            <div
              ref={blackWrapRef}
              className={`${styles.sqWrap} ${styles.sqWrapBlack}`}
            >
              <div className={styles.sqBlackOffset}>
                <div ref={blackInnerRef} className={styles.sqBlackSpin}>
                  <span
                    ref={blackSqRef}
                    className={`${styles.sq} ${styles.sqBlack}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <span ref={labelRef} className={styles.label} data-menu-label>
            {label}
          </span>

          <div className={styles.orbitRight}>
            <svg
              className={styles.pathSvg}
              viewBox={`${-ORBIT_R - 2} ${-ORBIT_R - 2} ${PATH_VIEW_SIZE} ${PATH_VIEW_SIZE}`}
              width={PATH_VIEW_SIZE}
              height={PATH_VIEW_SIZE}
              aria-hidden
            >
              <path ref={pathSquareRef} id={`square-${uid}`} d={PATH_SQUARE} />
            </svg>
            <div ref={whiteWrapRef} className={styles.sqWrap}>
              <span
                ref={whiteSqRef}
                className={`${styles.sq} ${styles.sqWhite}`}
              />
            </div>
          </div>
        </div>
      </div>
      <span className={styles.rule} aria-hidden />
    </button>
  );
}
