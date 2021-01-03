import React from 'react';
import Header from "./Header.js";

import {Text, View, Modal, StyleSheet, ScrollView, TouchableOpacity, FlatList,ImageBackground, TextInput, Dimensions} from 'react-native';
import{Button} from "react-native-elements";
import { EditDialog, DetailDialog } from './ModalDialog.js';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const token = "PPlaFk63u4E6";
//fonction de hachage
const hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString();              
  }
const mois = ["Janvier", "Février", "Mars", "Avril",
"Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
const today = new Date();

//Chaque event est représenté par une carte individuelle
class Carte extends React.Component
{
    constructor(props)
    {
        super(props);
        
        var split = this.props.event.date.split("-");
        this.mois = mois[parseInt(split[1])-1]
        this.jour = split[2];
        this.annee = split[0];
        this.urgent = (split[0]==today.getFullYear() && split[1]==today.getMonth()+1
        && parseInt(split[2])-today.getDate()<=2);
        this.state = {visible:false}
        
    }
    
    eventDialog()
    {
        const close = ()=>this.setState({visible:false})
        return(
            <DetailDialog visible = {this.state.visible} 
            close = {close}
            titre ={this.props.event.nom} description = {this.jour+" "+this.mois+" "+this.annee+
        "\n"+(this.props.event.description||"")} editAction={(this.props.user.niveau<=1&& 
            !(this.props.event.projet))?(()=>this.props.navigation.navigate("modify_event", {event:this.props.event})):null} auxiliarAction ={close}
        auxiliarActionTitle={(this.props.event.projet)?null:'Participer'}/>
        )
    }
    render()
    {
            return(
                <View>
                <TouchableOpacity onPress= {()=>{
                    //this.props.onPress()
                    this.setState({visible:true})
                }}
                style={{...styles.carte, backgroundColor:(this.urgent)?"red":this.props.event.projet?"rgb(156,220,254)":"white"}}>
                    <View style={styles.imagecarte}>
                    </View>
    
                    <View>
                    <Text style = {{fontWeight:"bold", alignSelf:"center",
                fontSize: 22, color:(this.urgent)?"white":"black"}}>
                        {this.props.event.nom}</Text>
                    <Text style={{color:(this.urgent)?"white":"black"}}>
                        {this.jour+" "+this.mois+" "+this.annee}
                        </Text>
            <Text style= {{color:(this.urgent)?"white":"black"}}>
                {"Type : "+this.props.event.type}</Text>
            <Text style={{color:(this.urgent)?"white":"black"}} numberOfLines={3}>
                {this.props.event.description}</Text>
                {this.props.event.projet?(<Text style={{fontStyle:"italic"}}>Projet</Text>):null}
                    </View>
                    
                </TouchableOpacity>
                {this.eventDialog()}
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
           events:this.props.events
        }
        
        this.importEvents();
        
    }
    importEvents()
    {
       if (this.props.navigation.isFocused())
       {
        fetch('http://www.wi-bash.fr/application/Read/ListEvent.php?identifiant='+this.props.user.identifiant).then(
            (reponse)=>reponse.text()).then((text)=>{
                
            this.setState({events:JSON.parse(text)})}).catch((error)=>console.log(error))
       }
    }
    //boucle de rafraichissement
    componentDidMount()
    {
        this.intervalID = setInterval(()=>this.importEvents(), 20000)
    }
    componentWillUnmount()
    {
        clearInterval(this.intervalID)
    }

    showButtonEdit()
    {
        if (this.state.user.niveau=="0" || this.state.user.niveau=="1")
        {
            return (
                <View>
                    <Button
                    title={"EDIT NEW EVENT"}
                    color={"red"}
                    onPress={()=>{this.props.navigation.navigate("new_event")}}
                   buttonStyle = {{color:"white", backgroundColor: "red", height:40}}
                    
                />
                </View>
            )
        }else return null;
    }

    render()
    {
        
        
        return(
            

                

                <ImageBackground source = {require('./ressources/evenmfond.jpg')} style={styles.image}>

                <View style={styles.containcarte}>
                    <FlatList data={this.state.events} keyExtractor={(item)=>hashCode(item.nom)} 
                    renderItem= {(item)=><Carte event = {item.item} user = {this.state.user}
                    navigation={this.props.navigation}/>} horizontal = {true}/>

                </View>
                



                <View style = {styles.containtcarte}>
                        

                </View>


                
                {this.showButtonEdit()}
                </ImageBackground>

                
                
          
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
           backgroundColor: "black"
           
           
           
       },
       image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignContent: "stretch",
        //paddingTop:100
      },

       
       
       titrecarte:
       {
           fontWeight:"bold",
           textAlign: "center",
           fontFamily: "roboto"
       },
       containcarte:
       {
           flex : 1,
           paddingVertical:50,
           marginTop: (windowHeight/2)-200
          
           //backgroundColor:"red"
           
       },
       description:
       {
           fontFamily: "roboto",
           overflow: "hidden"
       },
       carte:
       {
        
           width: 160,
           height: 150,
           marginRight: 20,
           marginTop:30,
           overflow: "hidden",
           paddingLeft:10,
          borderRadius: 20,
          backgroundColor:"white",
          opacity:0.8,
          shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:8.30,
            elevation:14

          
       },
       eventDialog:{
        marginTop:(windowHeight/2)-200,
        backgroundColor:"white",
        paddingTop: 20,
        paddingBottom:40,
        marginHorizontal: 30,
        borderRadius:20
       },
       modifyInput:
       {
        margin:15,
        textAlignVertical: "top"
       }
       ,participate:{
           backgroundColor:"transparent",
           marginTop:10

       },
       buttonParticipate:
       {
           width:windowWidth/3.5,
           alignSelf: "center",
           
           
       }
    }
)
// Attention dans evenement il y a les enement premiere ligne
// ET les Votes second lignes test ;p;
