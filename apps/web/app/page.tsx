"use client";

import { useState, useEffect } from "react";
import type { HealthResponse, DbCheckResponse } from "@dwijabake/shared";
import { Button } from "./components/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [dbResult, setDbResult] = useState<DbCheckResponse | null>(null);
  const [loadingDb, setLoadingDb] = useState(false);

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
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        dwijabake
      </h1>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-foreground">API Health</h2>
        {health === null ? (
          <p className="text-muted">Loading…</p>
        ) : (
          <p className={health.status === "ok" ? "text-green-500" : "text-red-500"}>
            Status: {health.status}
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Database</h2>
        <Button onClick={checkDb} disabled={loadingDb}>
          {loadingDb ? "Checking…" : "Check DB"}
        </Button>
        {dbResult && (
          <div className="mt-2 p-4 rounded-lg bg-surface border border-border text-sm">
            {dbResult.ok ? (
              <p className="text-green-500">
                OK — DB time: {dbResult.time ?? "—"}
              </p>
            ) : (
              <p className="text-red-500">
                Error: {dbResult.error ?? "Unknown"}
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
