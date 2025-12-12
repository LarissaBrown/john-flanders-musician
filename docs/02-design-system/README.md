# 🎨 Design System

Complete visual standards and design guidelines for the John Flanders website.

## 📄 Documents in This Section

### [SOUTHWEST-COLOR-GUIDE.md](./SOUTHWEST-COLOR-GUIDE.md)
**Primary color palette** - The official color system.

- 🎨 All color values (hex, RGB, HSL)
- 🖌️ Usage guidelines for each color
- 🌈 Color combinations and pairings
- ✅ Dos and don'ts

**Use this when:** Choosing colors for any UI element.

---

### [COLOR-THEORY-GUIDE.md](./COLOR-THEORY-GUIDE.md)
**Design rationale** - Why these colors work.

- 🧠 Color psychology
- 🎯 Target audience considerations
- 🌄 Southwest theme explanation
- 📊 Accessibility and contrast

**Use this when:** You need to understand or explain design decisions.

---

### [STYLE-GUIDE.md](./STYLE-GUIDE.md)
**Complete UI standards** - Every design detail documented.

- 📏 Typography system
- 📐 Spacing and layout
- 🔘 Component styles
- 🎭 States and interactions
- 📱 Responsive breakpoints

**Use this when:** Building or modifying any UI component.

---

### [MUBI-DESIGN-SYSTEM.md](./MUBI-DESIGN-SYSTEM.md)
**Advanced patterns** - Premium design inspiration and implementation.

- ✨ Advanced animations
- 🎬 Cinematic design patterns
- 🌟 Premium UI examples
- 🎨 Elevated design techniques

**Use this when:** Creating premium features or improving existing UI.

---

## 🎨 Design Principles

### Southwest Canyon Theme
This website uses warm, earthy colors inspired by Utah's red rock canyons:

- **Primary:** Canyon Red `#C1440E`
- **Secondary:** Canyon Orange `#E67E22`
- **Accent:** Gold `#F6B800`
- **Background:** Warm Cream `#FFF8F0`
- **Dark:** Rich Brown `#1C1612`

### Visual Hierarchy
1. **Hero sections** - Bold, attention-grabbing
2. **Content sections** - Clear, readable, spacious
3. **CTAs** - Prominent, action-oriented
4. **Details** - Subtle, supportive

### Responsive Design
- **Mobile-first** approach
- **Fluid typography** scales with viewport
- **Flexible layouts** adapt to all screens
- **Touch-friendly** interactions

---

## 🔍 Quick Reference

### Colors
See [SOUTHWEST-COLOR-GUIDE.md](./SOUTHWEST-COLOR-GUIDE.md) for complete palette.

```css
--canyon-red: #C1440E
--canyon-orange: #E67E22
--canyon-terracotta: #D35400
--gold: #F6B800
--warm-cream: #FFF8F0
--rich-brown: #1C1612
```

### Typography
See [STYLE-GUIDE.md](./STYLE-GUIDE.md) for complete type system.

- **Headings:** Large, bold, high contrast
- **Body:** Readable, comfortable line-height
- **Scale:** 1.25 ratio (minor third)

### Spacing
See [STYLE-GUIDE.md](./STYLE-GUIDE.md) for spacing scale.

- **Base:** 4px (0.25rem)
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

---

## 🎯 Design Goals

### User Experience
- ✅ Professional and credible
- ✅ Easy to navigate
- ✅ Quick to load
- ✅ Accessible to all users

### Brand Alignment
- ✅ Reflects musician's personality
- ✅ Southwest aesthetic
- ✅ Warm and inviting
- ✅ Professional yet approachable

### Technical Quality
- ✅ High performance
- ✅ SEO optimized
- ✅ Responsive design
- ✅ Modern best practices

---

## 🛠️ Implementing the Design System

### Using Colors
```tsx
// Tailwind classes
<div className="bg-canyon-red text-warm-cream">

// Custom CSS
.element {
  background: var(--canyon-red);
  color: var(--warm-cream);
}
```

### Using Typography
```tsx
// Headings
<h1 className="text-4xl md:text-6xl font-bold">

// Body
<p className="text-base md:text-lg leading-relaxed">
```

### Using Spacing
```tsx
// Section padding
<section className="py-16 md:py-24">

// Element spacing
<div className="space-y-8">
```

---

## 📐 Design Tools & Resources

### Figma Files
*(Add Figma links if available)*

### Design Assets
- Located in `/public/images/`
- SVG preferred for icons and logos
- WebP for photos
- PNG with transparency when needed

### Fonts
- System fonts for performance
- Font weights: 400 (regular), 600 (semibold), 700 (bold)

---

## ✅ Design Checklist

When creating or reviewing designs:

- [ ] Uses only approved colors
- [ ] Follows typography scale
- [ ] Maintains consistent spacing
- [ ] Works on mobile, tablet, desktop
- [ ] Meets accessibility standards (WCAG AA)
- [ ] Loads quickly
- [ ] Matches brand personality

---

## 🔄 Updating the Design System

If you need to modify the design system:

1. **Document the change** - Update the appropriate guide
2. **Get approval** - Discuss with stakeholders
3. **Update globally** - Change variables, not individual instances
4. **Test thoroughly** - Check all pages and components
5. **Update this documentation** - Keep guides current

---

[← Back to Documentation Hub](../README.md)





