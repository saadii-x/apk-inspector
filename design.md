# Design: APKInspector

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: Narrative Workflow
- Theme: Console
- Axes: dark/grotesk-sans/chromatic-amber, posture: restrained
- Dial: graphite. Amber is a person. Cool blue is an instrument.

## Tokens
`apps/web/src/app/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(17% 0.008 250);  --color-paper-2: oklch(21% 0.009 250);  --color-paper-3: oklch(13.5% 0.007 250);
  --color-ink: oklch(95% 0.005 250);  --color-ink-2: oklch(83% 0.008 250);  --color-muted: oklch(71% 0.01 250);  --color-rule: oklch(31% 0.01 250);
  --color-accent: oklch(82% 0.15 80);  --color-accent-ink: oklch(18% 0.04 75);  --color-focus: oklch(82% 0.15 80);
  --font-display: "Host Grotesk", ui-sans-serif, system-ui, sans-serif;  --font-body: "Host Grotesk", ui-sans-serif, system-ui, sans-serif;  --font-outlier: "Atkinson Hyperlegible Mono", ui-monospace, monospace;
  --radius-card: 10px;  --radius-pill: 6px;  --rule-hair: 1px;  --shadow-card: none;
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`.

## Controls
- Primary: amber fill, 6px radius, 48px on the marketing page, 40px on the report
- Secondary: hairline outline on paper-2, same radius and height

## Motion
- Character: still. No reveal. A loader may spin. Under reduced motion everything ends at once.

## Exports
`apps/web/src/app/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request, per `export-formats.md`.

## Variants
- `/` is a marketing page: Settled hero, masthead, statement footer.
- `/report` is an app screen: the same tokens, a top bar, tables and readings, no display-size marketing hero.
