import React from 'react';
import {View, StyleSheet, StatusBar, Dimensions, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native';
import { Text } from 'react-native-svg';


const token = "PPlaFk63u4E6";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default class NewProject extends React.Component
{
    constructor(props)
    {
        super(props);
        this.nom = "";
        this.description = "";
        this.objectifs = "";
        console.log(this.props.user.prenom);
    }
    generateID(){
        let id = (Math.random()*1000000).toString();
        return id.slice(0,5);

    }
    sendProject()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("id_proj", this.generateID());
        data.append("nom", this.nom);
        data.append("description", this.description);
        data.append('objectifs', this.objectifs);
        data.append("type", "programmation");
        
        fetch('http://www.wi-bash.fr/application/CreaProj.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        console.log(text); console.log("Brainfuck");  
        }
            ).catch(
            (error) => console.log(error))
    }
    render()
    {
        StatusBar.setHidden(true);
        return(
        <ScrollView style = {styles.container} 
        contentContainerStyle={styles.content}
        contentInset = {{left:0, right:0, top:0, bottom:-20}}>
            <Text style = {styles.info} color={"black"}> Nom : </Text>
            <TextInput style = {styles.textinput} placeholder = {"Nom du projet"} 
            onChangeText = {(text)=>{this.nom = text}} style={{...styles.textinput}}
            ></TextInput>

            <Text style={styles.info}>Objectifs : </Text>
            <TextInput onChangeText = {(text)=>{this.objectifs = text}}
            placeholder = {"Objectifs"} style={{...styles.textinput, height:windowHeight/4,
            width:windowWidth*0.8}}
            multiline = {true}/>
                
                <Text style={styles.info}>Description : </Text>
                <TextInput placeholder={"Mon projet en quelques mots"} 
                placeholderTextColor = {"black"}
                style={{...styles.textinput, height:windowHeight/3.5,}}
                 onChangeText = {(text)=>{this.description = text}}
                multiline={true}>

                </TextInput>
                <TouchableOpacity style={styles.sendbutton}onPress = {()=>this.sendProject()}>
                    <Text  style={{color:"black", fontSize:20, textAlign:"center"}}>
                        CREER !</Text>
                    </TouchableOpacity>

            
        </ScrollView>
        )
    }
}
const styles = StyleSheet.create(
    {
        container:
        {
            
            flexDirection: "column",
            alignContent: "center",
            
                      
            
            flex: 1
            
        },
        content:
        {
            justifyContent:"space-around", 
        },
        icon:
        {
            marginLeft: 10,
            marginTop: 40,
            alignSelf: "flex-start",
        },
        info:
        {
            color: "black",
            fontSize: 20,
            backgroundColor: "black"
        },
        textinput:
        {
            height: 20,
            borderColor: "black",
            borderWidth: 3,
            width: windowWidth*0.8,
            height: 30,
            alignSelf: "center",
            margin: 20,
            color: "black",
            padding:7,

            
        },
        sendbutton:
        {
            height: 20,
            borderColor: "black",
            borderWidth: 3,
            width: windowWidth*0.8,
            height: 30,
            alignSelf: "center",
            margin: 20,
            backgroundColor: "white",
            padding:15, 
            
            
        }
    }
)
