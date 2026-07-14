import { Star, ShieldCheck } from "lucide-react";
import type { DoorModel } from "@/types/door";

export function ReviewsList({ door }: { door: DoorModel }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="font-mono text-[36px] font-medium text-graphite">{door.rating}</div>
        <div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className={i < Math.round(door.rating) ? "fill-accent text-accent" : "text-mist-3"} />
            ))}
          </div>
          <div className="mt-1 text-[13px] text-graphite-faint">{door.reviewsCount} отзывов</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {door.reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-[14.5px] text-graphite">{r.author}</span>
              <span className="font-mono text-[12px] text-graphite-faint">
                {new Date(r.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
              </span>
            </div>
            <div className="mt-1.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < r.rating ? "fill-accent text-accent" : "text-mist-3"} />
              ))}
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-graphite-soft">{r.text}</p>
            {r.verified && (
              <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-graphite-faint">
                <ShieldCheck size={13} /> подтверждённая покупка
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
