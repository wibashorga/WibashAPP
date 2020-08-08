import React from 'react';
import { StyleSheet, Image, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
const background = "./ressources/fond.png";
const logo = "./ressources/logo.png";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Accueil extends React.Component 
{
  render()
  {
    return(
      <ImageBackground source = {require(background)} style = {styles.container}>
        
        <View style = {styles.upperView}>
        <Image source = {require(logo)} style = {styles.logo}/>
        </View>

        <View style = {styles.bottomView}>
          <TouchableOpacity onPress = {()=> {this.props.navigation.navigate("identification")}} style = {{...styles.bouton, backgroundColor: "white"}}
          activeOpacity = {0.75}>
            <Text style= {{...styles.text, color:"red"}}>
              Se connecter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("CreerCompte")}} 
          style = {{...styles.bouton, backgroundColor: "rgb(240, 40, 40)"}}
          activeOpacity = {0.75}>
            <Text style = {{...styles.text, color:"white"}}>
              S'inscrire
            </Text>
          </TouchableOpacity>

          <Text onPress = {()=>{}} style = {{alignSelf:"center", color: "rgb(150,150,150)"}}>Mot de passe oublié ?</Text>
        </View>
      </ImageBackground>
      
    );
  }
 
}

const styles = StyleSheet.create({
  container:
  {
    flex:1,
    flexDirection: "column",
    justifyContent: 'center',
    alignContent: "center",
    paddingTop:20,
    
  },
  upperView:
  {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    opacity: 1
  },
  logo:
  {
    alignSelf:"center",
	    marginTop: 50,
    backfaceVisibility:"visible",
    flex:1,
    width: windowWidth/1.2,
	    height: windowHeight/2,
    opacity:1
  },
  bottomView:
  {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center"
  },
  bouton:
  {
    marginBottom: 20,
    borderRadius: 25,
    justifyContent: "center",
    width: windowWidth/1.6,
    alignSelf: "center",
    height: windowHeight/13,
    shadowColor: "#000",
shadowOffset: {
	width: 1,
	height: 5},
  shadowOpacity: 0.55,
  shadowRadius: 3.84,
  
  elevation: 10
  },
  text:
  {
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center"
  }

});
