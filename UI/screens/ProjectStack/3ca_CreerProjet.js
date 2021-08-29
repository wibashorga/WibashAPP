import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions,Platform, Switch, TextInput, ScrollView, TouchableOpacity,Alert} from 'react-native';
import {Button} from "react-native-elements"
import {Picker} from "@react-native-picker/picker";
import {formatPostData} from "../../custom/security";


const token = "PPlaFk63u4E6";
const os = Platform.OS;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const types = [{label:"Robotique", value:"Robotique"},
{label:"Programmation", value:"Programmation"}, {label:"Evenement", value:
"Evènement"}, {label:"autre", value:"Autre"}]



function message(titre, phrase)
{
    Alert.alert(titre, phrase, [
        {
            text:"OK",
            onPress: ()=>{}
        }
    ])
}


export default class NewProject extends React.Component
{
    constructor(props)
    {
        super(props);
        this.nom = "";
        this.description = "";
        this.objectifs = "";
        this.open = 1;
        this.state = {type:"Programmation", level:"3",
    open:true}
    }
    //génère un identifiant aléatoire pour le projet
    generateID(){
       let id = null;
        try{do
       {
        id = (Math.random()*1000000).toString();
        id = id.slice(0,5);
       }while(this.props.projets.map((p)=>p.ID).indexOf(id)!==-1);
        return id;}
        catch(error){
            return (Math.random()*1000000).toString();
        }

    }
    generateAvailableLevels(){
        if (this.props.user.niveau==2)
        {
            return [{label:"Visible pour tous", value:"3"}, 
            {label:"Uniquement les membres", value:"2"}]
        }
        if (this.props.user.niveau==1)
        {
            return [{label:"Visible pour tous", value:"3"}, 
            {label:"Uniquement les membres", value:"2"},
            {label:"Projet administrateur", value:"1"}]
        }
        if (this.props.user.niveau==0)
        {
            return [{label:"Visible pour tous", value:"3"}, 
            {label:"Uniquement les membres", value:"2"},
            {label:"Projet administrateur", value:"1"},
            {label:"Projet dev", value:"0"}]
        }
        return []
    }
    sendProject()
    {
        if (!this.state.type) this.state.type = "Programmation";
        if(this.nom && this.description && this.objectifs && this.state.type)
        {
        let data = new FormData();
        //this.description = encode_utf8(this.description);
        data.append("token", token);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("id_proj", this.generateID());
        data.append("nom", this.nom);
        data.append("description", this.description);
        data.append('objectifs', this.objectifs);
        data.append("type", this.type);
        data.append("minimal_level", this.state.level);
        data.append("open", this.open.toString())
        data = formatPostData(data);

        fetch('https://www.ypepin.com/application/Create/CreaProj.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        if (text.search("200")!==-1) {
            
            this.props.navigation.navigate("projets", {refresh:true});
        }else{
            message("Oups", 
            "Nous n'avons pas pu créer votre projet. Vérifiez que ce nom n'existe pas déjà...")
        }
        console.log(text)
            }
            ).catch(
            (error) => console.log(error))
        }else{
            Alert.alert("Erreur", "Veuillez remplir tous les champs", [
                {
                  text : "OK",
                  onPress: ()=> {}
                }])
        }
    }
    render()
    {
        StatusBar.setHidden(true);
        return(
        <ScrollView style = {styles.container} 
        contentContainerStyle={styles.content}
        contentInset = {{left:0, right:0, top:0, bottom:-20}}>
            
            
            <TextInput style = {styles.textinput} placeholder = {"Nom du projet"} 
            onChangeText = {(text)=>{this.nom = text}} style={{...styles.textinput}}
            autoCapitalize={"words"}
            ></TextInput>

           <View style={(os=="ios")?styles.iospicker:null}>
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
         </View>





         <View style={(os=="ios")?styles.iosobject:null} >


         <TextInput onChangeText = {(text)=>{this.objectifs = text}}
            placeholder = {"Objectifs"} style={{...styles.textinput, height:windowHeight/4,
            width:windowWidth*0.95}}
            multiline = {true}/>
                
            
                <TextInput placeholder={"Mon projet en quelques mots"} 
                placeholderTextColor = {"black"}
                style={{...styles.textinput, height:windowHeight/3.5,}}
                 onChangeText = {(text)=>{this.description = text}}
                multiline={true}>

                    
                </TextInput>
        <View style={(os=="ios")?styles.iospicker2:null}>

            <View>
            <Picker style= {styles.openSwitchView}
                    selectedValue={this.state.level}
                    style={{height: 50, width: 250}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({level: itemValue})
                    }>
                        {this.generateAvailableLevels().map((type)=>(
                            <Picker.Item label={type.label} value={type.value} />        
                        ))}
                    
                    </Picker>

            </View>




            <View style={(os=="ios")?styles.iosobject2:null}>

            <View>
               </View>         
                <View >
                     {this.state.open?(
                     <Text>Ouvert{"\n"}
                     <Text style={{fontSize:12, color:"rgb(100,100,100)"}}>les participants s'inscrivent librement au projet</Text></Text>):
                     (<Text>Fermé{"\n"}
                         <Text style={{fontSize:12, color:"rgb(100,100,100)"}}>seul le chef de projet peut 
                         ajouter des participants</Text>
                     </Text>)}
                     <Switch onValueChange={(value)=>{this.setState({open:!this.state.open}); this.open = value?1:0}}
                     value={this.state.open}/>
                 </View>
            </View>
                <Button title="CREER !" buttonStyle={styles.sendbutton} 
                onPress = {()=>this.sendProject()} />      



         </View>

            </View>
            <View style={(os=="ios")?styles.margebas:null}>

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
            fontSize: 20,
            
        },
        textinput:
        {
            width: windowWidth*0.95,
            height: 30,
            alignSelf: "center",
            margin: 20,
            color: "black",
            padding:7,
            textAlignVertical:'top',
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
            width: windowWidth*0.8,
            height: 50,
            alignSelf: "center",
            margin: 20,
            backgroundColor: "red",
            padding:5,
            shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:4.30,
            elevation:12
            
            
        },
        openSwitchView:{
            borderTopWidth:0.5,
            margin:2.5,marginBottom:10
        },
        iospicker:{
            marginVertical:-50,
            alignSelf:"center"
            
        },
        iosobject:{
            marginTop:190,
            alignSelf:"center"
        },
        iosobject2:{
            marginTop:170,
            

        },iospicker2:{
            marginVertical:-40,
            alignSelf:"center"

        },
        margebas:{
            width:150,
            height:90,
        }
    }
)
