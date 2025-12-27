# SV Car Mobile

A React Native mobile application built with Expo and TypeScript.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo CLI (installed globally or via npx)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on a specific platform:
```bash
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

## 📁 Project Structure

```
sv-car-mobile/
├── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # Screen components
│   ├── navigation/    # Navigation configuration
│   ├── services/      # API services and business logic
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── constants/     # App constants
│   ├── hooks/         # Custom React hooks
│   └── store/         # State management (Redux/Zustand/etc.)
├── assets/            # Images, fonts, and other static assets
├── App.tsx            # Main app component
└── app.json           # Expo configuration
```

## 🛠️ Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator/device
- `npm run ios` - Start on iOS simulator/device
- `npm run web` - Start in web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 📝 Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Make sure to run `npm run lint:fix` and `npm run format` before committing code.

## 🧪 Testing

Add your testing setup here (Jest, React Native Testing Library, etc.)

## 📱 Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and formatting
4. Submit a pull request

## 📄 License

Add your license information here

