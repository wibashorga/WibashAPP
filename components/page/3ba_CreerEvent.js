import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions, TextInput, ScrollView, Alert} from 'react-native';
import {Button} from "react-native-elements";
import CalendarPicker from "react-native-calendar-picker";
import {Picker} from  "@react-native-picker/picker";
import { formatPostData } from './security';


const token = "PPlaFk63u4E6";
const date = new Date();

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
            date:null,
            type:""
        };
        
        //this.handleMonthChange = this.handleMonthChange.bind(this);
        this.sendEvent = this.sendEvent.bind(this);
    }
    

    ajouterDescription()
    {
       if (this.state.description){ return(
        <View>
            <Text style={styles.info}>Description : </Text>
                <TextInput placeholder={"Que va-t-il se passer ?"} 
                placeholderTextColor = {"grey"}
                style={{...styles.textinput, height:windowHeight/3.5,}}
                 onChangeText = {(text)=>{this.description = text}}
                multiline={true}>

                </TextInput>
                </View>
                
        )}else
        {
            return (
                <View>
                    <Text style={styles.info} onPress = {()=>{this.setState({description:true})}}>
                        Ajouter une description ?
                    </Text>
                </View>
            )
        }
    }
    //La fonction send event permet de creer un évènement dans la base de données
    sendEvent()
    {
        if(this.nom && this.state.type && this.state.date)
        {
            
            this.date = this.state.date.split('/');
            this.date = this.date[2]+"-"+this.date[0]+"-"+this.date[1];
        let data = new FormData();
        let type = this.state.type.toString();
        console.log(type.replaceAll)
        data.append("token", token);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("nom", this.nom);
        data.append("date", this.date.toString());
        data.append('type', type);
        if (this.decisions) data.append("decisions", this.decisions);
        if (this.description) data.append("description", this.description);
        data = formatPostData(data)

        
        fetch('http://www.wi-bash.fr/application/Create/CreateEvent.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        console.log(text)
            if (text.search("200")!==-1) {
            
            this.props.navigation.navigate("events", {refresh:true});
        }else message ('Oups', "Nous n'avons pas pu créer le nouvel évènement")
        
            }
            ).catch(
            (error) => console.log(error))
        }else{
            
                message("Erreur", "Veuillez renseigner au moins le nom, le type et la date")
        }
    }
    render()
    {
        StatusBar.setHidden(true);
        
        return(
        <ScrollView style = {styles.container} 
        contentContainerStyle={styles.content}
        contentInset = {{left:0, right:0, top:0, bottom:-20}}>
            
            
            <TextInput style = {styles.textinput} placeholder = {"Nom de l'évènement"} 
            onChangeText = {(text)=>{this.nom = text}} style={{...styles.textinput}}
            autoCapitalize = {"sentences"}
            ></TextInput>

        
            <View style = {{flex:1, flexDirection:"row", marginVertical:10}}>
                
                <CalendarPicker onDateChange={(date)=>{this.setState({date:date.calendar()})}}
                months={mois} weekdays={days} startFromMonday={true}
                previousTitle="précédent" nextTitle="suivant" minDate = {new Date()}/>
                
            </View>

            <Text style= {styles.info}>Type : </Text>
           {/* <RNPickerSelect onValueChange = {(type)=>{this.type = type}}
            items={[
            {label:"Réunion", value:"Réunion", color:'black'},
            {label:'Evenement', value:"Evenement"},
            {label:"Sortie", value:"Sortie"},
            {label:"Journée de formation", value:"Journée de formation"},
            {label:"Autre", value:'Autre'}
            ]
            }
        placeholder= {{label:"Sélectionner un type...", value:null, color:'grey'}}
        style={styles.pickerStyle}
        //useNativeAndroidPickerStyle={false}
        />*/}
        <Picker
        selectedValue={this.state.type}
         style={{height: 50, width: 250}}
        onValueChange={(itemValue, itemIndex) =>
      this.setState({type: itemValue})
                    }>
                        {types.map((type)=>(
                            <Picker.Item label={type.label} value={type.value} />        
                        ))}
                    
                    </Picker>
                
                {this.ajouterDescription()}
                
                <Button buttonStyle={styles.sendbutton}onPress = {this.sendEvent} title="Post">
                    <Text  style={{color:"black", fontSize:25, textAlign:"center"}}>Poster</Text>
                    </Button>
                    
            
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
        textinput:
        {
            height: 20,
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
