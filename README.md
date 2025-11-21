# Notes App - React Native Mobile

A feature-rich mobile notes application built with React Native and Expo, featuring user authentication, note management with images, search, and sorting capabilities.

app link: https://drive.google.com/file/d/19hfa65jhs1y605AkF-kOuye7EsD4AjXu/view?usp=sharing

## 📱 Features

- *User Authentication*: Secure signup and login system
- *Note Management*: Create, edit, and delete notes
- *Image Support*: Add images from gallery or camera
- *Search*: Search notes by title or content
- *Sort Options*: Sort by newest, oldest, or alphabetically (A-Z, Z-A)
- *Offline Storage*: All data stored locally using AsyncStorage
- *Beautiful UI*: Modern, colorful design with smooth animations

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- *Node.js* (v16 or higher) - [Download here](https://nodejs.org/)
- *npm* or *yarn* package manager
- *Expo CLI* (optional but recommended)

For mobile testing:
- *Android*: Android Studio with Android SDK, or physical Android device with Expo Go app
- *iOS*: Xcode (macOS only), or physical iOS device with Expo Go app

### Installation Steps

1. *Navigate to the mobile directory:*
   bash
   cd mobile
   

2. *Install dependencies:*
   bash
   npm install
   
   or
   bash
   yarn install
   

3. *Start the development server:*
   bash
   npm start
   
   or
   bash
   npx expo start
   

### Running the App

After starting the development server, you have several options:

#### Option 1: Physical Device (Easiest)
1. Install *Expo Go* app from:
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
   - [Apple App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS)
2. Scan the QR code displayed in your terminal with:
   - *Android*: Expo Go app
   - *iOS*: Camera app (opens Expo Go automatically)

#### Option 2: Android Emulator
bash
npm run android

Requirements:
- Android Studio installed
- Android SDK configured
- Virtual device created in AVD Manager

#### Option 3: iOS Simulator (macOS only)
bash
npm run ios

Requirements:
- Xcode installed
- iOS Simulator configured

#### Option 4: Web Browser (Limited functionality)
bash
npm run web

Note: Camera/gallery features won't work in web mode

## 📚 Libraries Used

### Core Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | Core React library |
| react-native | 0.74.5 | React Native framework |
| expo | ~51.0.28 | Expo development platform |
| typescript | ^5.1.3 | Type safety and better DX |

### Navigation

| Library | Purpose |
|---------|---------|
| @react-navigation/native | Navigation framework |
| @react-navigation/native-stack | Stack navigation |
| react-native-screens | Native screen optimization |
| react-native-safe-area-context | Safe area handling |

### Storage & Media

| Library | Purpose |
|---------|---------|
| @react-native-async-storage/async-storage | Local data persistence |
| expo-image-picker | Camera and gallery access |
| expo-status-bar | Status bar styling |

### Development

| Library | Purpose |
|---------|---------|
| @babel/core | JavaScript compiler |
| @types/react | TypeScript types for React |
| @types/react-native | TypeScript types for React Native |

## 📁 Project Structure


mobile/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx      # Login UI with animations
│   │   │   └── SignupScreen.tsx     # Signup UI with validation
│   │   └── Notes/
│   │       ├── NotesListScreen.tsx  # Notes list with search/sort
│   │       ├── NoteEditor.tsx       # Note creation/editing
│   │       └── NoteCard.tsx         # Individual note card component
│   ├── context/
│   │   └── AuthContext.tsx          # Authentication state management
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── utils/
│   │   └── storage.ts               # AsyncStorage wrapper functions
│   └── App.tsx                      # Main app component with navigation
├── app.json                         # Expo configuration
├── babel.config.js                  # Babel configuration
├── metro.config.js                  # Metro bundler configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file


## 🎨 Key Features Explained

### Authentication System
- User credentials stored securely in AsyncStorage
- Password validation (minimum 4 characters)
- Username uniqueness check
- Persistent login sessions

### Note Management
- Create notes with title, body, and optional image
- Edit existing notes
- Delete notes with confirmation dialog
- Auto-save on navigation back

### Image Handling
- Choose from photo gallery
- Take photo with camera
- Image preview in notes
- Images stored as base64 URIs

### Search & Sort
- Real-time search across title and body
- Sort by: Newest First, Oldest First, Title (A-Z), Title (Z-A)
- Search results update instantly

### UI/UX Features
- Smooth animations (scale, fade, spring)
- Color-coded note cards
- Touch feedback on all interactive elements
- Empty states with helpful messages
- Responsive layouts

## ⚠ Known Issues & Limitations

### Current Limitations

1. *Web Mode Compatibility*
   - Camera/gallery features don't work in web browser
   - Uses window.confirm() instead of native Alert dialogs
   - Some animations may not be as smooth

2. *Image Storage*
   - Images stored as base64 in AsyncStorage
   - Large images may impact performance
   - No image compression implemented
   - Storage limit depends on device

3. *Data Persistence*
   - All data stored locally (no cloud sync)
   - Data lost if app is uninstalled
   - No backup/restore functionality

4. *Authentication*
   - Basic authentication (no encryption)
   - Passwords stored in plain text
   - No password recovery mechanism
   - No email verification

### Performance Considerations

- Large number of notes (100+) may cause lag in list view
- Multiple high-resolution images may slow down the app
- Search performance degrades with many notes

## 🔧 Troubleshooting

### Common Issues

*Issue: "Metro bundler not starting"*
bash
# Clear cache and restart
npx expo start -c


*Issue: "Module not found" errors*
bash
# Reinstall dependencies
rm -rf node_modules
npm install


*Issue: "Android SDK not found"*
- Install Android Studio
- Set ANDROID_HOME environment variable
- Add platform-tools to PATH

*Issue: "Images not loading"*
- Check camera/gallery permissions in app settings
- Ensure Expo Image Picker is properly installed

*Issue: "App crashes on startup"*
- Clear AsyncStorage data
- Reinstall the app
- Check console for error messages

## 🚀 Building for Production

### Android APK
bash
# Build APK
eas build --platform android --profile preview

# Or using Expo classic build
expo build:android


### iOS IPA
bash
# Build IPA (requires Apple Developer account)
eas build --platform ios --profile preview

# Or using Expo classic build
expo build:ios


## 📝 Development Scripts

bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run in web browser
npm run web

# Type checking
npx tsc --noEmit

# Clear cache
npx expo start -c


## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer Notes

### Future Enhancements

*High Priority:*
- Implement Supabase for cloud sync
- Add note encryption
- Implement image compression
- Add biometric authentication

*Medium Priority:*
- Rich text editor
- Note categories/tags
- Dark mode
- Export functionality

*Low Priority:*
- Note sharing
- Collaborative editing
- Voice notes
- Reminders/notifications

### Code Quality

- TypeScript for type safety
- Component-based architecture
- Separation of concerns (UI, logic, storage)
- Reusable utility functions
- Consistent styling patterns

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section above

---


*Built with ❤ using React Native and Expo*
