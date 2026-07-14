export interface Point {
  x: number;
  y: number;
}

export type Quad = [Point, Point, Point, Point];

/**
 * 3x3 homography as [a11,a21,a31, a12,a22,a32, a13,a23,1]
 * Maps homogeneous (u,v,1) -> (x,y,w) via:
 *  x = a11*u + a21*v + a31
 *  y = a12*u + a22*v + a32
 *  w = a13*u + a23*v + 1
 */
export type Homography = number[];

/** Maps the unit square (0,0)-(1,0)-(1,1)-(0,1) onto an arbitrary quad. */
function squareToQuad(quad: Quad): Homography {
  const [p0, p1, p2, p3] = quad;
  const dx1 = p1.x - p2.x;
  const dx2 = p3.x - p2.x;
  const dx3 = p0.x - p1.x + p2.x - p3.x;
  const dy1 = p1.y - p2.y;
  const dy2 = p3.y - p2.y;
  const dy3 = p0.y - p1.y + p2.y - p3.y;

  let a13 = 0;
  let a23 = 0;
  let a11: number, a21: number, a31: number, a12: number, a22: number, a32: number;

  if (Math.abs(dx3) < 1e-9 && Math.abs(dy3) < 1e-9) {
    a11 = p1.x - p0.x;
    a21 = p2.x - p1.x;
    a31 = p0.x;
    a12 = p1.y - p0.y;
    a22 = p2.y - p1.y;
    a32 = p0.y;
  } else {
    const denom = dx1 * dy2 - dx2 * dy1;
    a13 = (dx3 * dy2 - dx2 * dy3) / denom;
    a23 = (dx1 * dy3 - dx3 * dy1) / denom;
    a11 = p1.x - p0.x + a13 * p1.x;
    a21 = p3.x - p0.x + a23 * p3.x;
    a31 = p0.x;
    a12 = p1.y - p0.y + a13 * p1.y;
    a22 = p3.y - p0.y + a23 * p3.y;
    a32 = p0.y;
  }

  return [a11, a21, a31, a12, a22, a32, a13, a23, 1];
}

function multiply3x3(a: Homography, b: Homography): Homography {
  const r = new Array(9).fill(0);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      r[row * 3 + col] =
        a[row * 3 + 0] * b[0 * 3 + col] + a[row * 3 + 1] * b[1 * 3 + col] + a[row * 3 + 2] * b[2 * 3 + col];
    }
  }
  return r;
}

/** Homography that maps a pixel rect [0,w]x[0,h] onto the given quad. */
export function rectToQuad(width: number, height: number, quad: Quad): Homography {
  // squareToQuad expects row-major [a11,a21,a31, a12,a22,a32, a13,a23,1] acting as
  // x = a11 u + a21 v + a31 — represent as full 3x3 for composition:
  const M = squareToQuad(quad);
  const Mfull: Homography = [M[0], M[1], M[2], M[3], M[4], M[5], M[6], M[7], M[8]];
  const S: Homography = [1 / width, 0, 0, 0, 1 / height, 0, 0, 0, 1];
  return multiply3x3(Mfull, S);
}

function invert3x3(m: Homography): Homography {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h;
  const B = -(d * i - f * g);
  const C = d * h - e * g;
  const D = -(b * i - c * h);
  const E = a * i - c * g;
  const F = -(a * h - b * g);
  const G = b * f - c * e;
  const H = -(a * f - c * d);
  const I = a * e - b * d;
  const det = a * A + b * B + c * C;
  if (Math.abs(det) < 1e-12) return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const invDet = 1 / det;
  return [A * invDet, D * invDet, G * invDet, B * invDet, E * invDet, H * invDet, C * invDet, F * invDet, I * invDet];
}

export function applyHomography(h: Homography, x: number, y: number): Point {
  const w = h[6] * x + h[7] * y + h[8];
  return {
    x: (h[0] * x + h[1] * y + h[2]) / w,
    y: (h[3] * x + h[4] * y + h[5]) / w,
  };
}

export function quadBounds(quad: Quad) {
  const xs = quad.map((p) => p.x);
  const ys = quad.map((p) => p.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

/**
 * Warps `source` (a rect of sourceW x sourceH) into `quad` on the destination
 * canvas context, using inverse mapping + bilinear sampling.
 */
export function warpImageToQuad(
  ctx: CanvasRenderingContext2D,
  source: HTMLCanvasElement,
  quad: Quad,
  opts: { alpha?: number } = {}
) {
  const sourceW = source.width;
  const sourceH = source.height;
  const H = rectToQuad(sourceW, sourceH, quad);
  const Hinv = invert3x3(H);

  const { minX, maxX, minY, maxY } = quadBounds(quad);
  const x0 = Math.max(0, Math.floor(minX));
  const y0 = Math.max(0, Math.floor(minY));
  const x1 = Math.min(ctx.canvas.width, Math.ceil(maxX));
  const y1 = Math.min(ctx.canvas.height, Math.ceil(maxY));
  const destW = Math.max(1, x1 - x0);
  const destH = Math.max(1, y1 - y0);
  if (destW <= 1 || destH <= 1) return;

  const srcCtx = source.getContext("2d");
  if (!srcCtx) return;
  const srcData = srcCtx.getImageData(0, 0, sourceW, sourceH).data;
  const destImage = ctx.createImageData(destW, destH);
  const destData = destImage.data;
  const alpha = opts.alpha ?? 1;

  for (let dy = 0; dy < destH; dy++) {
    for (let dx = 0; dx < destW; dx++) {
      const px = x0 + dx + 0.5;
      const py = y0 + dy + 0.5;
      const src = applyHomography(Hinv, px, py);
      const di = (dy * destW + dx) * 4;

      if (src.x < 0 || src.x >= sourceW - 1 || src.y < 0 || src.y >= sourceH - 1) {
        continue;
      }

      const sx0 = Math.floor(src.x);
      const sy0 = Math.floor(src.y);
      const fx = src.x - sx0;
      const fy = src.y - sy0;

      for (let c = 0; c < 4; c++) {
        const i00 = (sy0 * sourceW + sx0) * 4 + c;
        const i10 = (sy0 * sourceW + sx0 + 1) * 4 + c;
        const i01 = ((sy0 + 1) * sourceW + sx0) * 4 + c;
        const i11 = ((sy0 + 1) * sourceW + sx0 + 1) * 4 + c;
        const top = srcData[i00] * (1 - fx) + srcData[i10] * fx;
        const bottom = srcData[i01] * (1 - fx) + srcData[i11] * fx;
        destData[di + c] = top * (1 - fy) + bottom * fy;
      }
      destData[di + 3] *= alpha;
    }
  }

  ctx.putImageData(destImage, x0, y0);
}
