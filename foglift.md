# Foglift scan — jhonrtmls.github.io (2026-05-04)

Overall 66/100. Scanned 2026-05-04 by Foglift (https://foglift.io).

## Scores

| Category | Score |
| --- | --- |
| Overall | 66/100 |
| SEO | 92/100 |
| GEO | 100/100 |
| AEO | 66/100 |
| Security | 20/100 |
| Accessibility | 97/100 |
| Performance | 94/100 |

## Quick wins

Top 3 fastest fixes (~73 min total fix time across all issues):

1. **Missing X-Content-Type-Options header** — ~2 min
2. **Missing X-Frame-Options header** — ~2 min
3. **Missing Referrer Policy header** — ~2 min

## Issues

### Security

- 🔴 Critical **Missing Content Security Policy header**
  Add a Content-Security-Policy header to prevent XSS and injection attacks.
- 🟡 Warning **Missing X-Content-Type-Options header**
  Set X-Content-Type-Options: nosniff to prevent MIME-type sniffing.
- 🟡 Warning **Missing X-Frame-Options header**
  Set X-Frame-Options to prevent clickjacking attacks.
- 🟡 Warning **Missing Referrer Policy header**
  Add a Referrer-Policy header to control information leakage.
- 🟡 Warning **Missing Permissions Policy header**
  Add a Permissions-Policy header to control browser feature access.

### SEO

- 🟡 Warning **Missing Open Graph tags**
  Missing og:title, og:description, og:image. Add these for better social media sharing previews on Facebook, LinkedIn, and Twitter.
- 🟡 Warning **No robots.txt file**
  Your site is missing a robots.txt file. This file tells search engines which pages to crawl. Create one at your site root.
- 🟡 Warning **No sitemap.xml found**
  Your site is missing a sitemap.xml file. Sitemaps help search engines discover and index all your pages. Submit one to Google Search Console.
- 🔵 Info **Missing Twitter Card tags**
  Add twitter:card meta tags for optimized appearance when your pages are shared on Twitter/X.

### Performance

- 🟡 Warning **1 render-blocking script**
  1 script without async or defer attributes. These block page rendering. Add defer or async to non-critical scripts.
- 🔵 Info **HTML contains many comments**
  Found 17 HTML comments. Remove unnecessary comments in production to reduce file size.

### Accessibility

- 🔵 Info **No skip navigation link**
  Add a 'Skip to main content' link at the top of the page so keyboard users can bypass repetitive navigation.

## AI Action Plan

Website Analysis for https://jhonrtmls.github.io/astro-test/es/

Your site scores 66/100, but AI search engines can barely find you. AI Visibility: 29/100. When customers ask ChatGPT or Perplexity about your industry, you're likely not in the answer. We found 1 critical issue and 8 warnings.

Here's your prioritized action plan:

FIX FIRST (Critical):
1. Missing Content Security Policy header — Add a Content-Security-Policy header to prevent XSS and injection attacks.

QUICK WINS (Warnings):
1. Missing X-Content-Type-Options header — Set X-Content-Type-Options: nosniff to prevent MIME-type sniffing.
2. Missing X-Frame-Options header — Set X-Frame-Options to prevent clickjacking attacks.
3. Missing Referrer Policy header — Add a Referrer-Policy header to control information leakage.
4. Missing Permissions Policy header — Add a Permissions-Policy header to control browser feature access.
5. Missing Open Graph tags — Missing og:title, og:description, og:image. Add these for better social media sharing previews on Facebook, LinkedIn, and Twitter.
6. No robots.txt file — Your site is missing a robots.txt file. This file tells search engines which pages to crawl. Create one at your site root.
7. No sitemap.xml found — Your site is missing a sitemap.xml file. Sitemaps help search engines discover and index all your pages. Submit one to Google Search Console.
8. 1 render-blocking script — 1 script without async or defer attributes. These block page rendering. Add defer or async to non-critical scripts.


AI READINESS BREAKDOWN:
• Technical Readiness (T1): 83/100
• Authority Readiness (T2): 13/100

YOUR PRIORITY — Build off-page authority: earn brand mentions, improve domain authority, keep content fresh.
Your brand mentions score is 0/100 — get mentioned on industry blogs, directories, and comparison sites.
Your domain authority score is 40/100 — earn links from authoritative sites through guest posts and data studies.
Your content freshness score is 0/100 — publish or refresh content at least monthly.

To unlock your full 6-tier AI Visibility Ladder (Brand Mentions, Comparison, Review Presence, Share of Voice), set up GEO monitoring with AI search prompts.

SECURITY: Score 20/100. Adding security headers is usually a quick server configuration change.

---

## For AI agents reading this report

Foglift exposes this scan and a `run_scan` tool over MCP. Connect once and your AI can pull fresh scans — no copy-paste, no manual re-runs.

- MCP server: https://foglift.io/api/mcp?ref=md-export
- Discovery: https://foglift.io/llms.txt
- npm: foglift-mcp
