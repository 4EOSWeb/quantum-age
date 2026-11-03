import { Fragment } from "react";
import { Notice, PageHero, TextLink } from "@/components/site/blocks";
import type { LegalBlock } from "@/content/legal";
import { contact } from "@/content/site";

function withEmailLink(text: string) {
  const parts = text.split(contact.email);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a href={contact.emailHref} className="font-semibold text-plum underline">
          {contact.email}
        </a>
      )}
    </Fragment>
  ));
}

export function LegalPage({
  title,
  blocks,
  effectiveDate,
  notice,
}: {
  title: string;
  blocks: LegalBlock[];
  effectiveDate?: string;
  notice: { title: string; body: React.ReactNode };
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lead={effectiveDate ? <p>Effective {effectiveDate}</p> : undefined}
      />
      <section className="section-sm">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="max-w-[68ch] lg:col-span-8">
            {blocks.map((b, i) => (
              <div key={b.heading ?? b.paragraphs[0]} className={i > 0 ? "mt-10" : undefined}>
                {b.heading && <h2 className="text-h3 mb-3">{b.heading}</h2>}
                {b.paragraphs.map((p) => (
                  <p key={p} className="mt-3 text-lg leading-relaxed text-ink/90 first:mt-0">
                    {withEmailLink(p)}
                  </p>
                ))}
                {b.items && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink/90">
                    {b.items.map((item) => (
                      <li key={item}>{withEmailLink(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <Notice tone="info" title={notice.title}>
              {notice.body}
            </Notice>
            <TextLink href="/prototype-notes#questions" className="mt-4">
              Decisions and remaining questions
            </TextLink>
          </aside>
        </div>
      </section>
    </>
  );
}
