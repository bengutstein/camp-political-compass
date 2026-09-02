"use client";
import { useState } from "react";

export function ShareResults({ x, y, name }: { x: number; y: number; name?: string }) {
  const [copied, setCopied] = useState(false);
  const lean = `${x >= 0 ? "Religious" : "Secular"} ${y >= 0 ? "Authoritarian" : "Libertarian"}`;
  const score = `x: ${x >= 0 ? "+" : ""}${x}, y: ${y >= 0 ? "+" : ""}${y}`;
  const owner = name?.trim() ? `${name.trim()}'s` : "My";
  const copy = async () => { await navigator.clipboard.writeText(`${owner} Berkshires Political Compass result: ${lean} (${score}).`); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <button onClick={copy} className="border border-ink bg-white px-5 py-3 text-sm font-bold transition hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-moss">{copied ? "Result copied" : "Copy result"}</button>;
}
