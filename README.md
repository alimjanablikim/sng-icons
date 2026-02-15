# ShadNG Icons (`@shadng/sng-icons`)

Dynamic Angular icon library with native Tailwind CSS support, tree-shakeable icon data, and built from Iconoir SVGs.

## Gallery
https://shadng.js.org/icons

## Features

- 🎯 **Native Tailwind CSS Support** - Use standard Tailwind utilities for sizing, colors, and animations
- 🌲 **Tree-shakeable** - Only import the icons you use
- 🚀 **Performance optimized** - Built-in SVG sanitization caching
- 📱 **Fully responsive** - Works with all Tailwind breakpoints
- 🎨 **Dark mode ready** - Seamless integration with Tailwind's dark mode
- ♿ **Accessible** - Proper ARIA labeling support
- 🔒 **Type-safe** - Full TypeScript support with literal types for all icon names

## Installation

```bash
npm install @shadng/sng-icons
```

## Quick Start

```typescript
// Single icon import
import { SngIcon, checkRegular } from '@shadng/sng-icons';

// Multiple icons import
import { SngIcon, checkRegular, userRegular } from '@shadng/sng-icons';

@Component({
  template: `
    <!-- Basic usage with Tailwind classes -->
    <sng-icon [icon]="checkIcon" class="w-6 h-6 text-green-500"></sng-icon>

    <!-- Multiple icons usage -->
    <sng-icon [icon]="checkIcon" class="w-5 h-5 text-green-600"></sng-icon>
    <sng-icon [icon]="userIcon" class="w-5 h-5 text-blue-600"></sng-icon>

    <!-- Responsive sizing -->
    <sng-icon [icon]="checkIcon" class="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"></sng-icon>

    <!-- Dark mode support -->
    <sng-icon [icon]="checkIcon" class="text-gray-700 dark:text-gray-300"></sng-icon>

    <!-- Hover effects -->
    <sng-icon [icon]="checkIcon" class="hover:text-blue-600 hover:scale-110 transition-all"></sng-icon>

    <!-- Animations -->
    <sng-icon [icon]="checkIcon" class="animate-pulse"></sng-icon>
  `
})
export class MyComponent {
  checkIcon = checkRegular;
  userIcon = userRegular;
}
```

## Tailwind CSS Usage

The component is designed to work seamlessly with Tailwind CSS utilities:

### Sizing
```html
<!-- Tailwind size utilities -->
<sng-icon [icon]="icon" class="w-4 h-4"></sng-icon>     <!-- 16px -->
<sng-icon [icon]="icon" class="w-6 h-6"></sng-icon>     <!-- 24px -->
<sng-icon [icon]="icon" class="size-8"></sng-icon>      <!-- 32px (Tailwind 3.4+) -->

<!-- Arbitrary values -->
<sng-icon [icon]="icon" class="w-[18px] h-[18px]"></sng-icon>
```

### Colors
```html
<!-- Tailwind color utilities -->
<sng-icon [icon]="icon" class="text-blue-500"></sng-icon>
<sng-icon [icon]="icon" class="text-slate-700"></sng-icon>

<!-- Arbitrary colors using Tailwind CSS syntax -->
<!-- The component automatically detects and applies text-[#colorValue] as inline styles -->
<sng-icon [icon]="icon" class="text-[#1da1f2]"></sng-icon>
<sng-icon [icon]="icon" class="text-[#ff6b6b]"></sng-icon>
<sng-icon [icon]="icon" class="text-[#f505ed]"></sng-icon>
```

### Animations
```html
<!-- Built-in Tailwind animations -->
<sng-icon [icon]="icon" class="animate-spin"></sng-icon>
<sng-icon [icon]="icon" class="animate-pulse"></sng-icon>
<sng-icon [icon]="icon" class="animate-bounce"></sng-icon>
```

### Responsive Design
```html
<!-- Different sizes at different breakpoints -->
<sng-icon [icon]="icon" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"></sng-icon>

<!-- Different colors for light/dark mode -->
<sng-icon [icon]="icon" class="text-gray-700 dark:text-gray-300"></sng-icon>
```

### Hover & Focus States
```html
<!-- Hover effects -->
<sng-icon [icon]="icon" class="hover:text-blue-600 transition-colors"></sng-icon>
<sng-icon [icon]="icon" class="hover:scale-110 transition-transform"></sng-icon>

<!-- Focus styles -->
<sng-icon [icon]="icon" class="focus:outline-none focus:ring-2 focus:ring-blue-500"></sng-icon>
```

## Component API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| icon | IconData | undefined | The icon data object to render |
| size | number \| string | 24 | Size in pixels (overridden by Tailwind classes) |
| alt | string \| null | null | Accessibility label |
| strokeWeight | string | icon default | SVG stroke width |
| svgClass | string | '' | Additional classes for the SVG element |
| showFallback | boolean | true | Show fallback icon when data is missing |

## TypeScript Support

The library includes full TypeScript support with literal types for all icon names:

```typescript
import { IconName, RegularIconName, SolidIconName } from '@shadng/sng-icons';

// Full type safety and autocomplete
const iconName: RegularIconName = 'check'; // ✅ Valid
const invalidName: RegularIconName = 'invalid'; // ❌ TypeScript error
```

## Available Icons

Total icons: 1671
- Regular: 1383 icons
- Solid: 288 icons

## License

MIT
