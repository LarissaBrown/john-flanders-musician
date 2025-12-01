# 🎨 John Flanders Website - Design Style Guide

## Color Palette

### Primary Colors (Southwest Canyon Theme)

```
🔴 Canyon Red (Primary)
HEX: #C1440E
RGB: 193, 68, 14
Use: Primary CTA buttons, hover states, accents

🧡 Canyon Orange (Secondary)
HEX: #E67E22
RGB: 230, 126, 34
Use: Secondary buttons, links, highlights

🟠 Canyon Terracotta (Accent)
HEX: #D35400
RGB: 211, 84, 0
Use: Gradients, borders, decorative elements

🟤 Canyon Clay (Dark)
HEX: #9B4819
RGB: 155, 72, 25
Use: Body text, dark accents

🤎 Canyon Stone
HEX: #8B7355
RGB: 139, 115, 85
Use: Subtle borders, disabled states
```

### Neutral Colors

```
🤍 Canyon Sand (Light)
HEX: #F4E4C1
RGB: 244, 228, 193
Use: Light text on dark backgrounds, highlights

🤍 Background (Cream)
HEX: #FFF8F0
RGB: 255, 248, 240
Use: Main background color

⚫ Text Primary (Dark Brown)
HEX: #2C1810
RGB: 44, 24, 16
Use: Headings, primary text
```

### Accent Colors

```
💚 Canyon Sage
HEX: #9CAF88
RGB: 156, 175, 136
Use: Success states, optional accents

🔵 Canyon Sky
HEX: #87CEEB
RGB: 135, 206, 235
Use: Links, info states
```

## Typography

### Font Families

```css
/* Primary Font (Geist Sans) */
font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace Font (Geist Mono) */
font-family: var(--font-geist-mono), 'Courier New', monospace;
```

### Font Sizes

```
Hero Heading: 6xl-8xl (96-128px)
Section Heading: 5xl (48px)
Subsection Heading: 3xl (30px)
Card Title: 2xl (24px)
Body Large: xl (20px)
Body: base (16px)
Small: sm (14px)
Extra Small: xs (12px)
```

### Font Weights

```
Thin: 100
Light: 300
Normal: 400
Medium: 500
Semibold: 600
Bold: 700
Extra Bold: 800
Black: 900
```

## Spacing System

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 2.5rem (40px)
3xl: 3rem (48px)
4xl: 4rem (64px)
5xl: 5rem (80px)
```

## Border Radius

```
sm: 0.5rem (8px) - Small cards, inputs
md: 1rem (16px) - Cards, buttons
lg: 1.5rem (24px) - Large cards
xl: 2rem (32px) - Hero sections
full: 9999px - Pills, badges, circular elements
```

## Shadows

```
Small: 0 1px 3px rgba(0,0,0,0.12)
Medium: 0 4px 6px rgba(0,0,0,0.1)
Large: 0 10px 15px rgba(0,0,0,0.1)
Extra Large: 0 20px 25px rgba(0,0,0,0.15)
```

## Component Styles

### Buttons

**Primary Button**
```
Background: #C1440E (Canyon Red)
Text: White
Hover: #E67E22 (Canyon Orange)
Padding: 16px 32px
Border Radius: 9999px (full)
Font Weight: 600 (Semibold)
```

**Secondary Button**
```
Background: Transparent
Border: 2px solid #F4E4C1
Text: #F4E4C1
Hover Background: #F4E4C1
Hover Text: #2C1810
Padding: 16px 32px
Border Radius: 9999px (full)
```

### Cards

**Standard Card**
```
Background: White
Border: 2px solid transparent
Border Radius: 1.5rem (24px)
Padding: 2rem (32px)
Shadow: Large
Hover Shadow: Extra Large
```

**Featured Card**
```
Background: White
Border: 2px solid #E67E22
Border Radius: 1.5rem (24px)
Padding: 2rem (32px)
Shadow: Extra Large
```

### Forms

**Input Fields**
```
Background: White
Border: 2px solid #F4E4C1
Border Radius: 0.5rem (8px)
Padding: 12px 16px
Focus Border: #E67E22
```

**Textarea**
```
Same as input
Min Height: 120px
Resize: None
```

## Navigation

**Desktop Navbar**
```
Height: 80px
Background: Transparent (scrolled: #2C1810 with 95% opacity)
Text: #F4E4C1
Hover: #E67E22
Sticky Position: Top
Backdrop Blur: Medium
```

**Mobile Menu**
```
Background: #2C1810 with 98% opacity
Padding: 16px
Border Radius: 0.5rem (8px)
Backdrop Blur: Medium
```

## Sections

### Hero Section
```
Background: Gradient from #C1440E to #9B4819
Min Height: 100vh
Text Color: #FFF8F0 and #F4E4C1
Overlay: Canyon texture pattern (30% opacity)
```

### Content Sections
```
Padding Top/Bottom: 5rem (80px)
Max Width: 1280px (7xl container)
Background: Alternating #FFF8F0 and #F4E4C1
```

### Footer
```
Background: #2C1810
Text: #F4E4C1
Padding: 3rem top, 1.5rem bottom
```

## Icons

**Icon Library**: Lucide React
**Icon Sizes**:
- Small: 16px (w-4 h-4)
- Medium: 20px (w-5 h-5)
- Large: 24px (w-6 h-6)
- Extra Large: 32px (w-8 h-8)
- Hero: 96px (w-24 h-24)

**Icon Colors**:
- Primary: #E67E22 (Canyon Orange)
- Secondary: #C1440E (Canyon Red)
- Light: #F4E4C1 (Canyon Sand)

## Animations

### Transitions
```
Duration: 200-300ms
Easing: ease-in-out
Properties: colors, transform, shadow
```

### Hover Effects
```
Transform: translateY(-4px)
Scale: 1.05-1.1
Shadow: Increase depth
Color: Shift to accent color
```

### Page Load
```
Fade In Up Animation:
- From: opacity 0, translateY(30px)
- To: opacity 1, translateY(0)
- Duration: 800ms
- Easing: ease-out
```

## Responsive Breakpoints

```
sm: 640px   - Mobile landscape
md: 768px   - Tablets
lg: 1024px  - Small desktops
xl: 1280px  - Large desktops
2xl: 1536px - Extra large screens
```

## Grid System

```
Mobile: 1 column
Tablet: 2 columns
Desktop: 3-4 columns
Gap: 2rem (32px)
```

## Logo & Branding

**Logo Icon**: Music note (Lucide React)
```
Size: 32px (w-8 h-8)
Color: #E67E22 (Canyon Orange)
```

**Brand Name**: "John Flanders"
```
Font Size: 2xl (24px)
Font Weight: 700 (Bold)
Color: #F4E4C1 (on dark) or #2C1810 (on light)
```

## Image Guidelines

### Photo Styles
```
Aspect Ratios:
- Hero/Featured: 16:9
- Portrait: 4:5
- Thumbnail: 1:1
- Video: 16:9

Border Radius: 1-2rem
Shadow: Large on hover
```

### Optimization
```
Format: WebP (with JPG fallback)
Quality: 80-85%
Max Width: 1920px
Lazy Loading: Enabled
```

## Accessibility

### Color Contrast
```
All text meets WCAG AA standards
Primary text: 7:1 contrast ratio
Large text: 4.5:1 contrast ratio
```

### Focus States
```
Outline: 2px solid #E67E22
Outline Offset: 2px
Visible on keyboard navigation
```

### Semantic HTML
```
Proper heading hierarchy (h1 → h6)
ARIA labels where needed
Alt text for all images
Semantic landmarks (nav, main, footer, etc.)
```

## Usage Examples

### Section Header
```tsx
<div className="text-center mb-16">
  <h2 className="text-5xl font-bold text-[#2C1810] mb-4">
    Section Title
  </h2>
  <div className="w-24 h-1 bg-[#E67E22] mx-auto mb-6"></div>
  <p className="text-xl text-[#9B4819] max-w-3xl mx-auto">
    Section description
  </p>
</div>
```

### Primary Button
```tsx
<button className="bg-[#C1440E] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E67E22] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
  Call to Action
</button>
```

### Card
```tsx
<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#E67E22] p-6">
  {/* Card content */}
</div>
```

## Design Principles

1. **Southwest Authenticity**: Colors and textures inspired by Utah's redrock canyons
2. **Clean & Modern**: Contemporary design with classic elements
3. **User-Focused**: Easy navigation and clear calls-to-action
4. **Responsive First**: Mobile experience is just as important as desktop
5. **Performance**: Fast loading, smooth animations
6. **Accessible**: Inclusive design for all users
7. **Scalable**: Design system that grows with the site

## Mood & Tone

**Visual Mood**: Warm, inviting, authentic, professional, artistic
**Color Mood**: Earthy, natural, energetic, passionate
**Typography Mood**: Modern, readable, confident, approachable
**Overall Feel**: Southwest elegance meets modern professionalism

---

This style guide ensures consistent design throughout the website and makes future updates easier!

