export interface LightingProfile {
  brightness: number;
  saturate: number;
  warmth: number;
  tintHex: string;
  tintAlpha: number;
}

/**
 * Samples a region of a photo (sparsely, for performance) and estimates
 * an approximate brightness / colour-temperature profile so the inserted
 * door can be tinted to roughly match the room's light.
 *
 * This is a lightweight heuristic (average-pixel colour analysis), not a
 * neural colour-constancy model — it reacts to obviously warm or cool
 * lighting but won't handle mixed/complex lighting perfectly.
 */
export function analyzeLighting(
  ctx: CanvasRenderingContext2D,
  region: { x: number; y: number; w: number; h: number }
): LightingProfile {
  const x = Math.max(0, Math.floor(region.x));
  const y = Math.max(0, Math.floor(region.y));
  const w = Math.max(1, Math.min(Math.floor(region.w), ctx.canvas.width - x));
  const h = Math.max(1, Math.min(Math.floor(region.h), ctx.canvas.height - y));

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(x, y, w, h).data;
  } catch {
    return { brightness: 1, saturate: 1, warmth: 0, tintHex: "#ffffff", tintAlpha: 0 };
  }

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  const stride = 4 * 6; // sample every 6th pixel for performance

  for (let i = 0; i < data.length; i += stride) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  if (count === 0) return { brightness: 1, saturate: 1, warmth: 0, tintHex: "#ffffff", tintAlpha: 0 };

  r /= count;
  g /= count;
  b /= count;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const brightness = clamp(luminance / 150, 0.82, 1.2);
  const warmth = clamp((r - b) / 255, -0.35, 0.35);

  const tintHex = warmth >= 0 ? "#ffb066" : "#7fa8ff";
  const tintAlpha = Math.min(Math.abs(warmth) * 0.55, 0.16);

  return {
    brightness,
    saturate: clamp(1 + warmth * 0.3, 0.85, 1.15),
    warmth,
    tintHex,
    tintAlpha,
  };
}

export function applyLightingProfile(source: HTMLCanvasElement, profile: LightingProfile): HTMLCanvasElement {
  const out = document.createElement("canvas");
  out.width = source.width;
  out.height = source.height;
  const ctx = out.getContext("2d")!;
  ctx.filter = `brightness(${profile.brightness}) saturate(${profile.saturate})`;
  ctx.drawImage(source, 0, 0);
  ctx.filter = "none";

  if (profile.tintAlpha > 0) {
    ctx.globalCompositeOperation = "soft-light";
    ctx.globalAlpha = profile.tintAlpha;
    ctx.fillStyle = profile.tintHex;
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }

  return out;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
