### Components

1. **View** — container for other components; like HTML's `<div>`. For layout and styling.

2. **Text** — display text. Supports text styles like font-size, color, alignment.

3. **Image** — display images. Supports local, network, and static image assets.

   ```js
   <Image source={require('./img/check.png')} />
   ```

   With `require`, iPhone 7 uses `check@2x.png`, while iPhone 7 Plus or Nexus 5 uses `check@3x.png`.

   `uri`: can make a request or apply caching; `uri` supports HTTP and base64.

4. **TextInput** — create a text input that lets users type.

5. **Button** — create a clickable button.

6. **ScrollView** — scrollable view for content larger than the screen.

7. **FlatList** — scrolling list for large datasets; performs better than ScrollView.

   > Items can be added/removed. Unlike `ScrollView`, `FlatList` doesn't render everything immediately — it prioritizes visible items.
   >
   > Two required props: `data` (the data source) and `renderItem` (parse data items and return a formatted component).
   >
   > **Tip**: for variable heights, use `getItemLayout` for optional optimization.

8. **SectionList** — like FlatList, but for grouped data.

9. **Modal** — modal dialog over other views.

10. **Switch** — on/off toggle.

11. **StatusBar** — control the status bar style (color, opacity, etc.).

12. **ActivityIndicator** — loading spinner, typically used during data loading.

13. **TouchableHighlight** — touchable view with highlight visual feedback.

14. **TouchableOpacity** — like TouchableHighlight, but changes opacity.

15. **TouchableWithoutFeedback** — touchable view without visual feedback.

16. **ListView** — list view, but replaced by FlatList/SectionList.

17. **ActivityIndicator** — loading spinner during data loading.

18. **SafeAreaView** — ensures content stays within safe areas, avoiding notches and rounded corners.

19. **DrawerLayoutAndroid** — slide-out menu, Android only.

20. **TabView** — tabbed view.

21. **Picker** — picker for selecting from a predefined list.

22. **ProgressViewIOS** — progress bar, iOS only.

23. **SegmentedControlIOS** — segmented control, iOS only.

24. **WebView** — embed web content.

### Events

- `onPress` — fired on touch release.
- `onLongPress` — fired after a long press.
- `onPressIn` / `onPressOut` — start/end of touch.
- `onChangeText` — text input value change.
- `onSubmitEditing` — submission of text input value.
- `onScroll` — scroll view scrolling.
- `onLayout` — component layout change.
- `onValueChange` — Slider value change.

### React Native performance optimization

1. **Avoid unnecessary renders**:
   - Use `React.memo` or `shouldComponentUpdate` to prevent unnecessary re-renders.
   - Use `PureComponent` or `React.memo` for shallow comparison.
2. **Optimize list rendering**:
   - Use `FlatList` or `SectionList` instead of `ScrollView` for long lists — they only render visible items.
   - Provide unique `key`s for list items.
3. **Reduce image sizes**:
   - Use `Image`'s `resizeMode` to control scaling.
     - `resizeMode` values:
       1. **contain** (default): preserve aspect ratio while scaling to fit container, leaving whitespace.
       2. **cover**: preserve aspect ratio while scaling to fully cover container.
       3. **stretch**: stretch to fill, ignoring aspect ratio.
       4. **repeat**: tile to fill.
       5. **center**: keep original size, centered in container.
   - Use `Image.prefetch` to preload images and reduce first-render load time.
4. **Use native modules** — implement in native code (Java/Kotlin for Android, Swift/Objective-C for iOS), then call from JS via the bridge.
5. **Avoid complex style calculations**:
   - Use `StyleSheet.create` to define styles — reduces style calculation overhead.
   - `const styles = StyleSheet.create({})` `<Text style={styles[this.state.backgroundColor]}>`

### HermesInternal

Check whether Hermes is in use:

```js
const isHermes = () => !!global.HermesInternal;
```



### Animation

For fine-grained interactive control, use the [`Animated`](https://www.reactnative.cn/docs/animations#animated-api) API. For global layout animations, use [`LayoutAnimation`](https://www.reactnative.cn/docs/animations#layoutanimation-api).

Combine multiple animations with `parallel`, `sequence`, `stagger`, `delay`.

### Platform module

In JS, `Platform.OS` returns `'ios'` on iOS and `'android'` on Android.

In CSS:

```js
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
    }),
  },
});
```

### pushy

Hot updates.

### Styles

camelCase naming; prefer `StyleSheet.create` centrally — `{styles.name}`, [arrays], `{{inline props}}`

**Flex direction**

- `column` (**default**): align children top to bottom. With wrap enabled, the next row starts to the right of the first item at the top.
- `row`: align children left to right. With wrap enabled, the next row starts below the first item on the left.
- `column-reverse`: align children bottom to top. With wrap enabled, the next row starts to the right of the first item at the bottom.
- `row-reverse`: align children right to left. With wrap enabled, the next row starts below the first item on the right.

```react
<PreviewLayout
      label="direction"
      selectedValue={direction}
  // ltr: text/children left-to-right; rtl: text/children right-to-left
      values={["ltr", "rtl"]}
      setSelectedValue={setDirection}>
  </PreviewLayout>
```

`alignSelf` (same options as `alignItems`) overrides the alignment on a single child.



### How to make React Native interact with native code

1. Native UI components

   ```js
   // iOS: create native UI in Objective-C
   // Android: create native UI in Java
   import { requireNativeComponent } from 'react-native';
   const MyNativeView = requireNativeComponent('MyNativeView');
   ```

2. Native modules

   ```js
   // iOS: native module in Objective-C
   // Android: native module in Java

   import { NativeModules } from 'react-native';

   const { MyNativeModule } = NativeModules;

   MyNativeModule.sayHello('World', (response) => {
     console.log(response);
   });
   ```

3. Native events — native code sending events to JS

   ```js
   // iOS: event emitter in Objective-C
   // Android: event emitter in Java
   import { NativeEventEmitter, NativeModules } from 'react-native';

   const { MyNativeModule } = NativeModules;
   const eventEmitter = new NativeEventEmitter(MyNativeModule);

   const subscription = eventEmitter.addListener('MyEventName', (event) => {
     console.log(event);
   });

   // Remember to remove the listener on unmount
   return () => {
     subscription.remove();
   };
   ```



### How to use the camera

- `react-native-camera` library (with Android dependencies)
- For iOS, link native modules: `cd ios && pod install`
- `<RNCamera>`

### React element tree

A tree of React elements — plain JS objects describing what to render. Types: React composite component instances and React host component instances.

### React shadow tree

Created by the Fabric renderer; composed of shadow nodes. A shadow node is an object representing a mounted React host component along with its props and layout info.

### Yoga tree

Used to calculate layout info for the React shadow tree. Each shadow tree node typically has a Yoga node — React Native uses Yoga for layout.

### Fabric

Implemented in C++; uses JSI for communication between Fabric's C++ core and React. Fabric uses an async render model — enables React Concurrent interruptible rendering.

### Java Native Interface (JNI)

API for writing native methods in Java; bridges Fabric's C++ core and Android.

### Render pipeline

- Render: React creates the [React Element Tree](https://www.reactnative.cn/architecture/glossary#react-element-tree-and-react-element). In C++, it creates the [React Shadow Tree](https://www.reactnative.cn/architecture/glossary#react-shadow-tree-and-react-shadow-node).
- Commit: once the shadow tree is built, the renderer triggers a commit, promoting the new shadow tree to "the next tree to mount". Includes layout calculation.
- Mount: once layout is computed, the shadow tree is converted into a [Host View Tree](https://www.reactnative.cn/architecture/glossary#host-view-tree-and-host-view).

### Cross-platform implementation

In the previous-generation React Native renderer, the React shadow tree, layout logic, and view flattening were implemented separately per platform.



Using C++ as the core rendering system has key benefits — reduces development and maintenance cost. Each shadow node uses less memory in C++ than in Kotlin or Swift.



On Android, the renderer still has JNI overhead in two cases:

- Complex views (Text, TextInput) still use JNI to pass props.
- During mount, JNI is still used to dispatch changes.



Exploring `ByteBuffer` serialization as a new mechanism to replace `ReadableMap` to reduce JNI overhead. Goal: 35–50% reduction in JNI overhead.

### View flattening

An optimization that avoids deep nesting in layout.

### WebView↔RN communication

Via `WebView`'s `injectJavaScript` method and `onMessage` event.

`window.ReactNativeWebView.postMessage();`

```jsx
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

const App = () => {
  const webViewRef = useRef(null);

  const sendMessageToWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        // Your JS code
        window.ReactNativeWebView.postMessage('Hello from React Native!');
      `);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://example.com' }}
        onMessage={(event) => {
    				console.log('Received message from WebView:', event.nativeEvent.data);
  			}}
      />
      <Button title="Send Message to WebView" onPress={sendMessageToWebView} />
    </View>
  );
};

// In your webpage
window.addEventListener('message', function(event) {
  // Verify message source
  if (event.origin === 'your-app-scheme://your-app-domain') {
    // Send message to React Native
    window.ReactNativeWebView.postMessage('Hello from WebView!');
  }
});
```

### Render flow

1. User triggers an interaction; the React component's `render` is called; a new virtual DOM tree is produced.

2. Diff algorithm compares old and new virtual DOM trees to find what needs to update.

3. The bridge maps virtual DOM to native components.

4. Updates the native view tree based on the mapping result.

5. Layout calculation determines each view's position and size.

6. Views render to screen.

### React Native threads and their relationships

**Main thread (UI thread)**:

- Renders UI and handles user input.
- Executes JS code — events, state updates, component rendering.
- Talks to native modules.

**JavaScript thread (a.k.a. JS thread or main thread)**:

- Often the same as the main thread; sometimes a separate thread.
- Executes JS code — business logic, state, rendering.
- Communicates with the main thread via the Bridge.

**Native thread**:

- Executes native code — native modules, UI rendering, networking.
- Communicates with the main thread via the Bridge.

Blocking relationships

- **JS blocks main**: long JS tasks block the main thread, delaying UI updates — JS and main are serial.
- **Main blocks JS**: heavy native operations (complex UI rendering, network) block JS, delaying JS execution.



To reduce this blocking, React Native employs:

- **Async execution**: heavy native operations are async to avoid blocking the main thread.
- **Batching**: JS code that must run on the main thread is batched.
- **Fabric architecture**: introduced in 0.61 to reduce main-thread blocking by using a new renderer with native view components.

### Purpose of AppRegistry

`AppRegistry` is the React Native app's registry — it lets developers define an app's entry component and launch the root component.

`AppRegistry`'s main purposes:

1. **Register the app**: use `AppRegistry.registerComponent` to register the root component. Args: app name (string) and root component (React component).

2. **Start the app**: use `AppRegistry.runApplication` to launch. Args: app name and a config object with initial state, etc.

3. **Handle lifecycle**: `AppRegistry` handles app lifecycle events (mount, unmount) — you can listen and react.

4. **Hot reloading support**: during dev, `AppRegistry` supports Hot Reloading — reload changed parts without restarting the whole app.

5. **Multiple apps**: `AppRegistry` supports registering and running multiple apps in one app — useful for multi-page apps or running multiple independent components.

Simple example:

```javascript
import React from 'react';
import { AppRegistry, Text } from 'react-native';

class MyApplication extends React.Component {
  render() {
    return <Text>Hello, world!</Text>;
  }
}

// Register the app
AppRegistry.registerComponent('MyApplication', () => MyApplication);

// Start the app
AppRegistry.runApplication('MyApplication', {
  initialProps: {}, // optional initial props
  rootTag: document.getElementById('react-root'), // optional root tag
});
```



### How the Bridge works

**JS to native**:

- When JS needs a native operation, it sends a message via the Bridge to the native side and queues it.
- The native thread periodically checks the queue and executes operations.
- After execution, the native side returns results via the Bridge.

**Native to JS**:

- When native needs to notify JS, it sends event info via the Bridge.
- Event info is converted to a format JS understands.
- JS handles events and updates UI as needed.

### How the Bridge handles memory leaks

1. JS garbage collection manages JS memory.
2. In native code, reference counting tracks object lifetimes. iOS uses Objective-C reference counting; when ref count drops to 0, objects are released.
3. **Lifecycle management**
4. **Leak detection tools**: React Native Debugger, Chrome DevTools.
5. Avoid cycles in data passed across the Bridge.
6. **Use immutable data structures**.
7. **Avoid globals**: globals aren't GC'd unless explicitly set to `null`.
8. Hooks.

### How to package React Native apps

`Android`

1. **Ensure dependencies are installed**:

- Install JDK
- Install Android Studio
- Set the `ANDROID_HOME` env var
- Install Android SDK and create at least one AVD

2. **In the project root, run**:

```shell
npx react-native run-android
```
3. **Package an APK**:

- Generate a bundle file with JS code and assets in `android/app/src/main/assets/`:
  ```sh
  npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
  ```
- Then open the project in Android Studio: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`.

`iOS`

1. **Ensure dependencies are installed**:

- Install Xcode
- Install CocoaPods (if used)

2. **In the project root, run**:

```sh
npx react-native run-ios
```

3. **Package an IPA**:

- Generate a bundle file with JS and assets in `ios/`:
  ```sh
  npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios
  ```

  - `--platform android` — set platform.
  - `--dev false` — production mode (smaller bundle, better perf).
  - `--entry-file index.js` — entry file.
  - `--bundle-output android/app/src/main/assets/index.android.bundle` — bundle output path.
  - `--assets-dest android/app/src/main/res/` — assets output path.
- Then open the project in Xcode: `Product` → `Archive`, then choose `Distribute App` to export the IPA.

Notes

- Before packaging, ensure tests pass and all deps are correctly installed.
- For production, set `--dev false` to ensure production mode.
- If you use third-party libraries, ensure they support your target platform.



### What if RN bundling errors?

1. Read the error message — it usually points to the issue (code, config, or deps).
2. Check dependencies — ensure they're installed with compatible versions. `npm install`
3. Clear caches: `yarn cache clean`
4. Clean the project:

```bash
rm -rf node_modules
rm yarn.lock
yarn install
```

5. Check platform-specific configs

Ensure `android` and `ios` folder configs are correct — e.g. permissions in `AndroidManifest.xml` and `Info.plist`.

6. Update Xcode and Android Studio — IDE updates sometimes resolve issues.

7. Docs and community — check official docs or community forums (Stack Overflow, GitHub Issues).

9. Step debugging

If the error points to a specific line, try debugging step by step or commenting it out.

10. Recreate the project — if all else fails, create a fresh project and migrate code/config.

### dotenv-cli

Lets you manage env vars with `.env` files.

`npm install dotenv-cli --save-dev`

```js
"scripts": {
  "start": "dotenv -e .env.development react-native start",
  "android": "dotenv -e .env.development react-native run-android",
  "ios": "dotenv -e .env.development react-native run-ios"
}
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
```



### How to use React Native Config

Lets you define different env vars per build config.

```bash
yarn add react-native-config
```

**Create env files**

In project root, create `.env`:

```js
// .env
API_URL=https://api.example.com
// .env.development
API_URL=https://api.example.com/dev
// .env.production
API_URL=https://api.example.com/prod
```



**iOS**

1. Open the Xcode project.
2. Select your project target.
3. Go to "Build Settings".
4. Search "Preprocessor Macros".
5. Add a new entry: key `CUSTOM_ENV`, value `$(CUSTOM_ENV)`.

**Android**

For Android, add env vars in `android/app/build.gradle`:

```gradle
android {
    // ...
    defaultConfig {
        // ...
        buildConfigField "String", "CUSTOM_ENV", "\"defaultValue\""
    }
}
```

**Usage**

In your React Native code, import `react-native-config` and use `Config`:

```javascript
import Config from 'react-native-config';

console.log(Config.CUSTOM_ENV); // print the env var value
```

**iOS**

For iOS, add env vars when running `react-native run-ios`:

```bash
CUSTOM_ENV=production react-native run-ios
```

**Android**

For Android, add env vars when running `react-native run-android`:

```bash
CUSTOM_ENV=production react-native run-android
```

### Interacting with Xcode / Android Studio from React Native

**React Native CLI**:

- **iOS**: in the project root, run `npx react-native run-ios` — launches Xcode with your project. Debug and build in Xcode.
- **Android**: in the project root, run `npx react-native run-android` — launches Android Studio with your project. Debug and build there.



**Hot Reloading and live updates**:

- During dev, RN provides Hot Reloading — update JS code without recompiling the app. Run `npx react-native start` to start the dev server and enable Hot Reloading in-app.

### Development debugging flow

1. Use `react-native init` to create a new RN project.
2. **Project structure**: RN projects include an `ios` folder with the Xcode project file (`.xcodeproj` or `.xcworkspace`) — the basis of the Xcode project.
3. `npx react-native start` to start the dev server.
4. With the server running, open the Xcode project (`.xcodeproj` or `.xcworkspace`) and run the app. Xcode connects to the dev server, fetches JS, and runs the app on simulator or device.
5. **Hot Reloading and Hot Updates**: Hot Reloading updates JS without restarting; Hot Updates update JS without recompiling.
6. **Debugging**: in Xcode, use its debug tools — set breakpoints, view console, inspect variables.
7. **Build and release**: when ready, use Xcode's build and release flow to produce `.ipa` and submit to the App Store.

### `.xcodeproj` vs `.xcworkspace`

**`.xcodeproj`**:

- Contains all project config — source files, assets, build settings, targets.
- For projects with a single Xcode project, use `.xcodeproj` to open and manage your project.

**`.xcworkspace`**:

- Xcode workspace file for managing multiple Xcode projects or project files (`.xcodeproj`).
- Useful when your project depends on others — these dependencies are added to a `.xcworkspace` so you can manage everything in one place.
- In RN projects, if you use CocoaPods or other dep managers, libraries are added to a `.xcworkspace`. Open it to manage the main project and all deps together.



To open a `.xcworkspace`:

1. Open Xcode.
2. `File` → `Open...`.
3. Select the `.xcworkspace` file and click `Open`.

For simple projects without complex deps, `.xcodeproj` is enough. For projects with deps, use `.xcworkspace`.

### Platform-specific config files

Android

- `android/app/build.gradle` — Android app build config (version, deps, etc.).
- `android/gradle.properties` — global Gradle config (proxy, cache paths, etc.).

iOS

- `ios/your-app-name.xcodeproj` — Xcode project file for managing iOS app build and config.
- `ios/your-app-name/Info.plist` — app config (name, version, permissions).

### How React Native works

1. **JS-to-native bridge**: RN uses a "Bridge" to connect JS and native.

2. **Native component mapping**: RN maps to native components on iOS and Android.

3. **Virtual DOM**: manage UI state via virtual DOM.

4. **Hot Reloading**: live code updates during dev — boosts productivity.

### ReactiveCocoa cold/hot signals

ReactiveCocoa is a reactive programming framework for Objective-C and Swift.

ReactiveCocoa uses Signals and Behaviors to represent and process async event streams.

Signals can be cold or hot:

1. **Cold signals**: re-execute their internal block for each subscription.
2. **Hot signals**: execute upon creation, shared across subscribers.

Signals can be converted to Behaviors — a special signal that always holds the latest value and is accessible to subscribers. Behaviors represent state — e.g. UI control state.
