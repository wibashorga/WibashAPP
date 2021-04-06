import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, TextInput, ScrollView, Alert} from 'react-native';
import {Button} from "react-native-elements";
import {LoadingMessage} from "./ModalDialog";
import {Picker} from  "@react-native-picker/picker";
import { formatPostData } from './security';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {create_event} from "../../API/api_request"


const token = "PPlaFk63u4E6";
const date = new Date();
const os = Platform.OS;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function message(titre, phrase)
{
    Alert.alert(titre, phrase, [
        {
            text:"OK",
            onPress: ()=>{}
        }
    ])
}


LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';


let days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const mois = ["Janvier", "Février", "Mars", "Avril",
    "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const types = [
        {label:"Réunion", value:"Réunion"},
        {label:'Evenement', value:"Evenement"},
        {label:"Sortie", value:"Sortie"},
        {label:"Journée de formation", value:"Journée de formation"},
        {label:"Autre", value:'Autre'}
        ]

export default class NewEvent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.nom = "";
        this.date = "";
        this.type = null;
        this.description = "";
        this.decisions = "";
        this.mois = null;
        this.jour = null;
        this.annee = date.getFullYear();
        this.state ={
            description:false,
            jours:days,
            date:this.props.route.params || null,
            type:"",loading:false
        };
        
        //this.handleMonthChange = this.handleMonthChange.bind(this);
        this.sendEvent = this.sendEvent.bind(this);
    }
    

    ajouterDescription()
    {
        return(
        <View>
            <Text style={styles.info}>Description : </Text>
                <TextInput placeholder={"Que va-t-il se passer ?"} 
                placeholderTextColor = {"grey"}
                style={{...styles.textinput, height:windowHeight/3.5,}}
                 onChangeText = {(text)=>{this.description = text}}
                multiline={true}>

                </TextInput>
                </View>
                
        )
    }
    //La fonction send event permet de creer un évènement dans la base de données
    sendEvent()
    {
        if(this.nom && this.state.type && this.state.date)
        {
        this.setState({loading:true})
        let type = this.state.type.toString();
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("nom", this.nom);
        data.append("date", this.state.date.dateString);
        data.append('type', type);
        if (this.decisions) data.append("decisions", this.decisions);
        if (this.description) data.append("description", this.description);
        data = formatPostData(data)
        
        create_event(data, (text) => {
                this.setState({loading:false})
                if (text.search("200")!==-1) {
                this.props.navigation.navigate("events", {refresh:true});
            }else message ('Oups', "Nous n'avons pas pu créer le nouvel évènement")}, ()=>this.setState({loading:false}))

        }else{
            
                message("Erreur", "Veuillez renseigner au moins le nom, le type et la date")
        }
    }
    render()
    {
        let today = new Date()
        today = today.toLocaleDateString().split("/")
        today = "20"+today[2]+"-"+today[0]+"-"+today[1]
        
        return(
        <ScrollView style = {styles.container} 
        contentContainerStyle={styles.content}
        contentInset = {{left:0, right:0, top:0, bottom:-20}}>
            
            <LoadingMessage close={()=>this.setState({loading:false})} visible = {this.state.loading}/>

            <TextInput style = {styles.textinput} placeholder = {"Nom de l'évènement"} 
            onChangeText = {(text)=>{this.nom = text}} style={{...styles.textinput}}
            autoCapitalize = {"sentences"}
            ></TextInput>

        
            <View style = {{flex:1, flexDirection:"row", marginVertical:10}}>
                
                <Calendar onDayPress = {(day)=>{this.setState({date:day});}} current= {this.props.route.params || null}
                markedDates={this.state.date?{[this.state.date.dateString]:{selected:true}}:null}
                minDate={today} style={styles.calendar}/>
                
            </View>

            <Text style= {styles.info}>Type : </Text>
           
        <View style={(os=="ios")?styles.pickerView:null}>
        <Picker
        selectedValue={this.state.type}
         style={{height: 60, width: 250}}
        onValueChange={(itemValue, itemIndex) =>
            this.setState({type: itemValue})
                    }>
                        {types.map((type)=>(
                            <Picker.Item label={type.label} value={type.value} />        
                        ))}
                    
                    </Picker>
                    </View>
            <View style={(os=="ios")?styles.descripost:null}>

                {this.ajouterDescription()}
                
                <Button buttonStyle={styles.sendbutton}onPress = {this.sendEvent} title="Post">
                    <Text  style={{color:"black", fontSize:25, textAlign:"center"}}>Poster</Text>
                    </Button>

            </View>
                
                
                    
            
        </ScrollView>
        )
    }
}
const styles = StyleSheet.create(
    {
        container:
        {
            
            flexDirection: "column",
            alignContent: "center",
            backgroundColor:"#F4F7F8",
            flex: 1
            
        },
        content:
        {
            justifyContent:"space-around", 
        },
        icon:
        {
            marginLeft: 10,
            marginTop: 40,
            alignSelf: "flex-start",
        },
        info:
        {
            color: "black",
            fontSize: 18,
            
        },
        calendar:{
            width:windowWidth-1,
            marginBottom:5
        },
        textinput:
        {
            height: 25,
            width: windowWidth*0.95,
            height: 30,
            alignSelf: "center",
            margin: 20,
            color: "black",
            padding:7,
            backgroundColor:"white",
            borderRadius:20,
            shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:8.30,
            elevation:14

            
        },
        sendbutton:
        {
            height: 30,
            borderColor: "black",
            fontSize:25,
            //borderWidth: 3,
            width: windowWidth*0.8,
            height: 50,
            alignSelf: "center",
            margin: 20,
            backgroundColor: "red",
            padding:15,
            borderRadius:20,
            shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:4.30,
            elevation:12
            
            
        },
        pickerView:{
            marginVertical:-80
        },
        descripost:{
            marginTop:198
        }
        
    }
)

const pickerStyles = StyleSheet.create({
    inputIOS: {
        width: 45,
        marginHorizontal : windowWidth/14,
        marginVertical: 20,
        flex:1,
          fontSize: 16,
        paddingHorizontal: 3,
        paddingVertical: 8,
        borderWidth: 0.5,
        alignSelf: "center",
        color: 'black',
    },
    inputAndroid: {
      width: 45,
      marginHorizontal : windowWidth/14,
      marginVertical: 20,
      flex:1,
        fontSize: 16,
      paddingHorizontal: 3,
      paddingVertical: 8,
      borderWidth: 0.5,
      alignSelf: "center",
      color: 'black',
    },
  });


  const pickerMonth = StyleSheet.create({
    inputIOS: {
        width: 100,
        marginHorizontal : windowWidth/14,
        marginVertical: 20,
        flex:1,
          fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        alignSelf: "center",
        
    },
    inputAndroid: {
      width: 100,
      marginHorizontal : windowWidth/14,
      marginVertical: 20,
      flex:1,
        fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      alignSelf: "center",
      
    },
  });
