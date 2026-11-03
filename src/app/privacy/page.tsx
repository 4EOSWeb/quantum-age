import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Quantum Age collects, uses, and protects information, including cookies and analytics. Effective 3 November 2026.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title={privacy.title}
      blocks={privacy.blocks}
      effectiveDate={privacy.effectiveDate}
      notice={{
        title: "Updated for this redesign",
        body: (
          <>
            Quantum Age asked for a policy that covers analytics and cookies and carries an effective date. This version
            is effective {privacy.effectiveDate}. It has not been reviewed by outside counsel. This prototype does not
            load analytics or set tracking cookies; the policy describes the public site, including the analytics script
            already in use there.
          </>
        ),
      }}
    />
  );
}
