# Booking System Design

Updated: 2026-04-01

## Requirements

- **Accessibility:** Works without a default mail client. Keyboard navigable. Screen-reader friendly.
- **Conversion:** One-click to available times—no email handoff.
- **Simplicity:** 30-minute intro call. Single event type for now.
- **Integration:** Fits site aesthetic. Inline embed on `booking.html` where possible.
- **Stack:** Google Workspace — Calendar **Appointment schedules** + **Google Meet** (replacing Zoom Scheduler).

## Production setup (Google Calendar & Meet)

1. In [Google Calendar](https://calendar.google.com), create an **Appointment schedule** (30 minutes, Vancouver/time zone as needed).
2. Under **Video conferencing**, choose **Google Meet**.
3. Open **Share** → **Website embed** and copy the iframe `src` URL (typically `https://calendar.google.com/calendar/appointments/schedules/…?gv=true`).
4. In `booking.html`, paste that URL into:
   - the `<iframe src="…">`
   - the fallback link in `.booking-fallback` (same URL is fine; or use your `calendar.app.google/…` booking page for “open in new tab” if Google gives you both).

See Google Help: [Share your appointment schedule](https://support.google.com/calendar/answer/10733297).

Until you replace the placeholder `YOUR_SCHEDULE_ID` segment, the embed will not load.

## Implementation

1. **booking.html** — Embedded Google scheduling widget + fallback link
2. **CTAs** — “Book an intro call” / nav “Intro call” → `booking.html`
3. **privacy.html** — Describes Google Calendar & Meet data handling

## Alternatives (not in use on punkeyepictures.com)

| Service | Notes |
|---------|--------|
| **Calendly / Cal.com** | Good if you ever leave Workspace scheduling |
| **Zoom Scheduler** | Removed from the live site in favour of Meet |

## Event type configuration (Google)

- **Duration:** 30 minutes (match on-site copy)
- **Location:** Google Meet (automatic link on the calendar event)
- **Buffer:** Optional between bookings
- **Reminders:** Calendar defaults + guest email as configured in Workspace
- **Questions:** Optional — e.g. organization name or “what are you curious about?”

