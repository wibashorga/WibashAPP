import React from 'react';
import {Text, View, Modal, StyleSheet,Dimensions, FlatList, SafeAreaView, ScrollView,Button, Image,StatusBar} from 'react-native';
import {load_events, load_members, load_projects, load_actus, create_actu} from "../../API/api_request";
import {url} from "../../API/api_table";
import {Icon} from "react-native-elements";
import {formatPostData} from "./security"
//import image from "./ressources/fondprojet.jpg";
import * as ImagePicker from "expo-image-picker";
import { EditDialog } from './ModalDialog';
import { TouchableOpacity } from 'react-native';
import { sqlToUserDate, WiText } from './custom';

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
function setListAsPairs(array)
{
    let l = [];
    let max = (array.length%2 == 0)?array.length-1:array.length-2;
    let i;
    for (i = 1; i <= max; i+=2)
    {
        l.push([array[i-1], array[i]])
    }
    if (i===array.length) l.push([array[array.length-1]])
    return l;
}
const hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString();              
  }

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
                <WiText>{this.props.projet.description}</WiText>
                
            </View>
        )
    }
}
class DoubleCarteMembre extends React.Component
{
    constructor(props)
    {
        super(props);
        this.membre1 = this.props.membres[0];
        this.membre1.role = ["dev", "administrateur", "membre", "visiteur"][this.membre1.niveau]
        if (this.props.membres.length==2)
        {
            this.membre2 = this.props.membres[1];
        this.membre2.role = ["dev", "administrateur", "membre", "visiteur"][this.membre2.niveau]
        }
        
        
    }
    memberDescritpion(membre)
    {
     return(
        <View style={styles.CarteMembre}>
          <Image source={{uri:membre.photo_profil||"./ressources/logo.png"}} 
                style= {{width:100, height:100, alignSelf:"center" , borderRadius:15}}></Image>
            
        <Text style = {{fontWeight:"bold"}}>{membre.prenom+" "+membre.nom}</Text>
        <Text  style = {{fontWeight:"bold"}}>Role: </Text>
        <Text> {membre.role}</Text>
        <Text  style = {{fontWeight:"bold"}}>Histoire: </Text>
        <Text > {membre.story}</Text>
    </View>
     )   
    }
    render()
    {

        if (this.props.membres.length==2)
        {
        return(
            <View style={{flexDirection:"row"}}>
            <View style={styles.CarteMembre}>
                {this.memberDescritpion(this.membre1)}
            </View>
            
            <View style={styles.CarteMembre}>
           
                {this.memberDescritpion(this.membre2)}
            </View>
            </View>
        )}else{
            return(
             <View style={styles.CarteMembre}>
            {this.memberDescritpion(this.membre1)}
            </View>   
            )
        }
    }
}


class CarteActu extends React.Component
{
    constructor(props)
    {
        super(props); 
          
    }
    render()
    { return(
            <View>
                <WiText style={styles.actu}>
                    {this.props.actu.actu}</WiText>
                    <Text style={{alignSelf: "flex-end"}}>{sqlToUserDate(this.props.actu.date)}</Text>

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
            membres: [],
            events: this.props.events || [],
            image:"",
            actuDialogVisible:false,
            actus:[],
            enableScrollViewScroll: true,
        }
        
        this.importProjects();
        this.importMembers();
        this.importEvents();
        
        
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
            headerTitleStyle:{color:"white", alignSelf:"center", marginLeft:-50, fontSize:23},
            headerLeft:()=>(<Icon name = "menu" type = "Entypo" color = "white" iconStyle = {styles.icon}
            onPress={()=>{this.props.navigation.navigate("Profils")}}/>
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
        if (this.props.navigation.isFocused() && !force)
        {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
       
        load_members(data,(json) => {
            json = JSON.parse(json);
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
       return( <View style={styles.card}>
                <Text style={styles.textetitrestatut}>MEMBRES</Text>
                <Text>Nous comptons {this.state.membres.filter((p)=>p.niveau<3).length+(this.state.user.niveau<3?1:0)} membres</Text>
                <Text>Mais aussi {this.state.membres.filter(p=>p.niveau==3).length} visiteurs</Text>
                
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
        console.log("render")
        
        
        return(
            <ScrollView style = {{flex:1}}
            >

                <Text style={styles.bienvenue}>BIENVENUE, {this.props.user.prenom.toUpperCase()}</Text>
                
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
                            <TouchableOpacity onPress={()=>load_actus(empty_data, (reponse)=>
            {this.setState({actus: JSON.parse(reponse)}); console.log(reponse)})}
                            ><Icon name="refresh" type="evilicon" size={35}/></TouchableOpacity>
                        <View style={{height:240}}>
                        <FlatList nestedScrollEnabled={true} data={this.state.actus} renderItem={(item)=>
                        <CarteActu actu={item.item}/>} keyExtractor={(actu)=>hashCode(actu.actu+actu.date)}/>
                        </View>
                        
                            {(this.props.user.niveau<2)?<Button style={styles.bontonActu}
                                title="ajouter actualite" 
                                color = "red"
                                onPress={()=>{this.setState({actuDialogVisible:true})}} 
                                /*Remplacer par un logo plus *//>:null}


                    <EditDialog visible={this.state.actuDialogVisible} inputCount={1}
                        firstInputHandler={(text)=>{this.actuContent=text}} close={()=>this.setState({actuDialogVisible:false})}
                        editButtonTitle="Editer l'actu" firstPlaceholder="Quelle bonne nouvelle allez-vous annoncer ?"
                         editAction={()=>{this.create_actu()
                         this.setState({actuDialogVisible:false})
                    this.actuContent=""}}/>
            


                        </View>

                </View>



                <View style = {styles.categorie} /* modifier le style*/ >

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > Les basheurs : </Text>
                            
                        </View>

                        <View style = {{...styles.containtcarte, height:300}}>
                            <FlatList nestedScrollEnabled={true} data={setListAsPairs(this.state.membres)} keyExtractor={(item)=>
                            item[0].identifiant}
                    renderItem= {(item)=><DoubleCarteMembre membres = {item.item}/>}   horizontal = {true}/>
                       

                        </View>
                </View>




                <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {styles.textetitre} > EVÈNEMENTS </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                            <FlatList data={this.state.projets.slice(0,5)} keyExtractor={(item)=>item.ID} 
                    renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>
                        
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
          
       },
       CarteMembre:
       {
        
           width: 140,
           height: 290,
           marginRight: 10,
           marginTop:0,
           overflow: "hidden",
           paddingLeft:5,
          borderRadius: 20,
          backgroundColor:"white",
          
       },
       
       categorie:
       {
           flex:1,
           //height : 290
           
       },
       Titre:
       {
           //height:50,
           
           
       },
       textetitre:{
            fontSize:30,
            color:"black",
            fontWeight:"bold"
       },
       textetitrestatut:
       {
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
      },
      actu:
      {
          backgroundColor:"white",
          margin:5,
          borderRadius:10,
          padding:6,
          fontSize:18
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
