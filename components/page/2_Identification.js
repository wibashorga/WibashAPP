import React from 'react';
import { StyleSheet, Keyboard, Text, View, ImageBackground, TouchableOpacity, Dimensions,TextInput } from 'react-native';

const background = "./ressources/fond.png";
const logo = "./ressources/logo.png";
const token = "PPlaFk63u4E6";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Identification extends React.Component 
{
    constructor(props)
    {
      super(props)
      this.id = null;
      this.pass = null;
      this.textinput1 = React.createRef();
      this.textinput2 = React.createRef();
      this.state = {
        profil: {},
        wrongConnexion: false, network: true}
    }
    async _connect()
    {
      
        let data = new FormData();
  data.append("identifiant", this.id);
  data.append("pass", this.pass);
  data.append("token", token);
  fetch('http://www.wi-bash.fr/application/login.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
  }).then((reponse) => reponse.json()).then((membre) => {
    membre.pass = this.pass;
  this.props.sayConnected(membre);
   }).catch((error) => {console.log(error); this.setState({wrongConnexion: true})});
        Keyboard.dismiss();
  }
    
    
    
 render()
  {
    return(
      <ImageBackground source = {require(background)} style = {styles.container}>

      {(this.state.wrongConnexion)?this.textinput1.clear():null}
      {(this.state.wrongConnexion)?this.textinput2.clear():null}
       
       <TextInput placeholder = "Identifiant" style = {styles.textinput} 
       onChangeText = {(text)=>{this.id = text}} autoCapitalize = "none"
       ref = {(input)=>{this.textinput1 = input}}/>


       <TextInput placeholder = "Mot de passe" style = {styles.textinput}
       onChangeText = {(text)=>{this.pass = text}} autoCapitalize = "none" 
       secureTextEntry = {true} ref = {(input)=>{this.textinput2 = input}}/> 


       <TouchableOpacity onPress = {this._connect.bind(this)} style = {{...styles.bouton, backgroundColor: "white"}}
          activeOpacity = {0.75}>
            <Text style= {{...styles.text, color:"red"}}>
              Se connecter
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
    height: windowHeight/1.03,
    backgroundColor: "rgb(234,30, 30)"
    

  },
  textinput:
  {
    marginBottom: 90,
    marginLeft:20,
    paddingVertical: -1, 
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
