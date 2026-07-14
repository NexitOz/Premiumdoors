"use client";

import { useState } from "react";
import { RoomCanvas } from "./RoomCanvas";
import { ModelPicker } from "./ModelPicker";
import { DOORS } from "@/data/doors";

export function ConfiguratorView() {
  const [door, setDoor] = useState(DOORS[0]);
  const [finishHex, setFinishHex] = useState(DOORS[0].color.hex);

  const handle = door.handleOptions[0];
  const handleHex =
    handle?.material === "brushed-bronze"
      ? "#a3793f"
      : handle?.material === "brushed-steel"
        ? "#b9c0c6"
        : handle?.material === "chrome"
          ? "#e4e7ea"
          : "#1c1d20";

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:items-start">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-sm)] lg:sticky lg:top-24">
        <Step n={1} title="Загрузите фото комнаты" description="Снимайте стену без сильного угла — так примерка будет точнее." />
        <Step n={2} title="Выберите модель и цвет">
          <ModelPicker selected={door} onSelect={setDoor} finishHex={finishHex} onFinishChange={setFinishHex} />
        </Step>
        <Step
          n={3}
          title="Впишите дверь в проём"
          description="Перетащите четыре точки на углы дверного проёма — перспектива и освещение подстроятся автоматически."
          last
        />
      </div>

      <RoomCanvas door={door} finishHex={finishHex} handleHex={handleHex} />
    </div>
  );
}

function Step({
  n,
  title,
  description,
  children,
  last = false,
}: {
  n: number;
  title: string;
  description?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`flex gap-3.5 ${last ? "" : "mb-6"}`}>
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-gradient-to-br from-white to-mist-2 font-mono text-[13px] text-graphite shadow-[var(--shadow-xs)]">
        {n}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 font-display text-[14.5px] text-graphite">{title}</div>
        {description && <div className="text-[13px] leading-relaxed text-graphite-soft">{description}</div>}
        {children}
      </div>
    </div>
  );
}
