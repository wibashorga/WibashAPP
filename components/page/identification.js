import React from 'react';
import { StyleSheet, Button, Text, View, ImageBackground, TouchableOpacity, Dimensions,TextInput } from 'react-native';
const background = "./ressources/fond.png";
const logo = "./ressources/logo.png";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Identification extends React.Component 
{
    constructor(props)
    {
      super(props)
      this.id = null;
      this.pass = null;
      this.state = {
        profil: {},
        connected: false,
        wrongConnexion: false, network: true}
    }
    async _connect()
    {
      try{
        let reponse = await fetch("http://wi-bash.fr/login.php?Nom="+this.id+"&Password="+this.pass);
        let membre = await reponse.json();
        this.setState({profil: membre[0], connected: true})
        }catch(error)
        {
          this.setState({wrongConnexion: true, connected: false});
        }
    }
    
    _showWrongID()
    {
      if (this.state.wrongConnexion)
      {
        return <Text style = {{color:"red", fontSize:25, fontWeight: "bold"}}>Une erreur de connexion est survenue</Text> 
      }else return null;
    }
    //Les messages ci-dessous sont à fin de debug et peuvent être supprimés
    _showNetworkFail()
    {
      if (!this.state.network)
      {
        return <Text style = {{color:"red", fontSize:25, fontWeight: "bold"}}>Votre appareil n'est pas connecté à internet</Text> 
      }else return null;
    }
    _showConnected()
    {
      if (this.state.connected)
      {
        return <Text style = {{color:"green", fontSize:25, fontWeight: "bold"}}>Connecté !!</Text> 
      }else return null;
    }
    
 render()
  {
    return(
      <ImageBackground source = {require(background)} style = {styles.container}>



       <TextInput placeholder = "Identifiant" style = {styles.textinput} onChangeText = {(text)=>{this.id = text}}/>


       <TextInput placeholder = "Mot de passe" style = {styles.textinput} onChangeText = {(text)=>{this.pass = text}} /> 


       <TouchableOpacity onPress = {()=> {}} style = {{...styles.bouton, backgroundColor: "white"}}
          activeOpacity = {0.75}>
            <Text style= {{...styles.text, color:"red"}}>
              S'identifier
            </Text>
          </TouchableOpacity>


          <View>
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
    backgroundColor:'red'

  },
  textinput:
  {
    marginBottom: 90,
    marginLeft:20,
    height: 10, 
    backgroundColor:'white',
    borderRadius:20,
    width: windowWidth/1.2,
    height: windowHeight/19,
    padding:10
  },
  bottomView:
  {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",

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