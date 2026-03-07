# Booking System Design

## Requirements

- **Accessibility:** Works without a default mail client. Keyboard navigable. Screen-reader friendly.
- **Conversion:** One-click to available times—no email handoff.
- **Simplicity:** 20-minute intro call. Single event type for now.
- **Integration:** Fits site aesthetic. No jarring redirect to external brand.

## Options

| Service | Cost | Pros | Cons |
|---------|------|------|------|
| **Calendly** | Free (1 event) | Widely used, reliable, good UX | Branded "Powered by Calendly" on free tier |
| **Cal.com** | Free (self-host or cloud) | Open source, white-label, privacy-focused | Less familiar to users |
| **Cal.com Cloud** | Free tier | Same as above, no self-hosting | — |

**Recommendation:** Cal.com (free cloud) or Calendly (free). Both support inline embed so users stay on punkeyepictures.com.

## Implementation

1. **booking.html** — Dedicated page with embedded calendar
2. **CTAs** — All "Book a call" / "Intro call" links point to `/booking.html`
3. **Contact page** — "Book a 20-min call" for orgs links to booking; families/funders keep email (different flows)

## Setup Steps (Calendly)

1. Sign up at [calendly.com](https://calendly.com)
2. Create event type: "20-minute intro call"
3. Set availability (e.g. weekdays 10am–4pm PT)
4. In booking.html, replace `punkeyepictures` in the embed URL with your Calendly username

## Setup Steps (Cal.com)

1. Sign up at [cal.com](https://cal.com)
2. Create event: "20-min intro call"
3. Copy your event link (e.g. `cal.com/yourname/20min`)
4. In booking.html, replace the Calendly embed with Cal.com's embed code and your URL

## Event Type Configuration

- **Duration:** 20 minutes
- **Buffer:** 5 min between calls (optional)
- **Location:** Zoom/Meet/phone—add your link in the service
- **Reminders:** Enable email reminders (default in both services)
- **Questions:** Optional—add "Organization name" or "What are you curious about?" for qualifying
