// In App.js in a new project

import * as React from 'react';
import Accueil from '../page/accueil';
import Home from "../page/home";
import { Button, View, Text } from 'react-native';
import Identification from '../page/identification';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AccueilScreen =({ navigation}) => {
  return (
   
    <Accueil navigation={navigation}/>
  );
}


const HomeScreen = ({route, navigation}) => {
  return (
    <Home navigation = {navigation, route}/>
  )
}



const Stack = createStackNavigator();

class Navigation extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      connected: false,
      profil: {}
    }
  }
  sayConnected(profil)
  {
    this.setState({connected: true, utilisateur: profil});
  }
  authentification()
  {
    if (!this.state.connected){return(
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={AccueilScreen} options={{title : "" , headerShown:false}} />
          
        <Stack.Screen name="identification"  options={{title: 'Identification',headerStyle: { backgroundColor: 'rgb(200,0,0)'},headerTintColor: '#fff' }}>
        {props => <Identification {...props} sayConnected = {(profil)=> this.sayConnected(profil)} />}
        </Stack.Screen>
      </Stack.Navigator>
    )}else
    {
      return null;
    }
  }
  homePage()
  {
    if (this.state.connected)
    {return (
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name = "Home" component = {HomeScreen} 
        initialParams = {{user : this.state.utilisateur}}/>
      </Stack.Navigator>
    )}
  }

  render()
  {
  return (
    <NavigationContainer>  
      {this.authentification()}
      {this.homePage()}
    </NavigationContainer>
  );}
}

export default Navigation;
