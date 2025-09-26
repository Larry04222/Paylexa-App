# Shared Phoenix Asset Library

The `shared-assets` workspace exposes reusable branding, motion, and localization
resources that can be consumed across the Paylexa frontend (web, mobile,
admin) and backend services. Use these assets instead of copying files into
feature packages to keep the Phoenix visual language and product copy
consistent.

## Directory overview

| Path | Description |
| ---- | ----------- |
| `shared-assets/icons/` | SVG iconography for low-level UI controls. |
| `shared-assets/logos/` | Official Phoenix marks and logotype treatments. |
| `shared-assets/animations/` | Lottie JSON sequences for motion design. |
| `shared-assets/translations/` | Baseline locale bundles (JSON) that can be merged into app-specific dictionaries. |
| `shared-assets/ui-tokens.json` | Platform-wide design tokens for colors, typography, spacing, radii, and shadows. |

## Import guidelines

### TypeScript / JavaScript packages (Next.js, React Native, Node)

Use the repository root as the import base when possible. Each package already
resolves `../shared-assets` from its project root.

```ts
// paylexa-web (Next.js)
import phoenixLogo from '../../shared-assets/logos/phoenix-logotype.svg';
import uiTokens from '../../shared-assets/ui-tokens.json';

// paylexa-mobile (Expo)
import phoenixMark from '../shared-assets/logos/phoenix-mark.svg';
import en from '../shared-assets/translations/en.json';
```

When bundlers require explicit asset declarations (e.g., Metro for SVG/Lottie),
add the `shared-assets` path to the corresponding config include lists.

### Backend services (Node.js / NestJS)

Consume translations or tokens using Node's module resolution:

```ts
import * as en from '../shared-assets/translations/en.json';
import tokens from '../shared-assets/ui-tokens.json';
```

For static file serving (e.g., delivering brand kits), read directly from the
filesystem and cache aggressively. Treat SVG and Lottie files as immutable.

## Usage guidance

- **Icons** – use `phoenix-outline.svg` for contextual buttons or navigation
  states. For monochrome contexts, apply CSS `fill` overrides or use the
  gradient as provided for premium experiences.
- **Logos** – `phoenix-logotype.svg` is the primary lockup for marketing
  surfaces; `phoenix-mark.svg` is the avatar/fallback mark.
- **Animations** – `phoenix-idle.json` is optimized for hero loaders or splash
  screens. Keep animation playback between 0.8×–1.2× speed for consistency.
- **UI tokens** – hydrate design systems (Tailwind, Styled Components, native
  styles) from `ui-tokens.json` so palette changes propagate across surfaces.
- **Translations** – treat the locale files as the baseline dictionary. Merge
  app-specific keys using your i18n library of choice (e.g., i18next, react-intl,
  NestJS i18n). Do not modify translations in-package; contribute upstream here.

## Contribution workflow

1. Update or add assets inside `shared-assets/`.
2. Document the change in this README if new asset categories or usage notes
   are required.
3. Notify the design system channel so downstream teams can update caches/CDNs.
