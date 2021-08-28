import React from 'react';
import Navigation from './components/Navigation/Navigation';
import * as Notifications from "expo-notifications";

// Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Appel de la vu Navigation
class Apps extends React.Component {
  render() {
    return (
      <Navigation/>
    )
  }
}
export default Apps ;