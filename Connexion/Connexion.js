import React from 'react';
import { StyleSheet, Text, Image, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default class ConnexionView extends React.Component {
  render()
  {
    return (
    
    <View style={styles.container} behavior = {Platform.OS == "ios"? "height" : "height"}>
      <View style={{flex:1, paddingTop:20}}>
      <Text style = {{textAlign:"center"}}>Bienvenue sur l'application Wi-Bash</Text>
        <Image source = {require("./logo.png")} style = {{}}/>
      </View>
      <View style = {{flex : 2, justifyContent: "center"}}>
        <Text style= {{textAlign:"center"}}>Identification : {"\n"}</Text>

        <Text style = {{alignSelf:"flex-start"}}>Nom de compte {"\n"}</Text>
        <TextInput onEndEditing={()=>{}} style = {styles.inputs}/>

        <Text>Mot de passe {"\n"}</Text>
        <TextInput secureTextEntry={true} style = {styles.inputs}/>

      </View>
      <TouchableOpacity onPress = {()=>{}} style = {styles.connectButton}>
        <Text style = {{color:"white", textAlign: "center", paddingTop:10}}> Connexion</Text> 
        </TouchableOpacity>
    </View>
    
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 40
  },
  inputs:
  {
    borderWidth: 1,
    width: 200
  },
  connectButton:
  {
    
    backgroundColor: "red",
    borderRadius : 20,
    width: 180,
    height: 50,
    marginBottom: 50,
    
  }
});
