import React from 'react';
import Navigation from './components/Navigation/Navigation';
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

class Apps extends React.Component {
  render() {
    return (
      <Navigation/>
    )
  }
}
export default Apps ;
//barach master