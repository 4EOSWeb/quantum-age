import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/site/blocks";
import { ArticleFeature } from "@/components/site/article-item";
import { InsightsBrowser } from "@/components/site/insights-browser";
import { getArchiveRange, getArticleSummaries, getFeaturedArticles } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Market intelligence, strategic playbooks, and proven tactics for the longevity economy, from the Quantum Age team.",
};

export default function InsightsPage() {
  const featured = getFeaturedArticles();
  const all = getArticleSummaries().sort((a, b) => b.date.localeCompare(a.date));
  const range = getArchiveRange();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Insights that drive growth"
        lead={
          <p>
            Market intelligence, strategic playbooks, and proven tactics for the longevity economy. Articles from 2013
            through 2020 are labelled Archive.
          </p>
        }
        aside={
          <dl className="grid grid-cols-3 border-t border-stone pt-5 lg:mt-3 lg:grid-cols-1 lg:gap-5">
            {[
              { label: "Articles", value: String(range.count) },
              { label: "Published", value: `${range.first}–${range.last}` },
              { label: "Archive", value: "2013–2020" },
            ].map((f) => (
              <div key={f.label}>
                <dt className="text-sm font-semibold text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 font-serif text-[1.75rem] leading-tight text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="section-sm" aria-labelledby="featured-heading">
        <div className="container-page">
          <h2 id="featured-heading" className="eyebrow font-sans text-muted-foreground">
            Featured
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-3">
            {featured.map((a, i) => (
              <ArticleFeature key={a.slug} article={a} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[var(--section)]" aria-labelledby="archive-heading">
        <div className="container-page">
          <h2 id="archive-heading" className="text-h2 mb-8">
            All articles
          </h2>
          <InsightsBrowser articles={all} />
        </div>
      </section>

      <CtaBand
        title="Want to talk through an idea from the archive?"
        body="Ready to accelerate your growth in the longevity economy? We're here to help."
      />
    </>
  );
}
