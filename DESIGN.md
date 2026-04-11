# Design System Specification: The Midnight Manuscript
 
## 1. Overview & Creative North Star
**Creative North Star: The Luminescent Atelier**
 
This design system is a departure from the sterile, high-contrast dark modes of the past decade. Instead of "Black and White," we are building "Shadow and Glow." The vision is that of a high-end, late-night workshop—moody, quiet, and deeply focused. 
 
To break the "template" look, we avoid rigid, boxed-in grids. Instead, we utilize **intentional asymmetry** and **overlapping editorial layouts**. Large serif typography should bleed across container edges, and secondary information should be tucked away in subtle, tonal shifts. We are not just building a portfolio; we are curating a digital gallery where the developer’s work is the focal point of a moonlit room.
 
## 2. Colors
Our palette is rooted in the depth of a late-night workspace. It utilizes deep charcoal and slate neutrals punctuated by "living" accents of amber and violet.
 
### Palette Strategy
- **Base Surfaces:** The foundation is `background` (#111316). Avoid true black (#000000) to keep the shadows feeling "ink-like" rather than empty.
- **The Violet Accent (Primary):** Use `primary` (#c5c0ff) for primary actions and brand-defining moments. It represents the "cool" glow of a monitor.
- **The Amber Accent (Tertiary):** Use `tertiary` (#ffb95a) for highlighting artisan details, "In Progress" statuses, or warm callouts. It represents the glow of a desk lamp.
 
### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning or containment. 
Boundary definition must be achieved through:
1. **Background Shifts:** Placing a `surface-container-high` card on a `surface-container-lowest` background.
2. **Tonal Transitions:** Using the hierarchy of `surface-container` tiers (Lowest to Highest) to imply physical depth.
 
### Signature Textures & Glass
To provide "visual soul," use subtle gradients for Hero backgrounds. Transitioning from `primary` to `primary-container` at a 45-degree angle provides a depth that flat colors cannot. For floating navigation or modal overlays, use **Glassmorphism**: a semi-transparent `surface-container` color with a 20px-30px `backdrop-blur`.
 
## 3. Typography
The system uses a sophisticated "Editorial-Meets-Technical" pairing.
 
- **The Serif (Newsreader):** Used for `display` and `headline` roles. This font communicates the "Artisan" quality. It should feel large, authoritative, and slightly traditional.
- **The Sans-Serif (Manrope):** Used for `title`, `body`, and `label` roles. This provides the "Developer" precision. It is clean, legible, and modern.
 
### The Scale
- **Display Large (Newsreader, 3.5rem):** Reserved for hero titles. Use generous letter-spacing (-0.02em) to create a premium, compressed feel.
- **Body Large (Manrope, 1rem):** The workhorse for project descriptions. Ensure a line-height of at least 1.6 for maximum "breathability."
 
## 4. Elevation & Depth
In this system, elevation is not about "distance from the floor"—it is about "luminosity and layering."
 
### The Layering Principle
Depth is achieved by stacking surface tiers.
*   **Level 0 (Base):** `surface` (#111316)
*   **Level 1 (Sections):** `surface-container-low` (#1a1c1f)
*   **Level 2 (Cards/Containers):** `surface-container-high` (#282a2d)
*   **Level 3 (Popovers/Modals):** `surface-container-highest` (#333538)
 
### Ambient Shadows
When an element must "float" (like a primary CTA or a floating nav), use an **extra-diffused shadow**.
*   **Shadow Specs:** `0px 20px 40px rgba(0, 0, 0, 0.4)`
*   The shadow should never be pure black; it should be a deep, tinted version of the surface color to mimic natural ambient light.
 
### The "Ghost Border" Fallback
If an element lacks contrast against its background, you may use a **Ghost Border**. This is a 1px stroke using the `outline-variant` (#474554) at **15% opacity**. It should be felt, not seen.
 
## 5. Components
 
### High Roundness Scale
All interactive components must adhere to the high roundness ethos to maintain a "soft-modern" tactile feel.
- **Buttons/Inputs:** `DEFAULT` (1rem / 16px)
- **Cards/Sections:** `md` (1.5rem / 24px) or `lg` (2rem / 32px)
- **Tags/Pills:** `full` (9999px)
 
### Interactive Elements
*   **Buttons:** 
    *   *Primary:* Solid `primary-container` (#6c66c4) with `on-primary-container` (#faf6ff) text.
    *   *Tertiary (Artisan):* A subtle gradient from `tertiary` to `tertiary-container` to highlight "hand-crafted" sections.
*   **Cards:** 
    *   Forbid dividers. Use `surface-container-high` for the card body and `surface-container-highest` for a header area if separation is needed. Use `padding: 2rem` as the standard inner gutter.
*   **Input Fields:** 
    *   Background should be `surface-container-lowest`. 
    *   On focus, the "Ghost Border" should transition to 100% opacity of the `primary` (#c5c0ff) token with a soft 4px outer glow.
*   **Project Lists:** 
    *   Do not use lines to separate projects. Use large vertical gaps (4rem+) and let the typography lead the eye.
 
## 6. Do's and Don'ts
 
### Do
*   **Do** use asymmetrical layouts. Let a project image bleed off the right side of the screen while text is anchored to the left.
*   **Do** use `tertiary` (Amber) for micro-interactions, like hover states on links or small status dots.
*   **Do** prioritize whitespace (or "dark-space"). A high-end feel comes from the luxury of unused screen real estate.
 
### Don't
*   **Don't** use 1px solid borders to separate the "Header" from the "Hero." Use a background color shift or simply let the content float.
*   **Don't** use standard "Drop Shadows" on cards. Rely on tonal layering (Surface Low vs Surface High) to create hierarchy.
*   **Don't** use high-contrast white (#FFFFFF) for body text. Use `on-surface-variant` (#c8c4d7) to reduce eye strain and maintain the moody atmosphere.
*   **Don't** use sharp corners. Everything must have a minimum of 12px (`0.75rem`) radius to fit the "soft-modern" vibe.