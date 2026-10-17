# Exploration prompt

Saved from the project brief. This is the prompt used to start the scaffold, the color tokens, and the problem and audit documents.

---

# Project: FHCSD Telehealth Scheduling Redesign (desktop-first portfolio prototype)
## Who I am and what this is
I'm a product designer building an AI-native healthcare portfolio. This is project 2 of 4–6. The portfolio shows: existing product → UX analysis → hypothesis → redesign → functional prototype → rationale → validation → iteration. The goal is to show product judgment, not just attractive screens. Please explain briefly what you're doing and why as you build each piece, since I'm learning.
The product is the public website of Family Health Centers of San Diego (fhcsd.org). This is an UNOFFICIAL educational reconstruction and redesign. It is not affiliated with the organization.
## Hard rules
1. Show this label in the footer of every screen: "Unofficial reconstruction created for educational portfolio analysis. Not affiliated with Family Health Centers of San Diego."
2. Do NOT scrape fhcsd.org, copy their source code, or use their logo or photos. Use a simple text wordmark, e.g. "FHC San Diego (unofficial)", and neutral placeholders or icons instead of photos.
3. All data is mock. The form must not send or store anything. Show a visible note on the form: "Prototype. Please don't enter real personal or health information."
4. Don't fake research. I haven't interviewed patients. Anything not directly observed on the site must be written as a hypothesis ("My hypothesis was...") and kept separate from observations.
5. The real site's form is a REQUEST that staff follow up on, not an instant booking (inferred from the wording "a member of our staff will be in touch"; this is an assumption). The confirmation screen must say "request received", never "you're booked".
6. Keep the original brand feel (dark navy + gold/yellow accents, light content areas). Don't restyle for taste. Only make visual changes that serve a UX problem, and log each one in docs/decisions.md. Pick approximate colors from the reference screenshots and put them in one tokens file so they're easy to change.
## Stack
React 18 + Vite, plain CSS (or CSS modules), no UI library. Desktop-first (1280px design width), responsive down to ~375px. Use semantic HTML.
## Repo structure (follow exactly)
```
fhcsd-telehealth-redesign/
  README.md
  /docs
    problem.md
    ux-audit.md
    research.md
    decisions.md
    ai-workflow.md
    accessibility.md
  /src
    /components
    /pages
    /features
    /data        (mock data only)
    /styles      (tokens.css)
  /screenshots
    existing-reference/
    redesigned/
  /prompts
    exploration.md
    implementation.md
    iteration.md
```
Put every document in the folder shown above. The README must open with: Problem, Existing Experience, Hypothesis, Solution, AI Workflow, Result.
## The problem (use this as the thesis)
Patients who want a virtual visit can't find telehealth from the homepage. When they reach the page, the booking options and the information needed to choose between them are in the wrong order, so it's unclear how to book or what happens next.
## Observed existing experience (evidence, from screenshots and the public pages)
Path I observed: Home → "Services" in the main nav → Services and Programs page → an inline text link in the intro paragraph → Telehealth page → scroll to the form. I found no other route except typing "telehealth" into the site search.
- Home hero: "How may we help you?" with only "Find a clinic" (ZIP) and "Find a service" (dropdown of ~70 items). No telehealth option. Two yellow event banners sit in the hero; "Urgent Care" is the only highlighted button.
- Services and Programs: telehealth is an inline link in the intro paragraph ("To schedule a telehealth appointment, please call (619) 515-2300"), followed by a 911 notice, a survey prompt and a mask warning, then the services list.
- Telehealth page: left sidebar of 9 links, a floating "For appointments call" button, a tan "Schedule an appointment" box offering three paths in one sentence (call, the form below, or log in to MyHealthRecord) with no guidance on which to choose. The form is headed "Contact us" and asks for a free-text reason, name, email, phone, ZIP and date of birth. The date fields look clipped in my screenshot. It doesn't ask for phone vs. video, preferred time or clinic. The FAQ (what is telehealth, what services are offered, how to schedule, how the visit works, how to join a video visit) sits BELOW the form. Page also has a sponsor logo wall, an empty "Accredited by" heading and a newsletter signup.
- Public telehealth facts to surface upfront: visits are by phone or video; video requires a mobile number on file and you get a text link to join; your provider calls you and you should be available up to 30 minutes before and after the scheduled time; not all visits can be done by telehealth; services offered include prescription refills, follow-up visits, test results, non-emergency sick visits, mental health and chronic disease management; phone (619) 515-2300.
## Audit table (write this into docs/ux-audit.md exactly, then I'll review)
| Existing experience | Problem | User impact | Proposed change | Expected outcome |
|---|---|---|---|---|
| Hero offers only Find a clinic / Find a service | Telehealth isn't a visible option; patient must guess it's a "service" | Many won't find it | Add a "Virtual visit" entry point to the hero | Telehealth is one click from home |
| Two event banners and only Urgent Care highlighted | Promos compete with the primary task | Split attention | Move events lower, one primary action | Clearer hierarchy |
| Telehealth is an inline paragraph link, followed by notices | Easy to miss; text says "call" while the page offers more | Missed or mismatched expectations | Not needed in redesign: direct entry from home; keep notices compact | Faster recognition |
| Three booking paths in one sentence, no recommendation | Patient must evaluate options alone | Decision effort, abandonment | One primary path, others labeled alternatives | Fewer wrong turns |
| Form labeled "Contact us" under "Schedule an appointment" | Label doesn't match outcome; no expectation set | Patients may think they've booked | Rename "Request a telehealth visit" + "what happens next" | Accurate expectations |
| Form lacks visit type, preferred times | Staff must call back to collect | Extra back-and-forth | Add phone/video, preferred days/times | Actionable first request |
| FAQ/eligibility is below the form | Fit is decided before filling the form | Uninformed requests | Eligibility and expectations first, then request | Better-informed requests |
| Clipped date fields, 9-link sidebar, floating call button | Persistent chrome and tiny inputs add friction | Harder to complete | Larger inputs, remove sidebar from flow | Easier completion |
Accessibility notes (hypotheses, not findings): text over photographs on the Services page may have low contrast. Verify with a contrast checker before claiming it.
## What to build
Two routes with a visible toggle labeled "View: Original (reconstruction) / Redesign" so before/after is easy to demo.
**A. Original (simplified baseline)**: Home hero (two selectors, event banners) → Services page (inline telehealth link) → Telehealth page (sidebar, three-path box, form, FAQ below). Keep it simple. The point is a baseline, not a pixel copy.
**B. Redesign**
1. Home: hero with three entry points: Find a clinic, Find a service, and **Virtual visit** (visually primary). Events moved to a lower "News & events" strip. Keep Urgent Care and the phone number in the header.
2. Telehealth page (single column, no sidebar): short title; "How it works" in 3 steps (Request → Staff contact you → Visit by phone or video); "Is telehealth right for you?" with the services list plus the "not all visits" note and a compact 911 notice; one primary button "Request a telehealth visit"; secondary links "Call (619) 515-2300" and "Use MyHealthRecord". No sponsors, accreditation block or newsletter on this page.
3. Request form: visit type (phone / video), reason (select + optional detail), preferred days and time windows, name, mobile phone (explain it's required for video because a join link is texted), email, ZIP, date of birth (large, properly labeled inputs), minor notice, and the prototype note. Inline validation with plain-language error messages.
4. Confirmation: "Request received", summary of what they entered, "What happens next" (staff will contact you; for video you'll get a text link; your provider will call, be available up to 30 min before and after), plus a call link. Don't invent response times.
## States to implement
loading, empty, success, failure (including a simulated submit failure with retry), validation errors, partial (optional fields blank), desktop, mobile, and accessibility states (visible focus, error announcements via aria-live).
## Accessibility baseline
Real labels on every input, keyboard-operable everywhere, visible focus, 44px minimum touch targets, text contrast of at least 4.5:1, plain language, no information conveyed by color alone.
## Docs to write (after each milestone, not all at the end)
- decisions.md: one entry per significant decision with Observation, Hypothesis, Decision, Reason, Tradeoff, Validation. Include every visual change.
- research.md: separate Evidence / Assumptions / Hypotheses.
- ai-workflow.md: leave a clear template. I will fill in where I accepted, rejected or changed your suggestions.
- accessibility.md: what I checked and what I still need to verify.
- /prompts: save the key prompts I used.
## Working agreement
Build one component at a time. After each: tell me what you built and why, and what you'd improve. Then give me the git commands: `git add . && git commit -m "Add [Component] ..." && git push`. Use a Node .gitignore. Start by (1) scaffolding the repo structure and tokens file, (2) writing docs/problem.md and docs/ux-audit.md from the text above, and (3) stopping for my review before building any screens.
