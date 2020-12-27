import React from 'react';
import {Text, View, Modal, StyleSheet,Dimensions, FlatList, SafeAreaView, ScrollView,Button, Image} from 'react-native';
import Header from "./Header";
import {Icon} from "react-native-elements";
//import image from "./ressources/fondprojet.jpg";
import * as ImagePicker from "expo-image-picker";

const token = "PPlaFk63u4E6";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous "];

/*La vue home se conçoit globalement comme un tableau de bord
On y voit le résumé des informations les plus importantes sur les projets et les membres

*/

export default class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true,
            projets: [],
            membres: [],
            events: [],
            image:""
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
                <Text>A Wi-Bash il y a en ce moment  :</Text>
                <Text>• {this.state.projets.length} projets</Text>
                <Text>• Vous participez à {this.state.projets.filter((p)=>p.mine).length} d'entre eux</Text>
            </View>
        )
    }
    memberCard(){
       return( <View style={styles.card}>
                <Text style={styles.textetitre}>MEMBRES</Text>
                <Text>Nous comptons {this.state.membres.filter((p)=>p.niveau<3).length+(this.state.user.niveau<3?1:0)} membres</Text>
                <Text>Mais aussi {this.state.membres.filter(p=>p.niveau==3).length} visiteurs</Text>
                
        </View>
       )
    }
    eventCard()
    {
        return(
            <View style={styles.card}>
                <Text style={styles.textetitre}>EVENEMENTS</Text>
                <Text>Actuellement, {this.state.events.length}  évènements sont à venir</Text>
                
                
        </View>
        )
    }

    componentDidMount(){
       setInterval(()=>{
        this.importEvents();
        this.importMembers();
        this.importProjects();}, 30000)
    }

  
    render()
    {
        return(
            <View style = {{flex:1}}>


                <View style = {styles.headers}>
                    <Icon name = "menu" type = "Entypo" color = "white" iconStyle = {styles.icon}
                onPress={()=>{this.props.navigation.navigate("Profils")}}/>
                    
                    <Text style = {styles.textetitreheaders} > Wi-bash </Text>
                </View>
                        <View style={{flex:1, flexDirection:"row"}}>

                            <View style={{flex:3, flexDirection:"row"}}>
                            {this.projectCard()}
                            </View>
                            <View style={{flex:4}}>
                                {this.memberCard()}
                                {this.eventCard()}

                            </View>


                        </View>

                    


                <View style = {{flex:2, flexDirection:"column"}}>

                    <ScrollView>


                    <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > PROJETS </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        

                        </View>
                </View>





                <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > MEMBRES </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                       

                        </View>
                </View>




                <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > EVÈNEMENTS </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        
                        </View>
                </View>


                <View style = {styles.categorie}>

                <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > VOTE </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        

                        </View>
                </View>


                    </ScrollView>
                </View>
            </View>            
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
           borderRadius: 10
       },
       card:{
           margin:1,
           flex:1,
           backgroundColor:"white",
           padding:2,
           paddingBottom:2,
       },
       
       containtcarte:
       {
           flex : 1,
           margin : 10,
       }, icon:
       {
           marginLeft: 10,
           marginTop: 50,
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
      },
      contaitActualiter:{
          height:300,
      },
      contaitEvenements:{
            height:300,
      },
      contaitProjets:{
        height:300,
      },
      contaitMmebres:{
        height:300,

      },
      titreCategorie:{
          fontSize:20,

      },
      Carte:
       {
        
           width: 310,
           height: 400,
           marginRight: 20,
           marginTop:30,
           overflow: "hidden",
           paddingLeft:10,
          borderRadius: 20,
          backgroundColor:"white",
          
       },categorie:
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
       

// sa merdes








       
       
    }

   
                

)
