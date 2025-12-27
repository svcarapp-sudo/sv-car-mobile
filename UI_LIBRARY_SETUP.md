# 🎨 React Native Paper UI Library Setup

This project uses **React Native Paper** - a Material Design component library for React Native.

## 📦 Installed Packages

- `react-native-paper` - Material Design components
- `react-native-vector-icons` - Icon support (required by Paper)
- `@react-native-community/slider` - Additional component support

## 🏗️ Structure

```
src/
├── shared/
│   ├── theme/
│   │   ├── theme.ts          # Single theme definition
│   │   ├── index.ts          # Theme exports
│   │   └── README.md         # Theme documentation
│   └── components/
│       └── Button.tsx        # Custom button wrapper
│
└── core/
    └── providers/
        ├── ThemeProvider.tsx # PaperProvider wrapper
        └── index.ts
```

## 🎯 Features

✅ **Material Design 3** components  
✅ **Single customizable theme**  
✅ **TypeScript support**  
✅ **Fully customizable colors**  
✅ **Accessibility** built-in  

## 📝 Usage Examples

### Basic Component Usage

```typescript
import { Text, Button, Card } from 'react-native-paper'

function MyScreen() {
  return (
    <View>
      <Text variant="headlineLarge">Hello</Text>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Click Me
      </Button>
      <Card>
        <Card.Content>
          <Text>Card content</Text>
        </Card.Content>
      </Card>
    </View>
  )
}
```

### Using Theme

```typescript
import { useTheme } from 'react-native-paper'

function ThemedComponent() {
  const theme = useTheme()
  
  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.onPrimary }}>
        Themed text
      </Text>
    </View>
  )
}
```


### Using Custom Button Component

```typescript
import { Button } from '@/shared/components'

function MyComponent() {
  return (
    <Button variant="primary" onPress={handlePress}>
      Primary Button
    </Button>
  )
}
```

## 🎨 Available Components

React Native Paper provides 30+ components including:

- **Text** - Typography with variants
- **Button** - Buttons with multiple modes
- **Card** - Material Design cards
- **TextInput** - Text inputs with labels
- **BottomNavigation** - Bottom navigation bar
- **Appbar** - App bar/header
- **FAB** - Floating action button
- **Dialog** - Modal dialogs
- **Snackbar** - Toast notifications
- **Chip** - Chips/tags
- And many more...

## 🔧 Customization

### Customizing Theme Colors

Edit `src/shared/theme/theme.ts`:

```typescript
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    // Customize other colors...
  },
}
```

### Creating Custom Components

Create wrapper components in `src/shared/components/`:

```typescript
// src/shared/components/CustomCard.tsx
import { Card } from 'react-native-paper'

export const CustomCard = (props) => {
  return <Card style={{ margin: 8 }} {...props} />
}
```

## 📚 Resources

- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/)
- [Component List](https://callstack.github.io/react-native-paper/docs/components/overview)
- [Theming Guide](https://callstack.github.io/react-native-paper/theming.html)
- [Material Design 3](https://m3.material.io/)

## 🚀 Next Steps

1. Explore available components in the documentation
2. Customize theme colors to match your brand
3. Create custom component wrappers as needed
4. Use theme provider in your feature components

