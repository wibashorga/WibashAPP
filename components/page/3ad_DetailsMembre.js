import React from 'react';

import {colors, windowWidth} from "./custom"
import {WiText} from "./custom"
import {Text, View, Modal, Image, StyleSheet} from 'react-native';
//import { colors } from 'react-native-elements';
const token = "PPlaFk63u4E6";


export default class DetailsMembre extends React.Component {
    constructor(props)
    {
        super(props);
        this.membre = this.props.route.params.membre;
        this.membre.role = ["dev", "administrateur", "membre", "visiteur"][this.membre.niveau]
                
    }
    componentDidMount()
    {
        let prenom = this.membre.prenom;
        prenom = prenom[0].toUpperCase() + prenom.slice(1,prenom.length)
        this.props.navigation.setOptions({headerTitle:prenom, headerTitleStyle:{alignSelf:"center",
    marginRight:windowWidth/5}})
    }
    render()
    {
        
        
        return(
            <View style = {styles.conteneur}>
                <Image source={{uri:this.membre.photo_profil||"./ressources/logo.png"}} 
                style= {styles.image}></Image>
        
        <Text style = {{fontWeight:"bold", fontSize:24, alignSelf: "center"}}>{this.membre.prenom+" "+this.membre.nom}
        <Text  style = {{fontStyle:"italic", fontWeight:"normal", fontSize:15}}>({this.membre.role}) </Text></Text>
        <Text style={{fontSize:18}}>
        <Text>Ma phrase favorite :{"\n\n"+this.membre.phrase+"\n\n"}</Text>
        <Text >{this.membre.story}</Text>
        </Text>
           
            </View>
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
           justifyContent:"center",alignContent:"center",
           paddingHorizontal:3
           
       },
       image: {width:150, 
        height:150, 
        alignSelf:"center" , borderRadius:15},


    }
)
