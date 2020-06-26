import React from 'react';
import { StyleSheet, Text,Image, View, TextInput, Button} from 'react-native';

export default class Connexion extends React.Component {
  constructor(props)
  {
    super(props)
    this.id = null;
    this.pass = null;
    this.state = {
      profil: {},
      connected: false,
      wrongConnexion: false, network: deviceIsConnected()}
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
    return (

      
    
    <View style={styles.container}>
      
        <View style = {styles.contente1}>
          <View style ={{flex:1}}>
          <Image source = {require('./logo.png')} style={{marginTop:40 }}/>
          </View>
          

        </View>


        {this._showWrongID()}
        {this._showNetworkFail()}
        {this._showConnected()}


      <View style = {styles.contente2}>
        <View style = {styles.contente3}>
          
          <Text style={{textAlign:"center",fontSize:25}}> Identifiant :</Text>
          
          <TextInput onChangeText={(text)=>{this.id = text; console.log(this.id)}} style = {styles.inputs}/>

          <Text style={{textAlign:"center",fontSize:25}}> Mot de passe</Text>
 
          <TextInput secureTextEntry = {true} onChangeText={(text)=>{this.pass = text}} style = {styles.inputs}/>
            
        </View>





       <View style = {styles.contente4}>
            <View style = {styles.contente5}>
                <Button 
                  title="Connexion"
                  color = "red"
                  onPress={()=>this._connect()}
          />
            </View>



          <View style = {styles.contente6}>
            <Button 
              title="Mot passe oublié ?"
              color = "black"
              onPress={() => {}}
            />

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
    height:40,
    borderWidth: 1,
    marginLeft : 30,
    marginRight : 30,

    
  },
  connectButton:
  {
    
    backgroundColor: "rgb(255,43,55)",
    borderRadius : 20,
    width: 180,
    height: 50,
    
    
  }
});
