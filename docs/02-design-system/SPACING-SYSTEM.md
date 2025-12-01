# Spacing System Guide

## Design Principles

### 8-Point Grid System
All spacing uses multiples of 8px for consistency and visual harmony:
- 4px (0.5rem) - Micro spacing
- 8px (1rem) - Tight spacing
- 16px (2rem) - Standard spacing
- 24px (3rem) - Comfortable spacing
- 32px (4rem) - Section spacing
- 48px (6rem) - Large section spacing
- 64px (8rem) - Hero/Major section spacing

## Component Spacing Standards

### Buttons
```
padding: px-6 py-3 (24px horizontal, 12px vertical)
gap between buttons: space-x-3 (12px)
margin from surrounding content: mt-6 mb-4 (24px top, 16px bottom)
```

### Cards
```
padding: p-6 sm:p-8 (24px mobile, 32px desktop)
gap between cards: gap-6 sm:gap-8 (24px mobile, 32px desktop)
border-radius: rounded-xl (12px)
margin bottom: mb-8 (32px)
```

### Form Fields
```
padding: px-4 py-3 (16px horizontal, 12px vertical)
gap between fields: space-y-4 (16px)
label margin: mb-2 (8px)
```

### Sections
```
padding: py-16 px-6 sm:py-20 sm:px-8 lg:py-24 lg:px-12
section gap: space-y-16 sm:space-y-20 lg:space-y-24
max-width: max-w-7xl mx-auto
```

### Navigation
```
padding: px-6 py-4 (24px horizontal, 16px vertical)
item spacing: space-x-6 sm:space-x-8
```

### Typography
```
heading margin-bottom: mb-4 sm:mb-6 (16-24px)
paragraph spacing: space-y-4 (16px)
line-height: leading-relaxed (1.625)
```

## Container Standards

### Page Containers
```tsx
<main className="py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12">
  <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
    {/* Content */}
  </div>
</main>
```

### Grid Layouts
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {/* Items */}
</div>
```

### Flex Layouts
```tsx
<div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
  {/* Items */}
</div>
```

## Common Mistakes to Avoid

❌ **DON'T:**
- Use arbitrary values like `p-[13px]`
- Stack elements without spacing (`space-y-0`)
- Use inconsistent spacing values
- Forget responsive spacing variants
- Let text touch container edges

✅ **DO:**
- Use the 8-point grid system
- Add responsive spacing (sm:, md:, lg:)
- Use semantic spacing (space-y for vertical, space-x for horizontal)
- Ensure all containers have padding
- Leave breathing room around all elements

