import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native';



const token = "PPlaFk63u4E6";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;



export default class NewEvent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.nom = "";
        this.date = "";
        this.type = "";
        this.description = "";
        this.decisions = "";
        this.state ={
            description:false
        };
        
    }

    ajouterDescription()
    {
       if (this.state.description){ return(
        <View>
            <Text style={styles.info}>Description : </Text>
                <TextInput placeholder={"Que va-t-il se passer ?"} 
                placeholderTextColor = {"grey"}
                style={{...styles.textinput, height:windowHeight/3.5,}}
                 onChangeText = {(text)=>{this.description = text}}
                multiline={true}>

                </TextInput>
                </View>
                
        )}else
        {
            return (
                <View>
                    <Text style={styles.info} onPress = {()=>{this.setState({description:true})}}>
                        Ajouter une description ?
                    </Text>
                </View>
            )
        }
    }
    
    sendEvent()
    {
        if(this.nom && this.date && this.type)
        {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("nom", this.nom);
        data.append("date", this.date);
        data.append('type', this.type);
        if (this.decisions) data.append("decisions", this.decisions);
        if (this.description) data.append(this.description);

        
        fetch('http://www.wi-bash.fr/application/CreateEvent.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        if (text.search("200")!==-1) {
            
            this.props.navigation.navigate("projets", {refresh:true});
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
            
            
            <TextInput style = {styles.textinput} placeholder = {"Nom de l'évènement"} 
            onChangeText = {(text)=>{this.nom = text}} style={{...styles.textinput}}
            autoCapitalize = {"words"}
            ></TextInput>

            <Text style={styles.info}>Date : </Text>
                
                {this.ajouterDescription()}
                
                <TouchableOpacity style={styles.sendbutton}onPress = {()=>{}}>
                    <Text  style={{color:"black", fontSize:20, textAlign:"center"}}>envoyer</Text>
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
            height: 20,
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
            padding:15,
            borderRadius:20,
            shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:4.30,
            elevation:12
            
            
        }
    }
)
