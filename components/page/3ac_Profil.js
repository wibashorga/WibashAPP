import React from 'react';
import {Text, View, Modal, StyleSheet, FlatList,Button,Image} from 'react-native';
const token = "PPlaFk63u4E6";
import * as ImagePicker from "expo-image-picker";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous", "Anthony COLVIL est un homme parfait"];

export default class Reglage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bienvenue : true
        }
        
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

    
    render()
    {
        
        return(
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