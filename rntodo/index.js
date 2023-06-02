/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
    console.log('Notification background handler', type, 'details', detail);
  }
  // await notifee.cancelNotification(notification.id);
  console.log('Notification background handler', type, 'details', detail);
});

notifee.registerForegroundService(async notification => {
  console.log('service: ', notification);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 10000);
  });
});

AppRegistry.registerComponent(appName, () => App);
