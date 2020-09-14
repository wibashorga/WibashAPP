import React from 'react';
import {Text, View, Modal, StyleSheet, ScrollView, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from "./Header";
const token = "PPlaFk63u4E6";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous, "];

class Carte extends React.Component
{
    constructor(props)
    {
        super(props);

    }
    render()
    {
        
        return(
            <TouchableOpacity style={styles.carte} onPress = {()=>{}} activeOpacity = {0.6}>
                <Text style = {{fontWeight:"bold"}}>{this.props.projet.Nom}</Text>
                <Text>{this.props.projet.Description}</Text>
                </TouchableOpacity>
        )
    }
}
class MemberCard extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        
        return(
            <TouchableOpacity style={styles.carte} onPress = {()=>{}} activeOpacity={0.6}>
                <Text style = {{fontWeight:"bold"}}>{this.props.membre.pseudo}</Text>
                <Text>{this.props.membre.prenom + this.props.membre.nom}</Text>
                <Text>{this.props.membre.phrase}</Text>
            </TouchableOpacity>
        )
    }
}

export default class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true,
            projets: [],
            membres:[]
        }
        this.message = messages[parseInt(Math.random()*messages.length)];
        this.importProjects();
        this.importMembers();
        setTimeout(()=> this.setState({bienvenue: false}), 2000);
    }
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        console.log(this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
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
    importMembers ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/ListeMembres.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            console.log("Membres : ", json);
            json = JSON.parse(json);
            this.setState({membres:json})}).catch(
            (error) => console.log(error))
    }
    render()
    {
        return(
            <View style = {{flex:1}}>

                
                <Modal visible = {this.state.bienvenue} animationType = "slide"
                transparent= {true}>
                    <View style = {styles.modal}>
                        <Text style= {styles.message}>{this.message+this.state.user.pseudo}</Text>
                        </View>
                </Modal>
                <Header onPress = {()=>{}}/>
              <ScrollView style = {styles.container}>
              
              <View style = {styles.categorie}>
                  
                <FlatList data={this.state.projets} keyExtractor={(item)=>item.ID} 
                renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>
                </View>
                
                <View style = {styles.categorie}>
                <FlatList data={this.state.membres} keyExtractor={(item)=>item.identifiant} 
                renderItem= {(item)=><MemberCard membre = {item.item}/>} horizontal = {true}/>
                </View>
            </ScrollView>  
                
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
       container:
       {
           flex:1,
           paddingLeft: 5,
           paddingTop: 5,
           
       },
        modal:
       {
           backgroundColor: "rgb(156, 23, 84)",
           alignSelf: "center",
           marginTop: 100,
           paddingVertical: 30,
           paddingHorizontal: 5,
           borderRadius: 20
       },
       message:
       {
           color: "white",
           fontSize: 22,
           fontStyle: "italic",
           fontWeight: "bold"
       },
       categorie:
       {
           flex:1,
           height : 180,
           paddingBottom: 10
           
       },
       Titre:
       {
           flex:1,
           backgroundColor: "red",
           alignItems : 'center',
           
       },
       carte:
       {
           backgroundColor: "white",
           width: 150,
           height: 150,
           marginRight: 20,
           overflow: "hidden",
           shadowOffset: {
            width: 1,
            height: 5},
          shadowOpacity: 0.55,
          shadowRadius: 3.84,
          
          elevation: 10
          
       },
       cartein:
       {
           flex : 1,
           margin : 20,
           backgroundColor: "#D3D3D3",
           height : 190,
           width : 310,
           borderRadius : 20
           
       },
       containtcarte:
       {
           flex : 1,
           margin : 10,
           
       },
       Titrecarte:
       {
           flex:1,
           alignItems : 'center',
           fontSize: 28
       },
       textecarte:
       {
           flex:4,
          
       }
       
       
    }

   
                

)
