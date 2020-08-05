// In App.js in a new project

import * as React from 'react';
import Accueil from '../page/accueil';
import { Button, View, Text } from 'react-native';
import Connexion from '../page/connexion';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen =({ navigation}) => {
  return (
   
    <Accueil navigation={navigation}/>
  );
}

const DetailsScreen = ({ route,navigation}) => {
  return (
    <Connexion navigation={navigation, route}/>
  );
}




const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
        
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{title : "" , headerShown:false}} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
