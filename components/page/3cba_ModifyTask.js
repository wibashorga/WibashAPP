import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';

export default class ModifyTask extends React.Component
{/*
  constructor(props)
  {
    super(props);
    this.taskTitle = this.props.route.params.task.nom || "";
    this.taskDescription = this.props.route.params.task.description || "";
    this.props.navigation.setOptions({headerTitle:this.props.route.params.task.nom})
  }

  sendModifications()
  {
    const data = new FormData();
    data.append("identifiant", this.props.user.identifiant)
    data.append("pass", this.props.user.pass);
    data.append("nom_tâche", this.props.route.params.task.nom)
    if (this.taskTitle) data.append("nouveau_nom", this.taskTitle)
    if (this.taskDescription) data.append("description", this.taskDescription);

    fetch('http://www.wi-bash.fr/application/UpdateTask.php', {
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
        
  }*/
  render() {
    return(
      <ScrollView>

        <View style = {{backgroundColor: 'black', alignItems: 'center'}}>
          <Text style = {styles.title}> MODIFIER TÂCHE </Text>
        </View>

        <View style = {{margin:5}}>

          <View style = {{marginTop: 20}}>
            <Text style = {{fontSize: 20}}>Titre</Text>
            
            <TextInput style = {styles.textInput}  placeholder = "Titre"/*{this.props.route.params.task.nom} 
            placeholderTextColor="black" onChangeText={(text)=>{if (text)this.taskTitle=text;
              else this.taskTitle = this.props.route.params.task.nom;
             this.props.navigation.setOptions({headerTitle:text?text:
              this.props.route.params.task.nom})
            }}*//>
          
          </View>

          <View style={{marginTop: 20}}>
            
            <Text style={{fontSize: 20}}>Description</Text>
            
            <TextInput style = {styles.textInput}  placeholder = "Descrition"/*{this.props.route.params.task.description}
            placeholderTextColor={"black"} onChangeText={(text)=>{this.eventDescription = text}}*//>
          
          </View>

        </View>
            
        <View style = {{marginTop: 50}}>

          <TouchableOpacity style = {[styles.button, {backgroundColor: 'blue', marginBottom: 20}]}
          /*onPress = {()=>this.sendModifications()}*/>
            <Text style={{fontSize: 18, color:"white"}}>ENREGISTRER</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {[styles.button, {backgroundColor: 'red'}]}
          /*onPress = {()=>this.props.navigation.goBack()}*/>
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

