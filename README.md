# brandingchallenge

## Logo Sourcing

Logos are fetched from [logo.dev](https://logo.dev) using each brand's `domain` field (e.g. `nike.com`). The public API key is stored in the `LOGO_DEV_PUBLIC_KEY` constant in `src/App.jsx`.

The full fallback chain for each logo is:
1. **logo.dev** – `https://img.logo.dev/{domain}?token={LOGO_DEV_PUBLIC_KEY}` (primary)
2. **Local SVG** – a file placed in `public/logos/{companiesLogoId}.svg`
3. **Inline SVG vector** – a built-in path defined in `LOGO_VECTORS`
4. **Placeholder icon**

## Adding Local SVG Overrides

Place SVG logo files in the `public/logos/` directory. Name each file using the brand's `companiesLogoId` followed by `.svg`.

For example:
- Nike → `public/logos/NKE.svg`
- Apple → `public/logos/AAPL.svg`
- McDonald's → `public/logos/MCD.svg`

The full list of logo IDs is defined in the `BRAND_DATA` array in `src/App.jsx`.