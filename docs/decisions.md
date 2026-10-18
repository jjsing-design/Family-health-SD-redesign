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

## 9. Original services page keeps telehealth inline

- Observation: On Services and Programs, telehealth is a gold inline link in the intro paragraph, followed by a 911 notice, a survey prompt, a mask warning, and then the services list. The page sits on a photograph.
- Hypothesis: Keeping that order on a navy field still shows the problem: the link is easy to miss, and it says "call" before the reader reaches the telehealth page.
- Decision: `/original/services` uses the observed sentence. "To schedule a telehealth appointment" links to `/original/telehealth`. The phone number is a `tel` link. Notices stay in that order. The services list reuses the five mock names. The background is navy. The mask warning is white, not the orange from the screenshot. The survey control explains that surveys are outside this prototype.
- Reason: This is the observed path from home to telehealth. A photograph is not allowed. Orange `#DC6339` on navy is about 4.1:1, under 4.5:1 for body text.
- Tradeoff: The page will not match the photo, the icon row, or the orange warning. The inline link has a 44px target, so it is slightly easier to tap than a plain line of text.
- Validation: Contrast uses the token pairs already measured. Jeramehl will review the page in the browser.

## 10. Original telehealth page is the cramped baseline

- Observation: The telehealth page has a 9-link sidebar, a floating call button, a tan box with call, the form, and MyHealthRecord in one sentence, a form titled "Contact us," narrow date fields, and the FAQ below the form. "Contact us" was teal. The call button was the same teal.
- Hypothesis: Rebuilding that order, without visit type or preferred time, shows why the request is hard to understand. Fixing those gaps belongs on the redesign.
- Decision: `/original/telehealth` has the sidebar, the one-sentence schedule box, the Contact us form, narrow month/day/year fields, the FAQ underneath, and a floating call link. The heading and call link use navy and white, not teal. Sponsor logos, the empty accreditation heading, and the newsletter are left off. Submit stays in the browser: nothing is sent. Success says "Request received." A prototype checkbox can force a failed submit.
- Reason: This is the baseline the redesign will be compared with. Teal `#51ABDB` on white is about 2.6:1, so it cannot be the heading color. The form must not store information or say the visit is booked.
- Tradeoff: The date row is narrow on purpose, so the year field is partly cut off on a wide screen. The other eight sidebar items do not open real pages. The floating link sits over the corner of the page.
- Validation: Jeramehl will review this page in the browser.

## 11. Redesign home makes Virtual visit the primary choice

- Observation: The original hero offers Find a clinic and Find a service, with two event banners in the same area. Telehealth is not a choice.
- Hypothesis: A third entry, larger than the other two and placed first, makes a virtual visit one click from home. Moving the banners into a lower strip reduces competition with that choice.
- Decision: `/redesign` keeps the welcome line and gold headline. Virtual visit is a gold card that links to `/redesign/telehealth` and says the visit is by phone or video and that staff will call back. Find a clinic and Find a service stay blue and do not list telehealth. The same two event sentences sit under a "News & events" heading, below the hero.
- Reason: The gold card reuses the highlight color already used for the main action. Dark text on that gold is about 11:1. The underline on "Virtual visit" means the link is not identified by color alone. Urgent Care and the phone number stay in the shared header.
- Tradeoff: The hero now has two gold controls, Urgent Care in the header and Virtual visit in the hero. The clinic and service tools still do not open real results.
- Validation: Jeramehl will review `/redesign` beside `/original`.

## 12. Redesign telehealth page leads with fit, then one request

- Observation: The original telehealth page puts three booking paths in one sentence, a sidebar, and a floating call button before the reader sees whether telehealth fits. The FAQ is below the form.
- Hypothesis: Three numbered steps, the services that often fit, and one primary request will make the next action clear. Call and MyHealthRecord can stay available without looking equal to that request.
- Decision: `/redesign/telehealth` is a single column. It has a short title, How it works in three steps, Is telehealth right for you with the services list, the not-all-visits note, and a compact 911 line. The gold button says Request a telehealth visit and goes to `/redesign/request`. Call and Use MyHealthRecord are text links under it. No sidebar, sponsors, accreditation block, newsletter, or floating call button.
- Reason: The button reuses the gold already used for the primary action. Dark text on gold is about 11:1, and the label is underlined. The steps are numbered in an ordered list, so the sequence is not color alone.
- Tradeoff: MyHealthRecord still does not open a portal. The request form is not on this page yet.
- Validation: Jeramehl will review this page beside `/original/telehealth`.

## 13. Redesign request asks for what staff would otherwise call back to collect

- Observation: The original form asks for a free-text reason, name, email, phone, ZIP, and a clipped date of birth. It does not ask for phone versus video or a preferred time. The date fields are narrow.
- Hypothesis: Collecting visit type, a reason, preferred days, and a time of day on the first request gives staff enough to follow up. A large date of birth is easier to complete than the clipped fields.
- Decision: `/redesign/request` asks for phone or video, a reason from the services list plus optional detail, weekdays, morning/afternoon/evening, name, mobile phone, email, ZIP, and date of birth. The phone help text says a video visit texts the join link to that number. The prototype warning and the minor notice are on the form. Nothing is sent or saved. A checkbox can force a failed submit. Success opens `/redesign/confirmation` with the answers held only for that screen. That screen says "Request received," repeats what was entered, and states what happens next without a response time.
- Reason: The confirmation has to show the success state of this form. Optional detail can be left blank. Morning, afternoon, and evening are labels for the time choice, not a claim about clinic hours.
- Tradeoff: Opening the confirmation directly shows an empty state, because the answers are not stored. The year is four digits, unlike the original two-digit field.
- Validation: Jeramehl will try an empty submit, a video request with the detail left blank, a simulated failure, and a successful submit.

## 14. Telehealth page is grouped so the request is visible sooner

- Observation: The first redesign of this page is a single column of text with equal visual weight, and the main action is at the bottom.
- Hypothesis: Patients may scan past or give up before reaching the request button. Grouping the content into three scannable sections, and repeating the button at the top, would reduce how much they must read before acting.
- Decision: The title is "Telehealth." A request button sits under the intro and again at the bottom. How telehealth works is three cards in a row on a wide screen, each with a number, a short title, and one sentence. Is telehealth right for you sits on the tan token, with the services in two columns. The 911 line is in its own navy-bordered box. No new colors were added.
- Reason: This follows Jeramehl's review of the first version. Dark text on the tan panel is about 10.9:1. The step number is white on navy, about 14.7:1. The button stays dark text on gold, about 11:1. The visible step number is hidden from assistive tech so the numbered list is not announced twice.
- Tradeoff: Two identical request buttons. The service list becomes one column on a narrow screen so the longer lines stay readable. The home card is still labeled Virtual visit.
- Validation: Jeramehl will review this layout. Not tested with patients.

## 15. Request form is grouped so progress is visible

- Observation: The request form is a long continuous list of 12 fields, with equal visual weight, and a repeated required label on each one.
- Hypothesis: Patients may find it long and hard to scan, and may lose track of what is left. Grouping it into three labeled sections, using larger selection controls, and marking only optional fields would reduce how much they process at once and make progress visible.
- Decision: `/redesign/request` stays one page. About the visit, When works for you, and About you each sit on the tan token. Phone and video are large cards with the hints "We call you" and "You get a text link to join," and they stay real radio inputs. Preferred days and time of day are chips built on real checkboxes. A selected chip shows a check mark as well as a navy fill. A line at the top says all fields are required unless marked optional. More detail keeps "(optional)." ZIP and date of birth stay narrow. Group labels share the left edge of the inputs. What happens next sits beside Submit. The simulate-failure checkbox is in a Prototype controls strip below that, with space between it and the button.
- Reason: This follows Jeramehl's review. Text on tan is about 10.9:1. A selected chip is white on navy, about 14.7:1. A selected visit card is dark text on gold, about 11.2:1. The required red on tan is about 3.7:1, so error text sits on white, where that red is about 6.0:1. Inputs use a navy border so the white fields stay visible on the tan panel. The visible "Selected" word and the check mark are hidden from assistive tech, because the radio or checkbox already announces the state.
- Tradeoff: Still one page, not a series of steps. The prototype strip remains on the form so a failed submit can be tried. ZIP and the date fields stay narrow on a small screen.
- Validation: Jeramehl will review this form. Not tested with patients.
