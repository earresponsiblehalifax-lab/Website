# Ear Responsible

A plain HTML, CSS, and JavaScript site for [earresponsible.ca](https://www.earresponsible.ca). There is no framework and no build step. GitHub Actions deploys it to GitHub Pages from the `main` branch.

The preview is [https://earresponsiblehalifax-lab.github.io/website/](https://earresponsiblehalifax-lab.github.io/website/). After DNS cutover, the same files are served at the domain root.

## Folder structure

```
index.html              Home
shop/index.html         Product (Earplugs, $20.00 CAD)
about/                  Brand / harm-reduction
stockists/              Retailers (list coming soon)
faq/                    Frequently asked questions
contact/                Email, phone, form
thanks/                 Post-purchase page (Stripe redirect)
shipping/ returns/ privacy/ terms/
404.html
css/styles.css          The only stylesheet
js/config.js            Stripe Payment Link + Formspree URL (edit this)
js/site.js              Menu, Buy buttons, form fallback, photo switcher
fonts/outfit-latin.woff2
assets/                 Compressed photos, logo, favicon
.nojekyll               Stops GitHub Pages running Jekyll
.github/workflows/pages.yml
```

There is no `CNAME` file yet. Add one at cutover (see below).

## Preview on your computer

From this folder:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Links and assets are relative (`shop/`, `../css/styles.css`), so the same files work in a project subpath and at the domain root. The 404 page is the exception: GitHub serves it at the missing URL, which can be any depth, so a short script sets a `<base>` href. On `*.github.io` that base is the first path segment (`/website/`). On any other host, including the custom domain, it is `/`.

## Stripe and the contact form

All Buy buttons read one value. The contact form reads one value. Both live in `js/config.js`:

```js
window.EAR_RESPONSIBLE = {
  stripePaymentLink: "https://buy.stripe.com/9B6bJ2b3gdgSeiNeOy3F600",
  formspreeEndpoint: "https://formspree.io/f/PLACEHOLDER"
};
```

1. **Stripe.** The Payment Link is already set. It sells Earplugs at $20.00 CAD, with $7 untracked Lettermail or $15 tracked Canada Post, and HST added at checkout. In the Stripe Dashboard, set the after-payment redirect to `https://earresponsiblehalifax-lab.github.io/website/thanks/` while previewing, and to `https://www.earresponsible.ca/thanks/` at cutover. Changing the link later is one edit in `js/config.js`; `js/site.js` copies it onto every Buy button.
2. **Formspree.** There is no form endpoint yet. `formspreeEndpoint` is still the placeholder, and the contact form does not post to it. Submitting the form opens a pre-filled email to `earresponsiblehalifax@gmail.com`. When a real Formspree URL is pasted into `js/config.js`, the form posts there instead. Update the privacy page at the same time so it describes that service.

## How to edit copy

Open the HTML file for that page in any text editor and change the text. Shared look-and-feel is in `css/styles.css`. Header and footer are repeated on each page (there is no template engine), so a nav change needs to be made in every `index.html` plus `404.html`.

## Images

The files in `assets/` are the compressed web versions. To swap a photo, keep the same filename in `assets/` or update the `src` in the HTML.

## Deploy

Pushes to `main` run `.github/workflows/pages.yml`, which uploads this folder and deploys it with GitHub Pages. Pages itself must be set to **GitHub Actions** as the source (the repo’s Pages setting, not a branch). No Jekyll build runs (`.nojekyll`).

## CNAME and going live

**Do not add a `CNAME` file, and do not turn on a custom domain in GitHub Pages, until DNS cutover.** A `CNAME` of `www.earresponsible.ca` would make the `github.io` preview redirect to the domain while it still points at Squarespace.

At cutover:

1. Add a `CNAME` file at the repo root containing exactly `www.earresponsible.ca`.
2. Lower TTLs in Google Cloud DNS, then point the apex A/AAAA records at GitHub Pages and `www` CNAME at `earresponsiblehalifax-lab.github.io`.
3. Set the custom domain in the repo’s Pages settings and turn on “Enforce HTTPS” once GitHub issues the certificate.
4. Complete a real $20 test purchase on the live domain and refund it.
5. Only then cancel Squarespace. The domain stays at Tucows/OpenSRS.

## What this site does not do

- It does not process payments itself. Stripe does.
- It does not send the contact form itself. Until Formspree is connected, the visitor’s email app does.
- It has no cart, accounts, search, or newsletter. There is one product.
