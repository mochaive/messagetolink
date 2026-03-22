# messagetolink Design System — "Ink & Paper"

> A quiet utility for sending messages via URLs.
> The design disappears so the content remains.

## Design Direction

- **Metaphor**: Ink on quality paper — analog warmth, digital delivery
- **Character**: Calm, trustworthy, focused
- **Variance**: 7 (distinctive but not flashy)
- **Motion intensity**: 6 (purposeful, not playful)
- **Visual density**: 5 (balanced, not cluttered)

---

## Color Tokens

### Light Mode

```css
/* Backgrounds */
--bg-base: #F9F8F6;        /* Page background (warm parchment) */
--bg-surface: #FFFFFF;      /* Cards, panels, editor */
--bg-subtle: #F0EFEB;       /* Hover states, secondary areas */

/* Borders */
--border-default: #E2E0DB;  /* Dividers, input borders */
--border-strong: #C8C5BE;   /* Focus rings, active borders */

/* Text */
--text-primary: #1A1A1D;    /* Main text (ink) — 16.5:1 AAA */
--text-secondary: #5C5C63;  /* Labels, descriptions — 6.2:1 AA */
--text-tertiary: #8A8A93;   /* Placeholders — 3.5:1 AA large */

/* Accent (Deep Teal — "link" = connection) */
--accent: #0E7377;           /* Links, buttons — 5.1:1 AA */
--accent-hover: #0B5F62;    /* Hover — 6.8:1 AA */
--accent-subtle: #E6F4F4;   /* Accent background */

/* Semantic */
--success: #1A7A3A;         /* 5.3:1 AA */
--error: #C93B3B;           /* 4.7:1 AA */
--warning: #B45309;         /* 4.9:1 AA */
```

### Dark Mode

```css
/* Backgrounds — depth via luminance steps */
--bg-base: #141416;          /* Page background (midnight) */
--bg-surface: #1C1C20;      /* Cards, panels (depth level 1) */
--bg-subtle: #26262B;       /* Hover, secondary (depth level 2) */
--bg-elevated: #222228;     /* Depth level 2 cards */

/* Borders */
--border-default: #2E2E35;
--border-strong: #45454E;

/* Text */
--text-primary: #EAEAEC;    /* 15.2:1 AAA */
--text-secondary: #9C9CA4;  /* 7.0:1 AA */
--text-tertiary: #6B6B74;   /* 3.8:1 AA large */

/* Accent (brighter teal for dark backgrounds) */
--accent: #3DD8D8;           /* 10.2:1 AAA */
--accent-hover: #5AE4E4;    /* 12.1:1 AAA */
--accent-subtle: rgba(14, 115, 119, 0.15);

/* Semantic */
--success: #4ADE80;          /* 9.8:1 AAA */
--error: #F87171;            /* 6.5:1 AA */
--warning: #FBBF24;          /* 11.4:1 AAA */
```

### Tailwind CSS 4 Mapping

```css
/* In globals.css — use @theme for Tailwind 4 */
@theme {
  --color-bg-base: var(--bg-base);
  --color-bg-surface: var(--bg-surface);
  --color-bg-subtle: var(--bg-subtle);
  --color-border-default: var(--border-default);
  --color-border-strong: var(--border-strong);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-subtle: var(--accent-subtle);
  --color-success: var(--success);
  --color-error: var(--error);
  --color-warning: var(--warning);
}
```

---

## Typography

### Font Stack

```css
--font-sans: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'D2Coding', 'Menlo', 'Consolas', monospace;
```

- **Pretendard Variable**: UI + body. Best Korean rendering, variable weight (100-900).
- **JetBrains Mono**: Markdown editor. Clean, readable monospace.
- **D2Coding**: Korean monospace fallback.

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `--text-display` | 36px / 2.25rem | 800 | 1.1 | -0.025em | Hero text |
| `--text-h1` | 30px / 1.875rem | 700 | 1.2 | -0.02em | Page headings |
| `--text-h2` | 24px / 1.5rem | 700 | 1.25 | -0.015em | Section headings |
| `--text-h3` | 20px / 1.25rem | 600 | 1.3 | -0.01em | Subsections |
| `--text-body` | 16px / 1rem | 400 | 1.6 | 0 | Body text |
| `--text-body-sm` | 14px / 0.875rem | 400 | 1.5 | 0.005em | Small body |
| `--text-caption` | 12px / 0.75rem | 500 | 1.4 | 0.01em | Captions, labels |
| `--text-mono` | 15px / 0.9375rem | 400 | 1.7 | 0 | Editor text |

### Reader Page Typography

Reading-optimized settings for the message view:

```css
--reader-body: 17px;
--reader-line-height: 1.75;
--reader-max-width: 680px;
--reader-paragraph-spacing: 1.25em;
```

---

## Spacing

### Scale (4px base grid)

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--space-0.5` | 2px | `0.5` | Micro gaps |
| `--space-1` | 4px | `1` | Icon-text inline |
| `--space-2` | 8px | `2` | Compact padding |
| `--space-3` | 12px | `3` | Input padding, small gaps |
| `--space-4` | 16px | `4` | Standard padding |
| `--space-5` | 20px | `5` | Medium padding |
| `--space-6` | 24px | `6` | Panel padding |
| `--space-8` | 32px | `8` | Large section padding |
| `--space-10` | 40px | `10` | Component spacing |
| `--space-12` | 48px | `12` | Section separation |
| `--space-16` | 64px | `16` | Page-level spacing |

### Application Rules

| Component | Padding | Gap |
|-----------|---------|-----|
| Buttons | `12px 20px` (space-3 / space-5) | — |
| Inputs | `10px 12px` (space-2.5 / space-3) | — |
| Cards/Panels | `24px` (space-6) | — |
| Editor area | `16px` (space-4) | — |
| Label → Input | — | `8px` (space-2) |
| Sibling elements | — | `12px` (space-3) |
| Sections | — | `32px` (space-8) |
| Major sections | — | `48px` (space-12) |

### Responsive Margins

| Breakpoint | Side Padding |
|------------|-------------|
| Mobile (375px) | `16px` (space-4) |
| Tablet (768px) | `32px` (space-8) |
| Desktop (1280px) | Centered max-width + auto |

---

## Depth — "Quiet Depth"

Depth guides attention, not decorates. Shadows are structural.

### Light Mode Depth

| Level | Shadow | Border | Usage |
|-------|--------|--------|-------|
| 0 (flat) | none | none | Page bg, inline |
| 1 (subtle) | `0 1px 2px rgba(0,0,0,0.04)` | `1px solid var(--border-default)` | Inputs, editor, URL bar |
| 2 (lifted) | `0 2px 8px rgba(0,0,0,0.06)` | `1px solid var(--border-default)` | Cards, reader message |
| 3 (elevated) | `0 8px 24px rgba(0,0,0,0.10)` | none | Password modal |
| 4 (floating) | `0 16px 48px rgba(0,0,0,0.14)` | none | Toast, tooltip |

### Dark Mode Depth

Shadows invisible on dark — use background luminance instead:

| Level | Background | Shadow |
|-------|-----------|--------|
| 0 | `#141416` | none |
| 1 | `#1C1C20` | none |
| 2 | `#222228` | `0 2px 8px rgba(0,0,0,0.20)` |
| 3 | `#2A2A32` | `0 8px 24px rgba(0,0,0,0.30)` |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Buttons, small inputs |
| `--radius-md` | 8px | Cards, panels |
| `--radius-lg` | 12px | Modals, large containers |
| `--radius-full` | 9999px | Pills, circular |

### Interaction Depth

- **Hover**: +1 depth level
- **Active/Press**: -1 depth level (flatten)
- **Focus**: `2px` accent ring at 30% opacity (no shadow change)

---

## Motion

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| Hover transitions | 150ms | ease | Shadow, color, background |
| Modal enter | 200ms | ease-out | Scale + fade |
| Modal exit | 150ms | ease-in | Scale + fade |
| Content fade | 200ms | ease | Tab switch, mode change |
| URL update flash | 300ms | ease-out | Subtle highlight on URL change |

**Rules:**
- No spring physics — this is a utility
- No decorative animations
- `prefers-reduced-motion: reduce` → disable all non-essential motion
- Use Magic UI MCP components for polished micro-interactions where appropriate

---

## Component Depth Map

| Component | Depth | Notes |
|-----------|-------|-------|
| Page background | 0 | `--bg-base` |
| Options panel | 0 | Part of page flow |
| Editor textarea | 1 | Border + minimal shadow |
| Preview panel | 1 | Same level as editor |
| URL display bar | 1 | Distinct but not floating |
| Copy button | 1 → 2 hover | Subtle lift |
| Reader message card | 2 | Content focus, slight lift |
| Password prompt | 3 | Modal overlay |
| Toast/feedback | 4 | Transient top layer |

---

## Anti-Patterns (BANNED)

- Inter, Roboto, Arial, Space Grotesk fonts
- Purple gradient + white background
- Neumorphism, glassmorphism
- Neon/saturated accent colors
- Heavy drop shadows (> level 2 for normal UI)
- Generic blue (#3B82F6 etc.) as accent
- Decorative animations without function
- Contrast ratios below WCAG AA
