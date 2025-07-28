# Connect Design System: Design Tokens

Design tokens are the visual design atoms of the Connect design system – specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to ensure flexibility and maintain a consistent visual language.

## Color Palette

### Primary Colors

Used for primary actions, focus states, and key UI elements.

| Token                | Value     | Description                |
| -------------------- | --------- | -------------------------- |
| `primary-50`         | `#FEF9E7` | Lightest primary shade     |
| `primary-100`        | `#FDF3CF` | Very light primary         |
| `primary-200`        | `#FCE7A0` | Light primary              |
| `primary-300`        | `#FADB71` | Soft primary               |
| `primary-400`        | `#F7CF42` | Medium primary             |
| `primary-500`        | `#EFC729` | Default primary color      |
| `primary-600`        | `#D1AC13` | Darker primary             |
| `primary-700`        | `#A6890F` | Dark primary               |
| `primary-800`        | `#7A660B` | Very dark primary          |
| `primary-900`        | `#4E4207` | Darkest primary            |
| `primary-foreground` | `#FFFFFF` | Text on primary background |

#### Primary Color Usage Guidelines

- **primary-50, primary-100**: Use for subtle backgrounds, hover states on dark backgrounds, or highlighting selected items in tables/lists
- **primary-200, primary-300**: Use for container backgrounds when highlighting content, secondary button hover states
- **primary-400**: Use for hover states on primary elements, progress bars
- **primary-500**: The default primary color - use for primary buttons, active states, and important interactive elements
- **primary-600**: Use for primary button hover states and active indicators
- **primary-700**: Use for primary button active/pressed states
- **primary-800, primary-900**: Use sparingly for very high contrast needs or specialized UI elements
- **primary-foreground**: Always use this color for text that appears on primary color backgrounds for proper contrast

**Component Applications:**

- Primary action buttons should use primary-500 (default) and primary-600 (hover)
- Selected navigation items should use primary-500
- Focus indicators should use primary-400
- Form element highlights (like selected checkbox) should use primary-500
- Highlighted content sections can use primary-100 as background with primary-800 text for emphasis

### Secondary Colors

Used for secondary actions, complementary UI elements.

| Token                  | Value     | Description                  |
| ---------------------- | --------- | ---------------------------- |
| `secondary-50`         | `#EEF4FA` | Lightest secondary shade     |
| `secondary-100`        | `#DCE8F5` | Very light secondary         |
| `secondary-200`        | `#B9D1EB` | Light secondary              |
| `secondary-300`        | `#96BAE1` | Soft secondary               |
| `secondary-400`        | `#73A3D7` | Medium secondary             |
| `secondary-500`        | `#4972BA` | Default secondary color      |
| `secondary-600`        | `#3B5B95` | Darker secondary             |
| `secondary-700`        | `#2D4470` | Dark secondary               |
| `secondary-800`        | `#1F2D4B` | Very dark secondary          |
| `secondary-900`        | `#111726` | Darkest secondary            |
| `secondary-foreground` | `#FFFFFF` | Text on secondary background |

#### Secondary Color Usage Guidelines

- **secondary-50, secondary-100**: Use for subtle backgrounds in secondary UI sections, hover states on dark backgrounds
- **secondary-200, secondary-300**: Use for secondary container backgrounds, secondary button hover states
- **secondary-400**: Use for accent elements, secondary progress indicators
- **secondary-500**: The default secondary color - use for secondary buttons, less critical interactive elements
- **secondary-600**: Use for secondary button hover states and active indicators
- **secondary-700**: Use for secondary button active/pressed states
- **secondary-800, secondary-900**: Use for high contrast text on light backgrounds and specialized UI elements
- **secondary-foreground**: Always use this color for text that appears on secondary color backgrounds

**Component Applications:**

- Secondary action buttons should use secondary-500 (default) and secondary-600 (hover)
- Supplementary navigation items should use secondary colors
- Secondary focus indicators can use secondary-400
- Information cards can use secondary-100 as background
- Data visualization elements like charts and graphs can use the secondary color spectrum
- Secondary action icons can use secondary-500

### Neutral Colors

Used for text, backgrounds, borders, etc.

| Token         | Value     | Description            |
| ------------- | --------- | ---------------------- |
| `neutral-50`  | `#F8FAFC` | Lightest neutral shade |
| `neutral-100` | `#F1F5F9` | Very light neutral     |
| `neutral-200` | `#E2E8F0` | Light neutral          |
| `neutral-300` | `#CBD5E1` | Soft neutral           |
| `neutral-400` | `#94A3B8` | Medium neutral         |
| `neutral-500` | `#64748B` | Default neutral color  |
| `neutral-600` | `#475569` | Darker neutral         |
| `neutral-700` | `#334155` | Dark neutral           |
| `neutral-800` | `#1E293B` | Very dark neutral      |
| `neutral-900` | `#0F172A` | Darkest neutral        |

#### Neutral Color Usage Guidelines

- **neutral-50, neutral-100**: Use for light mode page backgrounds, card backgrounds, and alternating table rows
- **neutral-200, neutral-300**: Use for borders, dividers, and UI element separators in light mode
- **neutral-400**: Use for disabled text, icons, and UI elements in light mode
- **neutral-500**: Use for muted text and secondary content in light mode
- **neutral-600**: Use for secondary text content and labels in light mode
- **neutral-700**: Use for borders and dividers in dark mode
- **neutral-800**: Use for surface backgrounds and container elements in dark mode
- **neutral-900**: Use for page backgrounds in dark mode and primary text in light mode

**Component Applications:**

- Default text on light backgrounds should use neutral-900
- Secondary text on light backgrounds should use neutral-600
- Muted or placeholder text should use neutral-500
- Disabled UI elements should use neutral-400 for text and neutral-200 for backgrounds
- Default borders should use neutral-200 in light mode and neutral-700 in dark mode
- Tables can use neutral-50 and neutral-100 for alternating rows
- Form field borders should use neutral-300 in default state
- Page backgrounds should use neutral-100 in light mode and neutral-900 in dark mode

### Surface Colors

For component backgrounds and UI surfaces.

| Token                    | Value     | Description                 |
| ------------------------ | --------- | --------------------------- |
| `surface`                | `#FFFFFF` | Default surface color       |
| `surface-secondary`      | `#F8FAFC` | Secondary surface           |
| `surface-tertiary`       | `#F1F5F9` | Tertiary surface            |
| `surface-disabled`       | `#E2E8F0` | Disabled surface            |
| `surface-dark`           | `#1E293B` | Dark mode default surface   |
| `surface-dark-secondary` | `#0F172A` | Dark mode secondary surface |
| `surface-dark-tertiary`  | `#334155` | Dark mode tertiary surface  |
| `surface-dark-disabled`  | `#334155` | Dark mode disabled surface  |

### Background Colors

For page backgrounds.

| Token             | Value     | Description          |
| ----------------- | --------- | -------------------- |
| `background`      | `#F1F5F9` | Default background   |
| `background-dark` | `#0F172A` | Dark mode background |

### Border Colors

For borders and dividers.

| Token                   | Value     | Description                |
| ----------------------- | --------- | -------------------------- |
| `border`                | `#E2E8F0` | Default border             |
| `border-secondary`      | `#CBD5E1` | Secondary border           |
| `border-subtle`         | `#F1F5F9` | Subtle border              |
| `border-dark`           | `#334155` | Dark mode border           |
| `border-dark-secondary` | `#475569` | Dark mode secondary border |
| `border-dark-subtle`    | `#1E293B` | Dark mode subtle border    |

### Text Colors

For typography.

| Token                 | Value     | Description              |
| --------------------- | --------- | ------------------------ |
| `text`                | `#0F172A` | Default text             |
| `text-secondary`      | `#475569` | Secondary text           |
| `text-muted`          | `#64748B` | Muted text               |
| `text-disabled`       | `#94A3B8` | Disabled text            |
| `text-dark-default`   | `#F8FAFC` | Dark mode default text   |
| `text-dark-secondary` | `#CBD5E1` | Dark mode secondary text |
| `text-dark-muted`     | `#94A3B8` | Dark mode muted text     |
| `text-dark-disabled`  | `#475569` | Dark mode disabled text  |

### Semantic Colors

For status and feedback indicators.

| Type    | Token                | Value     | Description                  |
| ------- | -------------------- | --------- | ---------------------------- |
| Success | `success-500`        | `#22C55E` | Default success              |
|         | `success-600`        | `#16A34A` | Darker success               |
|         | `success-foreground` | `#FFFFFF` | Text on success background   |
|         | `success-surface`    | `#F0FDF4` | Surface for success contexts |
| Warning | `warning-500`        | `#EAB308` | Default warning              |
|         | `warning-600`        | `#CA8A04` | Darker warning               |
|         | `warning-foreground` | `#713F12` | Text on warning background   |
|         | `warning-surface`    | `#FEFCE8` | Surface for warning contexts |
| Error   | `error-500`          | `#EF4444` | Light error                  |
|         | `error-600`          | `#DC2626` | Default error                |
|         | `error-700`          | `#B91C1C` | Darker error                 |
|         | `error-foreground`   | `#FFFFFF` | Text on error background     |
|         | `error-surface`      | `#FEF2F2` | Surface for error contexts   |
| Info    | `info-500`           | `#0EA5E9` | Default info                 |
|         | `info-600`           | `#0284C7` | Darker info                  |
|         | `info-foreground`    | `#FFFFFF` | Text on info background      |
|         | `info-surface`       | `#F0F9FF` | Surface for info contexts    |

#### Semantic Color Usage Guidelines

##### Success Colors

- **success-500**: Use for success messages, completed status indicators, and checkmarks
- **success-600**: Use for hover states on success buttons and stronger success indicators
- **success-foreground**: Use for text appearing on success color backgrounds
- **success-surface**: Use for success message backgrounds, success toast notifications, and validation success states

**Component Applications:**

- Success alerts and notifications should use success-500 with success-foreground text
- Success banners can use success-surface background with darker success text
- Completed steps in multi-step forms/wizards should use success-500
- Positive data trends in charts can use success-500
- Form validation success states should use success-500 for icons/borders

##### Warning Colors

- **warning-500**: Use for warning messages, caution indicators, and attention-required states
- **warning-600**: Use for hover states on warning buttons and stronger warning indicators
- **warning-foreground**: Use for text appearing on warning color backgrounds (note: this is darker for better contrast)
- **warning-surface**: Use for warning message backgrounds, warning toast notifications

**Component Applications:**

- Warning alerts and notifications should use warning-500 with warning-foreground text
- Warning banners can use warning-surface background with warning-600 text
- Warning indicators in forms should use warning-500
- Highlight fields requiring attention with warning-surface background
- Use warning-500 for status badges showing pending actions

##### Error Colors

- **error-500**: Use for lighter error indicators
- **error-600**: Use for error messages, validation failures, and critical status indicators
- **error-700**: Use for hover states on error buttons and stronger error indicators
- **error-foreground**: Use for text appearing on error color backgrounds
- **error-surface**: Use for error message backgrounds, error toast notifications, and validation error states

**Component Applications:**

- Error alerts and notifications should use error-600 with error-foreground text
- Error banners can use error-surface background with error-600 text
- Form validation errors should use error-600 for borders and icons
- Invalid input states should use error-600 for outlines or icons
- Critical actions like delete buttons can use error-600

##### Info Colors

- **info-500**: Use for informational messages, help indicators, and neutral status indicators
- **info-600**: Use for hover states on info buttons and stronger info indicators
- **info-foreground**: Use for text appearing on info color backgrounds
- **info-surface**: Use for info message backgrounds, info toast notifications, and tooltip backgrounds

**Component Applications:**

- Information alerts and notifications should use info-500 with info-foreground text
- Help tooltips and popovers can use info-surface background
- Info badges and status indicators should use info-500
- Links and interactive help elements can use info-500
- Tutorial and onboarding elements can use info colors

## Typography

### Font Families

| Token        | Value                                                                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font-sans`  | `'Inter var', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` |
| `font-serif` | `'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'`                                                                                                                                                                      |
| `font-mono`  | `'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'`                                                                                                                             |

### Font Weights

Consistent font weights help establish visual hierarchy and improve readability.

| Token             | Value | Usage                                           |
| ----------------- | ----- | ----------------------------------------------- |
| `font-thin`       | `100` | Specialized design elements, rarely used in UI  |
| `font-extralight` | `200` | Decorative headings at large sizes              |
| `font-light`      | `300` | Large display text on light backgrounds         |
| `font-normal`     | `400` | Default body text, paragraphs, descriptions     |
| `font-medium`     | `500` | Slightly emphasized text, subheadings, labels   |
| `font-semibold`   | `600` | Section headings (h2-h4), important UI elements |
| `font-bold`       | `700` | Main headings (h1), buttons, strong emphasis    |
| `font-extrabold`  | `800` | Very important callouts, hero headings          |
| `font-black`      | `900` | Highest emphasis, display titles                |

#### Font Weight Usage Guidelines

- **Primary UI**:

  - Use `font-normal` (400) for body text and general content
  - Use `font-medium` (500) for subtle emphasis and interactive elements
  - Use `font-semibold` (600) for section headings and important UI elements
  - Use `font-bold` (700) for primary headings and calls to action

- **Consistency**:

  - Limit font weight changes to maintain consistency
  - Aim to use no more than 3-4 different weights in a single view
  - Use font weights to establish clear hierarchy

- **Accessibility**:

  - Ensure sufficient contrast with background colors, especially for lighter weights
  - Don't rely solely on weight to communicate importance (combine with color or size)
  - Use sufficient weight for interactive elements (at least medium, 500)

- **Specific Element Guidelines**:
  - Navigation items: `font-medium` (500) for default, `font-semibold` (600) for active
  - Buttons: `font-medium` (500) for secondary/tertiary, `font-semibold` (600) for primary
  - Labels: `font-medium` (500)
  - Input text: `font-normal` (400)
  - Emphasized text within paragraphs: `font-medium` (500) or `font-semibold` (600)
  - Error messages: `font-medium` (500)

### Font Sizes

| Token       | Size              | Line Height      |
| ----------- | ----------------- | ---------------- |
| `text-xs`   | `0.75rem` (12px)  | `1rem` (16px)    |
| `text-sm`   | `0.875rem` (14px) | `1.25rem` (20px) |
| `text-base` | `1rem` (16px)     | `1.5rem` (24px)  |
| `text-lg`   | `1.125rem` (18px) | `1.75rem` (28px) |
| `text-xl`   | `1.25rem` (20px)  | `1.75rem` (28px) |
| `text-2xl`  | `1.5rem` (24px)   | `2rem` (32px)    |
| `text-3xl`  | `1.875rem` (30px) | `2.25rem` (36px) |
| `text-4xl`  | `2.25rem` (36px)  | `2.5rem` (40px)  |
| `text-5xl`  | `3rem` (48px)     | `1`              |
| `text-6xl`  | `3.75rem` (60px)  | `1`              |
| `text-7xl`  | `4.5rem` (72px)   | `1`              |
| `text-8xl`  | `6rem` (96px)     | `1`              |
| `text-9xl`  | `8rem` (128px)    | `1`              |

### Line Heights

Line heights (leading) are crucial for readability and proper text spacing.

| Token             | Value   | Description                  | Usage                                               |
| ----------------- | ------- | ---------------------------- | --------------------------------------------------- |
| `leading-none`    | `1`     | No line height               | Used for display headings (h1-h2) at large sizes    |
| `leading-tight`   | `1.25`  | Tight line spacing           | Used for headings (h3-h6) and short text blocks     |
| `leading-snug`    | `1.375` | Slightly tighter than normal | Good for slightly condensed text in UI elements     |
| `leading-normal`  | `1.5`   | Default line height          | Used for most body text in the application          |
| `leading-relaxed` | `1.625` | Slightly looser than normal  | Used for improved readability in longer text blocks |
| `leading-loose`   | `2`     | Very loose line spacing      | Used for text that needs significant spacing        |

#### Line Height Usage Guidelines

- **General rules**:

  - Longer line length needs increased line height for readability
  - Smaller text typically needs more relative line height
  - Text with many ascenders/descenders needs more line height

- **Text Block Recommendations**:

  - Body text: Use `leading-normal` (1.5) as the default for most content
  - Longer paragraphs: Use `leading-relaxed` (1.625) for better readability
  - Form inputs: Use `leading-normal` (1.5) for consistent single-line spacing
  - Cards and UI elements: Use `leading-snug` (1.375) for concise content areas

- **Heading Recommendations**:

  - Large display headings (h1-h2): Use `leading-none` (1) or `leading-tight` (1.25)
  - Smaller headings (h3-h6): Use `leading-tight` (1.25) or `leading-snug` (1.375)
  - Multi-line headings: Use at least `leading-snug` (1.375) for readability

- **Specialized Text**:

  - Captions: Use `leading-snug` (1.375) or `leading-normal` (1.5)
  - Lists: Use `leading-normal` (1.5) for list items
  - Buttons: Use `leading-none` (1) for single-line buttons
  - Interactive elements: Use consistent line height to avoid layout shifts

- **Responsive Considerations**:
  - Line heights generally remain consistent across screen sizes
  - Very large text may use tighter line height on small screens

### Heading Typography

Headings use the font size scale with specific mappings to ensure consistent hierarchy across the application.

| Heading | Font Size Token                             | Font Weight     | Usage                                          |
| ------- | ------------------------------------------- | --------------- | ---------------------------------------------- |
| `h1`    | `text-4xl` (desktop)<br>`text-3xl` (mobile) | `font-bold`     | Main page titles, hero sections                |
| `h2`    | `text-3xl` (desktop)<br>`text-2xl` (mobile) | `font-semibold` | Section headings, card titles on landing pages |
| `h3`    | `text-2xl` (desktop)<br>`text-xl` (mobile)  | `font-semibold` | Subsection headings, modal titles              |
| `h4`    | `text-xl` (desktop)<br>`text-lg` (mobile)   | `font-medium`   | Card titles, form section headings             |
| `h5`    | `text-lg` (desktop)<br>`text-base` (mobile) | `font-medium`   | Widget titles, sidebar section headings        |
| `h6`    | `text-base` (desktop)<br>`text-sm` (mobile) | `font-medium`   | Minor headings, table headers                  |

#### Heading Usage Guidelines

- **Maintain hierarchy**: Always maintain proper heading levels for semantic HTML and accessibility (h1 > h2 > h3, etc.)
- **Responsive adjustments**: Headings should scale down on mobile viewports using the size mappings above
- **Color usage**:
  - Light mode: Use `text-900` for headings
  - Dark mode: Use `text-dark-default` for headings
- **Margins**:
  - Top margins should be larger than bottom margins to create visual separation between sections
  - Recommended top margin: `mt-8` for h2, `mt-6` for h3, `mt-4` for h4-h6
  - Recommended bottom margin: `mb-4` for h2, `mb-3` for h3, `mb-2` for h4-h6
- **Line breaks**: Avoid line breaks in headings when possible
- **Truncation**: When headings must be truncated, use ellipsis and provide the full text in a tooltip

### Body Typography

Body text uses the font size scale with specific mappings to ensure readability and consistency across the application.

| Text Type      | Font Size Token | Font Weight   | Line Height       | Usage                                      |
| -------------- | --------------- | ------------- | ----------------- | ------------------------------------------ |
| Body Large     | `text-lg`       | `font-normal` | `leading-relaxed` | Hero descriptions, featured content        |
| Body Default   | `text-base`     | `font-normal` | `leading-normal`  | Main content, paragraphs, descriptions     |
| Body Small     | `text-sm`       | `font-normal` | `leading-normal`  | Secondary information, captions, help text |
| Body XSmall    | `text-xs`       | `font-normal` | `leading-normal`  | Legal text, footnotes, fine print          |
| Lead Paragraph | `text-xl`       | `font-normal` | `leading-relaxed` | Introductory paragraphs, summaries         |
| Caption        | `text-xs`       | `font-medium` | `leading-tight`   | Image captions, metadata display           |

#### Body Text Usage Guidelines

- **Default body text**: Use `text-base` for most body content

  - Light mode: Use `text-800` for body text
  - Dark mode: Use `text-dark-default` for body text

- **Secondary text**:

  - Light mode: Use `text-600` or `text-secondary` for secondary text
  - Dark mode: Use `text-dark-secondary` for secondary text

- **Paragraph spacing**:

  - Use `mb-4` between paragraphs
  - Use `mb-2` between tightly related paragraphs

- **Line length**: Aim for 60-80 characters per line for optimal readability

  - Consider using max-width constraints like `max-w-prose` or specific width values to control line length

- **Responsive adjustments**:

  - Body text generally remains the same size across breakpoints
  - Lead paragraphs may reduce from `text-xl` to `text-lg` on mobile

- **List formatting**:
  - Unordered lists should use bullets (`list-disc`) with `ml-5` left margin
  - Ordered lists should use numerals (`list-decimal`) with `ml-5` left margin
  - List items should have `my-1` vertical spacing between them

## Spacing

Standard spacing scale used for padding, margin, gap, etc.

| Token | Value             | Common Use Cases                         |
| ----- | ----------------- | ---------------------------------------- |
| `0`   | `0px`             | Remove spacing, reset margins/padding    |
| `px`  | `1px`             | Single pixel borders, hairlines          |
| `0.5` | `0.125rem` (2px)  | Slight offset, minimal spacing           |
| `1`   | `0.25rem` (4px)   | Fine-grained spacing, compact UIs        |
| `1.5` | `0.375rem` (6px)  | Tight but visible spacing                |
| `2`   | `0.5rem` (8px)    | Standard compact spacing, icon padding   |
| `2.5` | `0.625rem` (10px) | Refined spacing adjustments              |
| `3`   | `0.75rem` (12px)  | Standard internal padding, compact items |
| `3.5` | `0.875rem` (14px) | Refined spacing adjustments              |
| `4`   | `1rem` (16px)     | Base unit, standard spacing in most UI   |
| `5`   | `1.25rem` (20px)  | Medium spacing, paragraph gaps           |
| `6`   | `1.5rem` (24px)   | Content section spacing                  |
| `7`   | `1.75rem` (28px)  | Larger paragraph spacing                 |
| `8`   | `2rem` (32px)     | Standard section spacing                 |
| `9`   | `2.25rem` (36px)  | Larger component separation              |
| `10`  | `2.5rem` (40px)   | Medium-large section spacing             |
| `11`  | `2.75rem` (44px)  | Refined large spacing                    |
| `12`  | `3rem` (48px)     | Large section spacing                    |
| `14`  | `3.5rem` (56px)   | Extra spacing between major sections     |
| `16`  | `4rem` (64px)     | Extra large spacing, major sections      |
| `20`  | `5rem` (80px)     | Very large spacing, page sections        |
| `24`  | `6rem` (96px)     | Extra large vertical rhythm              |
| `28`  | `7rem` (112px)    | Major vertical spacing                   |
| `32`  | `8rem` (128px)    | Significant section spacing              |
| `36`  | `9rem` (144px)    | Large component dimensions               |
| `40`  | `10rem` (160px)   | Common height for medium components      |
| `44`  | `11rem` (176px)   | Extended component dimensions            |
| `48`  | `12rem` (192px)   | Standard width for smaller cards         |
| `52`  | `13rem` (208px)   | Extended component dimensions            |
| `56`  | `14rem` (224px)   | Card and panel widths                    |
| `60`  | `15rem` (240px)   | Standard component widths                |
| `64`  | `16rem` (256px)   | Width for medium-sized containers        |
| `72`  | `18rem` (288px)   | Width for cards and panels               |
| `80`  | `20rem` (320px)   | Standard container widths                |
| `96`  | `24rem` (384px)   | Large container widths                   |

### Spacing Usage Guidelines

#### General Principles

- **Consistency**: Use the same spacing values repeatedly rather than arbitrary values
- **Rhythm**: Create a consistent visual rhythm with predictable spacing patterns
- **Hierarchy**: Use larger spacing to separate major sections, smaller spacing for related elements
- **Breathing Room**: Ensure adequate white space around content for readability
- **Responsiveness**: Adjust spacing proportionally on smaller screens (typically reducing by one step)

#### Component Internal Spacing

- **Button Padding**:

  - Small buttons: `px-3 py-1` (horizontal padding: 0.75rem, vertical padding: 0.25rem)
  - Default buttons: `px-4 py-2` (horizontal padding: 1rem, vertical padding: 0.5rem)
  - Large buttons: `px-6 py-3` (horizontal padding: 1.5rem, vertical padding: 0.75rem)

- **Card Padding**:

  - Card container: `p-4` (1rem) or `p-6` (1.5rem) depending on content density
  - Card header/footer: `px-6 py-4` (horizontal: 1.5rem, vertical: 1rem)
  - Card section separators: `my-4` (margin-top/bottom: 1rem)

- **Form Controls**:

  - Input padding: `px-3 py-2` (horizontal: 0.75rem, vertical: 0.5rem)
  - Input groups spacing: `space-y-4` (gap: 1rem between elements)
  - Field label spacing: `mb-1.5` (margin-bottom: 0.375rem)
  - Helper/error text spacing: `mt-1` (margin-top: 0.25rem)

- **Navigation**:
  - Navbar padding: `px-4 py-2` (horizontal: 1rem, vertical: 0.5rem)
  - Navigation items: `mx-2` or `mx-3` (margin-left/right: 0.5rem or 0.75rem)
  - Dropdown items: `px-4 py-2` (horizontal: 1rem, vertical: 0.5rem)

#### Layout Spacing

- **Content Areas**:

  - Page container padding: `px-4 md:px-6 lg:px-8` (responsive horizontal padding)
  - Main/sidebar gap: `gap-6` (1.5rem) or `gap-8` (2rem)
  - Content section spacing: `my-8` (margin-top/bottom: 2rem)

- **Grid System**:

  - Default grid gap: `gap-4` (1rem) or `gap-6` (1.5rem)
  - Card grid gap: `gap-6` (1.5rem) or `gap-8` (2rem)
  - Tight layout grid: `gap-2` (0.5rem) or `gap-3` (0.75rem)

- **Section Spacing**:
  - Minor sections: `my-4` (margin-top/bottom: 1rem) or `my-6` (margin-top/bottom: 1.5rem)
  - Major sections: `my-8` (margin-top/bottom: 2rem) or `my-12` (margin-top/bottom: 3rem)
  - Page-level sections: `my-12` (margin-top/bottom: 3rem) or `my-16` (margin-top/bottom: 4rem)
  - Section padding: `py-8` (padding-top/bottom: 2rem) or `py-12` (padding-top/bottom: 3rem)

#### Spacing for Typography

- **Headings**:

  - H1 bottom margin: `mb-6` (margin-bottom: 1.5rem)
  - H2 top/bottom margins: `mt-8 mb-4` (margin-top: 2rem, margin-bottom: 1rem)
  - H3 top/bottom margins: `mt-6 mb-3` (margin-top: 1.5rem, margin-bottom: 0.75rem)
  - H4-H6 top/bottom margins: `mt-4 mb-2` (margin-top: 1rem, margin-bottom: 0.5rem)

- **Paragraphs and Lists**:
  - Paragraph margins: `my-4` (margin-top/bottom: 1rem)
  - List item spacing: `my-1` (margin-top/bottom: 0.25rem)
  - List indent: `ml-5` (margin-left: 1.25rem)
  - Blockquote padding: `pl-4` (padding-left: 1rem)

#### Spacing in Data Display

- **Tables**:

  - Table cell padding: `px-4 py-2` (horizontal: 1rem, vertical: 0.5rem)
  - Dense tables: `px-3 py-1.5` (horizontal: 0.75rem, vertical: 0.375rem)
  - Table header/footer: `px-4 py-3` (horizontal: 1rem, vertical: 0.75rem)

- **Lists**:
  - List container padding: `py-2` (padding-top/bottom: 0.5rem)
  - List item spacing: `py-2` (padding-top/bottom: 0.5rem)
  - List item indent: `pl-4` (padding-left: 1rem)

#### Responsive Spacing Adjustments

- **Mobile Devices** (< 640px):

  - Reduce container padding: `-1 step` from desktop (e.g., `px-4` → `px-3`)
  - Reduce section margins: `-2 steps` from desktop (e.g., `my-8` → `my-4`)
  - Stack elements with `space-y-4` instead of horizontal spacing

- **Tablets** (640px - 1024px):
  - Reduce container padding: no change or `-0.5 step` from desktop
  - Reduce section margins: `-1 step` from desktop (e.g., `my-8` → `my-6`)
  - Use intermediate grid gap values: `gap-4` to `gap-6`

## Border Radius

| Token          | Value            | Description                                 |
| -------------- | ---------------- | ------------------------------------------- |
| `rounded-none` | `0px`            | No border radius, sharp corners             |
| `rounded-sm`   | `0.125rem` (2px) | Very subtle rounding                        |
| `rounded`      | `0.25rem` (4px)  | Default border radius                       |
| `rounded-md`   | `0.375rem` (6px) | Medium border radius                        |
| `rounded-lg`   | `0.5rem` (8px)   | Large border radius                         |
| `rounded-xl`   | `0.75rem` (12px) | Extra large border radius                   |
| `rounded-2xl`  | `1rem` (16px)    | Double extra large border radius            |
| `rounded-3xl`  | `1.5rem` (24px)  | Triple extra large border radius            |
| `rounded-full` | `9999px`         | Fully rounded (circles for square elements) |

### Border Radius Usage Guidelines

#### General Principles

- **Consistency**: Use the same border radius values across similar components
- **Hierarchy**: Smaller radii for smaller elements, larger radii for larger elements
- **Context**: Consider the context where the component appears
- **Personality**: Rounder corners convey a friendlier, more approachable UI

#### Component-Specific Guidelines

- **Buttons**:
  - Primary/secondary buttons: `rounded` (4px) or `rounded-md` (6px)
  - Small buttons: `rounded-sm` (2px) or `rounded` (4px)
  - Large buttons: `rounded-md` (6px) or `rounded-lg` (8px)
  - Pill buttons: `rounded-full`
- **Form Controls**:
  - Text inputs: `rounded` (4px)
  - Select dropdowns: `rounded` (4px) with matching menus
  - Checkboxes: `rounded-sm` (2px)
  - Radio buttons: `rounded-full`
  - Sliders/toggles: `rounded-full` for handles
  - Search fields: `rounded-lg` (8px) or `rounded-full`
- **Cards & Containers**:
  - Standard cards: `rounded-lg` (8px)
  - Modal dialogs: `rounded-xl` (12px)
  - Sidebars/panels: `rounded-lg` (8px) for floating versions
  - Tooltips: `rounded` (4px) or `rounded-md` (6px)
  - Larger feature cards: `rounded-xl` (12px) or `rounded-2xl` (16px)
- **Feedback Elements**:
  - Alerts/notifications: `rounded-md` (6px) or `rounded-lg` (8px)
  - Toast messages: `rounded-lg` (8px) or `rounded-xl` (12px)
  - Progress bars: `rounded-full` for container, same for progress
  - Badges: `rounded` (4px) or `rounded-full` for pill badges
- **Images & Media**:
  - Avatars: `rounded-full` for circular, `rounded-lg` (8px) for square
  - Thumbnails: `rounded` (4px) or `rounded-md` (6px)
  - Hero images: `rounded-lg` (8px) or `rounded-xl` (12px)
  - Image galleries: consistent radii for all images in a set

#### Directional Border Radius

For components that need different corner radii:

- **Top-only**: Use `rounded-t-{size}` (e.g., `rounded-t-lg`)
  - Example: Top of cards or modals without rounded bottoms
- **Bottom-only**: Use `rounded-b-{size}` (e.g., `rounded-b-lg`)
  - Example: Bottom of dropdown menus
- **Left-only**: Use `rounded-l-{size}` (e.g., `rounded-l-lg`)
  - Example: Left side of button groups or tabs
- **Right-only**: Use `rounded-r-{size}` (e.g., `rounded-r-lg`)
  - Example: Right side of button groups or tabs
- **Individual corners**:
  - Top-left: `rounded-tl-{size}` (e.g., `rounded-tl-lg`)
  - Top-right: `rounded-tr-{size}` (e.g., `rounded-tr-lg`)
  - Bottom-left: `rounded-bl-{size}` (e.g., `rounded-bl-lg`)
  - Bottom-right: `rounded-br-{size}` (e.g., `rounded-br-lg`)

#### Responsive Considerations

- Border radius generally remains consistent across viewport sizes
- Consider reducing radius by one step on very small mobile interfaces
- Ensure radius is proportional to element size when elements resize

## Typography: Font Families

Connect uses a system font stack approach, utilizing the native fonts available on the user's device for optimal performance and a native feel.

### Base Font Stack

The Connect design system uses Tailwind's default font family settings, which is a system font stack:

| Font Category            | Font Stack                                                                                                                                                                              | Usage                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Sans-serif** (default) | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | Used for all general UI text, body copy, and most components                                     |
| **Monospace**            | `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`                                                                                                  | Used for code blocks, technical content, and numeric data that benefits from fixed-width display |

### Font Family Usage Guidelines

- **System fonts first**: The system font stack prioritizes the user's native system fonts for better performance and a consistent feel with the operating system.
- **Performance benefits**: Using system fonts eliminates the need to download font files, improving page load times.
- **Consistent feel**: System fonts provide a more native feel on each operating system, making the interface feel more integrated.
- **Accessibility**: System fonts are optimized for readability on their respective platforms.
- **RTL support**: The system font stack includes fonts with good support for right-to-left languages.

### Implementation

Font families are applied through Tailwind CSS classes:

- Default sans-serif: `font-sans` (automatically applied to the body)
- Monospace: `font-mono` (for code elements, technical data display)

### Considerations for Future Enhancement

If a more branded look is desired in the future, consider implementing:

1. Custom web fonts for headings or UI elements while maintaining system fonts for body text
2. Variable fonts to reduce performance impact while providing more design flexibility

## Shadow Tokens

Shadow tokens are used to establish visual hierarchy and provide feedback on interactive elements.

| Token          | Value                                                                 | Usage                                                          |
| -------------- | --------------------------------------------------------------------- | -------------------------------------------------------------- |
| `shadow-sm`    | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       | Subtle shadow for low-prominence elements                      |
| `shadow`       | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`       | Default shadow for most UI elements                            |
| `shadow-md`    | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    | Medium shadow for interactive elements                         |
| `shadow-lg`    | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  | Large shadow for elevated components like modals and dropdowns |
| `shadow-xl`    | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Extra large shadow for important UI elements                   |
| `shadow-2xl`   | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                                 | Double extra large shadow for maximum emphasis                 |
| `shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)`                                 | Inner shadow for inset or pressed elements                     |
| `shadow-none`  | `0 0 #0000`                                                           | Removes any shadow                                             |

### Shadow Usage Guidelines

- **Elevation hierarchy**: Use shadows to create a sense of elevation and hierarchy, with higher elements casting larger shadows.
- **Interactive feedback**: Increase shadow size slightly on hover or focus to indicate interactivity.
- **Consistency**: Maintain consistent shadow usage across similar components.
- **Dark mode considerations**: Adjust shadow opacity or color in dark mode for better visual balance.

{{ ... }}
|-----------------|--------------|---------------|
| Level 0 (Surface) | `shadow-none` | Page background, non-interactive surface elements |
| Level 1 (Low) | `shadow-sm` | Cards, containers, subtle UI elements |
| Level 2 (Default) | `shadow` | Standard interactive components, buttons |
| Level 3 (Raised) | `shadow-md` | Dropdown menus, navigation drawers, popovers |
| Level 4 (Floating) | `shadow-lg` | Floating action buttons, tooltips, context menus |
| Level 5 (Overlay) | `shadow-xl` | Modals, dialogs, sidebars |
| Level 6 (Highest) | `shadow-2xl` | Maximized modal windows, notification panels |

#### Component-Specific Guidelines

- **Cards & Containers**:

  - Default cards: `shadow-sm` or `shadow`
  - Highlighted cards: `shadow-md`
  - Feature cards: `shadow-lg`
  - Hover state: Increase shadow by one level (e.g., `shadow` to `shadow-md`)

- **Interactive Elements**:

  - Buttons: `shadow-sm` for subtle, `shadow` for standard
  - Floating action buttons: `shadow-lg`
  - Dropdown menus: `shadow-md`
  - Hover state: Increase shadow by one level
  - Active/pressed state: Decrease shadow by one level

- **Overlays & Modals**:

  - Tooltips: `shadow-md`
  - Popovers: `shadow-lg`
  - Modals: `shadow-xl`
  - Full-screen modals: `shadow-2xl`

- **Form Elements**:

  - Inputs: `shadow-sm` for subtle depth
  - Focused inputs: `shadow` with colored ring
  - Dropdowns/select: `shadow-sm`, menu with `shadow-md`

- **Navigation**:
  - Navbar: `shadow` or `shadow-md`
  - Sidebars: `shadow-lg` or `shadow-xl`
  - Bottom navigation: `shadow-md` (upward direction)

#### Interactive States

- **Default** → **Hover**: Increase shadow by one level

  - Example: Card `shadow-sm` → `shadow` on hover

- **Hover** → **Active/Pressed**: Decrease shadow to original or one level below

  - Example: Button `shadow` → `shadow-md` on hover → `shadow` or `shadow-sm` when pressed

- **Draggable Elements**:
  - Default state: Standard shadow level
  - During drag: Increase shadow by two levels
  - Example: Draggable card `shadow` → `shadow-lg` while dragging

#### Dark Mode Considerations

- Reduce shadow opacity slightly in dark mode (by about 10-20%)
- Consider using subtly colored shadows in dark mode (e.g., very subtle blue/purple tint)
- Example dark mode adjustment:
  ```css
  .dark .shadow-lg {
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.25),
      0 4px 6px -4px rgb(0 0 0 / 0.15);
  }
  ```

#### Accessibility Considerations

- Don't rely solely on shadows to indicate interactivity
- Ensure sufficient contrast between elements with different elevations
- Consider users who prefer reduced motion/animations when implementing shadow transitions
- Use `prefers-reduced-motion` media query to disable shadow animations when appropriate

## Screen Breakpoints

| Token | Value    |
| ----- | -------- |
| `xs`  | `475px`  |
| `sm`  | `640px`  |
| `md`  | `768px`  |
| `lg`  | `1024px` |
| `xl`  | `1280px` |
| `2xl` | `1536px` |

## Z-Index

| Token        | Value  | Purpose           |
| ------------ | ------ | ----------------- |
| `z-0`        | `0`    | Default           |
| `z-10`       | `10`   | Low               |
| `z-20`       | `20`   | Medium-low        |
| `z-30`       | `30`   | Medium            |
| `z-40`       | `40`   | Medium-high       |
| `z-50`       | `50`   | High              |
| `z-auto`     | `auto` | Auto              |
| `z-dropdown` | `1000` | Dropdown elements |
| `z-sticky`   | `1020` | Sticky elements   |
| `z-banner`   | `1030` | Banner elements   |
| `z-overlay`  | `1040` | Overlay elements  |
| `z-modal`    | `1050` | Modal elements    |
| `z-popover`  | `1060` | Popover elements  |
| `z-tooltip`  | `1070` | Tooltip elements  |

## Animations and Transitions

### Animations

| Token                    | Value                                            | Description        |
| ------------------------ | ------------------------------------------------ | ------------------ |
| `animate-fade-in`        | `fadeIn 0.3s ease-out`                           | Fade in            |
| `animate-fade-out`       | `fadeOut 0.3s ease-in`                           | Fade out           |
| `animate-slide-in-up`    | `slideInUp 0.3s ease-out`                        | Slide up           |
| `animate-slide-in-down`  | `slideInDown 0.3s ease-out`                      | Slide down         |
| `animate-slide-in-left`  | `slideInLeft 0.3s ease-out`                      | Slide from left    |
| `animate-slide-in-right` | `slideInRight 0.3s ease-out`                     | Slide from right   |
| `animate-spin`           | `spin 1s linear infinite`                        | Spinning animation |
| `animate-ping`           | `ping 1s cubic-bezier(0, 0, 0.2, 1) infinite`    | Ping animation     |
| `animate-pulse`          | `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite` | Pulse animation    |
| `animate-bounce`         | `bounce 1s infinite`                             | Bounce animation   |

### Transition Properties

| Token                | Value              | Description         |
| -------------------- | ------------------ | ------------------- |
| `transition`         | Default properties | Standard transition |
| `transition-height`  | `height`           | Height transitions  |
| `transition-spacing` | `margin, padding`  | Spacing transitions |
| `transition-width`   | `width`            | Width transitions   |
| `transition-size`    | `width, height`    | Size transitions    |

### Transition Timing Functions

| Token         | Value                          |
| ------------- | ------------------------------ |
| `ease`        | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `ease-linear` | `linear`                       |
| `ease-in`     | `cubic-bezier(0.4, 0, 1, 1)`   |
| `ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`   |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |

### Transition Durations

| Token           | Value    |
| --------------- | -------- |
| `duration`      | `150ms`  |
| `duration-75`   | `75ms`   |
| `duration-100`  | `100ms`  |
| `duration-200`  | `200ms`  |
| `duration-300`  | `300ms`  |
| `duration-500`  | `500ms`  |
| `duration-700`  | `700ms`  |
| `duration-1000` | `1000ms` |

## Usage Guidelines

1. Always use design tokens instead of hardcoded values
2. Use semantic tokens where available (e.g., `primary-500` instead of specific hex values)
3. Follow the established type scale and spacing scale for consistent interfaces
4. Maintain a 4px baseline grid when possible
5. Use the predefined breakpoints for responsive design
