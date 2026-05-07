# Visual & Technical Design Specification: Kraina Mriy 2026

## 1. Vision & Concept

- **Core Philosophy**: "Kraina Mriy" (Country of Dreams) is a space where tradition and modernity become one.
- **Primary Language**: Ukrainian (UKR). All user-facing content and SEO metadata must be in Ukrainian.
- **Design Goal**: Create a premium, interactive digital space relying on the official brand identity (warm ethnic tones) with modern web performance (Next.js SSG, CSS Variables).

## 2. Brand Identity, Color Palette & Theming

- **Interactive City Toggle**: The UI must dynamically toggle global CSS variables based on the selected city.
- **Kamianets-Podilskyi Theme**: "Kraina Mriy Epic" -> Triggers **Natural Green** primary accent color.
- **Lviv Theme**: "Kraina Mriy Heroic" -> Triggers **Brand Red** primary accent color.

### Core Color Tokens
- **Brand Red (Primary Accent)**: `#BF2A26`
- **Natural Green (Secondary Accent)**: `#8C9B5C`
- **Warm Beige (Background)**: `#FFF0D9`
- **Dark Grey (Text/Neutral)**: `#232323`

### Comprehensive System Colors
- **Surface / Background**: `#FFF0D9`
- **On Surface / Text**: `#232323`
- **Primary**: `#BF2A26`, **On Primary**: `#ffffff`
- **Secondary**: `#8C9B5C`, **On Secondary**: `#ffffff`
- **Outline**: `#8e706c`

### Typography Tokens
- **Display XL**: `Kyiv Region`, 64px, Bold (700), Line Height: 1.1, Tracking: -0.02em. Headings should be kept as concise as possible.
- **Headline LG**: `Kyiv Region`, 40px, Semi-Bold (600), Line Height: 1.2
- **Headline MD**: `Kyiv Region`, 32px, Medium (500), Line Height: 1.3
- **Body LG**: `Mulish`, 18px, Regular (400), Line Height: 1.6
- **Body MD**: `Mulish`, 16px, Regular (400), Line Height: 1.6. Minimum 12px to maximize readability.
- **Accent Hand**: `Kobzar KS`, 24px, Regular (400), Line Height: 1.2. Adds emotionality and warmth.
- **Label SM**: `Mulish`, 12px, Bold (700), Line Height: 1, Tracking: 0.1em

### Logo Adaptations & Concepts
- **Logo Concept**: The abstract symbol represents a stylized sprout, bird, or person with raised arms (growth, freedom, dreams).
- **Adaptations**:
  - *Horizontal*: Symbol left, Text right (Web baseline).
  - *Stacked*: Symbol top, Text bottom (Centered layouts).
  - *Symbol Only*: Used for favicons, app icons, and background patterns.

## 3. Top Navigation

- **Components**: LOGO — CITIES — PROGRAM — ARTISTS — PARTNERS — TICKETS.

## 4. Hero Section & City Selection (Interactive UI)

- **Background**: Solid color matching the brand identity (Beige).
- **Title Elements**:
  - Overline: Етно-фестиваль
  - H1: «Країна Мрій» 2026
  - Subtitle: Територія свободи, де традиції творять майбутнє.
  - Credit: Автор та засновник — Олег Скрипка.
- **Interactive Block**: City selection cards. Hovering/clicking changes the global site theme to "Epic" (Green/Kamianets) or "Heroic" (Red/Lviv).

## 5. Buy Tickets Block

- **Content**: "Перші 300 квитків за ціною 999 грн на 2 дні!"
- **UI**: Large, prominent CTA button using the active theme's accent color.

## 6. About the Festival

- **Layout**: Text on Right, Image on Left.
- **Narrative**: "Kraina Mriy" is a space making folklore relevant through live music, crafts, and shared experiences.

## 7. Founder — Oleg Skrypka

- **Layout**: Text on Left, Image on Right.
- **Narrative**: Highlighting Oleg Skrypka's 35-year mission of establishing Ukrainian identity.

## 8. Interactive Locations Grid

- **Interaction Design**: Expanding cards/accordion on hover or click.
- **Головна сцена Мрій (Main Stage)**: The heart of the festival. Legendary bands that shape the DNA of our music.
- **Епічна сцена (Epic Stage)**: A space for discoveries and the new Ukrainian wave.
- **Алея Майстрів (Masters' Alley)**: A territory of craft brands and designers.
- **Весільна локація (Wedding Location)**: Live rituals that unite generations.
- **Український фудкорт (Food Court)**: A gastronomic journey through the regions.
- **Простори ремесел (Craft Spaces)**: Workshops on ceramics, blacksmithing.

## 9. Artists Line-up Block

- **UI/Layout**: Implement an interactive carousel (e.g., using Embla Carousel via shadcn/ui) or a grid layout showcasing the performing artists.
- **Data Points**: Artist Photo, Artist Name, and Stage.

## 10. Footer & Technical Restraints

- **Requirements**: Must use `"use client"` where necessary for interactive theme switching, but **NO Server-Side Rendering (SSR)**. The site must compile using `output: 'export'` for static hosting.
