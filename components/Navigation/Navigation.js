// In App.js in a new project

import * as React from 'react';
import Accueil from '../page/accueil';
import Home from "../page/home";
import Reglage from "../page/Reglage";
import Profil from "../page/Profil";
import Projet from "../page/Projet";
import {Text, View, Modal, StyleSheet, FlatList, SafeAreaView, ScrollView,Button} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Evenement from "../page/Evenement"
import Important from "../page/Important"
import CreerCompte from "../page/compte";
import Identification from '../page/identification';
import NewProject from '../page/CreerProjet.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
var utilisateur, projets;
function HomiScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Stack = createStackNavigator(), ProjectStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
 //Screens d'authentification
const AccueilScreen =({ navigation}) => {
  return (   
    <Accueil navigation={navigation}/>
  );
}
 

//Screens du corps de l'appli
const HomeScreen = ({navigation,route}) => {
    return(
      <Home navigation = {navigation} user = {utilisateur}/>
    )
  }


  const EvenementScreen = ({navigation}) => {
    return(
      <Evenement navigation = {navigation} user = {utilisateur}/>
    )
  }

  const ProjetScreen = ({navigation,route}) => {
    return(
      <Projet navigation = {navigation} user = {utilisateur} projets = {projets}/>
    )
  }

  const CreerProjetScreen = ({navigation, route})=>{
    return(
      <NewProject navigation = {navigation} user = {utilisateur} projets = {projets}/>
    )
  }

  const ProjetStackScreen = ({navigation}) => {
    return(
      <Stack.Navigator initialRouteName = {"projets"}>
        <Stack.Screen 
        name="projets" component={ProjetScreen} options={{title : "" , headerShown:false}} />
        <Stack.Screen 
        name="new" component={CreerProjetScreen} options={{title : "Nouveau Projet"}} />
        
      </Stack.Navigator>
      
    )
  }

  

  const ImportantScreen = ({navigation,route}) => {
    return(
      <Important navigation = {navigation} user = {utilisateur}/>
    )
  }

  // screen du menu hamburgeur
  const ReglageScreen = ({navigation,route}) => {
    return(
      <Reglage navigation = {navigation} user = {utilisateur}/>
    )
  }

  const ProfilScreen = ({navigation,route}) => {
    return(
      <Profil navigation = {navigation} user = {utilisateur}/>
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
 setUser(profil){utilisateur=profil}
 setProjects(p){projets = p}
 addProject(p){projets.push(p)}
 removeProject(p){projets = projets.replace(p, undefined)}
  
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
        <Stack.Screen name = "CreerCompte"  options={{title: 'Nouveau compte',headerStyle: { backgroundColor: 'rgb(200,0,0)'},headerTintColor: '#fff' }}>
        {props => <CreerCompte {...props} sayConnected = {(profil)=> this.sayConnected(profil)} />}
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
          if (route.name === "Evenement")
          {
            iconName = "flag";
            iconType = "AntDesign";
          }
          if (route.name === "Projet")
          {
            iconName = "news";
            
          }
          return <Icon name={iconName} size={size} type = {iconType } />;
        },})}>


        <Tab.Screen name = "Home" component = {HomeScreen} />
        <Tab.Screen name = "Evenement" component = {EvenementScreen} />
        <Tab.Screen name = "Projet" component = {ProjetStackScreen} />
        <Tab.Screen name = "Important" component = {ImportantScreen} />
      
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
///{this.authentification()}
//{this.homePage()} integrer  avec drawer menu
// integrer les page Regage et profil
export default Navigation;
