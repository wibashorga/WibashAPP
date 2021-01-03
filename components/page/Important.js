import React from 'react';
import Header from "./Header.js";

import {Text, View, Modal, StyleSheet, ScrollView, TouchableOpacity, FlatList,ImageBackground,Button,SafeAreaView} from 'react-native';
const token = "PPlaFk63u4E6";


class Carte extends React.Component
{
    constructor(props)
    {
        super(props);
        //console.log(this.props.projet);
    }
    render()
    {

        
        return(
            <View style={styles.carte}>
                <View style={styles.imagecarte}>
                <Text>ici il aura une image</Text>
                </View>

                <View>
                <Text style = {{fontWeight:"bold"}}>{this.props.projet.nom}</Text>
                <Text>{this.props.projet.description}</Text>
                </View>
            </View>
        )
    }
}

export default class Evenement extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
        }
        this.projets = [];
        this.importProjects();
        
    }
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        //console.log(this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/Read/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            json = JSON.parse(json);
            this.setState({projets:json})}).catch(
            (error) => console.log(error))
    }
    render()
    {
        
        
        return(
            <View style = {styles.conteneur}>

                



                
                        <Text style={{alignSelf:"center"}}>En construction...</Text>

             

                
                              
                
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
       
       categorie:
       {
           flex:1,
           height : 290,
       },
       Titre:
       {
           height:50,
           backgroundColor: "red",
           alignItems : 'center',
       },
       conteneur:
       {
           flex : 1,
           backgroundColor: "white",
           justifyContent:"center",alignContent:"center"
           
           
           
       },
       image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },


       carte_projet:
       {
           backgroundColor: "transparent",
           height:200,
           width:200,
           shadowColor: "#000",
            shadowOffset: {
	        width: 1,
	        height: 5},
            shadowOpacity: 0.55,
            shadowRadius: 3.84,
            elevation: 10

       },
       containimage:{
           flex : 1,
       },
       titrecarte:
       {
           fontWeight:"bold",
           textAlign: "center",
           fontFamily: "roboto"
       },
       containtcarte:
       {
           flex : 1,
          
           
           
       },
       description:
       {
           fontFamily: "roboto",
           overflow: "hidden"
       },
       carte:
       {
        
           width: 360,
           height: 280,
           marginRight: 20,
           marginTop:30,
           overflow: "hidden",
           paddingLeft:10,
          borderRadius: 20,
          backgroundColor:"white",
          opacity:0.8
          
       },
    }
)
