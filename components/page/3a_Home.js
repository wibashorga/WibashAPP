import React from 'react';
import {Text, View, Modal, StyleSheet,Dimensions, FlatList, SafeAreaView, ScrollView,Button} from 'react-native';
import Header from "./Header";
import {Icon} from "react-native-elements";

const token = "PPlaFk63u4E6";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous "];

/*
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
*/

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
            json = JSON.parse(json);//on transforme la string json en objet js
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

    projectCard()
    {
        return(
            <View style={styles.card}>
                <Text style={styles.textetitre}>PROJETS</Text>
                <Text>A Wi-Bash il a actuellement :</Text>
                <Text>• {this.state.projets.length} projets</Text>
                <Text>• Vous participez à {this.state.projets.filter((p)=>p.mine).length} d'entre eux</Text>
            </View>
        )
    }
    memberCard(){
       return( <View style={styles.card}>
                <Text style={styles.textetitre}>MEMBRES</Text>
                <Text>Nous comptons {this.state.membres.length} membres</Text>
        </View>
       )
    }
    render()
    {
        return(
            <ScrollView style = {{flex:1}}>

                


        <View style = {styles.headers}>
            <Icon name = "menu" type = "Entypo" color = "white" iconStyle = {styles.icon}
           onPress={()=>{this.props.navigation.navigate("Profils")}}/>
            
            <Text style = {styles.textetitreheaders} > Wi-bash </Text>
        </View>
                <View style={{flex:1, flexDirection:"row"}}>

                    <View style={{flex:1}}>
                    {this.projectCard()}
                    </View>
                    <View>
                        {this.memberCard()}
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
       card:{
           margin:5,
           backgroundColor:"white",
           padding:5,
           paddingBottom:10,
           shadowColor: "#000",
           //width:windowWidth/1.8,
            shadowOffset: {
	        width: 1,
	        height: 5},
            shadowOpacity: 0.55,
            shadowRadius: 3.84,
            elevation: 10

       },
       
       textetitre:{
            fontSize:20,
            
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
          shadowColor: "#000",
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
