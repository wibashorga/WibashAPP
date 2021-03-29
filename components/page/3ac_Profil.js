import React from 'react';
import {    
    Text, View, Modal, StyleSheet, FlatList,Button,Image, 
    TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { Icon, Avatar } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import {edit_my_account} from '../../API/api_request'
const token = "PPlaFk63u4E6";
/*
const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous", "Anthony COLVIL est un homme parfait"];
*/

const windowWidth = Dimensions.get("window").width;

// Pour l'affichage des champs du profil
const equivalences = {
    nom:'Nom',
    prenom:'Prénom',
    story:'Histoire',
    role:'Rôle',
    identifiant:'Identifiant',
    pass:'Mot de passe',
    competences:'Compétences',
    mail:'Adresse mail'
}


export default class Profil extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.user = this.props.user; //JSON.parse(JSON.stringify(this.props.user))
        this.user.role=["dev", "administrateur", "membre", "visiteur"][this.user.niveau];
        this.state = {
            nom:false, //[etat du node (true pour l'interface modification et false pour un simple affichage), un champ de l'utilisateur]
            prenom:false,
            story:false,
            role:false,
            identifiant:false,
            pass:false,
            /*
            competences:false,
            mail:false,
            */
            
        };
        this.temoin = JSON.parse(JSON.stringify(this.user))
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
    /*
      setHeader() {
        this.props.navigation.setOptions({
          headerShown: false
        })
      }
      
      componentDidMount(){
        this.setHeader();
     }
     */
    
    modifyAccountInfo () {
        let data = new FormData();
        data.append("identifiant", this.user.identifiant);
        data.append("pass", this.user.pass);
        data.append("nom", this.user.nom);
        data.append("prenom", this.user.prenom);
        data.append("story", this.user.story);
        data.append("niveau", this.user.niveau);
        
        edit_my_account(data,(reponse) => {
                if (reponse.indexOf("200")!==-1) {
                    console.log(reponse);
                    this.temoin = JSON.parse(JSON.stringify(this.user));
                    this.setState({nom:false, prenom:false, role:false, identifiant:false, pass:false, story:false});
                    //this.props.setUser(this.user);
                }
            },
            (error) => {
                if (reponse.indexOf("500")!==-1) {
                    console.log(error);
                }
            }
        );
    } 

    showModificationButtons() {
        console.log('bouton') //debug
        let stateEntries = Object.entries(this.state);
        let valuesToChange = [];
        if (this.state.nom || this.state.prenom || this.state.story || this.state.identifiant || this.state.pass || this.state.role) {
            for (let [key, val] of stateEntries) {
                if (val === true) {
                    valuesToChange.push(key);
                }
            }
            console.log('suspect 1', valuesToChange); //debug

            return(
                <View style={{alignItems:'center', marginBottom:30}}>
                    <TouchableOpacity style={{backgroundColor:'red', padding:10, width:windowWidth*0.5, alignItems:'center', borderRadius:10}}
                        onPress={()=>{this.modifyAccountInfo(); console.log('enregistrement')}}>
                        <Text style={{fontWeight:'bold', color:'white'}}>Enregistrer les modifications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop:10, backgroundColor:'blue', padding:10, width:windowWidth*0.5, alignItems:'center', borderRadius:10}}
                        onPress={()=>{console.log('user', this.user); console.log('temoin',this.temoin); //state.temoin);
                            //this.user[value] = 'test'}}//this.temoin[value]} } //state.temoin[value]} }; 
                            this.props.setUser(JSON.parse(JSON.stringify(this.temoin)));
                            //this.user = JSON.parse(JSON.stringify(this.temoin)); 
                            console.log('re-user:', this.user, '\nprops.user:', this.props.user);
                            this.setState({nom:false, prenom:false, role:false, identifiant:false, pass:false, story:false})}}>
                        <Text style={{fontWeight:'bold', color:'white'}}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return null;
        }
    }
    /*
    showModifiedsign(isModified) {
        if (isModified) {
            return(
                <View> 
                    <Text style={{fontWeight:'bold', color:'orange'}}>!</Text>
                </View>
            )
        }
    }
    */
    showModifiedSign(information) {
        if (this.temoin[information] != this.user[information]) { //state.temoin[information] != this.user[information]) {
            console.log('sign ?')
            return(
                <View style={{justifyContent:'flex-end', alignItems:'center', backgroundColor:'yellow'}}>
                    <Text style={{fontWeight:'bold', color:'orange'}}>!</Text>
                </View>
            )
        }
    }
    

    statutPlate(information) {
        if (this.state[information]) {
                     return(
                         <View style={(['nom','prenom'].includes(information))?
                            ((information=='nom')?styles.statusModificationPlate1a:styles.statusModificationPlate1b):styles.statusModificationPlate2}>
                             <View style={{marginRight:10, flex:8}}>
                                 <Text style={{fontWeight:"bold", color:(['nom','prenom'].includes(information))?'white':'black'}}>{equivalences[information]}  : </Text>
                                     <TextInput defaultValue={(this.user[information]=='')?'...':this.user[information]}
                                         secureTextEntry={(['pass','identifiant'].includes(information))?true:false}
                                         onChangeText={(text)=>{this.user[information] = text; 
                                            console.log('in biten', this.user[information], this.props.user[information]); 
                                            this.showModifiedSign(information)}}
                                         returnKeyType='done' style={[styles.textInput, {borderColor:(['nom','prenom'].includes(information))?'white':'black',
                                         color:(['nom','prenom'].includes(information))?'white':'black'}]}>
                                     </TextInput>
                             </View>
                             
                             {/*
                             {this.showModifiedSign(information)}
                             {this.modificationDetector(information)}
                             {this.setState({modified:(this.state[information] != this.state.temoin[information])?true:false})}
                             <View>
                                 <Icon type='octicon' name='check' color='lightgreen' onPress={()=>{this.modifyAccountInfo(information)}}/>
                                 <Icon type='octicon' name='x' 
                                    color={(['nom','prenom'].includes(information))?'fuchsia':'red'} 
                                    onPress={()=>{this.setState((state,props) =>{return {[information]:false}});
                                        this.state.user[information] = this.temoin[information]}}/>
                             </View>
                             */}
                         </View>   
                     )
        }
            
        
        else {
                return(
                    <View 
                        style={(['nom','prenom'].includes(information))?
                            ((information=='nom')?styles.statusPlate1a:styles.statusPlate1b):styles.statusPlate2}>
                        <View style={{marginRight:10, flex:8}}>
                            <Text style={(['nom','prenom'].includes(information))?
                                {fontWeight:"bold",color:'white'}:{fontWeight:"bold"}}>
                                {equivalences[information]} : {(this.temoin[information]=='')?'...':this.temoin[information]} {/*state.temoin[information]=='')?'...':this.state.temoin[information]}*/} 
                            </Text>
                        </View>
                        <View>
                            <View style={{flex:1}}>
                                <Icon type='octicon' name='pencil' 
                                color={(['nom','prenom'].includes(information))?'lightgrey':'grey'} 
                                size='20' 
                                onPress={()=>{this.setState({[information]:true})}}/>
                            </View>
                        </View>
                    </View>
                )
            }
        
    }

    render()
    {
        
        return(
            <ScrollView style={{flex:1}}>

                
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'white', paddingRight:40, paddingLeft:40, paddingTop:20}}>
                    <Icon type='feather' name='user' color='red' size='30'/>
                    <Icon type='feather' name='mouse-pointer' color='lightgrey'/>
                    <Icon name='sc-telegram' type='evilicon' color='lightgrey' size='40'/>
                    <Icon name='chart' type='evilicon' color='lightgrey' size='40'/>
                    <Icon type='feather' name='globe' color='lightgrey' color='lightgrey'/>
                </View>

                    <View style={styles.body}>
                        {/*
                        <View style={{flexDirection:'row-reverse', margin:20, marginVertical:0}}><Icon type='octicon' name='pencil' color='grey' onPress={()=>this.props.navigation.navigate("ModifyProfil")}/></View>
                        */}
                        <View style={styles.infoPlates}>
                            {this.statutPlate('nom')}
                            {this.statutPlate('prenom')}
                            {this.statutPlate('story')}
                            {this.statutPlate('role')}
                            {this.statutPlate('identifiant')}
                            {this.statutPlate('pass')}
                        </View>
                        {this.showModificationButtons()}
                    </View>
            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        height: 100,
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
        backgroundColor:'white',
        paddingTop:30
    },
    infoPlates:{
        marginTop: 30,
        padding: 40,
        paddingTop:10,
        alignItems:'center',
        backgroundColor:'white'
    },
    statusPlate1a:{
        borderRadius:10,
        backgroundColor:'red',
        height:70,
        width: windowWidth*0.78,//'100%',
        shadowColor:'lightgrey',
        shadowOffset: {width: 0, height:10},
        shadowOpacity: 1,
        shadowRadius:10,
        padding:10,
        flexDirection:'row'
    },
    statusPlate1b:{
        borderRadius:10,
        backgroundColor:'red',
        height:70,
        width: windowWidth*0.78,//'100%',
        shadowColor:'lightgrey',
        shadowOffset: {width: 0, height:10},
        shadowOpacity: 1,
        shadowRadius:10,
        padding:10,
        marginTop:20,
        flexDirection:'row'
    },
    statusPlate2:{
        marginTop: 20,
        borderRadius:10,
        backgroundColor:'lavender',
        height:70,
        width: windowWidth*0.78,//'100%',
        shadowColor:'lightgrey',
        shadowOffset: {width: 0, height:10},
        shadowOpacity: 1,
        shadowRadius:10,
        padding:10,
        flexDirection:'row'
    },
    statusModificationPlate1a:{
        borderRadius:10,
        backgroundColor:'red',
        width: windowWidth*0.78,//'100%',
        shadowColor:'lightgrey',
        shadowOffset: {width: 0, height:10},
        shadowOpacity: 1,
        shadowRadius:10,
        padding:10,
        flexDirection:'row'
    },
    statusModificationPlate1b:{
        marginTop: 20,
        borderRadius:10,
        backgroundColor:'red',
        width: windowWidth*0.78,//'100%',
        shadowColor:'lightgrey',
        shadowOffset: {width: 0, height:10},
        shadowOpacity: 1,
        shadowRadius:10,
        padding:10,
        flexDirection:'row'
    },
    statusModificationPlate2:{
        marginTop: 20,
        borderRadius:10,
        backgroundColor:'lavender',
        width: windowWidth*0.78,//'100%',
        shadowColor:'lightgrey',
        shadowOffset: {width: 0, height:10},
        shadowOpacity: 1,
        shadowRadius:10,
        padding:10,
        flexDirection:'row'
    },
    textInput:{
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
