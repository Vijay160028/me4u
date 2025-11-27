# Onboarding Screen Setup

## Image Assets

Add the following image files to `src/assets/images/`:

1. `cloud-left.png` - Left cloud illustration
2. `cloud-right.png` - Right cloud illustration  
3. `airplane.png` - Airplane illustration
4. `city-skyline.png` - City skyline silhouette
5. `person-luggage.png` - Person with suitcase
6. `taxi.png` - Yellow taxi cab
7. `path-location.png` - Dotted path with location pin

## Native Module Setup

### For iOS (CocoaPods)

If you're running the app on iOS, you need to install CocoaPods dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

The `react-native-linear-gradient` library should be auto-linked, but running `pod install` ensures everything is properly linked.

### For Android

Android should work automatically with autolinking. Just rebuild your app:

```bash
npm run android
```

## Running the App

1. Start Metro bundler:
   ```bash
   npm start
   ```

2. Run on your preferred platform:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## Notes

- The screen uses `react-native-linear-gradient` for the button gradient
- If images are missing, the app will show an error - make sure all images are added
- The gradient button will fallback to a solid color if the native module isn't linked

