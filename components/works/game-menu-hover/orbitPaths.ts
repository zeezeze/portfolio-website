/** Orbit radius in px — subtle motion around anchor point */
export const ORBIT_R = 12;

/** SVG layout size matching viewBox (1 user unit ≈ 1 CSS px) */
export const PATH_VIEW_SIZE = (ORBIT_R + 2) * 2;

/** Clockwise circle centered at anchor (0,0) */
export const PATH_CIRCLE = `M ${ORBIT_R} 0 A ${ORBIT_R} ${ORBIT_R} 0 1 1 ${-ORBIT_R + 0.01} 0 A ${ORBIT_R} ${ORBIT_R} 0 1 1 ${ORBIT_R} 0`;

/** Rounded square — counter-clockwise when animated start→end reversed per segment */
export const PATH_SQUARE = `M 0 ${-ORBIT_R} Q ${ORBIT_R * 0.35} ${-ORBIT_R} ${ORBIT_R} ${-ORBIT_R * 0.35} L ${ORBIT_R} ${ORBIT_R * 0.35} Q ${ORBIT_R} ${ORBIT_R} ${ORBIT_R * 0.35} ${ORBIT_R} L ${-ORBIT_R * 0.35} ${ORBIT_R} Q ${-ORBIT_R} ${ORBIT_R} ${-ORBIT_R} ${ORBIT_R * 0.35} L ${-ORBIT_R} ${-ORBIT_R * 0.35} Q ${-ORBIT_R} ${-ORBIT_R} ${-ORBIT_R * 0.35} ${-ORBIT_R} Z`;

/** Rounded triangle — clockwise */
export const PATH_TRIANGLE = `M 0 ${-ORBIT_R} Q ${ORBIT_R * 0.2} ${-ORBIT_R * 0.9} ${ORBIT_R * 0.75} ${ORBIT_R * 0.45} L ${ORBIT_R * 0.35} ${ORBIT_R * 0.95} Q 0 ${ORBIT_R * 1.05} ${-ORBIT_R * 0.35} ${ORBIT_R * 0.95} L ${-ORBIT_R * 0.75} ${ORBIT_R * 0.45} Q ${-ORBIT_R * 0.2} ${-ORBIT_R * 0.9} 0 ${-ORBIT_R} Z`;
