# Third Segment App

Mobile app codebase of Third Segmentation

| **Android**                                                                                                                                      | **IOS**                                                                                                                                      | **Convention**                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Android Build status](https://build.appcenter.ms/v0.1/apps/30cfdf6e-cbf9-4454-85d2-9e769667cbac/branches/master/badge)](https://appcenter.ms) | [![IOS Build status](https://build.appcenter.ms/v0.1/apps/26dea7bf-2c2d-4f9e-9766-212b196c42fb/branches/master/badge)](https://appcenter.ms) | [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) |

## Development Environment Setup

1.  Make sure you have `nvm`, node `v8 and up` installed
2.  Install `yarn` - `npm install -g yarn`.
3.  Install [react-native](https://facebook.github.io/react-native/) and [ignite-cli](https://github.com/infinitered/ignite) globally.

```bash
yarn global add react-native-cli ignite-cli
```

4.  Use a smart `.npmrc`. By default, `npm` doesn’t save installed dependencies to package.json (and you should always track your dependencies!).

```bash
$ npm config set save=true
$ npm config set save-exact=true
$ cat ~/.npmrc
```

When adding new packages, always use `yarn add --exact <package>`. To add a package as a devDependency, use `yarn add --exact -D <package>`. This will ensure the package is always added to the `yarn.lock` file.

## Quick start

Make sure you have `nvm`, node `v8 and up`, and `yarn` installed before proceeding with the following steps. Also, ensure :

1.  Clone repo - `git@github.com:Coapperative/three-app.git`
2.  Create `.env` using `.env-sample` as template.
3.  Run `yarn` to install dependencies and clean the git repo.
4.  Link React-Native Dependencies `react-native link`.

### Running on Simulator

More info you can check the react-native [docs](https://facebook.github.io/react-native/docs/running-on-simulator-ios#specifying-a-device)

#### IOS

```sh
$ react-native run-ios --simulator="iPhone 7 Plus"
```

> Default simulator is `iPhone X`. List of possible [simulators](https://dev-yakuza.github.io/en/react-native/ios-change-simulator/)

> If you got any issues running the simulator through command line. I suggest you open the project(`/ios/*.xcodeproj` ) using xcode. Then run the simulator by pressing the play button.

#### Android

[Here](https://medium.com/@deepak.gulati/running-react-native-app-on-the-android-emulator-11bf309443eb) or [this](https://medium.freecodecamp.org/what-you-need-to-know-to-start-building-mobile-apps-in-react-native-dded951277b7#b49d) even the react-native getting started [guide](https://facebook.github.io/react-native/docs/getting-started) are awesome docs on how you can configure your computer for android development. **You should follow this steps before proceeding.**

1. We need to have a simulator to run our android application. We will be using here is [genymotion](https://www.genymotion.com/). Choose the option with VirtualBox (if you don’t have VirtualBox already installed on your Windows PC).
2. Adding a New Virtual Device in Genymotion. Ensure to have correct `API` number as you installed your android SDK.
3. Once done you’ll see your devices listed under Virtual devices.
4. Once you run the device on genymotion, You can verify through your cli using `adb devices`
5. Finally you can do `react-native run-android`

## Boilerplate walkthrough

Your `App` folder is where most of the goodies are found in an Ignite Next app. Let's walk through them in more detail. Start with `Containers/App.js` (described below) and work your way down the walkthrough in order.

### Containers

Containers are (mostly) full screens, although they can be sections of screens or application containers.

- `App.js` - your main application. We create a Redux store and configure it here
- `RootContainer.js` - main view of your application. Contains your status bar and navigation component
- `LaunchScreen.js` - this is the first screen shown in your application. It's loaded into the Navigation component
- `Styles` - styling for each of the above containers and screens

To generate a new Container or Screen you can use the following generator commands:

- `ignite g container New` - Will create a `New.js` and also a `Styles/NewStyle.js`.
- `ignite g list New` - The same as the `container` command, but it will give you a walkthrough to generate a ListView screen. Allowing you to even pick `FlatList` or not, grid, and some other options.
- `ignite g screen New` - Will create a `NewScreen.js` and also a `Styles/NewScreenStyle.js`. Important to mention that the `screen` generator will add the `Screen` on the file/class name to make easier to identify.

Those commands will also add the new container to the navigations file.

### Navigation

Your primary and other navigation components reside here.

- `AppNavigation.js` - loads in your initial screen and creates your menu(s) in a StackNavigation
- `Styles` - styling for the navigation
- `ReduxNavigation.js` - This file contains the core navigation of your application. If you ever change your launch screen, make sure to change it also at `if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {`, otherwise you may encounter navigation problems with the Android back button!

### Components

React components go here...pretty self-explanatory. We won't go through each in detail -- open each file to read the comments and view the code.

To generate a new Component you can use the following generator commands:

- `ignite g component New` - Will create a `New.js` and also a `Styles/NewStyle.js`.
- `ignite g component path/New` - The same as above, but will use a relative path
- `ignite g component --folder path` - An alternative to `ignite g component path/index`
- `ignite g component --folder path new` - An alternative to `ignite g component relativePath/New`

### Storybook

[Storybook](https://storybook.js.org/) has been setup to show off components in the different states. Storybook is a great way to develop and test components outside of use in your app. Simply run `npm run storybook` to get started. All stores are contained in the `*.story.js` files along side the components.

### Themes

Styling themes used throughout your app styles.

- `ApplicationStyles.js` - app-wide styles
- `Colors.js` - defined colors for your app
- `Fonts.js` - defined fonts for your app
- `Images.js` - loads and caches images used in your app
- `Metrics.js` - useful measurements of things like navBarHeight

### Config

Initialize and configure things here.

- `AppConfig.js` - simple React Native configuration here
- `DebugConfig.js` - define how you want your debug environment to act
- `ReactotronConfig.js` - configures [Reactotron](https://github.com/infinitered/reactotron) in your project (Note: this [will be extracted](https://github.com/infinitered/ignite/issues/779) into a plugin in the future)
- `ReduxPersist.js` - configures Redux Persist (Note: this [will be extracted](https://github.com/infinitered/ignite/issues/780) into a plugin in the future)

### Fixtures

Contains json files that mimic API responses for quicker development. These are used by the `Services/FixtureApi.js` object to mock API responses.

### Redux, Sagas

Contains a preconfigured Redux and Redux-Sagas setup. Review each file carefully to see how Redux interacts with your application.

Here again we have generators to help you out. You just have to use one of the following:

- `ignite g redux Amazing` - Will generate and link the redux for `Amazing`.
- `ignite g saga Amazing` - The same as above, but for the Sagas

You can read more about Redux and Redux Sagas in these blog posts:

- [Using redux-saga To Simplify Your Growing React Native Codebase](https://shift.infinite.red/using-redux-saga-to-simplify-your-growing-react-native-codebase-2b8036f650de)
- [A Tour of React Native — Part 2: Redux & Friends](https://shift.infinite.red/a-tour-of-react-native-part-2-redux-friends-4fed022aaa1e)

### Services

Contains your API service and other important utilities for your application.

- `Api.js` - main API service, giving you an interface to communicate with your back end
- `ExamplesRegistry.js` - lets you view component and Ignite plugin examples in your app
- `FixtureApi.js` - mocks your API service, making it faster to develop early on in your app
- `ImmutablePersistenceTransform.js` - part of the redux-persist implementation (will be removed)
- `RehydrationServices.js` - part of the redux-persist implementation (will be removed)

### Lib

We recommend using this folder for modules that can be extracted into their own NPM packages at some point.

### Images

Contains actual images (usually png) used in your application.

### Transforms

Helpers for transforming data between API and your application and vice versa. An example is provided that you can look at to see how it works.

### Tests

This folder (located as a sibling to `App`) contains sample Jest snapshot and unit tests for your application.
