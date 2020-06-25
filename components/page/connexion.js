import React from 'react';
import { StyleSheet, Text,Image, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default class Connexion extends React.Component {
  
  render()
  {
    return (
    
    <View style={styles.container}>
      
        <View style = {styles.contente1}>
          <View style ={{flex:1}}>
          <Image source = {require('./ressources/logo.png')} style={{marginTop:20 }}/>
          </View>
          

        </View>





      <View style = {styles.contente2}>
        <View style = {styles.contente3}>
          
          <Text style={{textAlign:"center",fontSize:25}}> Identifiant :</Text>
          
          <TextInput onEndEditing={()=>{}} style = {styles.inputs}/>

          <Text style={{textAlign:"center",fontSize:25}}> Mots de passe</Text>
 
          <TextInput onEndEditing={()=>{}} style = {styles.inputs}/>
            
        </View>





       <View style = {styles.contente4}>
            <View style = {styles.contente5}>
              <TouchableOpacity onPress = {()=>{}} style = {styles.connectButton}>
                <Text style = {{color:"white", textAlign: "center", fontSize:37}}> Connexion</Text> 
                </TouchableOpacity>
            </View>

          <View style = {styles.contente6}>
            <Text style={{textAlign:"center"}}>Mopts de passe oublier</Text>

           </View>

       </View>

      </View>

    </View>
    
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  contente1:{
    flex: 1,
    justifyContent : 'center',
    alignItems: 'center',
    
  },
  contente2:{
    flex: 2,
    

  },
  contente3:{
    flex: 2,
    
    justifyContent:'space-around',
    

  },
  contente4:{
    flex: 1,
    

  },
  contente5:{
    flex: 2,
    justifyContent:'space-around',
    alignItems: 'center',
    

  },
  contente6:{
    flex: 1,
    

  },
 
  inputs:
  {
    height:50,
    borderWidth: 3,
    marginLeft : 10,
    marginRight : 10,

    
  },
  connectButton:
  {
    
    backgroundColor: "rgb(255,43,55)",
    borderRadius : 20,
    width: 180,
    height: 50,
    
    
  }
});