import { NextResponse, type NextRequest } from "next/server";

/*
  WhatsApp hand-off that never exposes the phone number to the page.

  The number lives only in the WHATSAPP_NUMBER environment variable
  (set in Vercel and in a git-ignored .env.local), so it is not in the
  HTML, the JS bundle or the repository. A real click on the button is
  redirected to wa.me; bots, scrapers and non-browser clients get a 404.
*/

export const dynamic = "force-dynamic";

const NON_HUMAN =
  /bot|crawl|spider|slurp|scrap|preview|facebookexternalhit|embedly|curl|wget|python|httpie|httpclient|okhttp|axios|node-fetch|undici|go-http|java\/|libwww|headless|phantom|puppeteer|playwright/i;

const MESSAGES: Record<string, string> = {
  project: "Hi Shoaeb, I came across your portfolio and I'd like to start a project with you.",
  hello: "Hi Shoaeb, I came across your portfolio."
};

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store, private",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer"
};

export function GET(req: NextRequest) {
  const number = (process.env.WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  const userAgent = req.headers.get("user-agent") ?? "";
  // Browsers send Sec-Fetch-Mode: navigate when a person follows a link.
  const isNavigation = req.headers.get("sec-fetch-mode") === "navigate";

  if (!number || !isNavigation || NON_HUMAN.test(userAgent)) {
    return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
  }

  const text = MESSAGES[req.nextUrl.searchParams.get("t") ?? ""] ?? MESSAGES.hello;
  const res = NextResponse.redirect(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, 302);
  for (const [k, v] of Object.entries(PRIVATE_HEADERS)) res.headers.set(k, v);
  return res;
}
