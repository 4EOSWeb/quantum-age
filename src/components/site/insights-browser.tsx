"use client";

import { useId, useMemo, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import type { ArticleSummary } from "@/lib/insights";
import { isArchivedArticle } from "@/lib/article-archive";
import { ArticleRow } from "@/components/site/article-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export function InsightsBrowser({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [era, setEra] = useState<"all" | "current" | "archive">("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const searchId = useId();
  const hintId = useId();

  const visibleTags = useMemo(() => {
    const pool = articles.filter((a) => {
      if (era === "archive") return isArchivedArticle(a);
      if (era === "current") return !isArchivedArticle(a);
      return true;
    });
    const counts = new Map<string, number>();
    for (const article of pool) for (const topic of article.tags) counts.set(topic, (counts.get(topic) ?? 0) + 1);
    return [...counts.entries()].map(([topic, count]) => ({ tag: topic, count })).sort((a, b) => b.count - a.count);
  }, [articles, era]);

  const eraCounts = useMemo(
    () => ({
      all: articles.length,
      current: articles.filter((a) => !isArchivedArticle(a)).length,
      archive: articles.filter((a) => isArchivedArticle(a)).length,
    }),
    [articles]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (era === "archive" && !isArchivedArticle(a)) return false;
      if (era === "current" && isArchivedArticle(a)) return false;
      if (tag && !a.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [articles, query, tag, era]);

  const shown = results.slice(0, visible);
  const filtered = Boolean(query.trim() || tag || era !== "all");
  const eraLabel = era === "archive" ? " in the archive" : era === "current" ? " from 2021 onward" : "";

  function reset() {
    setQuery("");
    setTag(null);
    setEra("all");
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      <div className="grid gap-6 border-y border-stone py-6 lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 lg:col-span-4">
          <Label htmlFor={searchId} className="text-[0.9375rem] font-semibold text-ink">
            Search insights
          </Label>
          <div className="relative mt-2">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id={searchId}
              type="search"
              value={query}
              aria-describedby={hintId}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              className="h-11 bg-surface pl-9 text-base"
            />
          </div>
          <p id={hintId} className="mt-2 text-sm text-muted-foreground">
            Searches titles, summaries and topics.
          </p>
        </div>
        <div className="min-w-0 space-y-5 lg:col-span-8">
          <fieldset>
            <legend className="text-[0.9375rem] font-semibold text-ink">Publication</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              <TagButton
                active={era === "all"}
                onClick={() => {
                  setEra("all");
                  setTag(null);
                  setVisible(PAGE_SIZE);
                }}
              >
                All years <span className="text-muted-foreground">({eraCounts.all})</span>
              </TagButton>
              <TagButton
                active={era === "current"}
                onClick={() => {
                  setEra("current");
                  setTag(null);
                  setVisible(PAGE_SIZE);
                }}
              >
                Current <span className="text-muted-foreground">({eraCounts.current})</span>
              </TagButton>
              <TagButton
                active={era === "archive"}
                onClick={() => {
                  setEra("archive");
                  setTag(null);
                  setVisible(PAGE_SIZE);
                }}
              >
                Archive, 2013–2020 <span className="text-muted-foreground">({eraCounts.archive})</span>
              </TagButton>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-[0.9375rem] font-semibold text-ink">Filter by topic</legend>
          <div
            data-lenis-prevent-horizontal
            className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible"
          >
            <TagButton active={tag === null} onClick={() => { setTag(null); setVisible(PAGE_SIZE); }}>
              All topics <span className="text-muted-foreground">({era === "all" ? articles.length : era === "archive" ? eraCounts.archive : eraCounts.current})</span>
            </TagButton>
            {visibleTags.map((t) => (
              <TagButton
                key={t.tag}
                active={tag === t.tag}
                onClick={() => {
                  setTag(tag === t.tag ? null : t.tag);
                  setVisible(PAGE_SIZE);
                }}
              >
                {t.tag} <span className="text-muted-foreground">({t.count})</span>
              </TagButton>
            ))}
          </div>
          </fieldset>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 py-5">
        <p aria-live="polite" className="text-[0.9375rem] text-muted-foreground">
          {results.length === articles.length
            ? `Showing all ${articles.length} articles, newest first`
            : `${results.length} ${results.length === 1 ? "article" : "articles"} found${eraLabel}${tag ? ` in ${tag}` : ""}${query.trim() ? ` for \u201C${query.trim()}\u201D` : ""}`}
        </p>
        {filtered && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <XIcon aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="border-t border-stone py-16 text-center">
          <p className="text-h3">No articles match that search.</p>
          <p className="mx-auto mt-3 max-w-[44ch] text-muted-foreground">
            Try a broader word, another publication range, or browse all topics. The library covers senior care, aging
            services, B2B marketing, technology and innovation.
          </p>
          <Button variant="outline" className="mt-6" onClick={reset}>
            Show all articles
          </Button>
        </div>
      ) : (
        <>
          <div>
            {shown.map((a) => (
              <ArticleRow key={a.slug} article={a} headingLevel="h3" />
            ))}
          </div>
          {visible < results.length && (
            <div className="border-t border-stone pt-8 text-center">
              <Button variant="outline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Show more articles
                <span className="text-muted-foreground">({results.length - visible} more)</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TagButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 shrink-0 items-center gap-1 rounded-sm border px-3 text-sm font-medium whitespace-nowrap transition-colors",
        active ? "border-plum bg-plum text-white [&_span]:text-white/80" : "border-ink/20 bg-surface text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}
