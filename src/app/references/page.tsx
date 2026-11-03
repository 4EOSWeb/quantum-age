import type { Metadata } from "next";
import { CtaBand, Notice, PageHero, TextLink } from "@/components/site/blocks";
import { clientGroups } from "@/content/references";

export const metadata: Metadata = {
  title: "References",
  description: "The kinds of organizations Quantum Age works with. No client logos.",
};

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="References"
        title="Trusted by leading healthcare organizations"
        lead={<p>The kinds of organizations we serve.</p>}
      />

      <section className="section-sm border-b border-stone" aria-labelledby="groups-heading">
        <div className="container-page">
          <h2 id="groups-heading" className="eyebrow font-sans text-muted-foreground">
            Who we work with
          </h2>
          <ul className="mt-6 grid border-t border-stone md:grid-cols-3">
            {clientGroups.map((g, i) => (
              <li
                key={g.name}
                className={`reveal border-b border-stone py-8 md:border-b-0 md:px-8 md:first:pl-0 ${i > 0 ? "md:border-l" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <h3 className="text-h3">{g.name}</h3>
                <p className="mt-3 text-muted-foreground">{g.description}</p>
              </li>
            ))}
          </ul>
          <Notice tone="info" title="Named references are coming from Quantum Age" className="mt-10 max-w-[62ch]">
            The testimonials on the current site are not shown. Quantum Age will provide new ones before launch, along
            with a reference list. Clients named inside articles stay in those articles. No client logos are used.{" "}
            <TextLink href="/prototype-notes#questions">See what is still open</TextLink>
          </Notice>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
