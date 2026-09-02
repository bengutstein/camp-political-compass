"use client";

import { useEffect, useState } from "react";
import { quizConfig } from "@/config/quizConfig";
import { CompassPreview, type CompassPoint } from "./CompassPreview";

function pointKey(point: CompassPoint) {
  return point.id ?? point.name;
}

function compassLean(point: CompassPoint) {
  return `${point.x >= 0 ? "Religious" : "Secular"} ${
    point.y >= 0 ? "New Camp" : "Old Camp"
  }`;
}

export function PublicCompass() {
  const [savedResults, setSavedResults] = useState<CompassPoint[]>([]);
  const [gesherYearFilter, setGesherYearFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetName, setResetName] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    fetch("/api/results")
      .then((response) => (response.ok ? response.json() : []))
      .then(setSavedResults)
      .catch(() => setSavedResults([]));
  }, []);

  const fixtureResults: CompassPoint[] = quizConfig.exampleResults.map((result) => ({
    ...result,
    alwaysShowName: true,
  }));
  const gesherYears = [
    ...new Set(
      savedResults.flatMap((result) =>
        result.gesherYear === null || result.gesherYear === undefined
          ? []
          : [result.gesherYear],
      ),
    ),
  ].sort((a, b) => b - a);
  const filteredPoints =
    gesherYearFilter === "legends"
      ? fixtureResults
      : gesherYearFilter === "all"
        ? [...fixtureResults, ...savedResults]
        : savedResults.filter(
            (result) => result.gesherYear === Number(gesherYearFilter),
          );
  const searchTerm = search.trim().toLowerCase();
  const listedPoints = filteredPoints
    .filter((point) => point.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));

  const resetMap = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResetting(true);
    setResetError("");
    const targetName = resetName.trim();

    try {
      const response = await fetch("/api/results/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: targetName, code: resetCode }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Could not reset the map.");
      }

      setSavedResults((current) =>
        targetName
          ? current.filter(
              (entry) => entry.name.toLowerCase() !== targetName.toLowerCase(),
            )
          : [],
      );
      setSelectedPointId(null);
      setResetName("");
      setResetCode("");
      setResetOpen(false);
    } catch (error) {
      setResetError(
        error instanceof Error ? error.message : "Could not reset the map.",
      );
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <label className="mb-3 flex flex-col gap-1 text-xs font-bold sm:flex-row sm:items-center sm:justify-end sm:gap-2">
        Gesher Year
        <select
          value={gesherYearFilter}
          onChange={(event) => {
            setGesherYearFilter(event.target.value);
            setSelectedPointId(null);
          }}
          className="min-h-11 w-full border border-line bg-white px-3 py-2 font-normal outline-none focus:border-moss focus:ring-2 focus:ring-moss/30 sm:min-h-0 sm:w-auto sm:px-2 sm:py-1"
        >
          <option value="all">All years</option>
          <option value="legends">Legends</option>
          {gesherYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <CompassPreview
        points={listedPoints}
        highlightedPointId={selectedPointId}
      />

      <section className="mt-5 border border-line bg-white p-4">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold">Explore results</h2>
            <p className="mt-1 text-xs text-ink/65">
              Choose a name to find their place on the compass.
            </p>
          </div>
          <span className="shrink-0 text-xs font-bold text-ink/60">
            {listedPoints.length} people
          </span>
        </div>

        <label className="mt-4 block text-xs font-bold">
          Find a person
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setSelectedPointId(null);
            }}
            placeholder="Search by name"
            autoComplete="off"
            className="mt-2 min-h-11 w-full border border-line bg-paper px-3 py-2 font-normal outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/30"
          />
        </label>

        <div className="mt-3 max-h-80 divide-y divide-line overflow-y-auto border-y border-line">
          {listedPoints.length ? (
            listedPoints.map((point) => {
              const id = pointKey(point);
              const isSelected = selectedPointId === id;

              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedPointId(isSelected ? null : id)}
                  className={`flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2 text-left transition ${
                    isSelected
                      ? "bg-moss text-white"
                      : "bg-white hover:bg-paper focus-visible:bg-paper"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">
                      {point.name}
                    </span>
                    <span
                      className={`block text-[11px] ${
                        isSelected ? "text-white/80" : "text-ink/60"
                      }`}
                    >
                      {compassLean(point)}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[11px] font-bold ${
                      isSelected ? "text-white/80" : "text-ink/55"
                    }`}
                  >
                    {point.alwaysShowName
                      ? "Legend"
                      : `Gesher ${point.gesherYear}`}
                  </span>
                </button>
              );
            })
          ) : (
            <p className="px-3 py-5 text-center text-sm text-ink/60">
              No matching results.
            </p>
          )}
        </div>
      </section>

      <div className="mt-4 text-right">
        <button
          type="button"
          onClick={() => {
            setResetOpen((open) => !open);
            setResetError("");
          }}
          className="min-h-11 text-xs font-bold text-clay underline decoration-clay decoration-2 underline-offset-4 transition hover:text-ink"
        >
          Clear map
        </button>

        {resetOpen && (
          <form
            onSubmit={resetMap}
            className="mt-3 border border-line bg-white p-3 text-left"
          >
            <label className="block text-xs font-bold">
              Specific name{" "}
              <span className="font-normal text-ink/55">(optional)</span>
              <input
                value={resetName}
                onChange={(event) => setResetName(event.target.value)}
                maxLength={60}
                placeholder="Leave blank to clear all results"
                autoComplete="off"
                autoFocus
                className="mt-2 min-h-11 w-full border border-line bg-paper px-3 py-2 font-normal outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/30"
              />
            </label>
            <label className="mt-3 block text-xs font-bold">
              Enter reset code
              <input
                value={resetCode}
                onChange={(event) => setResetCode(event.target.value)}
                type="password"
                inputMode="numeric"
                autoComplete="off"
                className="mt-2 min-h-11 w-full border border-line bg-paper px-3 py-2 font-normal outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/30"
              />
            </label>
            {resetError && (
              <p className="mt-2 text-xs font-bold text-clay" role="alert">
                {resetError}
              </p>
            )}
            <div className="mt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setResetOpen(false);
                  setResetName("");
                  setResetCode("");
                  setResetError("");
                }}
                className="min-h-11 text-xs font-bold underline underline-offset-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!resetCode || resetting}
                className="min-h-11 bg-clay px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {resetting ? "Clearing…" : "Confirm clear"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
