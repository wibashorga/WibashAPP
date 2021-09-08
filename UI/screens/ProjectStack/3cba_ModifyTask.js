import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';
import { update_task } from '../../../API/api_request';
import { FormSheet, windowHeight } from '../../custom/custom';

export default class ModifyTask extends React.Component
{
  constructor(props)
  {
    super(props);
    this.taskTitle = this.props.route.params.task.nom || "";
    this.taskDescription = this.props.route.params.task.description || "";
    this.taskCategory = this.props.route.params.task.categorie
    this.state = {priority:"0"}
    
  }
  sendModifications()
  {
    if (this.taskDescription)
    {
      update_task({identifiant:this.props.user.identifiant, pass:this.props.user.pass,
      description:this.taskDescription, nom:this.taskTitle, 
      id_projet:this.props.route.params.task.id, categorie:this.taskCategory}, (text)=>{this.props.navigation.goBack()})
    }
        
  }
  render() {
    return(
      <ScrollView>

        <View style = {{backgroundColor: 'black', alignItems: 'center'}}>
          <Text style = {styles.title}> MODIFIER TÂCHE </Text>
        </View>

        <View style = {{margin:5}}>

          <View style = {{marginTop: 20}}>
            <Text style = {{fontSize: 20}}>Titre</Text>
            
            <Text>{this.props.route.params.task.nom}</Text>
          
          </View>

          <View style={{marginVertical: 20}}>            
            <Text style={{fontSize: 20}}>Description</Text>            
            <TextInput style = {styles.textInput}  defaultValue = {this.props.route.params.task.description}
            placeholderTextColor={"black"} onChangeText={(text)=>{this.taskDescription = text}} multiline maxLength={700}/>
          </View>
          <View style={{marginVertical: 20}}>
            <Text style={{fontSize: 20}}>Catégorie</Text>
            <TextInput style = {styles.textInput}  defaultValue = {this.props.route.params.task.categorie}
            placeholderTextColor={"black"} onChangeText={(text)=>{this.taskCategory = text}} multiline maxLength={80}/>          
          </View>
          <FormSheet title={"Niveau de priorité de la tâche"} data = {["0", "1", "2", "3", "4"]} content={this.state.priority} 
          setElement = {(level)=>{this.setState({priority:level})}} defaultValue = {this.state.priority}/>
        </View>
            
        <View style = {{marginTop: 50}}>

          <TouchableOpacity style = {[styles.button, {backgroundColor: 'rgb(0,170,243)', marginBottom: 20}]}
          onPress = {()=>this.sendModifications()}>
            <Text style={styles.buttonText}>ENREGISTRER</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {[styles.button, {backgroundColor: 'red'}]}
          onPress = {()=>this.props.navigation.goBack()}>
            <Text style={styles.buttonText}>ANNULER</Text>
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
      borderRadius: 10,
      maxHeight:windowHeight*0.3
		},
	button:
	{
    borderRadius: 20, 
    padding: 15,
    alignItems: 'center',
    color:"white",
    marginHorizontal:10
	},buttonText:
  {fontSize: 18, fontWeight:"700", color:"white"}
});

