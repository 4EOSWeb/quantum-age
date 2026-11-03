# Quantum Age — Website Redesign Prototype

A complete, multi-page redesign prototype of [quantum-age.com](https://quantum-age.com) for review by Quantum Age Collaborative.

> **Prototype only.** This is not the live Quantum Age website and is not connected to it. Nothing in this project writes to, deploys over, or submits data to the live site, its CMS or its forms. The contact form is a demonstration: it validates and shows every state, but sends nothing.

## What is in the prototype

- 13 designed pages and 114 Insights articles from the current site, built from a crawl on 6 October 2026. One duplicate sponsorship article was removed after Quantum Age confirmed it. Articles from 2013 through 2020 are labelled Archive.
- Every service, team member, article, contact detail and legal page found on the main site, preserved. The current testimonials are held back until Quantum Age replaces them. Content that conflicts or could not be verified is held back and listed, never guessed.
- A new design system (editorial typography, the logo's ring geometry, accessible plum-and-green palette), responsive from 320px to large desktop, and built to WCAG 2.2 AA.

## Technology

| | |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components, static generation) |
| UI | React 19.3, TypeScript 5, Tailwind CSS 4 |
| Components | shadcn/ui on Radix (Sheet, Button, Input, Textarea, Label, Breadcrumb), restyled to the design system |
| Icons | lucide-react (functional icons only) |
| Fonts | Source Serif 4 and Figtree via `next/font/google` (self-hosted at build time) |
| Scrolling and motion | [Lenis](https://lenis.dev) 1.3 smooth scrolling site-wide (wheel and trackpad; native touch on phones and tablets), accessible smooth anchor links, an interactive formula map that builds as you scroll (`src/components/site/formula-story.tsx`), a few other scroll-linked details, and staggered CSS reveals. All smoothing and effects switch off under `prefers-reduced-motion`. See `docs/design-direction.md` → Motion |
| Content | Local TypeScript and JSON files in `src/content/` (no CMS, no database) |

## Requirements

- Node.js 20.9 or newer (tested with Node 22.14)
- npm 10 or newer

## Install and run

```bash
npm install
npm run dev
```

Open <http://localhost:4317>.

The dev server uses port 4317 to avoid clashing with other local projects. To use another port: `npx next dev -p <port>`.

## Production build

```bash
npm run build
npm run start
```

`npm run start` serves the production build at <http://localhost:4317>. Use it for presentations: it is faster and closer to a launched site than the dev server.

To run type checking, lint and the production build together:

```bash
npm run check
```

| Script | Command |
| --- | --- |
| `npm run dev` | Development server on port 4317 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on port 4317 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js core web vitals + TypeScript rules) |
| `npm run check` | Typecheck, lint and build |

## Hosting from a Windows PC (optional)

`start-site.bat` builds the site and serves it over HTTPS through [Caddy](https://caddyserver.com) at `https://testsite.4eos.com`, on the local network, and at `https://localhost`. Double-click it, or right-click and choose **Run as administrator** so it can open ports 80 and 443 in Windows Firewall.

On each run it:

1. Checks for Node.js 20.9+ and runs `npm ci` if dependencies are missing.
2. Stops if port 4317 is already in use (for example, an earlier run is still open).
3. Finds Caddy, or downloads it into `tools\` (ignored by git).
4. Writes `tools\Caddyfile`, which proxies the domain and local addresses to `127.0.0.1:4317`.
5. Stops a Caddy left over from an earlier run, and stops with a message if anything else (such as IIS) holds port 80 or 443.
6. Opens Caddy and a PowerShell window that builds with `NEXT_PUBLIC_SITE_URL=https://testsite.4eos.com` and starts the production server.
7. Opens firewall ports 80 and 443 and asks the router (UPnP) to forward them to this PC.

All three windows stay open when something fails, so the error stays on screen. The launcher's own output is also saved to `tools\start-site.log`.

The domain's DNS must point at the network's public IP, and the router must forward external ports 80 and 443 to this PC (not to 4317). To use a different domain, change `$publicHost` at the top of `start-site.ps1`.

Anyone with the address can see the site while it runs, so stop both windows when the review is over.

## Environment variables

None are required. One is optional:

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:4317` | Absolute origin (`metadataBase`) used to build Open Graph and share-image URLs. Set it if the prototype is hosted for review, for example `NEXT_PUBLIC_SITE_URL=https://review.example.com npm run build`. |

There are no API keys, secrets or third-party services.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/solutions` | All six solutions and their 24 capabilities, with an in-page index (`#strategize`, `#awareness`, `#thought-leadership`, `#perform`, `#network`, `#generate`) |
| `/approach` | Collaborative definition, the You + Team + Market + Opportunity = Success formula, and the three-level framework |
| `/about` | Company description, focus, approach and benefits |
| `/team` | Nine team members with headshots and verified highlights |
| `/references` | Three testimonials, client groups and client stories |
| `/insights` | Article archive with search and topic filters |
| `/insights/[slug]` | 114 articles. The older duplicate sponsorship URL redirects to the 27 February 2019 article |
| `/contact` | Contact details and the demo contact form (`?interest=<solution-id>` pre-selects a topic) |
| `/privacy` | Privacy Policy, reproduced from the live site |
| `/terms` | Terms of Use, reproduced from the live site |
| `/prototype-notes` | For reviewers: demo features, held content and open questions |
| any other path | Custom 404 |

Redirects (temporary, 307) for URLs that are broken on the live site:

| From | To |
| --- | --- |
| `/solutions/strategize-launch`, `/build-awareness`, `/thought-leader`, `/perform`, `/network`, `/generate-business` | Matching `/solutions#…` section |
| `/services` | `/solutions` |
| `/blog`, `/blog/:slug` | `/insights`, `/insights/:slug` |

Generated assets: `/icon.svg`, `/apple-icon.png`, `/opengraph-image`.

## Project structure

```
docs/                   Audit, verification register, sitemap, design, boundaries, review, presentation guide
docs/source-snapshots/  Text snapshots of each crawled live page, used for verification
public/brand/           Official logo SVG (unchanged) and a viewbox crop of its mark
public/team/            Team headshots (resized and converted to WebP only)
public/insights-images/ Article images (downloaded from the live site, converted to WebP)
src/app/                Routes, metadata, icons, share image, global styles
src/components/site/    Header, navigation, footer, page blocks, contact form, insights browser, portraits
src/components/ui/      shadcn/ui primitives, restyled
src/content/            All factual site copy, separate from components
src/lib/                Article queries and date formatting
```

To change wording, edit the files in `src/content/`. Components do not contain factual company copy.

## Content sources

All content comes from the public pages of <https://quantum-age.com>, crawled read-only on 6 October 2026:

- `site.ts` — name, tagline, positioning, contact details, navigation
- `solutions.ts` — Solutions page
- `company.ts` — About and Approach pages
- `people.ts` — Team page (headshots from the same page)
- `references.ts` — References and Home testimonials
- `legal.ts` — Privacy Policy and Terms of Use
- `articles.json` — all 115 Insights articles
- `prototype.ts` — presentation-only notes (not source content)

Every item, and every refinement, is recorded in [`docs/content-verification.md`](docs/content-verification.md).

The project brief named Firecrawl, BrowserTools, Context7, 21st.dev and Hallmark. None were connected to this environment. Equivalent methods were used and are disclosed in [`docs/source-inventory.md`](docs/source-inventory.md#tools-and-methods-used): a read-only crawler, headless Chrome via Playwright, the version-matched Next.js documentation bundled in `node_modules/next/dist/docs`, established accessible interaction patterns, and a written anti-generic review checklist.

## Demo-only features

| Feature | Status |
| --- | --- |
| Contact form | Validation, error summary, sending, success and (simulated) error states. **No network request; nothing is stored or sent.** |
| Insights search and filters | Works over the local copy of the articles only; not a live index |
| Articles | A snapshot; does not sync with the live site |
| Analytics, cookies, CRM, CMS | None |

Details: [`docs/prototype-boundaries.md`](docs/prototype-boundaries.md).

## Known limitations

- Article content is a snapshot from 6 October 2026.
- No brand photography exists beyond team headshots; the design does not use stock photography.
- Three article images are unavailable on the live site and are omitted; affected articles use a typographic header.
- Many article images on the live site are generic stock images; they are shown because they are each article's real image.
- Some headings are verbatim from the live site and read as formulaic (for example three "Ready to…" closing headlines). They are kept until Quantum Age approves new wording.
- Accessibility was checked with automated axe scans and manual keyboard testing; a review with screen readers and other assistive technology is still recommended before launch.

## Decisions from Quantum Age (3 November 2026)

Applied in this prototype and listed on `/prototype-notes`:

- Public email is `askQA@quantum-age.com`.
- No job titles. Becky Cook is not on the team. Jaret Andrews’ bio stays as published.
- The three current testimonials are not shown; new ones are expected before launch.
- No client logos, and no reference list built from article mentions.
- The “only marketing firm…” line stays.
- The Approach dictionary entry is replaced by the “How we work together” panel.
- No response-time promise.
- Articles from 2013 through 2020 are labelled Archive. The older duplicate sponsorship article redirects to the 2019 copy.
- `/beta` is kept in `docs/source-snapshots` and is not published.
- The privacy policy covers cookies and analytics and is effective 3 November 2026.

Still open:

1. Which headline statistics to publish, replace, or drop (the conflicting figures are named on `/prototype-notes`).
2. The solution-page files in “Hubspot files & images - 050626” (the link did not come through; live Learn More URLs still return 404).
3. The purple-center logo files in the shared Drive folder (the folder requires a Google sign-in; the logo already in the repo has a purple center, and a blue-center mark will not be used).
4. Social media profiles (none shown).

The full record is in [`docs/content-verification.md`](docs/content-verification.md) and on the `/prototype-notes` page.

## Documentation

| Document | Contents |
| --- | --- |
| [`docs/source-inventory.md`](docs/source-inventory.md) | Crawl of the live site: pages, navigation, content, functionality, assets, audit findings |
| [`docs/content-verification.md`](docs/content-verification.md) | Change and verification register for every significant content item |
| [`docs/proposed-sitemap.md`](docs/proposed-sitemap.md) | Information architecture and page specifications |
| [`docs/design-direction.md`](docs/design-direction.md) | Design system: color, type, layout, motion, components |
| [`docs/prototype-boundaries.md`](docs/prototype-boundaries.md) | What is real, simulated, missing, or needs production work |
| [`docs/hallmark-review.md`](docs/hallmark-review.md) | Anti-generic design and content review, two passes |
| [`docs/presentation-guide.md`](docs/presentation-guide.md) | How to present the prototype to Quantum Age |
