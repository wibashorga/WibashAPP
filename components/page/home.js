import React from 'react';
import {Text, View, Modal, StyleSheet, FlatList, SafeAreaView, ScrollView,Button} from 'react-native';
import Header from "./Header";
import {Icon} from "react-native-elements";
const token = "PPlaFk63u4E6";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous "];

class Carte extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }
    render()
    {

        
        return(
            <View style={styles.carte}>
                <Text style = {{fontWeight:"bold"}}>{this.props.projet.nom}</Text>
                <Text>{this.props.projet.description}</Text>
            </View>
        )
    }
}


class Membre extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }
    render()
    {
       
        
        return(
            <View style={styles.carte}>
                <Text style = {{fontWeight:"bold"}}>{this.props.membre.pseudo}</Text>
                <Text>{this.props.membre.phrase}</Text>
            </View>
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
            membres: [],
            events: []
        }
        this.message = messages[parseInt(Math.random()*messages.length)];
        this.importProjects();
        this.importMembers();
        this.importEvents();
        setTimeout(()=> this.setState({bienvenue: false}), 1000);
    }
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        
        fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            json = JSON.parse(json);
            this.setState({projets:json})
            this.props.setProjects(json);
        }).catch(
            (error) => console.log("coucou", error))
    }
    importMembers ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        console.log(this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/ListeMembres.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            json = JSON.parse(json);
            this.props.setMembers(json);
            this.setState({membres:json})}).catch(
            (error) => console.log(error))
    }
    importEvents()
    {
        fetch("http://www.wi-bash.fr/application/ListEvent.php").then(
            (reponse)=>reponse.text()).then(
                (json)=>{
                    let events = JSON.parse(json);
                    this.props.setEvents(events);
                    this.setState({events:events});
                }
            ).catch((error)=>console.log(error))
    }
    render()
    {
        return(
            <ScrollView style = {{flex:1}}>

                
                <Modal visible = {this.state.bienvenue} animationType = "slide"
                transparent= {true}>
                    <View style = {styles.modal}>
                        <Text style= {styles.message}>{this.message+this.state.user.pseudo}</Text>
                        </View>
                </Modal>




        <View style = {styles.headers}>
            <Icon name = "menu" type = "Entypo" color = "white" iconStyle = {styles.icon}
           onPress={()=>{this.props.navigation.navigate("Profils")}}/>
            
            <Text style = {styles.textetitreheaders} > Wi-bash </Text>
        </View>





                    <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > PROJETS </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        <FlatList data={this.state.projets.slice(0,5)} keyExtractor={(item)=>item.ID} 
                    renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>

                        </View>
                </View>





                <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > EVÈNEMENTS </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        <FlatList data={this.state.events.slice(0,4)} keyExtractor={(item)=>item.nom} 
                    renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>

                        </View>
                </View>


                <View style = {styles.categorie}>

                <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > VOTE </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        <FlatList data={this.state.projets.slice(0,4)} keyExtractor={(item)=>item.ID} 
                    renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>

                        </View>
                </View>



                <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > MEMBRES </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        <FlatList data={this.state.membres} keyExtractor={(item)=>item.identifiant} 
                    renderItem= {(item)=><Membre membre = {item.item}/>} horizontal = {true}/>

                        </View>
                </View>




            </ScrollView>
                       
        )
    }
}

// il va falloir adapter le designe entierement en noir
const styles = StyleSheet.create(
    {
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
           height : 290
           
       },
       Titre:
       {
           height:50,
           backgroundColor: "red",
           alignItems : 'center',
       },
       textetitre:{
            fontSize:40,
            color:"white"
       },
       carte:
       {
           backgroundColor: "white",
           width: 300,
           height: 190,
           marginRight: 20,
           marginTop:10,
           overflow: "hidden",
           padding:10,
          borderRadius: 20,
          shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:8.30,
            elevation:14
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
       },
       textecarte:
       {
           flex:4,
          
       }, icon:
       {
           marginLeft: 10,
           marginTop: 40,
           alignSelf: "flex-start",
       },
       textetitreheaders:{
           marginTop:-30,
           marginLeft:100,
           marginEnd:60,
           fontSize:40,
           color:"white",
      },headers:{
          backgroundColor:"red",
      }
       
       
    }

   
                

)
