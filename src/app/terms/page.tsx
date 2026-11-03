import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for quantum-age.com.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title={terms.title}
      blocks={terms.blocks}
      notice={{
        title: "Reproduced from the current website",
        body: (
          <>
            This text is copied word for word from quantum-age.com/terms as published on 6 October 2026. The prototype
            does not change or extend it, and it has not been reviewed by counsel.
          </>
        ),
      }}
    />
  );
}
