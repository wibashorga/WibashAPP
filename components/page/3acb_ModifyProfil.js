import React from 'react';
import {Text, View, Modal, StyleSheet, FlatList,Button,Image, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { Icon, Avatar } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
const token = "PPlaFk63u4E6";

/*
const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous", "Anthony COLVIL est un homme parfait"];
*/


export default class Profil extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bienvenue : true
        };
        this.me = this.props.user;
        this.me.role = ["dev", "administrateur", "membre", "visiteur"][this.me.niveau]
        
    }
    async  openImagePickerAsync(){
        try{
        let permissionResult = {granted:true}//await ImagePicker.requestMediaLibraryPermissionsAsync(false);

    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
          }
          this.setState({image:pickerResult.uri})
        }catch(error){console.log(error)}
      }

      setHeader() {
        this.props.navigation.setOptions({
          headerShown: false
        })
      }
      
      componentDidMount(){
        this.setHeader();
     }
    
     updateProfil()
     {
       const data = new FormData();
       data.append("identifiant", this.props.user.identifiant);
       data.append("pass", this.props.user.pass);
       data.append("nom", this.me.nom);
       data.append("prenom", this.me.prenom);
       data.append("story", this.me.story);
       if (this.eventTitle) data.append("nouveau_nom", this.eventTitle)
       if (this.eventDescription) data.append("description", this.eventDescription);
       data = formatPostData(data)
       fetch('http://www.wi-bash.fr/application/Update/UpdateProfil.php', {
           method: 'POST',
           headers: {
           Accept: 'multipart/form-data',
           'Content-Type': "multipart/form-data; charset=utf-8"
           },
           body: data
           }).then((reponse)=> reponse.text()).then((text) => {
           
           console.log(text)
           this.props.navigation.goBack();
               }
               ).catch(
               (error) => console.log(error))
           
     }

    render()
    {
        
        return(
            <ScrollView style={{flex:1}}>

                <View style={styles.header}>
                    <View style={{justifyContent:'center'}}>
                        <Text style={styles.text}>Profil</Text>
                    </View>

                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'white', paddingRight:40, paddingLeft:40, paddingTop:20}}>
                    <Icon type='feather' name='user' color='lightgrey' size='30'/>
                    <Icon type='feather' name='mouse-pointer' color='lightgrey'/>
                    <Icon name='sc-telegram' type='evilicon' color='lightgrey' size='40'/>
                    <Icon name='chart' type='evilicon' color='lightgrey' size='40'/>
                    <Icon type='feather' name='globe' color='lightgrey' color='red'/>
                </View>

                    <View style={styles.body}>
                        <View style={styles.infoPlates}>

                            <View style={styles.statusPlate1}>
                                {/*<View style={{flexDirection:'row-reverse', margin:5}}><Icon type='octicon' name='pencil' color='grey'/></View>*/}
                                <View>
                                    <Text style={{fontWeight:"bold", color:'white'}}>Nom</Text>
                                    <TextInput defaultValue={(this.me.nom=='')?'...':this.me.nom} onChangeText={()=>{this.me.nom = text}} style={styles.textInput1}/>
                                </View>

                                <View style={{marginTop:25}}>
                                    <Text style={{fontWeight:"bold", color:'white'}}>Prénom</Text>
                                    <TextInput defaultValue={(this.me.prenom=='')?'...':this.me.prenom} onChangeText={()=>{this.me.prenom = text}} style={styles.textInput1}/>
                                </View>
                            </View>
                            
                            <View style={styles.statusPlate2}>
                                <Text style={{fontWeight:"bold"}}>Ma story</Text>
                                    <TextInput defaultValue={(this.me.story=='')?'...':this.me.story} onChangeText={()=>{this.me.story = text}} style={styles.textInput2}/>
                            </View>

                            <View style={styles.statusPlate2}>
                                <View>
                                    <Text style={{fontWeight:"bold"}}>Identifiant</Text>
                                    <TextInput defaultValue={(this.me.identifiant=='')?'...':this.me.identifiant} secureTextEntry={true} onChangeText={()=>{this.me.identifiant = text}} style={styles.textInput2}/>
                                </View>
                                
                                <View style={{marginTop:25}}>
                                    <Text style={{fontWeight:"bold"}}>Pass</Text>
                                    <TextInput defaultValue={(this.me.pass=='')?'...':this.me.pass} secureTextEntry={true} onChangeText={()=>{this.me.pass = text}} style={styles.textInput2}/>
                                </View>
                            </View>
                            
                            <TouchableOpacity style={{marginTop:30, borderWidth:1, padding:10, borderRadius:10, backgroundColor:'red'}} 
                                    >
                                    <Text style={{color:'white'}}>
                                        Enregistrer les modifcations
                                    </Text>
                            </TouchableOpacity>
                                {/*onPress = {()=>{this.updateProfil()}}*/}
                            <TouchableOpacity style={{marginTop:30, borderWidth:1, padding:10, borderRadius:10, backgroundColor:'blue'}} 
                                onPress={()=>{this.props.navigation.goBack()}}>
                                    <Text style={{color:'white'}}>
                                        Annuler
                                    </Text>
                            </TouchableOpacity>
                            
                        </View>

                    </View>
            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        height: 120,
        backgroundColor:'red',
        padding:20,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        marginTop: 40,
        fontSize: 20,
        color: 'white'
    },
    body:{
        flex:5,
        backgroundColor:'white'
    },
    infoPlates:{
        marginTop: 40,
        padding: 40,
        alignItems:'center',
        backgroundColor:'white'
    },
    statusPlate1:{
        borderRadius:10,
        backgroundColor:'red',
        width: '100%',
        //shadowOffset: {width: 100, height:100},
        shadowOpacity: 0.5,
        padding:10
    },
    statusPlate2:{
        marginTop: 20,
        borderRadius:10,
        backgroundColor:'lavender',
        width: '100%',
        shadowOpacity: 0.5,
        padding:10
    },
    textInput1:{
        marginTop:5, 
        color:'white',
        borderWidth:1, 
        padding:10, 
        borderRadius:10
    },
    textInput2:{
        marginTop:5, 
        borderWidth:1, 
        padding:10, 
        borderRadius:10
    },
    modificationButton:{
        marginTop:30, 
        borderWidth:1, 
        padding:10, 
        borderRadius:10
    }
})

/*
            <View style = {{flex:1}}>
                <View style = {styles.option}>
                    <View style = {styles.conteneurimage}>
                            <Image source={this.state.image?{uri:this.state.image}:require("./ressources/logo.png")}
                                    style= {{width:120, height:120, alignSelf:"center" , borderRadius:15}}/>
                    </View>

                        

                    <View style = {styles.logo}>
                        <Text> les medailles</Text>

                    </View>

                </View>



                <View style = {styles.contenue}>
                <Button title="Choisir une image " onPress={()=>this.openImagePickerAsync()} width={100}/>
                    <Text>contenue</Text>

                </View>
                
            </View>
            

        )
    }
}

const styles = StyleSheet.create(
    {
        option:{
            flex:1,
            flexDirection:"row",
        },
        contenue:{
          flex:5,
          backgroundColor:"yellow",  
        },
        conteneurimage:{
            flex:1,
            alignItems:"center",
            justifyContent:"center",
        },
        logo:{
            flex:2,
            backgroundColor:"green",
        }

    }
)
*/