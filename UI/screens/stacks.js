import * as React from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity,Button} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Dimensions} from "react-native";
import * as api from "../API/api_request"
import {Icon} from 'react-native-elements';

// Vues JS perso
import Loading from "../components/Navigation/loading.js";

import Accueil from './screens/AuthStack/1_Accueil';
import Home from "./screens/HomeStack/Home";
import DetailsMembre from "./screens/HomeStack/DetailsMembre";
import Menu from "../components/page/Menu.js";
import Reglage from "./screens/HomeStack/3ab_Reglage";
import Profil from "./screens/HomeStack/3ac_Profil";
import Projet from "./screens/ProjectStack/3c_Projet";
import Evenement from "./screens/EventStack/3b_Evenement"
import Important from "../components/page/Important"
import CreerCompte from "./screens/AuthStack/1b_CreerCompte";
import Identification from './screens/AuthStack/2_Identification';
import EditProject from "./screens/ProjectStack/3cb_EditProject.js";
import NewProject from './screens/ProjectStack/3ca_CreerProjet.js';
import NewEvent from './screens/EventStack/3ba_CreerEvent.js';
import ModifyEvent from "./screens/EventStack/3bb_ModifyEvent.js";
import ModifyTask from "../components/page/3cba_ModifyTask.js";
import ModifyProject from "../components/page/ModifyProject"; 
import { getNotificationToken } from '../components/page/Notifications';

const Stack = createStackNavigator()

export const HomeStack = ({navigation, route}) => {
    return(
      <Stack.Navigator initialRouteName = {"Home"}>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle : "WI-BASH" , 
          headerRight:()=>(
            <TouchableOpacity onPress={()=>{this.setState({loading:false, connected:false})}}>
              <Icon name="power" type="ionicon" color="white" iconStyle={{marginRight:10}}/>
            </TouchableOpacity>)}}/>

              <Stack.Screen name="Profil" component={ProfilScreen}/>
              <Stack.Screen name="ProfilMembre" component={ProfilMembreScreen} />
      </Stack.Navigator>
    )
}

export const EventStack = ({navigation})=>{
    return(
      <Stack.Navigator initialRouteName = {"events"}>
        <Stack.Screen 
        name="events" component={EvenementScreen} options={{title : "Agenda", headerTitleStyle:{alignSelf:"center"}, 
       headerRight:([0,1].includes(utilisateur.niveau))?()=>(<TouchableOpacity style={{marginRight:12}}
          onPress={()=>navigation.navigate("new_event")}>
              <Icon name="plus" type="evilicon" size={35}></Icon>
          </TouchableOpacity>):null}} />
        <Stack.Screen 
        name="new_event" component={CreerEventScreen} options={{title : "Nouvel évènement"}} />
  
        <Stack.Screen name = "modify_event" 
        component={ModifyEventScreen}/>
  
      </Stack.Navigator>
        
    )
}

export const ProjetStack = ({navigation}) => {
    return(
      <Stack.Navigator initialRouteName = {"projets"}>
        <Stack.Screen 
        name="projets" component={ProjetScreen}  options={{title:"PROJETS", headerStyle:{
          backgroundColor:"red"
        }, headerTitleStyle:{alignSelf:"center", color:"white", fontSize:23},
      }}/>
        <Stack.Screen 
        name="new" component={CreerProjetScreen} options={{title : "Nouveau projet"}} />
        <Stack.Screen component = {EditProjectScreen} name="Edit" options={{title:""}}/>
        <Stack.Screen component = {ModifyTaskScreen} name="ModifyTask" options={{title:""}}/>
        <Stack.Screen component = {ModifyProjectScreen} name="ModifyProject" options={{title:"Paramètres"}}/>
        
      </Stack.Navigator>
      
    )
}

export const MenuStackScreen = ()=> {
    return(
      <Stack.Navigator initialRouteName={"MenuScreen"} >
        <Stack.Screen name="MenuScreen" component={MenuScreen}/>
        <Stack.Screen name={"Profil"} component={ProfilScreen}/>
      </Stack.Navigator>
    )
  }