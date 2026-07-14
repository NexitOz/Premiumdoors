"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { renderDoorTexture } from "./door-texture";
import { analyzeLighting, applyLightingProfile } from "@/lib/lighting";
import { warpImageToQuad, type Quad } from "@/lib/homography";
import { shade } from "@/lib/color";
import type { DoorModel } from "@/types/door";

const DEMO_W = 1200;
const DEMO_H = 800;

function defaultQuad(w: number, h: number): Quad {
  const doorW = w * 0.19;
  const doorH = h * 0.62;
  const cx = w * 0.6;
  const topY = h * 0.16;
  const skew = doorW * 0.08;
  return [
    { x: cx - doorW / 2 + skew, y: topY },
    { x: cx + doorW / 2, y: topY - skew * 0.3 },
    { x: cx + doorW / 2, y: topY + doorH - skew * 0.3 },
    { x: cx - doorW / 2 + skew, y: topY + doorH },
  ];
}

function drawDemoRoom(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const wallY = h * 0.6;
  const wall = ctx.createLinearGradient(0, 0, 0, wallY);
  wall.addColorStop(0, "#f1f2f4");
  wall.addColorStop(1, "#e6e8eb");
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, w, wallY);

  const floor = ctx.createLinearGradient(0, wallY, 0, h);
  floor.addColorStop(0, "#cfd3d8");
  floor.addColorStop(1, "#aab0b7");
  ctx.fillStyle = floor;
  ctx.fillRect(0, wallY, w, h - wallY);

  ctx.fillStyle = "#fbfcfd";
  ctx.fillRect(0, wallY - h * 0.006, w, h * 0.012);

  const fx = w * 0.07;
  const fy = h * 0.12;
  const fw = w * 0.22;
  const fh = h * 0.32;
  ctx.save();
  ctx.shadowColor = "rgba(15,17,20,0.14)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(fx, fy, fw, fh);
  ctx.restore();
  const fg = ctx.createLinearGradient(fx, fy, fx + fw, fy + fh);
  fg.addColorStop(0, "#fdfdfe");
  fg.addColorStop(1, "#dfe4e8");
  ctx.fillStyle = fg;
  ctx.fillRect(fx + fw * 0.04, fy + fh * 0.04, fw * 0.92, fh * 0.92);
}

interface RoomCanvasProps {
  door: DoorModel;
  finishHex: string;
  handleHex: string;
}

export function RoomCanvas({ door, finishHex, handleHex }: RoomCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [corners, setCorners] = useState<Quad>(() => defaultQuad(DEMO_W, DEMO_H));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hasCustomPhoto, setHasCustomPhoto] = useState(false);

  const canvasSize = photo
    ? scaleToMax(photo.naturalWidth, photo.naturalHeight, 1400)
    : { w: DEMO_W, h: DEMO_H };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (photo) {
      ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
    } else {
      drawDemoRoom(ctx, canvas.width, canvas.height);
    }

    const bounds = {
      x: Math.min(...corners.map((p) => p.x)) - 20,
      y: Math.min(...corners.map((p) => p.y)) - 20,
      w: Math.max(...corners.map((p) => p.x)) - Math.min(...corners.map((p) => p.x)) + 40,
      h: Math.max(...corners.map((p) => p.y)) - Math.min(...corners.map((p) => p.y)) + 40,
    };
    const lighting = analyzeLighting(ctx, bounds);

    // contact shadow
    const bottomMidX = (corners[2].x + corners[3].x) / 2;
    const bottomY = (corners[2].y + corners[3].y) / 2;
    const doorWidthPx = Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y);
    const shadowW = doorWidthPx * 1.3;
    const shadowH = doorWidthPx * 0.22;
    const shGrad = ctx.createRadialGradient(bottomMidX, bottomY, 0, bottomMidX, bottomY, shadowW / 2);
    shGrad.addColorStop(0, "rgba(14,16,19,0.32)");
    shGrad.addColorStop(1, "rgba(14,16,19,0)");
    ctx.save();
    ctx.translate(bottomMidX, bottomY);
    ctx.scale(1, shadowH / (shadowW / 2));
    ctx.translate(-bottomMidX, -bottomY);
    ctx.fillStyle = shGrad;
    ctx.beginPath();
    ctx.ellipse(bottomMidX, bottomY, shadowW / 2, shadowW / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const rawTexture = renderDoorTexture(door, finishHex, handleHex);
    const texture = applyLightingProfile(rawTexture, lighting);
    warpImageToQuad(ctx, texture, corners);

    ctx.font = `500 ${Math.round(canvas.width * 0.011)}px monospace`;
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("ATRIUM · примерка онлайн", canvas.width - 18, canvas.height - 16);
    ctx.fillStyle = "rgba(14,16,19,0.55)";
    ctx.fillText("ATRIUM · примерка онлайн", canvas.width - 18, canvas.height - 17);
  }, [photo, corners, door, finishHex, handleHex, canvasSize.w, canvasSize.h]);

  useEffect(() => {
    render();
  }, [render]);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const size = scaleToMax(img.naturalWidth, img.naturalHeight, 1400);
      setPhoto(img);
      setHasCustomPhoto(true);
      setCorners(defaultQuad(size.w, size.h));
    };
    img.src = url;
  }

  function pointerToCanvas(e: React.PointerEvent | PointerEvent): { x: number; y: number } | null {
    const container = containerRef.current;
    if (!container) return null;
    const rect = container.getBoundingClientRect();
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top) / rect.height;
    return {
      x: Math.max(0, Math.min(canvasSize.w, fx * canvasSize.w)),
      y: Math.max(0, Math.min(canvasSize.h, fy * canvasSize.h)),
    };
  }

  useEffect(() => {
    if (dragIndex === null) return;
    function onMove(e: PointerEvent) {
      const pt = pointerToCanvas(e);
      if (!pt) return;
      setCorners((prev) => {
        const next = [...prev] as Quad;
        next[dragIndex!] = pt;
        return next;
      });
    }
    function onUp() {
      setDragIndex(null);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragIndex, canvasSize.w, canvasSize.h]);

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "dver-v-interere.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, "image/png");
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full touch-none select-none overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-md)]"
        style={{ aspectRatio: `${canvasSize.w} / ${canvasSize.h}` }}
      >
        <canvas ref={canvasRef} className="h-full w-full" />

        {!hasCustomPhoto && (
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-line bg-white/90 px-3.5 py-1.5 font-mono text-[11px] text-graphite-soft backdrop-blur">
            демо-интерьер · загрузите своё фото
          </div>
        )}

        {corners.map((c, i) => (
          <div
            key={i}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              setDragIndex(i);
            }}
            style={{
              left: `${(c.x / canvasSize.w) * 100}%`,
              top: `${(c.y / canvasSize.h) * 100}%`,
            }}
            className="absolute z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-white bg-graphite shadow-[0_4px_12px_rgba(15,17,20,0.35)] transition-transform hover:scale-110 active:cursor-grabbing active:scale-95"
          />
        ))}

        {/* quad guide lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}>
          <polygon
            points={corners.map((c) => `${c.x},${c.y}`).join(" ")}
            fill="none"
            stroke={shade("#a3793f", 0.1)}
            strokeWidth={Math.max(1.5, canvasSize.w * 0.0018)}
            strokeDasharray="10 8"
            opacity={0.85}
          />
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <Button variant="light" onClick={() => fileInputRef.current?.click()}>
          <Upload size={16} /> {hasCustomPhoto ? "Заменить фото" : "Загрузить фото комнаты"}
        </Button>
        <Button variant="ghost" onClick={() => setCorners(defaultQuad(canvasSize.w, canvasSize.h))}>
          <RotateCcw size={15} /> Сбросить область
        </Button>
        <Button onClick={downloadPng}>
          <Download size={16} /> Скачать PNG
        </Button>
      </div>
      <p className="mt-3 max-w-[560px] text-[12.5px] leading-relaxed text-graphite-faint">
        Перетащите четыре точки на углы дверного проёма — дверь автоматически впишется в перспективу
        фотографии, а освещение и тон подстроятся под цветовую температуру снимка. Фото обрабатывается
        локально в браузере и никуда не загружается.
      </p>
    </div>
  );
}

function scaleToMax(w: number, h: number, max: number) {
  if (w <= max) return { w, h };
  const ratio = max / w;
  return { w: Math.round(w * ratio), h: Math.round(h * ratio) };
}
