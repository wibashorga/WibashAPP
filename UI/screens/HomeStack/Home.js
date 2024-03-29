import React from 'react';
import {Text, View, Modal, StyleSheet,Dimensions, FlatList, ActivityIndicator, ScrollView,Button, Image,StatusBar} from 'react-native';
import {load_events, load_members, load_projects, load_actus, create_actu, update_actu} from "../../../API/api_request";
import {url} from "../../../API/api_table";
import {Avatar, Icon} from "react-native-elements";
//import image from "./ressources/fondprojet.jpg";

import { EditDialog, LoadingMessage } from '../../custom/ModalDialog';
import { TouchableOpacity } from 'react-native';
import { formatPostData } from "../../custom/security";
import {sqlToUserDate,LoadingScreen, WiText, colors} from "../../custom/custom"
import { getNotificationToken } from '../../../components/page/Notifications';

const token = "PPlaFk63u4E6";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous "];
const empty_data = new FormData();//les requetes de rafraichissement doivent être POST pour éviter la mise en cache
empty_data.append("empty", "data")//on leur passe en paramètre un corps vide empty_data

/*La vue home se conçoit globalement comme un tableau de bord
On y voit le résumé des informations les plus importantes sur les projets et les membres
ihyviuvbpvboob
*/

const hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString();              
  }
function getMemberPP(membres, id)
{
    let m = membres.filter(m=>m.identifiant==id)[0]
    if (m) return m.photo_profil
    return ""
}
// function gestion button log 


class CarteActu extends React.Component
{
    constructor(props){super(props);
    this.state ={editVisible:false}
    this.actuContent = props.actu.actu
    }
    bulleActu(){
        if (this.props.modify_actu)
        {
            return(
                <TouchableOpacity style = {{marginLeft:3, flex:3}} onLongPress={()=>this.setState({editVisible:true})}>
                <View style={styles.actu}>
                    <Text  style={{color:"white"}}>
                    <WiText selectable>
                        {this.props.actu.actu}</WiText></Text>
                    </View>
                    <Text style={{alignSelf: "flex-end"}}>{sqlToUserDate(this.props.actu.date)}</Text>
                </TouchableOpacity>
            )
        }return(
            <View style = {{marginLeft:3, flex:3}}>
            <View style={styles.actu}>
                <WiText selectable>
                    {this.props.actu.actu}</WiText>
                </View>
                <Text style={{alignSelf: "flex-end"}}>{sqlToUserDate(this.props.actu.date)}</Text>
            </View>
        )
    }

    render()
    { 
        return(
            <View style={{flexDirection:"row",backgroundColor:"rgb(255,255,255)"}}>
                   <Avatar rounded source={{uri:this.props.pp}} size="medium"/>
           
                {this.bulleActu()}
                
                <EditDialog visible={this.state.editVisible} inputCount={1}
                    firstInputHandler={(text)=>{this.actuContent=text}} close={()=>this.setState({editVisible:false})}
                            editButtonTitle="Modifier l'actu" firstPlaceholder="Quelle bonne nouvelle allez-vous annoncer ?"
                            firstDefaultValue = {this.props.actu.actu}
                            editAction={()=>{
                                if (this.actuContent)
                                {this.props.modify_actu(this.actuContent)
                            this.setState({actuDialogVisible:false})
                        this.actuContent=""}}}/>


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
            projets: this.props.projets || [],
            membres: this.props.membres || [],
            events: this.props.events || [],
            image:"",
            actuDialogVisible:false,
            actus:[],
            token:"",
            enableScrollViewScroll: true,
        }
        
        this.importProjects();
        this.importMembers();
        this.importEvents();
        
        //getNotificationToken().then((token)=>this.setState({token:token}))
        
        this.props.navigation.addListener("focus", ()=>{
            this.importProjects(true);
            this.importMembers(true)
            this.importEvents(true);
            

            });
            load_actus(empty_data, (reponse)=>{this.setState({actus: JSON.parse(reponse)})})
            
    }
    
    setHeader(){
        this.props.navigation.setOptions({
            title:"WI-BASH", headerShown:true, headerStyle:{backgroundColor:"red"},
            headerTitleStyle:{color:"white", alignSelf:"center", justifyContent:"center", fontSize:25},
            headerLeft:()=>(<Icon name = "menu" type = "Entypo" color = "white" iconStyle = {styles.icon}
            onPress={()=>{this.props.navigation.navigate("Profil")}}/>
                )
        })
    }
    importProjects (force)
    {
        if (this.props.navigation.isFocused() || force==true)
        {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        formatPostData(data)

        load_projects(data, (json) => {
            json = JSON.parse(json);//on transforme la string json en objet js
            
            this.setState({projets:json})
            this.props.setProjects(json);
            
        })
        }
    }
    importMembers (force)
    {
        if (this.props.navigation.isFocused() || force)
        {
            
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
       
        load_members(data,(json) => {
            json = JSON.parse(json);
            if (this.props.user.niveau>1) json = json.filter((member)=>member.niveau<3)
            if (this.state.membres!=json)
            {
            this.props.setMembers(json);
            this.setState({membres:json})
            
            }})
    }}

    importEvents()
    {
        if (this.props.navigation.isFocused())
        {
            let data = new FormData();
            data.append("identifiant", this.props.user.identifiant)
            
            load_events(data, (json)=>{
                let events = JSON.parse(json);
                this.props.setEvents(events);
                this.setState({events:events});
            })
        }
    }
    create_actu()
    {
        if (this.actuContent)
        {
            let data = new FormData()
            data.append("identifiant", this.props.user.identifiant)
            data.append("pass", this.props.user.pass)
            data.append("actu", this.actuContent);
            create_actu(data,(reponse)=> load_actus(empty_data, (reponse)=>
            {this.setState({actus: JSON.parse(reponse)})}))
        }
    }

    projectCard()
    {
       
        return(
            <View style={styles.card}>
                <Text style={styles.textetitrestatut}>PROJETS</Text>
                <Text>A Wi-Bash il y a en ce moment  :</Text>
                <Text>• {this.state.projets.length} projets</Text>
                <Text>• Vous participez à {this.state.projets.filter((p)=>p.mine).length} d'entre eux</Text>
            </View>
        )
    }

    memberCard(){
        let isMember = this.state.user.niveau<3?1:0;
        
       return( <View style={styles.card}>
                <Text style={styles.textetitrestatut}>MEMBRES</Text>
                <Text>Nous comptons {this.state.membres.filter((p)=>p.niveau<3).length+isMember} membres</Text>
                <Text>Mais aussi {this.state.membres.filter(p=>p.niveau==3).length+!isMember} visiteurs</Text>
                
        </View>
       )
    }
    eventCard()
    {
        return(
            <View style={styles.card}>
                <Text style={styles.textetitrestatut}>EVENEMENTS</Text>
                <Text>Actuellement, {this.state.events.length}  évènements sont à venir</Text>
                
                
        </View>
        )
    }

    actuBox()
    {
        
        return(


            <View>
                <View style={styles.Titre}>
                <TouchableOpacity onPress={()=>load_actus(empty_data, (reponse)=>
                     {this.setState({actus: JSON.parse(reponse)});})}
                ><Icon name="refresh" type="evilicon" size={45}/></TouchableOpacity>
                <Text style = {styles.textetitre} > Actu </Text>
                {(this.props.user.niveau<2)?<TouchableOpacity style={styles.bontonActu}
                    title="AJOUTER UNE ACTU" 
                    color = "red"
                    onPress={()=>{this.setState({actuDialogVisible:true})}} 
                    /*Remplacer par un logo plus */><Icon name="plus" type="evilicon"size={45}/></TouchableOpacity>:null}
                </View>
            
            <View style={{height:490}}>

            {/*Liste des actus*/} 
            {this.state.actus.length?
            <FlatList nestedScrollEnabled={true} data={this.state.actus} renderItem={(item)=>
                        <CarteActu actu={item.item} pp=
                        {this.state.membres && getMemberPP([...this.state.membres, this.props.user], item.item.id_membre)||""}
                        modify_actu = {this.state.user.niveau<2?(content)=>update_actu({identifiant:this.state.user.identifiant, pass:this.state.user.pass,
                        id_membre:item.item.id_membre, date:item.item.date, new_actu:content}, (reponse)=> load_actus(empty_data, (reponse)=>
                        {this.setState({actus: JSON.parse(reponse)})})):null}
                        />}
                        keyExtractor={(actu)=>hashCode(actu.actu+actu.date)} removeClippedSubviews/>:
            <ActivityIndicator size={25} color={"black"}/>}
            </View>
            
                


        <EditDialog visible={this.state.actuDialogVisible} inputCount={1}
            firstInputHandler={(text)=>{this.actuContent=text}} close={()=>this.setState({actuDialogVisible:false})}
            editButtonTitle="Editer l'actu" firstPlaceholder="Quelle bonne nouvelle allez-vous annoncer ?"
             editAction={()=>{this.create_actu()
             this.setState({actuDialogVisible:false})
        this.actuContent=""}}/>



            </View>


        )
    }
// Finaliser la fonction de l'affichage des log
    Logbox()
    {
        const logactivate = false;
        if (logactivate)
        {
            return(
                
                <View style={styles.logbox}>
                   
                   

                    <View style={{flex:1, flexDirection:"row"}}>

                        <View style={{flex:3, flexDirection:"row"}}>
                            {this.projectCard()}
                        </View>
                        <View style={{flex:4}}>
                            {this.memberCard()}
                            {this.eventCard()}
                        </View>

                    </View>
                </View>
            )
        }
        else
            return  (
            <View></View>
        )
    }

    componentDidMount(){
       
        this.interval = setTimeout(()=>{
            load_actus(null, (reponse)=>{this.setState({actus: JSON.parse(reponse)})})
            this.importEvents();
           this.importMembers();
           this.importProjects();
       }, 30000)
       
       this.setHeader();
    }
    componentWillUnmount()
    {
        clearInterval(this.interval)
    }

  
    render()
    {
        let date = new Date()
        let message;
        if (date.getHours()>16) message = "buy Airpods" //"BONSOIR"
        else message = "BIENVENUE";
        
        
        return(
            <ScrollView style = {{flex:1, backgroundColor:"white"}} contentContainerStyle={{backgroundColor:"white"}}>

            <Text style={styles.bienvenue}>{message}, {this.props.user.prenom.toUpperCase()}</Text>

            {/*
            ajouter au dessus des noms des buttons les icones
                */}
                {this.Logbox()}

                                  
                        <View style={styles.view_themes}>
                            <View style={{flexDirection:"row", flex:1}}>
                                    <TouchableOpacity style={{...styles.carte_theme, backgroundColor:"#EB186F"}} 
                                        onPress={()=>this.props.navigation.navigate("Membres", {user:this.props.user})}>
                                        <Text style={styles.textetheme}>
                                            MEMBRES {/*<Icon name = "users" type = "Entypo" color = "white" iconStyle = {styles.icon}></Icon>*/}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{...styles.carte_theme, backgroundColor:"#F2322C"}}
                                        onPress={()=>this.props.navigation.jumpTo("Projet")}>
                                        <Text style={styles.textetheme}>PROJETS</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{...styles.carte_theme, width:windowWidth, 
                                        backgroundColor:"#DB5132"}} onPress={()=>this.props.navigation.jumpTo("Agenda")}>
                                    <Text style={styles.textetheme}>EVENEMENTS</Text></TouchableOpacity>

                                    <TouchableOpacity style={{...styles.carte_theme, width:windowWidth, 
                                        backgroundColor:"#F26E2C"}} onPress={()=>this.props.navigation.jumpTo("Agenda")}>
                                    <Text style={styles.textetheme}>LOG</Text></TouchableOpacity>
                                 
                            </View>
                         </View>

                            {this.actuBox()}

                

            </ScrollView> 
                       
        )
    }
}

// il va falloir adapter le designe entierement en noir
const styles = StyleSheet.create(
    {
      bienvenue:{
          alignSelf:"center",
          fontSize:22,
          fontWeight:"bold",
          margin: 10
      },
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
       }, icon:
       {
           marginLeft: 10,
           marginTop: 50,
           alignSelf: "flex-start",
       },
       Titre:{
           flex:1, 
           flexDirection:"row",
           justifyContent:"space-between",
           marginTop:10,
           alignItems:"center",
           padding:5
       },
      
      titreCategorie:{
          fontSize:20,

      },
      view_themes:{
        alignItems: 'center',
        justifyContent:"center",
        marginTop: 0,
        height:80
      },
      carte_theme:{
            flex:1,
          alignItems:"center",
          justifyContent:"center"          
      },
      textetheme:{
          textAlign:"center",
          color:"white",
          fontSize:15,
          fontWeight:'bold',
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
          
       },
       CarteMembre:
       {
        
           width: 150,
           height: 290,
           marginRight: 10,
           marginTop:0,
           overflow: "hidden",
           paddingLeft:5,
          borderRadius: 20,
          borderWidth:1,
          backgroundColor:"white",
          
       },
       
       categorie:
       {
           flex:1,
           //height : 290
           
       },
      
       textetitre:{
            fontSize:25,
            color:"black",
            fontWeight:"bold",
            marginTop:20,
            justifyContent:"center",
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

       textecarte:
       {
           flex:4,
          
       }, icon:
       {
        alignSelf:"center", 
        justifyContent:"center",
        alignSelf: "flex-start",
        margin: 10
       },

      actu:
      {
          backgroundColor:colors.darkgrey,
          margin:5,
          borderRadius:40,
          //borderBottomLeftRadius:2,
          padding:10,
          fontSize:18,
          borderWidth:3,
          borderColor:colors.darkgrey
      },
     
       

/*

Ligne de code pour changer une image contre une dans le tel.

 <View style = {styles.conteneurimage}>
                            <Image source={this.state.image?{uri:this.state.image}:require("./ressources/logo.png")}
                                    style= {{width:120, height:120, alignSelf:"center" , borderRadius:15}}/>
                    </View>

     <Button title="Choisir une image " onPress={()=>this.openImagePickerAsync()} width={100}/>
                    <Text>contenue</Text>

                </View>

*/







       
       
    }

   
                

)
