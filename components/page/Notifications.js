import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function sendNotification(notification, users)
{
    for (let user of users)
    {
        if (user.token)
        {
        const data = new FormData()
        data.append("to", user.token)
        data.append("title", notification.title)
        data.append("body", notification.body)

        
        fetch("https://exp.host/--/api/v2/push/send",{ method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': "application/json",
        'Cache-Control': 'reload, no-store, no-cache',
            'Pragma': 'no-cache',
            'Expires': 0
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        })
    }
    }
}



export async function getNotificationToken() {
  let token;
  
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      try {
        return AsyncStorage.getItem("notif_token");
      }catch(e) {}
      return;
      
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  AsyncStorage.setItem("notif_token", token);
  console.log(token)
  return token;
}