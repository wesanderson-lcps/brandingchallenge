# brandingchallenge

## Adding Company Logos

Place SVG logo files in the `public/logos/` directory. Name each file using the brand's `companiesLogoId` followed by `.svg`.

For example:
- Nike → `public/logos/NKE.svg`
- Apple → `public/logos/AAPL.svg`
- McDonald's → `public/logos/MCD.svg`

The full list of logo IDs is defined in the `BRAND_DATA` array in `src/App.jsx`. When a local SVG is present it takes priority; otherwise the app falls back to fetching a PNG from companieslogo.com, then to a built-in inline SVG, and finally to a placeholder icon.