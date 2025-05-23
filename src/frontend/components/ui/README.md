# UI Components Library

This directory contains reusable UI components built with React, TypeScript, and Tailwind CSS. All components support theming, accessibility, and internationalization.

## Components Overview

### Layout Components

#### `Sidebar`

Navigation sidebar with collapsible functionality.

```tsx
<Sidebar
  navigationItems={[
    { id: "dashboard", label: "概览", icon: BarChart3 },
    { id: "projects", label: "项目", icon: FileText },
  ]}
  currentPage="dashboard"
  onNavigate={(pageId) => setCurrentPage(pageId)}
  isOpen={true}
  onToggle={() => setIsOpen(!isOpen)}
  logo={{
    icon: Languages,
    title: "TransHub",
    subtitle: "专业翻译平台",
  }}
/>
```

#### `Header`

Top navigation header with search, notifications, and user profile.

```tsx
<Header
  onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
  searchPlaceholder="搜索..."
  showNotifications={true}
  notificationCount={3}
  user={{
    name: "管理员",
    role: "在线",
    status: "online",
  }}
/>
```

### Data Display Components

#### `StatCard`

Statistical information display card with icon and trend indicator.

```tsx
<StatCard title="活跃项目" value="128" change="+12%" icon={FileText} color="blue" />
```

#### `Avatar`

User avatar with status indicator support.

```tsx
<Avatar src="https://example.com/avatar.jpg" alt="用户头像" size="lg" status="online" showStatus={true} />
```

#### `Badge`

Status indicators and labels with various styles.

```tsx
<Badge variant="success" size="sm">
  已完成
</Badge>
```

#### `Progress`

Progress bars with customizable variants and labels.

```tsx
<Progress value={75} showLabel={true} label="完成进度" variant="success" />
```

### Form Components

#### `Button`

Versatile button component with icon support.

```tsx
<Button variant="primary" size="md" icon={Plus} onClick={handleClick}>
  新建项目
</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `danger`
**Sizes:** `sm`, `md`, `lg`

#### `TextInput`

Text input field with label and error state support.

```tsx
<TextInput
  label="项目名称"
  placeholder="输入项目名称"
  required
  error={!!errors.name}
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
```

#### `Textarea`

Multi-line text input with character count.

```tsx
<Textarea label="项目描述" placeholder="详细描述..." rows={4} maxLength={500} showCharCount={true} />
```

#### `Select`

Dropdown select with searchable options.

```tsx
<Select
  label="语言"
  options={[
    { value: "en", label: "English" },
    { value: "zh", label: "中文" },
  ]}
  placeholder="选择语言"
  onChange={(value) => setLanguage(value)}
/>
```

#### `SearchInput`

Search input with icon and size variants.

```tsx
<SearchInput placeholder="搜索项目..." size="md" onChange={handleSearch} />
```

### Utility Components

#### `Card`

Content container with optional title and interactive hover effects.

```tsx
<Card title="项目详情" interactive>
  <p>项目内容...</p>
</Card>
```

#### `Modal`

Modal dialog component (from existing library).

#### `Alert`

Alert notifications (from existing library).

#### `DataTable`

Data table component (from existing library).

## Design Principles

### Accessibility

- All components include proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Theming

- Consistent with ThemeContext
- Light and dark mode support
- Customizable color variants

### Mobile Responsive

- All components adapt to different screen sizes
- Touch-friendly interaction areas
- Responsive typography and spacing

### Performance

- Optimized re-renders
- Lazy loading where applicable
- Minimal bundle size impact

## Usage Guidelines

### Import Components

```tsx
import { Button, Card, StatCard } from "./components/ui";
```

### Consistent Styling

- Use predefined size variants (`sm`, `md`, `lg`)
- Follow color scheme (`primary`, `secondary`, `success`, `warning`, `danger`)
- Maintain consistent spacing using Tailwind classes

### State Management

- Components are controlled by parent components
- Use appropriate TypeScript interfaces
- Handle loading and error states

### Best Practices

1. Always provide meaningful labels and placeholders
2. Use appropriate semantic HTML elements
3. Include proper error handling
4. Test with keyboard navigation
5. Verify color contrast ratios

## Contributing

When adding new components:

1. Follow the existing TypeScript interfaces pattern
2. Include proper documentation with examples
3. Add theme support through ThemeContext
4. Ensure accessibility compliance
5. Write comprehensive prop types
6. Export from `index.ts`

## Testing

All components should be tested for:

- Rendering with different props
- User interactions
- Accessibility compliance
- Theme switching
- Responsive behavior
