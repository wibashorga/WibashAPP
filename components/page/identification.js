import React from 'react';
import { StyleSheet, Image, Text, View, ImageBackground, TouchableOpacity, Dimensions,TextInput } from 'react-native';
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
       <TextInput placeholder = "Identifiant" onChangeText = {(text)=>{this.id = text}}/>
       <TextInput placeholder = "Mot de passe" onChangeText = {(text)=>{this.pass = text}} /> 
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

});