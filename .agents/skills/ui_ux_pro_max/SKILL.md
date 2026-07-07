---
name: ui_ux_pro_max
description: "UI/UX design intelligence for Dark Swiss Brutalism, typography, grids, borders, noise texture, and neon colors."
---

# UI/UX Pro Max - Dark Swiss Brutalism Guidelines

This skill provides design instructions for implementing and maintaining the Dark Swiss Brutalism theme in the Digital Time Machine project.

## Core Visual System

### 1. Typography
- **Headings**: Archivo Black, Syne, or Space Grotesk. High-weight, geometric, high-contrast, uppercase.
- **Body & Data**: Share Tech Mono or Inter. Clear readability, monospaced figures for dates, timers, numbers, and rates to prevent layout shift.
- **Visual Scale**: Large heading size differences (e.g., 4rem headers next to 0.875rem labels).

### 2. Colors
- **Background**: Extremely dark, flat gray/black `#0d0d0d`.
- **Borders**: Sharp `#000000` or solid primary accent lines.
- **Accents**: High-saturation neon colors:
  - Primary Accent: Neon Yellow `#ffff00`
  - Secondary Accent: Neon Green `#39ff14` or Hot Pink `#ff007f`
  - Dark Neutral: `#1a1a1a` (for card backgrounds)
  - Text: `#ffffff` (primary), `#a0a0a0` (secondary)

### 3. Layout and Grids
- **Borders**: Heavy, solid borders `3px` or `4px` with `border-radius: 0` (no rounding!).
- **Grids**: Use explicit grids with solid border lines between cells (like a spreadsheet or print poster).
- **Box Shadows**: Hard offsets without blur. Use `box-shadow: 5px 5px 0px 0px var(--accent-color);`.
- **Card States**: Scale down or translate offset on hover to simulate pressing a physical button:
  ```css
  .brutalist-card {
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .brutalist-card:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0px 0px var(--accent-color);
  }
  .brutalist-card:active {
    transform: translate(5px, 5px);
    box-shadow: 0px 0px 0px 0px var(--accent-color);
  }
  ```

### 4. Poster Textures (Analog Feel)
- A constant CSS grain/noise overlay to simulate vintage printed paper or vintage monitors.
- Use an inline SVG filter inside a fixed overlay:
  ```html
  <svg class="noise-svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
    </filter>
  </svg>
  ```
  And apply it via CSS background.
