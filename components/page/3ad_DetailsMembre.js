import React from 'react';

import {colors, windowHeight, windowWidth} from "./custom"
import {WiText} from "./custom"
import {Text, View, Modal, Button, Image, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {update_member} from "../../API/api_request"
//import {Button} from "react-native-elements";
//import { colors } from 'react-native-elements';
const token = "PPlaFk63u4E6";


export default class DetailsMembre extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {update:0}
        this.membre = this.props.route.params.membre;
        this.membre.role = ["dev", "administrateur", "membre", "visiteur"][this.membre.niveau]
            this.membre.mail = this.membre.mail==null || this.membre.mail=="null"?"":this.membre.mail
    }
    componentDidMount()
    {
        let prenom = this.membre.prenom;
        prenom = prenom[0].toUpperCase() + prenom.slice(1,prenom.length)
        this.props.navigation.setOptions({headerTitle:prenom, headerTitleStyle:{alignSelf:"center",
    marginRight:windowWidth/5}})
    }
    adminInfo()
    {
        const set_member_level = (_level)=>{
            update_member({identifiant:this.props.user.identifiant, pass:this.props.user.pass,
                level:_level, "id_membre":this.membre.identifiant}, (reponse)=>{
                    if (reponse.indexOf("200")!==-1) {
                        this.membre.niveau = parseInt(_level);
                        this.setState({update:this.state.update+1})
                    }
                    console.log(reponse)
                })
        }
        if (this.membre.niveau == 3)
        {
            return (
                <View>
                    <Button title = "EN FAIRE UN MEMBRE" onPress = {()=> set_member_level("2")} color="green"/>
                </View>
            )
        }
        if (this.membre.niveau == 2)
        {
            return (
                <View>
                    <Button title = {"RETIRER A "+this.membre.prenom+" LE STATUT DE MEMBRE"} 
                    onPress = {()=>set_member_level("3")} color="red"/>
                </View>
            )
        }
    }
    render()
    {
        
        
        return(
        <ScrollView style = {styles.conteneur} contentContainerStyle={{justifyContent:"center"}}>
            <Image source={{uri:this.membre.photo_profil||"./ressources/logo.png"}} 
                style= {styles.image}></Image>
        
        <Text style = {{fontWeight:"bold", fontSize:24, alignSelf: "center"}}>{this.membre.prenom+" "+this.membre.nom}
        <Text  style = {{fontStyle:"italic", fontWeight:"normal", fontSize:15}}>({this.membre.role}) </Text></Text>
        <Text style={{fontSize:18}} selectable={true} dataDetectorType = "all">
            <Text selectable style={{color:"blue", fontStyle:"italic"}}>{this.membre.mail+" \n"}</Text>

        <Text>Mon crédo :{"\n"+this.membre.phrase+"\n\n"}</Text>
        <WiText>{this.membre.story}</WiText>

        </Text>
            {this.adminInfo()}
           
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create(
    {
       
      Titre:
       {
           height:100,
           backgroundColor: "red",
           alignItems : 'center',
       },
       conteneur:
       {
           flex : 1,
           backgroundColor: "white",
           paddingTop:5,
           paddingHorizontal:3
           
       },
       image: {width:windowWidth/2, 
        height:windowWidth/2, 
        alignSelf:"center" , borderRadius:15},


    }
)
