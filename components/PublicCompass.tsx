"use client";

import { useEffect, useState } from "react";
import { quizConfig } from "@/config/quizConfig";
import { CompassPreview, type CompassPoint } from "./CompassPreview";

export function PublicCompass() {
  const [savedResults, setSavedResults] = useState<CompassPoint[]>([]);
  useEffect(() => { fetch("/api/results").then((response) => response.ok ? response.json() : []).then(setSavedResults).catch(() => setSavedResults([])); }, []);
  const fixtureResults = quizConfig.exampleResults.map((result) => ({
    ...result,
    alwaysShowName: true,
  }));

  return <CompassPreview points={[...fixtureResults, ...savedResults]} />;
}
