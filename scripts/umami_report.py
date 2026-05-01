#!/usr/bin/env python3
"""
Generate a 7-day traffic summary from Umami API.

Usage:
  UMAMI_BASE_URL="https://umami.example.com" \
  UMAMI_API_KEY="your-api-key" \
  UMAMI_WEBSITE_ID="your-website-uuid" \
  python3 scripts/umami_report.py
"""

from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


def require_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        print(f"Missing required env var: {name}", file=sys.stderr)
        sys.exit(1)
    return value


def fetch_json(url: str, headers: dict[str, str]) -> dict:
    req = Request(url, headers=headers, method="GET")
    try:
        with urlopen(req, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(f"HTTP error {exc.code} for {url}\n{body}", file=sys.stderr)
        sys.exit(1)
    except URLError as exc:
        print(f"Network error for {url}: {exc}", file=sys.stderr)
        sys.exit(1)


def main() -> None:
    base_url = require_env("UMAMI_BASE_URL").rstrip("/")
    api_key = require_env("UMAMI_API_KEY")
    website_id = require_env("UMAMI_WEBSITE_ID")

    end = datetime.now(timezone.utc)
    start = end - timedelta(days=7)
    params = {
        "startAt": int(start.timestamp() * 1000),
        "endAt": int(end.timestamp() * 1000),
    }
    query = urlencode(params)
    headers = {
        "Accept": "application/json",
        "x-umami-api-key": api_key,
    }

    stats_url = f"{base_url}/api/websites/{website_id}/stats?{query}"
    metrics = fetch_json(stats_url, headers)

    referrers_url = f"{base_url}/api/websites/{website_id}/metrics?{query}&type=referrer&limit=10"
    referrers_data = fetch_json(referrers_url, headers)
    referrers = referrers_data.get("data", [])

    report_path = Path("traffic_report.txt")
    lines = [
        "Punkeye Pictures Traffic Report (last 7 days)",
        f"Generated (UTC): {end.strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        f"Page views: {metrics.get('pageviews', 'n/a')}",
        f"Visitors: {metrics.get('visitors', 'n/a')}",
        f"Visits: {metrics.get('visits', 'n/a')}",
        f"Bounces: {metrics.get('bounces', 'n/a')}",
        "",
        "Top referrers:",
    ]

    if not referrers:
        lines.append("- none")
    else:
        for item in referrers:
            ref = item.get("x", "(unknown)")
            visits = item.get("y", 0)
            lines.append(f"- {ref}: {visits}")

    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {report_path}")


if __name__ == "__main__":
    main()
