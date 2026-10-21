

# Vanilla JavaScript App

This is my Resume website. This website is made with vanilla JavaScript and hand-written CSS.

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build JavaScript apps in minutes. Use this repo with the [quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=vanilla-javascript) to build and customize a new static site.

This repo is used as a starter for a _very basic_ HTML web application using no front-end frameworks.

### Deploy and caching

Deployment is a static upload to Azure Static Web Apps with no build step: [the workflow](.github/workflows/azure-static-web-apps-green-ground-0e5032d0f.yml) sets `app_location: "/"` and `skip_app_build: true`, so `staticwebapp.config.json` at the repo root is picked up as-is.

`staticwebapp.config.json` sets `Cache-Control` for three route rules (see the [SWA configuration reference](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)):

| Route | Header | Why |
| --- | --- | --- |
| `/assets/fonts/*.woff2` | `public, max-age=86400, must-revalidate` | Font filenames are not versioned, so a font swap under the same name must reach visitors within a day. |
| `/assets/*.webp` | `public, max-age=86400, must-revalidate` | Images have stable filenames, so a replacement may stay cached for at most a day. |
| `/*.pdf` | `public, max-age=604800, must-revalidate` | Resume PDFs carry the date in the filename (e.g. `resume-2026-10-devops-cloud.pdf`); a week is acceptable, and `immutable` is deliberately not used. |

Tradeoff: a replaced font or image under the same filename can be served stale for up to 1 day, and a PDF replaced under the same filename for up to 7 days. After expiry, `must-revalidate` forces a check against the server. Publish a new resume under a new dated filename to avoid the 7-day window.

`index.html`, `src/styles/styles.css` and `script.js` have no filename versioning, so no long-term cache rule is set for them; they get whatever default headers Azure Static Web Apps applies.

The headers above are configured for Azure Static Web Apps only. They are not applied by a local static server (for example `python -m http.server`), which does not read `staticwebapp.config.json` and sends its own default headers, so local responses say nothing about deployed caching. This repo has not verified the headers on the deployed site; check them with `curl -I` against the live URL after deploying.

### Responsive and accessibility behavior

- Cloud certification badges appear beside the primary resume/contact actions. On narrow screens Credentials precedes Experience.
- The descending career stair keeps the current role orange. Phone headers put text below the logo and chevron; the military card puts both images above its text.
- Viewport and container breakpoints support enlarged text. The identity pane scrolls normally on viewports up to 64em tall.
- The compact index uses native horizontal scrolling with a persistent section counter. It does not replace vertical page scrolling.
- Print removes glass fills and blur. Focus on the orange station uses a navy inset outline; forced-colors mode uses the system button text color.
- Scroll reveals have an 80px lead zone and stop observing shown content. Without JavaScript, without IntersectionObserver, or after a failed module load, content remains available.


### Todo

[] Add links to certifications
[x] Fix download link
