# JobHub Design System

## Tone
Professional, trustworthy, approachable. Inspired by modern job platforms (Naukri, Indeed) but cleaner and bolder. Confidence through clarity.

## Differentiation
Card-based editorial layout with intentional visual hierarchy. Blue for trust, green for action. Clean spacing prioritizes information density over decoration.

## Color Palette
| Token | Light Mode | Dark Mode | Purpose |
| --- | --- | --- | --- |
| Primary | `oklch(0.52 0.18 260)` Blue | `oklch(0.72 0.16 260)` Bright Blue | Trust, navigation, key actions |
| Accent | `oklch(0.58 0.21 150)` Green | `oklch(0.70 0.18 150)` Bright Green | CTAs: Apply, Save, Post |
| Secondary | `oklch(0.72 0.08 65)` Warm Tan | `oklch(0.52 0.08 65)` Neutral | Badges, tags, highlights |
| Destructive | `oklch(0.62 0.21 30)` Red | `oklch(0.68 0.19 30)` Bright Red | Remove, delete, reject |
| Background | `oklch(0.98 0.01 240)` Off-White | `oklch(0.12 0.01 240)` Near-Black | Main canvas |
| Foreground | `oklch(0.18 0.02 240)` Navy | `oklch(0.94 0.01 240)` Off-White | Primary text |
| Muted | `oklch(0.92 0.01 240)` Light Gray | `oklch(0.2 0.02 240)` Dark Gray | Disabled, secondary text |
| Border | `oklch(0.9 0.01 240)` Light Gray | `oklch(0.25 0.01 240)` Medium Gray | Dividers, borders |

## Typography
| Role | Font | Sizes | Usage |
| --- | --- | --- | --- |
| Display | Space Grotesk | 32px–48px | Page titles, job titles |
| Body | Inter | 14px–16px | Content, descriptions |
| Mono | Geist Mono | 12px–14px | Salary, IDs, technical info |

## Structural Zones
| Zone | Background | Border | Shadow | Purpose |
| --- | --- | --- | --- | --- |
| Header | Primary blue | None | `0 1px 3px` | Navigation, branding |
| Hero/Search | Card white | Border gray | `0 2px 8px` | Prominent search interface |
| Content Grid | Background off-white | Card gray | `0 2px 8px` | Job cards, listings |
| Sidebar/Filters | Muted light | Muted border | Flat | Faceted search, refinement |
| Footer | Muted light | Border top | Flat | Links, copyright |

## Component Patterns
- **Job Cards**: White background, border radius 8px, shadow hover, green action button bottom-right
- **Filter Panel**: Light gray background, stacked sections with border dividers
- **Header**: Blue background, white text, fixed or sticky, compact on mobile
- **Search Bar**: White input, blue focus ring, icon placeholders for keyword/location/category
- **Buttons**: Blue primary (apply/search), Green accent (apply/save/post), Gray secondary (cancel/close)

## Motion & Interaction
- **Fade In**: 0.3s on page load, card reveals
- **Slide Up**: 0.3s on filter results, list updates
- **Hover**: Card shadow elevates on hover, text color brightens slightly
- **Focus**: 2px blue ring around inputs, buttons

## Constraints
- Avoid decoration; prioritize information density
- Max 3–4 colors per screen (primary + accent + neutrals)
- Consistent 8px/16px spacing grid
- No full-page gradients or ambient effects
- Dark mode inverts lightness only; preserves saturation for readability

## Signature Detail
Green accent buttons create visual momentum toward action (apply, save, post). Blue primary establishes trust. Together they create distinctive job-platform aesthetic.
