"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TemplateThumb } from "./TemplateThumb";

// Three overlapping browser/phone frames at slight angles, each showing a
// different live business site. Creates an Apple-style depth effect behind
// the hero headline. Parallax on scroll for extra depth.

const DEVICES: {
  key: string;
  video: string;
  name: string;
  type: "desktop" | "tablet" | "phone";
  cls: string; // position/rotate/size
  z: number;
}[] = [
  {
    key: "restaurant",
    video: "/hero/restaurant.mp4",
    name: "Nonna's Kitchen",
    type: "desktop",
    cls: "left-[5%] top-[8%] w-[62%] rotate-[-4deg]",
    z: 2,
  },
  {
    key: "hair_salon",
    video: "/hero/hair.mp4",
    name: "The Chair Co.",
    type: "desktop",
    cls: "right-[2%] top-[4%] w-[58%] rotate-[3deg]",
    z: 3,
  },
  {
    key: "gym",
    video: "/hero/gym.mp4",
    name: "Ironworks Gym",
    type: "phone",
    cls: "right-[10%] bottom-[2%] w-[22%] rotate-[6deg]",
    z: 4,
  },
];

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-neutral-900/90 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="ml-2 truncate rounded bg-white/[0.06] px-2 py-0.5 text-[9px] text-white/35">{url}</span>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border-[3px] border-neutral-700 bg-black shadow-2xl">
      <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-neutral-700" />
      {children}
    </div>
  );
}

export function FloatingDevices() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yMap = [y1, y2, y3];

  // Fade in on mount
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t); }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {DEVICES.map((d, i) => {
        const src = `/samples/${d.key}?embed=1&style=bold&video=${encodeURIComponent(d.video)}&name=${encodeURIComponent(d.name)}`;
        return (
          <motion.div
            key={d.key}
            style={{ y: yMap[i], zIndex: d.z }}
            className={`absolute transition-all duration-1000 ${d.cls} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {d.type === "phone" ? (
              <PhoneFrame>
                <TemplateThumb src={src} aspect={1.78} base={430} />
              </PhoneFrame>
            ) : (
              <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm">
                <BrowserChrome url={`${d.name.toLowerCase().replace(/[^a-z]+/g, "")}.com`} />
                <TemplateThumb src={src} aspect={0.58} />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
