# Accessibility

Baseline for the prototype: real labels, keyboard access, a visible focus ring, 44px targets, 4.5:1 text contrast, plain language, and no information by color alone.

## Checked with the shell

- Token pairs were measured from the sampled hex values. Navy, body text, card blue, required red, and dark text on both golds clear 4.5:1 on their intended backgrounds. Teal `#51ABDB` on white is about 2.6:1. Gold on white is about 1.6:1. Those two pairs are not used for text.
- Focus on light surfaces is a navy outline. Focus on the navy header, including Urgent Care, is gold, because the ring is drawn on the header rather than on the button.
- The view toggle's selected state is a solid navy chip with bold type. The unselected option keeps an underline and a visible border, so the selection is not color alone.
- Header controls, toggle options, and the skip link use a 44px minimum height.
- The phone number is a `tel` link. Urgent Care is a button with `aria-expanded`. The two nav landmarks have names: "Primary" and "Prototype view."
- The skip link points at `main`.

## Checked in the browser

- The shell routes render, the view toggle keeps the current page, and Urgent Care shows and hides its note.
- Header, toggle, phone, and skip controls measure 44px tall.
- At 375px wide the page does not scroll sideways. The two view options wrap onto two lines.

## Checked with the original hero

- Find a clinic and Find a service are real labels, not placeholders alone.
- The ZIP field describes its error in text. The error is also an alert. A result uses a status message.
- Gold focus rings on the blue cards are about 5.5:1. A navy ring on those cards would be about 1.7:1, so the cards use gold.
- White and gold text on navy, white text on the blue cards, and dark text on the gold banners clear 4.5:1.
- The ZIP control, Go button, and service menu are at least 44px tall.
- The service menu does not include telehealth.

## Still to verify

- A keyboard walk in a focused browser window. The focus rules are in the CSS, including the skip link appearing on focus. The check browser did not give the document focus, so the ring was not seen.
- Services page: text over the photograph. This is still a hypothesis until the composed pixels are checked. Do not claim it as a finding yet.
- The request form, once it exists: labels, errors, and `aria-live`.
- Screen reader pass.
- 200% zoom, and a 375px pass of each finished page.
- Teal, if it is used later for anything other than a non-text shape. It fails as text on white.
