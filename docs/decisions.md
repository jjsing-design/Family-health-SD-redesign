# Decisions

One entry per significant decision. Visual changes are included. Validation with patients has not happened.

## 1. Approximate colors in one tokens file

- Observation: The screenshots use a dark navy header, gold banners and buttons, blue hero cards, a tan schedule box, and teal headings.
- Hypothesis: Sampling flat areas of the screenshots would be close enough to keep the brand feel without taking assets from the live site.
- Decision: Colors live in `src/styles/tokens.css`. Header `#142651`, text `#0A1733`, gold `#F6C767`, Urgent Care gold `#F4BB47`, card blue `#214897`, tan `#DEC8A0`, teal `#51ABDB`, required label `#B1391F`.
- Reason: One file makes later changes easy. Two golds were kept because the Urgent Care button and the banners did not sample as the same pixel.
- Tradeoff: These are screenshot samples, not brand guidelines. Teal on white is about 2.6:1, so it cannot be used for text.
- Validation: Contrast ratios were calculated for the solid pairs. Not checked against the live site's CSS.

## 2. System font

- Observation: The screenshots use a sans serif. The specific font file was not identified.
- Hypothesis: Loading a font from the live site would copy an asset we should not take.
- Decision: The prototype uses a system sans stack.
- Reason: It stays neutral and does not depend on their files.
- Tradeoff: The reconstruction will not match their letterforms.
- Validation: Not compared with the live font. Change the token if a licensed font is chosen later.

## 3. Focus ring uses navy on light surfaces

- Observation: A gold outline on white is about 1.6:1.
- Hypothesis: A navy ring will stay visible on the white page without introducing a new accent color.
- Decision: Focus uses `#142651` on light surfaces. On the navy header, including the Urgent Care button, focus switches to gold. The ring is drawn outside the control, so it sits on the header, not on the gold button.
- Reason: A navy ring on the navy header disappears. Gold on navy is about 9:1. A gold ring on the white view bar would fail, so the toggle keeps the navy ring.
- Tradeoff: The ring color changes with the surface behind it.
- Validation: Ratios calculated. Keyboard check is part of the shell review.

## 4. App shell before any page body

- Observation: Both versions need the same footer label, the phone number, Urgent Care, and a way to switch views.
- Hypothesis: Building the chrome once will keep the disclaimer and the demo toggle from drifting apart as pages are added.
- Decision: Shared header, footer, and view toggle. Routes are `/original/...` and `/redesign/...`. Page bodies are placeholders.
- Reason: The footer label is required on every screen. The toggle is how the before/after will be demoed.
- Tradeoff: The header is thinner than the live site. Donate, Pay Your Bill, MyHealthRecord, and search are not in this shell. Services is the only nav item, because that is the observed path.
- Validation: Home, Services, and Telehealth were opened in both views. The toggle keeps the current page. At 375px the page does not scroll sideways, and the header and toggle controls measure 44px tall. No patient test.

## 5. The view toggle is prototype chrome

- Observation: The live site has no Original / Redesign control.
- Hypothesis: If the toggle looks like a product control, a reviewer may think patients see it.
- Decision: The toggle sits between the header and the page, labeled "View:", on a white bar with a gold bottom edge. It is a second navigation landmark, "Prototype view."
- Reason: It stays visible on every screen and reads as part of the portfolio demo.
- Tradeoff: It takes vertical space the live site does not spend.
- Validation: Pending visual review.

## 6. Urgent Care stays in the header and does not open another product

- Observation: Urgent Care is the only highlighted button, and the audit says that highlight competes with other tasks.
- Hypothesis: Removing it from the shell would hide the hierarchy problem the redesign is meant to answer.
- Decision: The gold button remains. Activating it shows one sentence: urgent care is outside this prototype.
- Reason: The button has to do something keyboard users can reach, and this project does not include an urgent-care flow.
- Tradeoff: The control does not match the live destination.
- Validation: Activating Urgent Care shows the sentence and a second activation hides it. The keyboard ring is styled in CSS and still needs a pass in a focused browser window.

## 7. React Router for the two views

- Observation: The prototype needs several pages in two versions.
- Hypothesis: Real URLs will make refresh and the view toggle reliable.
- Decision: `react-router-dom` routes under `/original` and `/redesign`. Switching views keeps the same page when that page exists in the other version.
- Reason: It is a router, not a visual component library.
- Tradeoff: Another dependency. The redesign services route exists only so the Services link has a destination; that page says telehealth will not travel through it.
- Validation: `/original`, `/original/services`, `/original/telehealth`, `/redesign`, `/redesign/services`, `/redesign/telehealth`, `/redesign/request`, and `/redesign/confirmation` all render. Switching views from Telehealth stays on Telehealth.

## 8. Original home hero, without the photograph

- Observation: The home hero is a darkened photo with a white welcome line, a gold "How may we help you?", two blue cards (Find a clinic, Find a service), and two gold event banners. Telehealth is not one of the choices.
- Hypothesis: A flat navy field can stand in for the photo and still show the hierarchy problem: events and the two finders, with no virtual visit.
- Decision: The original home uses that headline, those two finders, and the banner sentences from the screenshot. The background is the navy token. Icons are simple gold shapes. The service menu lists five names visible on the Services screenshot and does not include telehealth. ZIP and the menu do not navigate anywhere. A valid ZIP says the prototype does not look up clinics. The prototype warning sits under the finders.
- Reason: The baseline has to show why telehealth is hard to find. Copying the photo is not allowed. A 70-item menu was not copied.
- Tradeoff: The hero will not match the photograph, the letterforms, or the length of the live menu. The banners are text, not links, because their destinations are outside this task.
- Validation: Contrast of gold and white on navy, white on the blue cards, and dark text on the gold banners was calculated earlier. Gold focus rings on the blue cards are about 5.5:1. Browser check of the finders is part of this build.
