import React from 'react';
import {Text, View, Modal, StyleSheet, FlatList,Button,Image, TouchableOpacity, ScrollView} from 'react-native';
const token = "PPlaFk63u4E6";
import * as ImagePicker from "expo-image-picker";
import { ButtonGroup, Icon } from 'react-native-elements'

/*
const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous", "Anthony COLVIL est un homme parfait"];
*/

class GroupOfButton extends React.Component {
    constructor () {
        super()
        this.state = {
          selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.component1 = () => /*<TouchableOpacity style={{}}>BOis</TouchableOpacity>//*/<Text>Hello</Text>
        this.component2 = () => <Text>World</Text>
        this.component3 = () => <Text>ButtonGroup</Text>
      }
      updateIndex (selectedIndex) {
        this.setState({selectedIndex})
      }
      setHeader() {
        this.props.navigation.setOptions({
          headerShown: false
        })
      }

      componentDidMount(){
        this.setHeader();
      }

      render () {
        const buttons = [{ element: this.component1 }, { element: this.component2 }, { element: this.component3 }]
        const { selectedIndex } = this.state
        return (
          <ButtonGroup
            selectedIndex={selectedIndex}
            onPress={this.updateIndex(selectedIndex)}
            buttons={buttons}
            containerStyle={{height: 100}} />
        )
      }
}

selector = new GroupOfButton;

export default class Profil extends React.Component {
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

      setHeader() {
        this.props.navigation.setOptions({
          headerShown: false
        })
      }
      
      componentDidMount(){
        this.setHeader();
     }
     
    render()
    {
        
        return(
            <ScrollView style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={styles.text}>Profil</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Icon type='feather' name='user' raised='true' color='lightgrey'/>
                    <Icon type='feather' name='mouse-pointer' raised='true' color='lightgrey'/>
                    <Icon name='sc-telegram' type='evilicon' raised='true' color='lightgrey'/>
                    <Icon name='chart' type='evilicon' raised='true' color='lightgrey'/>
                </View>
                    <View style={styles.body}>
                        {/*{selector.render()}*/}
                        <View style={styles.infoPlates}>
                            <TouchableOpacity style={styles.statusPlate1}/>
                            <TouchableOpacity style={styles.statusPlate2}/>
                            <TouchableOpacity style={styles.statusPlate2}/>
                            <TouchableOpacity style={styles.statusPlate2}/>
                        </View>
                    </View>
            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
    header:{
        height: 120,
        backgroundColor:'red',
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
        borderRadius:5,
        backgroundColor:'red',
        height:70,
        width: '100%',
        //shadowOffset: {width: 100, height:100},
        shadowOpacity: 0.5
    },
    statusPlate2:{
        marginTop: 20,
        borderRadius:5,
        backgroundColor:'lightgrey',
        height:70,
        width: '100%',
        shadowOpacity: 0.5
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