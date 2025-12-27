# 🎨 Theme Configuration

This project uses **React Native Paper** with a single custom theme configuration.

## 📁 Files

- `theme.ts` - Single theme definition
- `index.ts` - Theme exports

## 🎯 Usage

### Using Theme in Components

```typescript
import { useTheme } from 'react-native-paper'

function MyComponent() {
  const theme = useTheme()
  
  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.onPrimary }}>Themed Text</Text>
    </View>
  )
}
```

## 🎨 Customizing Theme

Edit `theme.ts` to customize colors:

```typescript
export const appTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#your-color',
    secondary: '#your-color',
    // ... other colors
  },
}
```

## 📚 Resources

- [React Native Paper Theming](https://callstack.github.io/react-native-paper/theming.html)
- [Material Design 3 Colors](https://m3.material.io/styles/color/the-color-system/tokens)
