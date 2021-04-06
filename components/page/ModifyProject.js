import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions, Switch, TextInput, ScrollView,Platform, TouchableOpacity,Alert} from 'react-native';
import {Button} from "react-native-elements"
import {Picker} from "@react-native-picker/picker";
import {formatPostData} from "./security";
import {LoadingMessage} from "./ModalDialog"


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


export default class ModifyProject extends React.Component
{
    constructor(props)
    {
        super(props);
        this.projet = this.props.route.params.projet;
        this.state = {type:this.projet.type, level:this.projet.minimal_level,
    open:this.projet.open,
loading:false}
    }
    //génère un identifiant aléatoire pour le projet
    
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
    updateProject()
    {
        if (!this.state.type) this.state.type = "Programmation";
        if(this.projet.nom && this.projet.description && this.projet.objectifs && this.state.type)
        {
        this.setState({loading:true})
            let data = new FormData();
        console.log(this.projet.type)
        //this.description = encode_utf8(this.description);
        data.append("token", token);
    
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("id_projet", this.projet.ID);
        data.append("nom", this.projet.nom);
        data.append("description", this.projet.description);
        data.append('objectifs', this.projet.objectifs);
        data.append("type", this.projet.type);
        data.append("minimal_level", this.projet.minimal_level);
        data.append("open", this.projet.open.toString())
        data = formatPostData(data);

        fetch('http://www.wi-bash.fr/application/Update/UpdateProject.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
            this.setState({loading:false})
            if (text.search("200")!==-1) {
            
            this.props.navigation.navigate("projets", {refresh:true});
        }else{
            
        }
        console.log(text)
            }
            ).catch(
            (error) => this.setState({loading:false}))
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
            
            <LoadingMessage close = {()=>this.setState({loading:false})} visible={this.state.loading} 
            message="Modifications en cours..."/>
            <TextInput style = {styles.textinput} defaultValue = {this.projet.nom} 
            onChangeText = {(text)=>{this.projet.nom = text}} style={{...styles.textinput}}
            autoCapitalize={"sentences"}
            ></TextInput>

           <View style={(os=="ios")?styles.iospicker:null}>

               
                <Picker
                    selectedValue={this.state.type}
                    style={{height: 50, width: 250}}
                    onValueChange={(itemValue, itemIndex) =>
                        {this.setState({type: itemValue}); this.projet.type = itemValue}
                    }>
                        {types.map((type)=>(
                            <Picker.Item label={type.label} value={type.value} />        
                        ))}
                    
                    </Picker>
                    </View>




            <View style={(os=="ios")?styles.iosobject:null}>


            <TextInput onChangeText = {(text)=>{this.projet.objectifs = text}}
            defaultValue = {this.projet.objectifs} style={{...styles.textinput, height:windowHeight/4,
            width:windowWidth*0.95}}
            multiline = {true}/>
                
            
                <TextInput defaultValue={this.projet.description} 
                style={{...styles.textinput, height:windowHeight/3.5,}}
                 onChangeText = {(text)=>{this.projet.description = text}}
                multiline={true}>

                    
                </TextInput>

            </View>


            
            
           <View>

               <View style={(os=="ios")?styles.iospicker2:null}>
                    <Picker
                            selectedValue={this.state.level}
                            style={{height: 50, width: 250}}
                            onValueChange={(itemValue, itemIndex) =>
                                {this.setState({level: itemValue}); this.projet.minimal_level = itemValue;
                            }
                            }>
                                {this.generateAvailableLevels().map((type)=>(
                                    <Picker.Item label={type.label} value={type.value} />        
                                ))}
                            
                            </Picker>

               </View>

               <View style={(os=="ios")?styles.iosobject2:null}>
                        <View style= {styles.openSwitchView}>
                                {this.state.open?(
                                <Text>Ouvert{"\n"}
                                <Text style={{fontSize:12, color:"rgb(100,100,100)"}}>les participants s'inscrivent librement au projet</Text></Text>):
                                (<Text>Fermé{"\n"}
                                    <Text style={{fontSize:12, color:"rgb(100,100,100)"}}>seul le chef de projet peut 
                                    ajouter des participants</Text>
                                </Text>)}
                                <Switch onValueChange={(value)=>{this.setState({open:!this.state.open}); this.projet.open = value?1:0}}
                                value={this.state.open}/>
                            </View>
                        </View>
                            <Button title="Enregistrer les modifcations" buttonStyle={styles.sendbutton} 
                            onPress = {()=>this.updateProject()} />
                            


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
            height: 23,
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
