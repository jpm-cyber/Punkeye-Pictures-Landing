#!/usr/bin/env python3
"""Simple uptime check for punkeyepictures.ca."""

from urllib.error import URLError
from urllib.request import Request, urlopen


URL = "https://www.punkeyepictures.ca/"


def main() -> None:
    req = Request(URL, headers={"User-Agent": "Punkeye-Uptime-Check/1.0"})
    try:
        with urlopen(req, timeout=15) as response:
            code = response.getcode()
            print(f"{URL} status={code}")
    except URLError as exc:
        print(f"{URL} DOWN: {exc}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
