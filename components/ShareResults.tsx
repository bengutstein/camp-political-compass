"use client";
import { useState } from "react";

export function ShareResults({ x, y }: { x: number; y: number }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(`${window.location.origin}/results?x=${x}&y=${y}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <button onClick={copy} className="border border-ink bg-white px-5 py-3 text-sm font-bold transition hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-moss">{copied ? "Link copied" : "Copy Result Link"}</button>;
}
