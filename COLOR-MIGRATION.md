# 🔄 Color Migration Guide

## Components to Update

This guide helps systematically update all components with the new color palette.

### Color Mapping: Old → New

```javascript
// OLD COLORS → NEW COLORS
'#C1440E' → '#C67B5C'  // Canyon Red → Soft Terracotta (primary)
'#E67E22' → '#D97D54'  // Canyon Orange → Sunset Coral (accent)
'#D35400' → '#A85F44'  // Terracotta → Deep Terracotta (primary-dark)
'#F4E4C1' → '#E6B8A5'  // Canyon Sand → Light Terracotta (primary-light)
'#9B4819' → '#5A4A3A'  // Canyon Clay → Medium Brown (foreground-light)
'#8B7355' → '#8B6F47'  // Canyon Stone → Warm Tan (secondary)
'#FFF8F0' → '#FAF8F5'  // Old Background → New Background
'#2C1810' → '#2C2419'  // Old Text → New Text
```

---

## Priority Order for Updates

### Phase 1: Core Components (High Impact)
1. ✅ Hero.tsx - Already updated with lightened background
2. ✅ globals.css - Already updated with new palette
3. Navbar.tsx
4. Footer.tsx
5. About.tsx

### Phase 2: Interactive Components
6. Contact.tsx
7. Shop.tsx
8. CartModal.tsx
9. CheckoutModal.tsx

### Phase 3: Content Components
10. Shows.tsx
11. Media.tsx

### Phase 4: Admin
12. app/admin/page.tsx

---

## Component-by-Component Updates

### Would you like me to:
A) **Update all components automatically** (I'll do a systematic find-replace)
B) **Update one section at a time** (so you can review each change)
C) **Just update the most visible sections** (Hero, Navbar, Buttons)

**Recommendation**: Option A - I can update everything consistently right now!

---

## What Will Change Visually

### Navigation Bar:
- **Before**: Bright orange hover (#E67E22)
- **After**: Soft terracotta hover (#C67B5C)
- **Impact**: More elegant, less aggressive

### Buttons:
- **Before**: Red-orange (#C1440E)
- **After**: Sunset coral (#D97D54)
- **Impact**: Warmer, more inviting

### Cards & Sections:
- **Before**: Yellow-tinted whites
- **After**: Soft warm whites
- **Impact**: Cleaner, more modern

### Text Colors:
- **Before**: Various browns
- **After**: Consistent brown hierarchy
- **Impact**: Better readability

---

## Testing Checklist

After color update, test:
- [ ] Hero section looks good
- [ ] Navigation is readable
- [ ] Buttons stand out but aren't harsh
- [ ] Text is easy to read
- [ ] Shop section feels professional
- [ ] Contact form is inviting
- [ ] Footer looks polished
- [ ] Mobile view works well

---

## Quick Decision Needed

Should I update all components now with the new color palette?

**Option A (Recommended)**: Yes, update everything
- Takes ~5 minutes
- Consistent throughout
- See full transformation

**Option B**: Let's review Hero first
- See if you like the direction
- Then commit to full update

**Option C**: Custom approach
- Tell me specific sections to update

---

**What would you like me to do?** 🎨

