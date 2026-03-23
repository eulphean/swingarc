# Design System Documentation: Athletic Editorial HUD

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Vault"**

This design system is built to evoke the high-stakes atmosphere of a championship broadcast. We are moving away from the "mobile game template" look and toward a high-end, editorial HUD (Heads-Up Display). The aesthetic is defined by "The Kinetic Vault"—a combination of aggressive athletic energy and premium, vault-like security.

To achieve this, we avoid rigid, centered grids. Instead, we use **intentional asymmetry**, overlapping elements (e.g., player cards breaking the bounds of their containers), and extreme typographic contrast. The goal is to make the player feel like they are interacting with a professional scouting tool or a high-performance telemetry dashboard.

---

## 2. Colors & Surface Logic

The palette is anchored in deep tech-blacks and navy, punctuated by high-visibility neon and gold accents.

### Color Tokens
- **Background Primary:** `#0a0e14` (The Deep Void)
- **Primary (Neon Green):** `#00fd86` (Action & Energy)
- **Secondary (Gold):** `#feb700` (Prestige & Achievement)
- **Tertiary (Red):** `#ff7168` (High Alert & Errors)
- **Surface (Container):1b2028** (Card/Panel base)

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. To separate a list from a background, use a `surface-container-low` section sitting on a `surface` background. Lines are for accents, not for structure.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create "nested" depth:
1. **Base Layer:** `surface_dim` (`#0a0e14`)
2. **Section Layer:** `surface_container_low` (`#0f141a`)
3. **Active Component:** `surface_container_highest` (`#20262f`)

### The "Glass & Gradient" Rule
Floating elements (modals, tooltips) must utilize **Glassmorphism**. Use `surface_bright` at 60% opacity with a `20px` backdrop blur. Main CTAs should not be flat; apply a subtle linear gradient from `primary` to `primary_dim` to provide the "soul" and depth characteristic of premium sports broadcasts.

---

## 3. Typography
Our typography is designed for "glanceability" under pressure. It bridges the gap between a stadium scoreboard and a luxury sports magazine.

- **Display & Headlines (Space Grotesk):** This is our "Scoreboard" font. Use `display-lg` (3.5rem) for massive scores and `headline-lg` for section headers. It should feel loud, condensed, and authoritative.
- **Body & Labels (Inter):** This is our "Data" font. Use `body-md` for rules and descriptions. Labels (`label-sm`) must always be uppercase with `0.05rem` letter-spacing to maintain the technical HUD aesthetic.

---

## 4. Elevation & Depth

### Tonal Layering
Forget drop shadows for standard cards. Depth is achieved by "stacking." A `surface-container-highest` card placed on a `surface-container-low` background creates a natural, sophisticated lift.

### Ambient Shadows
When a component must "float" (e.g., a floating action button or a modal), use an **Ambient Shadow**.
- **Blur:** 24px to 40px.
- **Opacity:** 8%.
- **Color:** Use a tinted version of the accent (e.g., a faint green glow for primary buttons) rather than black.

### The "Ghost Border" Fallback
If a border is required for accessibility, use a **Ghost Border**: the `outline_variant` token at 15% opacity. Never use 100% opaque borders for containers; they break the immersion of the "Vault."

---

## 5. Components

### Primary Buttons
- **Style:** `surface_container_lowest` background with a 2px solid `primary` (Neon Green) border.
- **Text:** Uppercase `headline-sm`, centered.
- **Effect:** A subtle `primary` outer glow (5px blur) to simulate a neon tube.

### Diamond Indicators (Life/Energy)
- **Shape:** 45-degree rotated squares.
- **Active:** Filled with `primary_container`.
- **Empty:** `outline_variant` with no fill.
- **Critical/Rare:** Pulsing `secondary` (Gold) animation using a scale transform (1.0 to 1.1).

### Cards & Scoreboards
- **Structure:** No dividers. Use `spacing-12` (2.75rem) of vertical white space to separate content groups.
- **Score Cards:** Use `display-lg` for numbers in `secondary_fixed` (Gold). Small `label-md` text should be tucked into the top-right corner of the number for an editorial look.

### Progress Rings
- **Visual:** Circular strokes using the `primary` token.
- **Unfilled Path:** `surface_container_highest` at 30% opacity.
- **Animation:** Linear ease-in-out to mimic the precision of a stopwatch.

### Toasts
- **Shape:** Full `pill` radius.
- **Color:** `secondary_container` (Amber/Gold).
- **Placement:** Top-center, overlapping the header to demand immediate attention without blocking gameplay.

---

## 6. Do's and Don'ts

### Do:
- **Do** use intentional asymmetry. Align titles to the left but scores to the extreme right to create tension.
- **Do** use "Neon Light" accents. A thin 2px neon green line at the very top of a card (and nowhere else) suggests a premium light source.
- **Do** lean into high contrast. Pure white text on a near-black background is our signature.

### Don't:
- **Don't** use standard Material Design "Drop Shadows." They feel dated and muddy in a dark sports UI.
- **Don't** use rounded corners larger than `8px` for cards. We want "Sharp & Athletic," not "Soft & Playful."
- **Don't** use icons as the primary way to communicate. Let the typography and color (Gold for win, Red for loss) do the heavy lifting.

---

## 7. Spacing Scale
All layouts must adhere to the **4px base unit**.
- **Tight Layouts (Stats):** Use `spacing-1` (0.2rem) and `spacing-2` (0.4rem).
- **Container Padding:** Use `spacing-4` (0.9rem) for internal card padding.
- **Section Gaps:** Use `spacing-16` (3.5rem) to allow the design to "breather" like a high-end magazine.
