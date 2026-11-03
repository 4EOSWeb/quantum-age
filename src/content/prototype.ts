/** Presentation-only content for /prototype-notes. Decisions recorded from Quantum Age on 3 November 2026. */

export const demoFeatures = [
  {
    name: "Contact form",
    detail:
      "Validates fields, shows inline errors, an error summary, a loading state, a confirmation and a simulated delivery error. It makes no network request and stores nothing.",
  },
  {
    name: "Insights search and topic filter",
    detail:
      "Fully working, but only over the 114 articles in the prototype (115 were copied from the live site; one exact duplicate was removed). It is not connected to a CMS or search index, so new articles on the live site will not appear.",
  },
  {
    name: "Article content",
    detail:
      "Copied from the live site on 6 October 2026, with images optimized and stored locally. Articles from 2013 through 2020 are labelled Archive. Editing would require a CMS in production.",
  },
  {
    name: "Analytics, cookies and tracking",
    detail:
      "None are loaded by this prototype. The privacy policy describes cookies and analytics so the public site is covered. The live site loads an analytics script; this prototype does not.",
  },
];

export const decisions = [
  {
    item: "Public email",
    detail:
      "askQA@quantum-age.com is the address to publish. info@quantum-age.com is not used.",
  },
  {
    item: "No job titles",
    detail:
      "Team profiles show names and the existing highlight bullets only. No title is shown for CC Andrews or anyone else.",
  },
  {
    item: "Team membership",
    detail:
      "Becky Cook does not appear on the team page. Jaret Andrews’ bio, including “current student”, stays as published for now.",
  },
  {
    item: "Testimonials",
    detail:
      "The three testimonials on the current site are very old and are not shown. Quantum Age will provide new ones before launch. The old quotations are kept in the project files and are not published.",
  },
  {
    item: "References and logos",
    detail:
      "Clients named in articles are not pulled onto a reference list and no client logos are shown. Names inside articles stay there. A reference list will be added when Quantum Age sends one. The three organization types from the References page are still shown.",
  },
  {
    item: "Positioning line",
    detail:
      "“The only marketing firm in senior care steeped in both consumer and business-to-business.” stays, as Quantum Age confirmed.",
  },
  {
    item: "Approach page",
    detail:
      "The dictionary entry for “collaborative” (including the noun/adjective line) is removed. That place on the Approach page is now the “How we work together” panel from the team page. The panel remains on the team page as well.",
  },
  {
    item: "Response time",
    detail: "The contact page does not commit to a response time.",
  },
  {
    item: "Older articles",
    detail:
      "Articles from 2013 through 2020, including COVID-19 era guidance, stay published and are labelled Archive. Articles from 2021 onward are not labelled archive.",
  },
  {
    item: "Duplicate sponsorship article",
    detail:
      "“The 4 Keys to Maximizing Your Sponsorship Expenditures” appeared twice (11 May 2018 and 27 February 2019). The body is the same article, not a later sponsorship cycle. The 2018 copy also contains a duplicated fragment (“possible.f your sponsorships”). The 2019 article is kept. The older address redirects to it.",
  },
  {
    item: "Beta section",
    detail:
      "Kept, unpublished. The captured pages remain in docs/source-snapshots and are indexed from docs/unpublished/beta.md. There is no public route and no navigation link. Beta claims, services, and testimonials are not used on the public pages.",
  },
  {
    item: "Privacy policy",
    detail:
      "Updated with an effective date of 3 November 2026. It now covers information people submit, cookies, analytics, retention, deletion, and a statement that personal information is not sold. It has not been reviewed by outside counsel. This prototype still does not load analytics or set tracking cookies.",
  },
  {
    item: "Logo files",
    detail:
      "Use the files with the purple center, never the blue-center version. The shared Drive folder requires a Google sign-in, so those files are not imported yet. The logo already in the prototype has a purple center (#70456E). The favicon and share image are made from that logo until the shared files can be copied in. No separate photography was available.",
  },
];

export const heldContent = [
  {
    item: "Headline statistics",
    detail:
      "These are the only headline figures on the current marketing pages, and they disagree, so none of them are shown. About: “30+ Years Average Experience”, “10+ Expert Collaborators”, “100% Healthcare Focused”. References: “20+ Years of Experience”, “200+ Clients Served”, “100% Senior Care Focused”. The team page lists 9 people. Individual bios cite experience ranging from about 10 years to 35+ years, which does not confirm a 30+ year average or a single “20+ years” figure.",
  },
  {
    item: "“Hundreds of healthcare organizations”",
    detail:
      "The References page says the team has worked with hundreds of healthcare organizations across the senior care continuum, from small startups to national providers. That sentence is held with the statistics above. No other page supports the number.",
  },
  {
    item: "Old testimonials",
    detail:
      "Scott Brown (Director, The GREEN HOUSE Project), Margaret McConnell (Chairperson, Nevada Board of Examiners for Long Term Care Administration), and Rand Johnson (Marketing Director, Prime Care Technologies). Quantum Age will replace these before launch. They are not on the home page or the References page.",
  },
  {
    item: "Social media links",
    detail:
      "Not answered. Footer icons on the live site link to “#”. The beta pages link to linkedin.com/company/quantum-age and twitter.com/quantumage, which could not be confirmed as official. No social links are shown.",
  },
];

export const openQuestions = [
  "Headline statistics: for each figure listed above — 30+ years average experience, 10+ expert collaborators, 100% healthcare focused, 20+ years of experience, 200+ clients served, 100% senior care focused, and “hundreds of healthcare organizations” — should we publish it as-is, replace it with a number you confirm, or drop it?",
  "Solution pages: the live “Learn More” addresses still return 404 (checked 3 November 2026). The note pointed to a folder named “Hubspot files & images - 050626”, but the link itself did not come through. Please share that folder again and the individual pages will be built from those files only.",
  "Logo, favicon, and photography: the Drive folder requires a Google sign-in from this environment (https://drive.google.com/drive/folders/1H7a6Fnc6_WwzYsoKh3qvaG5OG_zjrUOA). Please confirm the purple-center logo already on the site is the correct one to keep using until those files can be copied in, or send the purple-center files another way. We will not use a blue-center mark.",
];
