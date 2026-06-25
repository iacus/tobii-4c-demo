/** Presets de display_area (mm) para el Tobii — esquinas tl/tr/bl. */

export function formatAreaSize(area) {
  const w = Math.abs(area.tr.x - area.tl.x);
  const h = Math.abs(area.tl.y - area.bl.y);
  return `${Math.round(w)}×${Math.round(h)} mm`;
}

/** Big plane con relación de aspecto del viewport actual (base 1000 mm de ancho). */
export function buildBigPlaneArea(viewport = window) {
  const baseWidth = 1000;
  const aspect = Math.max(0.5, viewport.innerWidth / Math.max(1, viewport.innerHeight));
  const height = Math.round(baseWidth / aspect);
  const half = baseWidth / 2;
  return {
    tl: { x: -half, y: height, z: 0 },
    tr: { x: half, y: height, z: 0 },
    bl: { x: -half, y: 0, z: 0 },
  };
}

/**
 * MacBook Pro 16" (Liquid Retina XDR, ~345×224 mm activos).
 * Aspecto ~1728:1117 / 3456:2234; margen ~15 % para alcanzar esquinas con la mirada.
 */
export function macbookPro16Area() {
  const width = 400;
  const height = Math.round(width / (3456 / 2234));
  const half = width / 2;
  return {
    tl: { x: -half, y: height, z: 0 },
    tr: { x: half, y: height, z: 0 },
    bl: { x: -half, y: 0, z: 0 },
  };
}
