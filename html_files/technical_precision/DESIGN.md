---
name: Technical Precision
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

## Brand & Style

The design system is engineered for high-stakes technical environments. It targets developers and hiring managers who value speed, accuracy, and deep focus. The aesthetic is a fusion of **Modern Minimalist** and **Developer-Centric Utilitarianism**, taking inspiration from the "Linear" design language—characterized by tight spacing, subtle borders, and intentional use of color.

The emotional response should be one of professional calm and technical reliability. By stripping away unnecessary ornamentation and relying on a disciplined grid and refined typography, the UI recedes into the background, allowing the code and the conversation to remain the focal point. Visual interest is generated through crisp edges, high-contrast semantic highlights, and a single, vibrant accent color that guides the user’s eye to primary actions.

## Colors

This design system utilizes a strictly dark-mode palette to reduce eye strain during long coding sessions. Depth is established through tonal shifts rather than shadows. 

- **Backgrounds:** A three-tier hierarchy using `#0F1117` for the base canvas, `#1A1D27` for secondary surfaces like sidebar panels or code editor wrappers, and `#22263A` for interactive overlays or modals.
- **Accents:** Indigo (`#6366F1`) is reserved for primary functional triggers. 
- **Semantics:** Status colors are high-chroma to ensure errors and success states are instantly recognizable against the dark background.
- **Borders:** A consistent `#2D3149` is used to define structure without creating visual noise.

## Typography

The typography strategy prioritizes legibility and information density. **Inter** is the primary typeface for all UI elements, chosen for its exceptional clarity and modern neutral tone. **JetBrains Mono** is utilized for all technical content, including code editors, terminal outputs, and metadata labels, reinforcing the developer-centric nature of the platform.

Headlines use tight letter-spacing and semi-bold weights to appear "locked-in" and authoritative. Body text maintains a comfortable line height for readability, while code blocks use a slightly more generous line height to ensure clarity in dense logic.

## Layout & Spacing

The layout model follows a **Fixed-Panel Grid** system common in professional IDEs. The application is typically divided into three primary zones: a persistent navigation/sidebar, a central code editor (fluid), and a collapsible terminal/output panel.

A strict 4px/8px modular scale is used for all internal padding and margins. This ensures that even in data-heavy views, the UI feels organized and "tight." On mobile devices, sidebars are hidden behind a drawer system, and the layout reflows to a single-column stack, prioritizing the code editor.

## Elevation & Depth

This design system avoids traditional drop shadows to maintain its "flat-but-layered" aesthetic. Instead, depth is communicated through **Tonal Layering** and **Low-Contrast Outlines**.

- **Level 0 (Base):** `#0F1117` for the page background.
- **Level 1 (Surface):** `#1A1D27` for cards and main containers, defined by a 1px solid border of `#2D3149`.
- **Level 2 (Elevated):** `#22263A` for popovers, tooltips, and modals. These are the only elements permitted to use a subtle, 10% opacity black shadow to help separate them from the content below.

Interactivity is indicated by a shift in border color or a subtle glow, rather than a physical "lift."

## Shapes

The shape language is disciplined and geometric. While the system uses a "Soft" base, the specific radii are mapped to the element's size to ensure visual harmony:

- **Cards & Large Containers:** 8px radius provides a structured, professional frame.
- **Buttons & Inputs:** 6px radius offers a precise, "clickable" feel that balances the sharpness of the code.
- **Badges & Tags:** 4px radius keeps small metadata elements compact and distinct from larger interactive components.

Avoid fully pill-shaped or circular elements unless they are avatars or specific status indicators.

## Components

### Buttons
Primary buttons use the Indigo accent (`#6366F1`) with white text. On hover, apply a subtle `0px 0px 15px rgba(99, 102, 241, 0.3)` outer glow. Secondary buttons are ghost-style with a `#2D3149` border and `#FFFFFF` text.

### Inputs
Text inputs use the `#1A1D27` background with a 1px border. Focus state is indicated by the border changing to `#6366F1` and a 2px inset ring. Placeholder text should be a muted `#4B5563`.

### Cards
Cards are the primary container for content blocks. They feature the 8px radius, `#1A1D27` background, and the standard `#2D3149` border. No shadow is applied unless the card is being dragged or is part of a modal flow.

### Chips & Badges
Small, 4px rounded indicators. Status badges use a faint 10% opacity background of their semantic color (e.g., green for Success) with a solid colored dot and high-contrast text.

### Code Editor
The editor should use a dark theme matching the page background. Line numbers and gutter elements are muted. The "Active Line" is highlighted with a subtle `#22263A` background bar.