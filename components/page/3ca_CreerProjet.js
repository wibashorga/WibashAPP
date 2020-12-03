import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions, TextInput, Button, ScrollView, TouchableOpacity,Alert} from 'react-native';
import RNPickerSelect from "react-native-picker-select";


const token = "PPlaFk63u4E6";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const types = [{label:"Robotique", value:"Robotique"},
{label:"Programmation", value:"Programmation"}, {label:"Evenement", value:
"Evènement"}, {label:"autre", value:"Autre"}]


function message(titre, phrase)
{
    Alert.alert(titre, phrase, [
        {
            text:"OK",
            onPress: ()=>{}
        }
    ])
}


export default class NewProject extends React.Component
{
    constructor(props)
    {
        super(props);
        this.nom = "";
        this.description = "";
        this.objectifs = "";
        this.type = null;
    }
    generateID(){
       let id = null;
        do
       {
        id = (Math.random()*1000000).toString();
        id = id.slice(0,5);
       }while(this.props.projets.map((p)=>p.ID).indexOf(id)!==-1);
        return id;

    }
    sendProject()
    {
        if (!this.type) this.type = "Programmation";
        if(this.nom && this.description && this.objectifs && this.type)
        {
        let data = new FormData();
        //this.description = encode_utf8(this.description);
        data.append("token", token);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("id_proj", this.generateID());
        data.append("nom", this.nom);
        data.append("description", this.description);
        data.append('objectifs', this.objectifs);
        data.append("type", this.type);
        
        fetch('http://www.wi-bash.fr/application/CreaProj.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        if (text.search("200")!==-1) {
            
            this.props.navigation.navigate("projets", {refresh:true});
        }else{
            message("Oups", 
            "Nous n'avons pas pu créer votre projet. Vérifiez que ce nom n'existe pas déjà...")
        }
        console.log(text)
            }
            ).catch(
            (error) => console.log(error))
        }else{
            Alert.alert("Erreur", "Veuillez remplir tous les champs", [
                {
                  text : "OK",
                  onPress: ()=> {}
                }])
        }
    }
    render()
    {
        StatusBar.setHidden(true);
        return(
        <ScrollView style = {styles.container} 
        contentContainerStyle={styles.content}
        contentInset = {{left:0, right:0, top:0, bottom:-20}}>
            
            
            <TextInput style = {styles.textinput} placeholder = {"Nom du projet"} 
            onChangeText = {(text)=>{this.nom = text}} style={{...styles.textinput}}
            autoCapitalize={"words"}
            ></TextInput>

            <RNPickerSelect onValueChange={(val)=>{this.type = val}}
                items = {types} //useNativeAndroidPickerStyle={false}
                placeholder={{label:"Type", value:null}}
                //style={pickerMonth}
                />


            
            <TextInput onChangeText = {(text)=>{this.objectifs = text}}
            placeholder = {"Objectifs"} style={{...styles.textinput, height:windowHeight/4,
            width:windowWidth*0.95}}
            multiline = {true}/>
                
            
                <TextInput placeholder={"Mon projet en quelques mots"} 
                placeholderTextColor = {"black"}
                style={{...styles.textinput, height:windowHeight/3.5,}}
                 onChangeText = {(text)=>{this.description = text}}
                multiline={true}>

                </TextInput>
                <TouchableOpacity style={styles.sendbutton}onPress = {()=>this.sendProject()}>
                    <Text  style={{color:"white", fontSize:20, textAlign:"center"}}>CREER !</Text>
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
            backgroundColor:"#F4F7F8",
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
            
        },
        textinput:
        {
            height: 23,
            width: windowWidth*0.95,
            height: 30,
            alignSelf: "center",
            margin: 20,
            color: "black",
            padding:7,
            backgroundColor:"white",
            borderRadius:20,
            shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:8.30,
            elevation:14

            
        },
        sendbutton:
        {
            height: 30,
            borderColor: "black",
            borderWidth: 3,
            width: windowWidth*0.8,
            height: 50,
            alignSelf: "center",
            margin: 20,
            backgroundColor: "red",
            padding:5,
            borderRadius:20,
            shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:4.30,
            elevation:12
            
            
        }
    }
)
