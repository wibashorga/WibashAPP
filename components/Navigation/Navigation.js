// In App.js in a new project

import * as React from 'react';
import Accueil from '../page/1_Accueil';
import Home from "../page/3a_Home";
import Menu from "../page/Menu.js";
import Reglage from "../page/3ab_Reglage";
import Profil from "../page/3ac_Profil";
import Projet from "../page/3c_Projet";
import {Text, View, Modal, StyleSheet, TouchableOpacity,Button} from 'react-native';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import Evenement from "../page/3b_Evenement"
import Important from "../page/Important"
import CreerCompte from "../page/1b_CreerCompte";
import Identification from '../page/2_Identification';
import EditProject from "../page/3cb_EditProject.js";
import NewProject from '../page/3ca_CreerProjet.js';
import NewEvent from '../page/3ba_CreerEvent.js';
import ModifyEvent from "../page/3bb_ModifyEvent.js";
import ModifyTask from "../page/3cba_ModifyTask.js";
import ModifyProject from "../page/ModifyProject"; 
import Loading from "./loading.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"

import {Icon} from 'react-native-elements';
var utilisateur={}, projets=[], events=[], membres=[];

const token = "PPlaFk63u4E6";

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Stack = createStackNavigator(), StackLoading = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
 //Screens d'authentification
const AccueilScreen =({ navigation}) => {
  return (   
    <Accueil navigation={navigation}/>
  );
}
 

// Screen du profil
const ProfilScreen = ({navigation}) => {
  return(
    <Profil navigation = {navigation} user = {utilisateur}/>
  )
}

/*
// Stack des profils
function CustomDrawerContent(props) {
  return(
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  )
}

function MyDrawer() {
  if (this.state.loading && !this.state.connected)
  {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{title : "" , headerShown:false, 
          headerRight:()=>(<TouchableOpacity onPress={()=>{this.setState({loading:false, connected:false})}}>
          <Icon name="power" type="ionicon" color="white" iconStyle={{marginRight:10}}/>
          </TouchableOpacity>)}} />
        <Drawer.Screen name="MyProfil" component={MyProfilScreen} />
      </Drawer.Navigator>
    );
  }
  else {
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} initialRouteName='Home'/>}>
      <Drawer.Screen name="Profils" component={ProfilsScreen} />
    </Drawer.Navigator>
  }
}
*/

// Screen du menu
const MenuScreen = ({navigation}) => {
  return(
    <Menu navigation = {navigation} user = {utilisateur}/>
  )
}

//Screens du corps de l'appli
const HomeScreen = ({navigation,route}) => {
    return(
      <Home navigation = {navigation} user = {utilisateur} setProjects = {(p)=>{projets=p}}
      setMembers = {(m)=>{membres=m}} setEvents = {(e)=>{events =e}}/>
    )
  }

//------------------------------------------------------
//
  const EvenementScreen = ({navigation, route}) => {
    return(
      <Evenement navigation = {navigation} user = {utilisateur}
      route={route} events={events}/>
    )
  }
  const CreerEventScreen = ({navigation, route})=>{
    return(
      <NewEvent navigation = {navigation} user = {utilisateur} projets = {projets}
      route={route}/*setNew = {(p)=>{projets.push(p)}}*//>
    )
  }

const ModifyEventScreen = ({navigation, route})=>{
  return(
    <ModifyEvent navigation = {navigation} route = {route}
    user = {utilisateur} />
  )
}


  //Stack des événements
  //Liste des Event (events)
  // Créer un event (new_event)
  //Modifier un event (ùodify_event)
  const EventStackScreen = ({navigation})=>{
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
  //-------------------------------
  //
  //-----------------------

  const ProjetScreen = ({navigation,route}) => {
    return(
      <Projet navigation = {navigation} user = {utilisateur} projets = {projets}
      route={route} setProjects = {(p)=>{projets=p}} membres = {membres}/>
    )
  }

  const CreerProjetScreen = ({navigation, route})=>{
    return(
      <NewProject navigation = {navigation} user = {utilisateur} projets = {projets}
      /*setNew = {(p)=>{projets.push(p)}}*//>
    )
  }
  const EditProjectScreen = ({navigation, route}) =>{
    return(
      <EditProject navigation = {navigation} route = {route} membres = {membres}
      projets = {projets} user={utilisateur}/>
    )
  }
  const ModifyProjectScreen = ({navigation, route})=>{
    return(
      <ModifyProject user = {utilisateur} navigation = {navigation}
      route = {route}/>
    )
  }
const ModifyTaskScreen = ({navigation, route}) =>{
  return(
    <ModifyTask user = {utilisateur} route = {route} navigation = {navigation}
    />
  )
}

  //-----------------------------
  
//cette vue va dans le 
  
/**Stack des projets
ProjetScreen correspond à la page "liste des projets"
CreerProjetScreen correspond à la page de création de projet. on y arrive grâce
au bouton Edit New Project 
* */
  const ProjetStackScreen = ({navigation}) => {
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

  const ImportantScreen = ({navigation,route}) => {
    return(
      <Important navigation = {navigation} user = {utilisateur}/>
    )
  }

  // screen du menu hamburgeur ethan lie la vue profil au bar du header stp
  const ReglageScreen = ({navigation,route}) => {
    return(
      <Reglage navigation = {navigation} user = {utilisateur}/>
    )
  }

const LoadingScreen = ({navigation, route}) =>{
  return(
    <Loading navigation = {navigation} route = {route}/>
  )
}

  

class Navigation extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      connected: false,
      loading:true
    }
    this.id = "";
    this.pass = "";
    this.readLoginInfo()
    this.HomeStackScreen = this.HomeStackScreen.bind(this)

  }

  MenuStackScreen() {
    return(
      <Stack.Navigator initialRouteName={"MenuScreen"} >
        <Stack.Screen name="MenuScreen" component={MenuScreen}/>
        <Stack.Screen name={"Profil"} component={ProfilScreen}/>
      </Stack.Navigator>
    )
  }

  
  HomeStackScreen({navigation}) {
      return(
        <Stack.Navigator initialRouteName = {"Home"}>
          <Stack.Screen 
          name="Home" component={HomeScreen} 
          options={{title : "WI-BASH" , 
            headerRight:()=>(
              <TouchableOpacity onPress={()=>{this.setState({loading:false, connected:false})}}>
                <Icon name="power" type="ionicon" color="white" iconStyle={{marginRight:10}}/>
              </TouchableOpacity>)}}/>
          <Stack.Screen name="Menu" component={this.MenuStackScreen} screenOptions={{headerShown:false}}/>
        </Stack.Navigator>
      )
  }

  
  /*
  HomeDrawerScreen() {
    if (this.state.connected)
    {
      return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeScreen} options={{title : "" , headerShown:false, 
            headerRight:()=>(<TouchableOpacity onPress={()=>{this.setState({loading:false, connected:false})}}>
            <Icon name="power" type="ionicon" color="white" iconStyle={{marginRight:10}}/>
            </TouchableOpacity>)}} />
          <Drawer.Screen name="MyProfil" component={MyProfilScreen} />
        </Drawer.Navigator>
      );
    }
    else {
      return(
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} initialRouteName='Home'/>}>
          <Drawer.Screen name="Home" component={HomeScreen} options={{title : "" , headerShown:false, 
            headerRight:()=>(<TouchableOpacity onPress={()=>{this.setState({loading:false, connected:false})}}>
            <Icon name="power" type="ionicon" color="white" iconStyle={{marginRight:10}}/>
            </TouchableOpacity>)}} />
        </Drawer.Navigator>
      );
    }
  }
  */

  async readLoginInfo()
  {
    try{
    this.id = await AsyncStorage.getItem("identifiant")
    this.pass = await AsyncStorage.getItem("pass")
    if (this.id && this.pass)
      {
        this._connect()
      }
      else{
        this.setState({loading:false})
      }
    }catch(e)
    {
      this.setState({loading:false})
    }
  }
  async _connect()
    {
      
  let data = new FormData();
  data.append("identifiant", this.id);
  data.append("pass", this.pass);
  data.append("token", token);
  fetch('http://www.wi-bash.fr/application/Read/login.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
  }).then((reponse) => reponse.text()).then((membre) => {
  
    membre = JSON.parse(membre);
    membre.pass = this.pass;
    utilisateur = membre;
  this.setState({connected:true});
   }).catch((error) => {  
        this.setState({loading:false})
  })
}
  sayConnected(profil)
  {
    utilisateur = profil;
    this.setState({connected: true});
    
  }
 setUser(profil){utilisateur=profil}

 setEvents(e){events=e};
 setProjects(p){projets = p}
 addProject(p){projets.push(p)}
 removeProject(p){projets = projets.replace(p, undefined)}
  
  authentification()
  {
    if (!this.state.connected && !this.state.loading)
    {
      return(
      <Stack.Navigator initialRouteName="Accueil">
        
        <Stack.Screen name="Accueil" component={AccueilScreen} options={{title : "" , headerShown:false}} />
        <Stack.Screen name="identification"  options={{title: 'Identification',headerStyle: { backgroundColor: 'rgb(200,0,0)'},headerTintColor: '#fff' }}>
        {props => <Identification {...props} sayConnected = {(profil)=> this.sayConnected(profil)} />}
        </Stack.Screen>
        <Stack.Screen name = "CreerCompte"  options={{title: 'Nouveau compte',headerStyle: { backgroundColor: 'rgb(200,0,0)'},headerTintColor: '#fff' }}>
        {props => <CreerCompte {...props} 
        sayConnected = {(profil)=> this.sayConnected(profil)} 
        setProjects = {(p)=>{this.setProjects(p)}}/>}
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
      
      <Tab.Navigator tabBarPosition="bottom" initialRouteName = {'Home'} lazy
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconType;

          if (route.name === 'Home') 
          {
            iconName = 'home';
            iconType = 'Entypo'
          }
          if (route.name === "Agenda")
          {
            iconName = "flag";
            iconType = "AntDesign";
          }
          if (route.name === "Projet")
          {
            iconName = "data-usage";
            iconType = "ionicons";
          }
          if (route.name === "Important")
          {
            iconName = "warning";
            iconType = "AntDesign";
          }
          
          return <Icon name={iconName} size={size} type = {iconType } />;
        },})}>


        <Tab.Screen name = "Home" component = {this.HomeStackScreen}/>
        <Tab.Screen name = "Agenda" component = {EventStackScreen} />
        <Tab.Screen name = "Projet" component = {ProjetStackScreen} />
        <Tab.Screen name = "Important" component = {ImportantScreen} />
      
      </Tab.Navigator>
    )}
  }
  
  loadingStack()
  {
    if (this.state.loading && !this.state.connected)
    {
    return(
      <StackLoading.Navigator>
        <StackLoading.Screen name = "loading" component = {LoadingScreen} options={{headerShown:false}}/>
      </StackLoading.Navigator>
    )}
    else{
      return null
    }
  }

  menuStack() {
    if (this.state.connected) {
      return(
        <Stack.Navigator initialRouteName={"Menu"}>
          {<Stack.Screen name="Menu" component={MenuScreen}/>}
          <Stack.Screen name={"Profil"} component={ProfilScreen}/>
        </Stack.Navigator>
      )
    }
    else {
      <Stack.Navigator initialRouteName={"Menu"}>
          {<Stack.Screen name="Menu" component={MenuScreen}/>}
      </Stack.Navigator>
    }
  }
  render()
  {
  return (
    <NavigationContainer>  
    {this.authentification()}
    {this.loadingStack()}
    {this.homePage()}
    </NavigationContainer>
  );}
}

export default Navigation;
