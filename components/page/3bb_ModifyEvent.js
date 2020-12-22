import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';

export default class ModifyEvent extends React.Component
{
  constructor(props)
  {
    super(props);
    this.eventTitle = this.props.route.params.event.nom || "";
    this.eventDescription = this.props.route.params.event.description || "";
    this.props.navigation.setOptions({headerTitle:this.props.route.params.event.nom})
  }

  sendModifications()
  {
    const data = new FormData();
    data.append("identifiant", this.props.user.identifiant)
    data.append("pass", this.props.user.pass);
    data.append("nom_event", this.props.route.params.event.nom)
    if (this.eventTitle) data.append("nouveau_nom", this.eventTitle)
    if (this.eventDescription) data.append("description", this.eventDescription);

    fetch('http://www.wi-bash.fr/application/UpdateEvent.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        
        console.log(text)
        this.props.navigation.goBack();
            }
            ).catch(
            (error) => console.log(error))
        
  }
  render() {
    return(
      <ScrollView>

        <View style = {{backgroundColor: 'black', alignItems: 'center'}}>
          <Text style = {styles.title}> MODIFIER EVENEMENT </Text>
        </View>

        <View style = {{margin:5}}>

          <View style = {{marginTop: 20}}>
            <Text style = {{fontSize: 20}}>Titre</Text>
            
            <TextInput style = {styles.textInput}  placeholder = {this.props.route.params.event.nom} 
            placeholderTextColor="black" onChangeText={(text)=>{if (text)this.eventTitle=text;
              else this.eventTitle = this.props.route.params.event.nom;
             this.props.navigation.setOptions({headerTitle:text?text:
              this.props.route.params.event.nom})
            }}/>
          
          </View>

          <View style={{marginTop: 20}}>
            
            <Text style={{fontSize: 20}}>Description</Text>
            
            <TextInput style = {styles.textInput}  placeholder = {this.props.route.params.event.description}
            placeholderTextColor={"black"} onChangeText={(text)=>{this.eventDescription = text}}/>
          
          </View>

        </View>
            
        <View style = {{marginTop: 50}}>

          <TouchableOpacity style = {[styles.button, {marginBottom: 20, backgroundColor: 'blue'}]}
          onPress = {()=>this.sendModifications()}>
            <Text style={{fontSize: 18, color:"white"}}>ENREGISTRER</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {[styles.button, {backgroundColor: 'red',}]}
          onPress = {()=>this.props.navigation.goBack()}>
            <Text style={{fontSize: 18, color:"white"}}>ANNULER</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title:
    {
      fontSize : 25, 
      color:"white", 
      padding: 10
    },
  textInput:
    {
      borderWidth: 1, 
      padding: 5, 
      marginTop: 10, 
      borderRadius: 10
		},
	button:
	{
    borderRadius: 5, 
    padding: 10,
    alignItems: 'center',
    color:"white"
	}
});

