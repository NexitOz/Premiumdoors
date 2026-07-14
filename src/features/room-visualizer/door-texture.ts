import { shade, isDarkColor } from "@/lib/color";
import type { DoorModel } from "@/types/door";

const TEX_W = 320;
const TEX_H = 800;

function grad(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, from: string, to: string) {
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  return g;
}

export function renderDoorTexture(door: DoorModel, finishHex: string, handleHex: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext("2d")!;
  const dark = isDarkColor(finishHex);
  const panel = shade(finishHex, dark ? 0.04 : -0.035);
  const bevOut = shade(finishHex, dark ? 0.14 : -0.12);
  const bevIn = shade(finishHex, dark ? 0.22 : 0.18);

  ctx.fillStyle = finishHex;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // edge shading
  const edgeL = ctx.createLinearGradient(0, 0, 16, 0);
  edgeL.addColorStop(0, `${shade(finishHex, 0.3)}E6`);
  edgeL.addColorStop(1, `${shade(finishHex, 0.3)}00`);
  ctx.fillStyle = edgeL;
  ctx.fillRect(0, 0, 16, TEX_H);

  const edgeR = ctx.createLinearGradient(TEX_W, 0, TEX_W - 16, 0);
  edgeR.addColorStop(0, `${shade(finishHex, -0.22)}8C`);
  edgeR.addColorStop(1, `${shade(finishHex, -0.22)}00`);
  ctx.fillStyle = edgeR;
  ctx.fillRect(TEX_W - 16, 0, 16, TEX_H);

  if (door.system === "classic") {
    drawPanel(ctx, 52, 62, 216, 300, bevOut, panel);
    drawPanel(ctx, 52, 438, 216, 300, bevOut, panel);
  } else if (door.system === "tsarga") {
    for (const y of [192, 396, 592]) {
      ctx.fillStyle = shade(finishHex, dark ? 0.2 : -0.18) + "8C";
      ctx.fillRect(36, y, 248, 10);
      ctx.fillStyle = shade(finishHex, 0.4) + "80";
      ctx.fillRect(36, y, 248, 3);
    }
  } else if (door.system === "milled") {
    for (const x of [92, 150, 208]) {
      ctx.fillStyle = shade(finishHex, dark ? 0.18 : -0.16) + "80";
      ctx.fillRect(x, 54, 6, 692);
    }
  } else if (door.system === "glass") {
    ctx.fillStyle = bevOut;
    ctx.fillRect(56, 56, 208, 652);
    ctx.fillStyle = grad(ctx, 66, 66, 188, 632, "#eef3f5", "#d7dfe4");
    ctx.fillRect(66, 66, 188, 632);
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.beginPath();
    ctx.moveTo(66, 300);
    ctx.lineTo(254, 120);
    ctx.lineTo(254, 205);
    ctx.lineTo(66, 385);
    ctx.closePath();
    ctx.fill();
  } else if (door.system === "flush") {
    ctx.fillStyle = shade(finishHex, dark ? 0.24 : -0.2) + "99";
    ctx.fillRect(286, 368, 9, 132);
  }

  if (door.system !== "flush") {
    ctx.fillStyle = handleHex;
    ctx.fillRect(276, 392, 12, 20);
    ctx.beginPath();
    ctx.arc(286, 404, 11, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

function drawPanel(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, bevOut: string, inner: string) {
  ctx.fillStyle = bevOut;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = inner + "80";
  ctx.fillRect(x + 16, y + 16, w - 32, h - 32);
}
