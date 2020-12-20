import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';

export default class ModifyEvent extends React.Component
{
  render() {
    return(
      <ScrollView style = {{marginTop: 20}}>

        <View style = {{backgroundColor: 'red', alignItems: 'center'}}>
          <Text style = {styles.title}> MODIFIER EVENEMENT </Text>
        </View>

        <View style = {{margin:5}}>

          <View style = {{marginTop: 20}}>
            <Text style = {{fontSize: 20}}>Titre</Text>
            <TextInput style = {styles.textInput}  placeholder = 'Nouveau titre'/>
          </View>

          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 20}}>Description</Text>
            <TextInput style = {styles.textInput}  placeholder = 'Nouvelle description'/>
          </View>

        </View>
            
        <View style = {{marginTop: 50}}>

          <TouchableOpacity style = {[styles.button, {marginBottom: 20, backgroundColor: 'red'}]}>
            <Text style={{fontSize: 20}}>Enregistrer</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {[styles.button, {backgroundColor: 'blue'}]}>
            <Text style={{fontSize: 20}}>Annuler</Text>
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
    alignItems: 'center'
	}
});

