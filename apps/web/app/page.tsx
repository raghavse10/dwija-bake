"use client";

import { useState, useEffect } from "react";
import type { HealthResponse, DbCheckResponse } from "@dwijabake/shared";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { Divider } from "./components/divider";
import { HeroFlourish } from "./components/hero-flourish";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [dbResult, setDbResult] = useState<DbCheckResponse | null>(null);
  const [loadingDb, setLoadingDb] = useState(false);
  const [showDev, setShowDev] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data: HealthResponse) => setHealth(data))
      .catch(() => setHealth({ status: "error" }));
  }, []);

  const checkDb = () => {
    setLoadingDb(true);
    setDbResult(null);
    fetch(`${API_URL}/db`)
      .then((res) => res.json())
      .then((data: DbCheckResponse) => setDbResult(data))
      .catch((err) => setDbResult({ ok: false, error: String(err.message) }))
      .finally(() => setLoadingDb(false));
  };

  return (
    <main className="relative z-10 max-w-2xl mx-auto px-6 py-12 sm:px-8 sm:py-16">
      {/* Hero */}
      <header className="text-center mb-12 sm:mb-16">
        <p className="font-accent text-2xl sm:text-3xl text- mb-4">
          Freshly baked
        </p>
        <HeroFlourish className="mb-4" />
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight mb-4 drop-shadow-[0_1px_2px_rgba(89,41,53,0.08)]">
          Dwija Bake Studio
        </h1>
        <HeroFlourish className="mb-4" />
        <p className="font-heading text-lg sm:text-xl text-muted max-w-md mx-auto font-light italic mt-4">
          Handcrafted with care, one batch at a time
        </p>
      </header>

      <Divider variant="default" />

      {/* Welcome / story teaser */}
      <section className="max-w-lg mx-auto mb-14">
        <Card cornerAccent>
          <div className="text-center space-y-4">
            <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">
              We believe in the simple magic of good ingredients and a warm oven.
              From morning pastries to celebration cakes, every bite tells a story.
            </p>
            <p className="font-heading text-muted text-sm sm:text-base italic">
              Visit us soon — we&apos;re always baking something new.
            </p>
          </div>
        </Card>
      </section>

      <Divider variant="simple" />

      {/* Soft CTA / next step */}
      <section className="text-center mb-16">
        <p className="font-heading text-xl sm:text-2xl text-foreground mb-1">
          Order &amp; collect
        </p>
        <p className="font-heading text-muted text-sm font-light mb-6">
          Custom orders and seasonal specials
        </p>
        <Button href="/order" variant="secondary" size="lg">
          View menu
        </Button>
      </section>

      {/* Dev / API section — collapsible, out of the way */}
      <section className="mt-16 pt-8 border-t border-border/60">
        <button
          type="button"
          onClick={() => setShowDev((s) => !s)}
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          {showDev ? "Hide" : "Show"} dev / API
        </button>
        {showDev && (
          <div className="mt-4 space-y-6">
            <div>
              <h2 className="font-heading text-sm font-semibold text-foreground mb-2">
                API Health
              </h2>
              {health === null ? (
                <p className="text-muted text-sm">Loading…</p>
              ) : (
                <p
                  className={
                    health.status === "ok" ? "text-green-600 dark:text-green-400 text-sm" : "text-red-600 dark:text-red-400 text-sm"
                  }
                >
                  Status: {health.status}
                </p>
              )}
            </div>
            <div>
              <h2 className="font-heading text-sm font-semibold text-foreground mb-2">
                Database
              </h2>
              <Button size="sm" onClick={checkDb} disabled={loadingDb}>
                {loadingDb ? "Checking…" : "Check DB"}
              </Button>
              {dbResult && (
                <div className="mt-2 p-3 rounded-lg bg-surface border border-border text-xs">
                  {dbResult.ok ? (
                    <p className="text-green-600 dark:text-green-400">
                      OK — DB time: {dbResult.time ?? "—"}
                    </p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400">
                      Error: {dbResult.error ?? "Unknown"}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
