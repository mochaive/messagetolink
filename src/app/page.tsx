"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const WriterPage = lazy(() => import("@/components/writer/WriterPage"));
const ReaderPage = lazy(() => import("@/components/reader/ReaderPage"));

type AppMode = "loading" | "writer" | "reader";

function detectMode(): AppMode {
  if (typeof window === "undefined") return "loading";
  const hash = window.location.hash;
  if (!hash || hash === "#") return "writer";
  return "reader";
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-border-default border-t-accent"
        role="status"
        aria-label="Loading…"
      />
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<AppMode>("loading");
  const [hash, setHash] = useState("");

  useEffect(() => {
    setMode(detectMode());
    setHash(window.location.hash.slice(1));

    function handleHashChange() {
      setMode(detectMode());
      setHash(window.location.hash.slice(1));
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (mode === "loading") {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Header />
      <main id="main">
        <Suspense fallback={<LoadingSkeleton />}>
          {mode === "writer" ? <WriterPage /> : <ReaderPage hash={hash} />}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
