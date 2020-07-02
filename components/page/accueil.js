
import React from 'react';
import { StyleSheet, Text, Image, View,Dimensions, ScrollView, Platform } from 'react-native';
import {Icon, Tooltip} from "react-native-elements";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default class Accueil extends React.Component 
{
  
  _showNavBar()
  {
    return(
      <View style = {styles.navbar}>
        <Icon name ="home" size={30} color = "white" />
        <Icon name ="search1" type="antdesign" size={30} color = "white"/>
        <Icon name="feather" type = "feather" size={30} color = "white"/>
        <Icon name = "person" type="ionicons" size={30} color = "white"/>
      </View>
    )
  }
  _showHeader()
  {
    return(
      <View style = {styles.header}>
        <Icon name = "menu" type = "ionicons" iconStyle={{alignSelf:"flex-start"}}
        color = "white" size = {30}/>
      </View>
      )
  }
  _renderContent()
  {
    return(
    <ScrollView style = {styles.content}>
      <Image source = {require("./ressources/logo.png")} style = {styles.logo}/>
      
    <Tooltip popover={<Image source = {require("./ressources/VFeu.jpg")} style = {{height:30, width: 30}}/>} backgroundColor = "black">
      <Text style= {{fontSize: 30, fontWeight: "bold"}}>
        Bievenue à Wi-Bash, l'association d'informatique de l'Université des Antilles.
        {"\n"}
      </Text>
     </Tooltip>
      <Text style = {{fontSize: 18, fontFamily: Platform.OS=="android"?"monospace":null}}>
        Venez découvrir une équipe motivée de jeunes étudiants passionnés, venus de tous
        horizons. Découvrez nos projets et nos compétences...
      </Text>
    </ScrollView>)
  }
  //Le render est le plus concis possible. Donc on sépare les différents components en fonctions
  // séparées pour plus de souplesse
  render()
  {
    return(
      <View style= {styles.container}>
        {this._showHeader()}
        {this._renderContent()}
        {this._showNavBar()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30
    
  },
  header:
  {
    height: windowHeight/12,
    backgroundColor: "black",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 3,
    paddingLeft: 10
  },
  content:
  {
  paddingTop: 25,
  paddingHorizontal: 20,
  marginBottom: 10,
  flexDirection: "column",
  
  
  },
  navbar:
  {
    height: windowHeight/12,
    backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    
  },
  logo:
  {
    height: 100,
    alignSelf: "center"
    
  }
  
});
