import React from 'react';
import {Text, View, Modal, StyleSheet,Dimensions, FlatList, SafeAreaView, ScrollView,Button, Image,StatusBar} from 'react-native';
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
            projets: [],
            membres: [],
            events: [],
            image:""
        }
        
        this.importProjects();
        this.importMembers();
        this.importEvents();
        
        
        this.props.navigation.addListener("focus", ()=>{
            this.importProjects();
            this.importMembers();
            this.importEvents();
            });
    }
    
    setHeader(){
        this.props.navigation.setOptions({
            title:"WI-BASH", headerShown:true, headerStyle:{backgroundColor:"red"},
            headerTitleStyle:{color:"white", alignSelf:"center", marginLeft:-50, fontSize:23},
            headerLeft:()=>(<Icon name = "menu" type = "Entypo" color = "white" iconStyle = {styles.icon}
            onPress={()=>{this.props.navigation.navigate("Profils")}}/>
                )
        })
    }
    importProjects ()
    {
        if (this.props.navigation.isFocused())
        {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        
        fetch('http://www.wi-bash.fr/application/Read/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            json = JSON.parse(json);//on transforme la string json en objet js
            if (this.state.projets!=json)
            {
            this.setState({projets:json})
            this.props.setProjects(json);
            }
        }).catch(
            (error) => console.log("coucou", error))
        }
    }
    importMembers ()
    {
        if (this.props.navigation.isFocused())
        {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/Read/ListeMembres.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            json = JSON.parse(json);
            if (this.state.membres!=json)
            {
            this.props.setMembers(json);
            this.setState({membres:json})}
    }).catch(
            (error) => console.log(error))
        }
    }
    importEvents()
    {
        if (this.props.navigation.isFocused())
        {
        fetch("http://www.wi-bash.fr/application/Read/ListEvent.php").then(
            (reponse)=>reponse.text()).then(
                (json)=>{
                    let events = JSON.parse(json);
                    this.props.setEvents(events);
                    this.setState({events:events});
                }
            ).catch((error)=>console.log(error))
        }
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
       setTimeout(()=>{
           this.importEvents();
           this.importMembers();
           this.importProjects();
       }, 30000)
       this.setHeader();
    }

  
    render()
    {
        StatusBar.setHidden(false);
        return(
            <ScrollView style = {{flex:1}}>


                
                        <View style={{flex:1, flexDirection:"row"}}>

                            <View style={{flex:3, flexDirection:"row"}}>
                                {this.projectCard()}
                            </View>
                            
                            <View style={{flex:4}}>
                                {this.memberCard()}
                                {this.eventCard()}
                            </View>

                        </View>

                    


                <View style = {{flex:3, flexDirection:"column"}}>

                    

                    <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > Actu </Text>

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
           //marginTop:-30, 
           marginLeft:100,
           marginEnd:60,
           fontSize:40,
           color:"white",
      },
      headers:{
          backgroundColor:"red",
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
           //height : 290
           
       },
       Titre:
       {
           //height:50,
           
           
       },
       textetitre:{
            fontSize:20,
            color:"black"
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
        paddingLeft:5,
           alignSelf: "flex-start",
       },
       textetitreheaders:{
           marginTop:-30,
           marginLeft:100,
           marginEnd:60,
           fontSize:10,
           color:"white",
      }
       

// sa merdes








       
       
    }

   
                

)
