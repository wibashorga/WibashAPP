import React, {useState} from "react";
import { View, Dimensions, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import {Text} from "react-native"
import {EditDialog, DetailDialog, SuccesMessage, ModalFrame} from "./ModalDialog"
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";


export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const mediumFontSize = windowWidth/13;

export const lightBlue ="rgb(156,220,254)";
export const colors ={
  lightBlue:"rgb(156,220,254)",//bleu clair
  green:"rgb(220,252,198)",
  red:"red",
  blue:"rgb(0, 150, 190)",
  brown:"rgb(78,0,0)",
  darkgrey:"rgb(32,32,32)",
  chocolate:"rgb(47, 16, 0)",
  yellow:"rgb(250, 190, 14)"
}
export type EditBox = EditDialog;
export type DetailBox = DetailDialog;
//export const SuccesMessage = SuccesMessage;


export const months_long = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet",
"Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
export const months_short = ["Jan.", "Fev.", "Mars", "Avr.", "Mai", "Juin", "Juil.",
"Aout", "Sep.", "Oct.", "Nov.", "Dec."]

export class WiFlatButton extends React.Component
{
  constructor(props)
  {
    super(props)
  }
  render(){
    return(
      <TouchableOpacity 
                 onPress={this.props.onPress}>
                    <Text style={{color:"white", alignSelf:"center"}}>CONFIRMER</Text>
                    </TouchableOpacity>
    )
  }
}

export function LoadingScreen(message = "Chargement...", color="black")
{
  return(
    <View>
      <Text>Chargement...</Text>
      <ActivityIndicator color={color} size={25}/>
    </View>
  )
}


export class WiText extends React.Component
{
  constructor(props){
    super(props)
    this.state = {fontsLoaded:false}
    
    
  }
  split(text)
  {
    this.text = text
    let customizable = false;

    
    if (typeof this.text === typeof "a") customizable= true;
    else {
        try{
          //this.text.push("")  
          this.text=this.text.join("")
            customizable = true
        }catch(e){}
    }
    if (customizable)
    {
    let boldRegexp = /[ \n]\*[^*]+\*[ ;,.]/g
    let plainText = this.text.split(boldRegexp)
    let boldText = this.text.match(boldRegexp) || []
    
    boldText = boldText.map((item)=>{
      let start = item.startsWith("*")?1:2
      let endPad = item.endsWith("*")?1:2;
      let lastChar = (item[item.length-1]==="*")?"":item[item.length-1];
      //console.log("item", item, "/slice :", item.slice(start, item.length-endPad), "/ last char :", lastChar)
    return(<Text style={{fontWeight:"bold"}}>
      {" "+item.slice(start, item.length-endPad)+lastChar}</Text>)})

    let flattened = [];
    for (let i = 0; i < plainText.length; i++)
    {
      flattened.push(plainText[i])
      if (i<boldText.length) flattened.push(boldText[i])
    }
    this.text = flattened
  }
  return this.text

  }
  /*async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Montserrat: require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),      
    });
    this.setState({ fontsLoaded: true, police:"Montserrat" });
  }*/
  
   render()
   {
       
     return(
       
       <Text dataDetectorType="all" style={this.props.style} selectable={true}
       numberOfLines={this.props.numberOfLines || null}>{this.split(this.props.children)}
       </Text>
       
     )
   }
}

class WiCard extends React.Component
{
  constructor(props)
  {
    super(props);

  }
  componentDidMount()
  {
    if (this.props.onload) this.props.onload()
  }
  render()
  {
    if (this.props.type=="small")
    {

    }
    if (this.props.type=="big")
    {

    }
  }
}
export function IdleBackground(){
  return (
    <View style={styles.idle}>
      <Image source = {require("../ressources/idle.jpg")} style={styles.idleImage}/>
    </View>
  )
}

const FormSheetElement = (props)=>(
  <TouchableOpacity style={styles.formSheetElement} onPress = {props.onPress}>
      <Text>{props.text} </Text>       
  </TouchableOpacity>
)

export function FormSheet(props) {
  const [visible, setVisible] = useState(false)
  return (
    <View style={styles.container}>
        <Text style={{marginBottom:10}} >{props.title}</Text>
      <TouchableOpacity onPress = {()=>setVisible(true)} style={styles.fsContent}>
          <Text style={{color:"rgb(27, 161, 205)"}}>{props.content + " ↓"}</Text>
      </TouchableOpacity>
      
      <ModalFrame visible = {visible} close = {()=>setVisible(false)}>
      <View style={styles.popupForeground}>
                  <FlatList data= {props.data} renderItem = {item=><FormSheetElement text={item.item} 
                  onPress = {()=>{props.setElement(item.item); setVisible(false)}}/>} 
                  keyExtractor={item=>item}/>
              </View>
      </ModalFrame>
      

    </View>
  );
}


/**Transforme une date au format date ou datetime SQL en date lisible par l'utilisateur
 * date : string date au format sql
 * type : si type vaut "heure" et que le format de date est datetime on affiche aussi l'heure
 * numericMonth: true --> le mois est affiché sous forme de nombre (par défaut : false)
 * shortMonth : si les mois ne sont pas au format numérique, affiche les mois sous forme abrégée (par défaut : false)
 * */
export function sqlToUserDate(date, type="date", numericMonth=false, shortMonth=false)
{
  let dataType = date.indexOf(":")!==-1?"heure":"date";
  let dateReg = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
  let hourReg = /[0-9]{2}-[0-9]{2}-[0-9]{2}/
  if (dateReg.test(date)==false) throw "Malheureusement la date ne possède pas un format correct (sqlToUserDate)";
  let finalDate =  date.match(dateReg)[0].split("-")
  let mois = parseInt(finalDate[1])
  if (numericMonth==false) {
    if (shortMonth) mois = month_short[mois-1]
    else mois = months_long[mois-1]
  }
    let jour = finalDate[2];
    let annee = finalDate[0];
  
  finalDate = jour+" "+mois+" "+annee;
  if (type=="heure" && dataType=="heure")
  {
    finalDate+= date.match(hourReg)[0]
  } 
  return finalDate;
}

const styles = StyleSheet.create({
  idle:{
    width:windowWidth
  },
  idleImage:{
    width:windowWidth,
    height:windowWidth, padding:5
  },
  popupBackground:{
    justifyContent: "center",
    alignContent: "center",
    flex:1,
    backgroundColor: "rgba(84, 84, 84, 0.5)",
    

},
popupForeground:{
    backgroundColor: "white",
    marginHorizontal:20,
    height: 260,
    paddingTop: 3
    
},
formSheetElement:{backgroundColor: "white", 
                    flex:1,
                    paddingLeft:5,
                    borderColor: "black", 
                    alignContent: "flex-start", 
                    borderTopWidth: 1, 
                    height:50},
                    fsContent:{
                        paddingVertical:10,
                        borderColor: "grey",
                        borderWidth: 1,
                        paddingHorizontal: 5
},
submit:{
  borderRadius:20,
  paddingHorizontal: 20,
  paddingVertical: 15,
  marginVertical: 10,
  shadowColor: "#000",
  shadowOffset: {
        width: 1,
        height: 5
      },
  shadowOpacity: 0.55,
  shadowRadius: 3.84,
  elevation: 10, 
}


})