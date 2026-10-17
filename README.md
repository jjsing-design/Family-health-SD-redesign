# FHC San Diego telehealth scheduling

Unofficial educational reconstruction and redesign for a portfolio. Not affiliated with Family Health Centers of San Diego.

## Problem

Patients who want a virtual visit can't find telehealth from the homepage. When they reach the page, the booking options and the information needed to choose between them are in the wrong order, so it's unclear how to book or what happens next.

Full write-up: [docs/problem.md](docs/problem.md).

## Existing Experience

The path in the screenshots is Home → Services → an inline link in the Services and Programs intro → the Telehealth page → scroll to the form. The hero offers Find a clinic and Find a service, plus two event banners. Telehealth is not a hero choice. On the telehealth page, call, the form, and MyHealthRecord are one sentence, the form is titled "Contact us," and the FAQ sits below the form.

The audit table is in [docs/ux-audit.md](docs/ux-audit.md). Reference screenshots are in `screenshots/existing-reference/`.

## Hypothesis

My hypothesis is that people miss telehealth because it is not a visible choice on the homepage, and that once they arrive, three booking paths in one sentence plus a form placed above eligibility information make it unclear how to request a visit and what happens next.

A second assumption, from the wording "a member of our staff will be in touch": this is a request for follow-up, not an instant booking. No patients have been interviewed. These are not findings.

## Solution

Not built yet. Planned, after review of the problem and audit: two routes with a visible toggle, "View: Original (reconstruction) / Redesign." The original is a simplified baseline of the path above. The redesign adds a Virtual visit entry on the home hero, moves events lower, and puts how-it-works and eligibility above a single primary request action. The form collects visit type and preferred times. The confirmation says "Request received."

## AI Workflow

This pass used the brief saved in [prompts/exploration.md](prompts/exploration.md) to scaffold the repo, sample approximate colors into `src/styles/tokens.css`, and write the problem and audit. No screens were designed.

`docs/ai-workflow.md` is not written yet. That file will be a template for what was accepted, rejected, or changed. It should be filled as each piece is reviewed, not reconstructed at the end.

## Result

Scaffold only. React 18 and Vite run. There is no original reconstruction and no redesign yet. The app currently shows a placeholder and the required unofficial-portfolio footer.

## Run

```bash
npm install
npm run dev
```

Desktop-first, 1280px design width, down to about 375px once screens exist.
