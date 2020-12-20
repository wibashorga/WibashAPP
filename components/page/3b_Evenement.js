import React from 'react';
import Header from "./Header.js";

import {Text, View, Modal, StyleSheet, ScrollView, TouchableOpacity, FlatList,ImageBackground,Button,SafeAreaView} from 'react-native';
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
        
        console.log(split[1])
    }
    render()
    {
        if (this.props.user.niveau>=2){
        return(
            <View style={{...styles.carte, backgroundColor:(this.urgent)?"red":"white"}}>
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
        <Text style={{color:(this.urgent)?"white":"black"}}>
            {this.props.event.description}</Text>
                </View>
            </View>
        )}else{
            return(
                <TouchableOpacity onPress= {()=>this.props.onPress()}
                style={{...styles.carte, backgroundColor:(this.urgent)?"red":"white"}}>
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
            <Text style={{color:(this.urgent)?"white":"black"}}>
                {this.props.event.description}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
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
        fetch('http://www.wi-bash.fr/application/ListEvent.php').then(
            (reponse)=>reponse.text()).then((text)=>
            this.setState({events:JSON.parse(text)})).catch((error)=>console.log(error))
    }
    componentDidMount()
    {
        setInterval(()=>this.importEvents(), 10000)
    }

    showButtonEdit()
    {
        if (this.state.user.niveau=="0" || this.state.user.niveau=="1")
        {
            return (
                <View>
                    <Button
                    title={"edit new Event"}
                    color={"red"}
                    onPress={()=>{this.props.navigation.navigate("new_event")}}
                    
                />
                </View>
            )
        }else return null;
    }

    render()
    {
        
        
        return(
            <View style = {styles.conteneur}>

                <View style = {styles.Titre} >
                    <Text style  = {{fontSize : 25, color:"white"}}> EVENEMENTS </Text>


                </View>

                <ImageBackground source = {require('./ressources/evenmfond.jpg')} style={styles.image}>

                <View style = {styles.containimage}>
                    <FlatList data={this.state.events} keyExtractor={(item)=>hashCode(item.nom)} 
                    renderItem= {(item)=><Carte event = {item.item} user = {this.state.user}
                    onPress={()=>{this.props.navigation.navigate("modify_event", {event:item.item})}}/>} horizontal = {true}/>

                </View>
                



                <View style = {styles.containtcarte}>
                        

                </View>


                
                </ImageBackground>

                {this.showButtonEdit()}
                
                
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
           backgroundColor: "black"
           
           
           
       },
       image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
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
    }
)
// Attention dans evenement il y a les enement premiere ligne
// ET les Votes second lignes test ;p;
