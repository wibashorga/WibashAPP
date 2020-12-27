import React from 'react';
import { StyleSheet, Keyboard, Alert, Text, View, ImageBackground, TouchableOpacity, Dimensions,TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const background = "./ressources/fond.png";
const logo = "./ressources/logo.png";
const token = "PPlaFk63u4E6";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class CreerCompte extends React.Component 
{
    constructor(props)
    {
      super(props)
      this.id = null;
      this.pass = null;
      this.pseudo = null;
      this.confirmPass = null;
      this.mail = null;
      this.nom = null;
      this.prenom = null;

      this.textinput1 = null;
      this.textinput2 = null;
      this.state = {
        profil: {},
        wrongID : false,
        wrongPass: false
          }
  }
    checkFields()
    {
        
      if (!this.pass || !this.id || !this.pseudo || !this.confirmPass || !this.nom || !this.prenom) 
      {
        Alert.alert("Erreur", "Veuillez remplir les champs obligatoires", [{text:"OK", onPress:()=>{}}]);

        return false;
      }
        if (this.pass !== this.confirmPass) {
          this.setState({wrongPass: true});
          Alert.alert("Erreur", "L'application n'a pas pu confirmer le mot de passe", [
            {
              text: "OK",
            onPress: ()=>{}
            }
          ])
          return false;
        }
        let majuscules = /[A-Z]/;
        let minuscules = /[a-z]/;
        let nombres = /[0-9]/;
        let sqlInject = /["'#]/
        if (!majuscules.test(this.pass) || !minuscules.test(this.pass) || !nombres.test(this.pass))
        {
          Alert.alert("Erreur", "Votre mot de passe doit contenir des minuscules, des majuscules et des nombres", [
            {
              text : "OK",
              onPress: ()=> {}
            }])
            this.setState({wrongPass: true});
            return false;
          
        }
        for (let champ of [this.id,this.pass, this.pseudo, this.coonfirmPass, this.nom, this.prenom, this.mail]) 
        {if (sqlInject.test(champ)) 
        { 
          Alert.alert("Erreur", "Votre mot de passe doit contenir des minuscules, des majuscules et des nombres", [
          {
            text : "OK",
            onPress: ()=> {}
          }])
          this.setState({wrongPass: true});
          return false;
        }

      }
 
        if (this.mail && this.mail.indexOf("@")===-1 && 
        !(this.mail.endsWith(".com") || this.mail.endsWith(".fr") || this.mail.endsWith(".org"))) 
        { 
          this.setState({wrongMail: true});
          return false;
        }
        this.setState({wrongID: false, wrongPass: false, wrongMail: false});
        return true;

    }
    async _createAccount()
    {
      
        let data = new FormData();
        data.append("identifiant", this.id);
        data.append("pass", this.pass);
        data.append("token", token);
        data.append("pseudo", this.pseudo);
        data.append("nom", this.nom);
        data.append("prenom", this.prenom);
        data.append("mail", this.mail);
        fetch('http://www.wi-bash.fr/application/Create/CreaCompte.php', {
        method: 'POST',
        headers: {
            Accept: 'multipart/form-data',
            'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse) => reponse.text()).then((code) => {
            
        if (code)
          {
            if (code.indexOf("Success")!==-1)
            {
              let profil = {
                identifiant: this.id,
                niveau: 3,
                nom: this.nom,
                prenom: this.prenom,
                pseudo: this.pseudo,
                mail: this.mail,
                story: "",
                phrase: null
              }
              this.props.sayConnected(profil)
            }if (code.indexOf("INTERNAL_SERVER_ERROR")!==-1)
            {
              Alert.alert("Oups !", "Une erreur interne est survenue", [{text:"Fermer", onPress:()=>{}}])
            }
            if (code.indexOf("ERR_ID_ALREADY_EXISTS")!==-1)
            {
              Alert.alert("Aïe !", "L'identifiant que vous avez envoyé existe déjà", [{text:"Fermer", onPress:()=>{}}]);

            }
            
          }
        }).catch((error) => {console.log(error); this.setState({wrongConnexion: true})});
   
   Keyboard.dismiss();
  }
    
     
    
 render()
  {
    return(
      <ImageBackground source = {require(background)} style = {styles.container}>

      <ScrollView>
       
       <TextInput placeholder = "Identifiant*" style = {styles.textinput} 
       onChangeText = {(text)=>{this.id = text}} autoCapitalize = "none"
       maxLength = {100}
       style = {{...styles.textinput, borderWidth: 1, borderColor: this.state.wrongID?"orange":"white"}}/>

        <TextInput placeholder = "Pseudo*" style = {styles.textinput} 
       onChangeText = {(text)=>{this.pseudo = text}} autoCapitalize = "none"
       maxLength = {100}
       style = {{...styles.textinput, borderWidth: 1, borderColor: this.state.wrongID?"orange":"white"}}/>

        <TextInput placeholder = "Mot de passe*" style = {styles.textinput} 
       onChangeText = {(text)=>{this.pass = text}} autoCapitalize = "none"
       secureTextEntry = {true} maxLength = {50}
       style = {{...styles.textinput, borderWidth: 2, borderColor: this.state.wrongPass?"orange":"white"}}/>


       <TextInput placeholder = "Confirmer le mot de passe*" style = {styles.textinput}
       onChangeText = {(text)=>{this.confirmPass = text}} autoCapitalize = "none" 
       secureTextEntry = {true}/> 

        <TextInput placeholder = "Nom*" style = {styles.textinput} 
       onChangeText = {(text)=>{this.nom = text}} autoCapitalize = "none"
       />
        <TextInput placeholder = "Prenom*" style = {styles.textinput} 
       onChangeText = {(text)=>{this.prenom = text}} autoCapitalize = "none"
       />
       <TextInput placeholder = "Mail (facultatif)" style = {styles.textinput} 
       onChangeText = {(text)=>{this.mail = text}} autoCapitalize = "none"
       />

       <TouchableOpacity onPress = {() => {
         if (this.checkFields())
         {
           this._createAccount();
         }
       }} style = {{...styles.bouton, backgroundColor: "white"}}
          activeOpacity = {0.75}>
            <Text style= {{...styles.text, color:"red"}}>
              M'inscrire
            </Text>
        </TouchableOpacity>


          <View>
          

           </View>
           </ScrollView>
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
    paddingBottom: 20,
    height: windowHeight/1.03,
    backgroundColor: "rgb(234,30, 30)"

  },
  textinput:
  {
    marginBottom: 25,
    marginLeft:20,
    paddingVertical: -1, 
    backgroundColor:'white',
    borderRadius:20,
    width: windowWidth/1.2,
    height: windowHeight/17,
    padding:10,
    
    shadowColor: "#000",
    shadowOffset: {
	  width: 1,
	  height: 5},
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  
    elevation: 10
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
