/**
 * @format
 */
import 'react-native-gesture-handler';

import App from './App';
import {name as appName} from './app.json';

import {LogBox, AppRegistry} from 'react-native';
LogBox.ignoreLogs(['[react-native-gesture-handler]', ['Warning: ...']]);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
