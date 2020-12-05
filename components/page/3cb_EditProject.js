import React from "react";
import {Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet, Modal, Alert} from "react-native";
import {Button} from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function message(titre, phrase)
{
    Alert.alert(titre, phrase, [
        {
            text:"OK",
            onPress: ()=>{}
        }
    ])
}

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
        this.state = {participants:[], task:false, tasks:[]};
        this.nomtache ='';
        this.contenu="";
        this.setHeader();
        this.importTasks();
        this.importWorkers();
        
    }
    /**importe la liste des participats depuis l'API 
    puis la stocke dans this.state.participants
    */
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
            
            json = JSON.parse(json);
            
            this.setState({participants:json})
        }
            ).catch(
            (error) => console.log(error))
    }

    importTasks(){
        fetch("http://www.wi-bash.fr/application/ListeTaches.php?id_proj="+this.projet.ID).then((reponse)=>
        reponse.text()).then((reponse)=>{
            console.log(reponse)
            //reponse = JSON.parse(reponse);
        this.setState({tasks:reponse})}).catch((error)=>console.log(error))
        
    }
    //permet de définir la header bar de la vue
    setHeader()
    {
        this.props.navigation.setOptions({title:this.projet.nom.toUpperCase(),
            headerTitleStyle:{
                alignSelf:"center",
                paddingRight: windowWidth/9
            }
        }) 
        
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
                <FlatList horizontal={true} data={this.state.tasks}
                renderItem>

                </FlatList>
            )
        }
    }
    /**fonction qui permet de créer une tache dans la base de données */
    sendTask(){
       if (this.nomtache)
       {
        let data = new FormData();
        data.append("id_proj", this.projet.ID);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("nom", this.nomtache)
        if(this.contenutache)data.append("description", this.contenutache)
        
        fetch('http://www.wi-bash.fr/application/AddTask.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((reponse) => {
            if (reponse.indexOf("200")===-1) message('Oups !', 
    "Nous n'avons pu créer cette tâche... Peut-être le nom de la tâche existe-t-il déjà ?")
            
        }
            ).catch(
            (error) => console.log(error))}
    }
    

    //bouton "Ajouter une tache"
    addTask(){
        
        if(this.props.route.params.chef.identifiant==this.props.user.identifiant)
        {return (
            <Button buttonStyle={styles.addtaskbutton} title="AJOUTER UNE TACHE"
             onPress={()=>this.setState({task:true})} />
                
        )}
        else{
            return null;
        }
    }

render(props){
    return(
        <View>
                
            <ScrollView style={styles.scroll}>
           
            <View>
            <Text>Chef de projet : {this.projet.chef}, {this.projet.date}</Text>
            </View>
            <Text>Objectifs : {"\n"+this.projet.objectifs} </Text>
            <Text>{this.projet.description}</Text>

            {this.memberView()/**flatlist des participants au projet*/}
            {this.addTask()/*bouton ajouter une tache */}

            <Modal visible={this.state.task} animationType='slide' transparent= {true}>
            {/*boite de dialogue qui  apparaît quand on appuie sur
            "ajouter une  tache" */}
                <View style = {styles.addTask}>
                
                <TextInput placeholder = 'nom' 
                onChangeText={(text)=>{this.nomtache=text}}
                style={styles.taskinput}></TextInput>
                
                <TextInput placeholder='Description' 
                onChangeText={(text)=>{this.contenutache = text}}
                style={styles.taskinput}></TextInput>
                
                <Button title = "Creer" onPress = {()=>{
                    this.sendTask();
                    this.setState({task:false})
                }}/>
                <Button title="Annuler" color = "red"
                onPress={()=>{this.setState({task:false})}}/>
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
            paddingBottom: 25

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