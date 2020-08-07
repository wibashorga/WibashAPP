// In App.js in a new project

import * as React from 'react';
import Accueil from '../page/accueil';
import Home from "../page/home";
import Identification from '../page/identification';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
var utilisateur;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AccueilScreen =({ navigation}) => {
  return (   
    <Accueil navigation={navigation}/>
  );
}

let HomeScreen = ({navigation}) =>
  {
    return(
      <Home navigation = {navigation} user = {utilisateur}/>
    )
  }





class Navigation extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      connected: false
    }
  }
  sayConnected(profil)
  {
    utilisateur = profil;
    this.setState({connected: true});
    
  }
  
  authentification()
  {
    if (!this.state.connected)
    {
      return(
      <Stack.Navigator initialRouteName="Accueil">
        
        <Stack.Screen name="Accueil" component={AccueilScreen} options={{title : "" , headerShown:false}} />
        <Stack.Screen name="identification"  options={{title: 'Identification',headerStyle: { backgroundColor: 'rgb(200,0,0)'},headerTintColor: '#fff' }}>
        {props => <Identification {...props} sayConnected = {(profil)=> this.sayConnected(profil)} />}
        </Stack.Screen>

      </Stack.Navigator>
    )}
    else
    {
      return null;
    }
  }
  homePage()
  {
    if (this.state.connected)
    {return (
      
      <Tab.Navigator initialRouteName = "Home" 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconType;

          if (route.name === 'Home') 
          {
            iconName = 'home';
            iconType = 'Entypo'
          }
          return <Icon name={iconName} size={size} type = {iconType } />;
        },})}>


        <Tab.Screen name = "Home" component = {HomeScreen} />
      
      </Tab.Navigator>
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
