import React from "react";
import {Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet, Modal, Button} from "react-native";
import { TextInput } from "react-native-gesture-handler";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class CarteMembre extends React.Component
{
    constructor(props)
    {super(props)
    
    }


   
    render(props)
    {

        return(
            <View style={{...styles.carte, backgroundColor:(this.urgent)?"red":"white"}}>
                <Text>{this.props.membre.prenom.toUpperCase()+"\n"+this.props.membre.nom.toUpperCase()}</Text>
            </View>
        )
    }
}


export default class EditProject extends React.Component{
constructor(props){
    super(props);
        this.projet = this.props.route.params.projet;
        this.chef = this.props.route.params.chef;
        this.state = {participants:[], task:false};
        this.nomtache ='';
        this.contenu="";
        this.importWorkers();
        
    }
    importWorkers ()
    {
        let data = new FormData();
        data.append("id_projet", this.projet.ID);
        
        fetch('http://www.wi-bash.fr/application/ListWorkers.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            console.log(this.projet)
            json = JSON.parse(json);
            
            this.setState({participants:json})
        }
            ).catch(
            (error) => console.log(error))
    }
    header()
    {
        if(this.projet.mine)
        {
            return(
                <View>
                    <Text>+</Text>
                </View>
            )
        }else{
        return(
            <View>
                <Button title={"Participer"} onPress={()=>{}}/>
            </View>
        )}
    }
    memberView()
    {
        return (
            <View>
                <Text>Participants : </Text>
            <FlatList horizontal={true} data = {this.state.participants}
            renderItem = {(item)=><CarteMembre membre ={item.item}/>}
            keyExtractor = {(item)=>{item.identifiant}}
                
                />

            </View>
        )
    }
    taskView()
    {
        if (this.projet.mine)
        {
            return (
                <FlatList horizontal={true} data={[]}>

                </FlatList>
            )
        }
    }
    addTask(){
        
        if(this.props.route.params.chef.identifiant==this.props.user.identifiant)
        {return (
            <TouchableOpacity onPress={()=>this.setState({task:true})}>
                <View style={styles.addtaskbutton}>
                <Text style={{color:"white"}}>AJOUTER UNE TACHE</Text>
                </View>
            </TouchableOpacity>
        )}
        else{
            return null;
        }
    }

render(props){
    return(
        <View>
                {this.header()}
            <ScrollView style={styles.scroll}>
            <Text style = {styles.nomProjet}>{this.projet.nom.toUpperCase()}</Text>
            <View>
            <Text>Chef de projet : {this.projet.chef}, {this.projet.date}</Text>
            </View>
            <Text>Objectifs : {"\n"+this.projet.objectifs} </Text>
            <Text>{this.projet.description}</Text>

            {this.memberView()}
            {this.addTask()}

            <Modal visible={this.state.task} animationType='slide' transparent= {true}>
                <View style = {styles.addTask}>
                <TextInput placeholder = 'nom' onChangeText={(text)=>{this.nomtache=text}}
                style={styles.taskinput}></TextInput>
                
                <TextInput placeholder='Description' onChangeText={(text)=>{this.contenutache = text}}
                style={styles.taskinput}></TextInput>
                
                <Button title = "Creer" onPress = {()=>this.setState({task:false})}/>
                </View>
            </Modal>

            </ScrollView>
        </View>
    )
}

}

const styles = StyleSheet.create(
    {
        scroll:{
            marginBottom:25
        },
        
        carte:
       {
        
           width: 80,
           height: 70,
           marginRight: 20,
           marginTop:30,
           paddingTop:7,
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
       nomProjet:{
           fontWeight: "600",
           fontSize: 25,
           alignSelf: "center"
           
       },
       addTask:{
           marginTop:(windowHeight/2)-100,
           backgroundColor:"white",
           paddingTop: 40,
           paddingBottom:40,
           marginHorizontal: 30,
           borderRadius:20
       },
       taskinput:{
           margin:15
       },
       addtaskbutton:{
           alignSelf:"center",
           backgroundColor:"black",
           marginTop:20,
           padding:30
       }
    }
)