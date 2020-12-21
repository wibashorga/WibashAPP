import React from "react";
import {Pressable} from "react-native"
import {Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet, Modal, Alert} from "react-native";
import {Button} from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { formatPostData } from "./security";


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
            <View style={{...styles.carte, marginTop:10}}>
                <Text>{this.props.membre.prenom.toUpperCase()+"\n"+this.props.membre.nom.toUpperCase()}</Text>
            </View>
        )
    }
}

//chaque tache est affichée dans une carte individuelle. Quand on appuie dessus ça affiche une petite fenêtre 
//pour voir la totalité du contenu
class CarteTaches extends React.Component{
    constructor(props)
    {
        super(props);
        this.state= {visible:false}
    }

    render()
    {
       
        return(
            <TouchableOpacity style = {{...
                styles.carte, width: 150, height:100,  backgroundColor:(this.urgent)?"red":"white"}} 
                onPress={()=>{this.setState({visible:true})}}>

                <Text style={{fontWeight:"bold"}}>{this.props.task.nom}</Text>
                <Text>{this.props.task.description}</Text>

                <Modal visible={this.state.visible} transparent={true} >
                   <TouchableOpacity style={{backgroundColor:"rgba(200,200,200,0.4)", flex:1, 
                   justifyContent:"center"}}
                   onPress ={()=>{this.setState({visible:false})}}>
                    <View 
                    style = {styles.taskpopup}>
                            <Text style={{fontWeight:"bold"}}>{this.props.task.nom}</Text>
                            <Text>{this.props.task.description}</Text>
                    </View>
                    </TouchableOpacity>
                </Modal>
            </TouchableOpacity>
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
            //console.log(reponse)
            reponse = JSON.parse(reponse);
            
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
                <Text style={{alignSelf:"center", fontWeight:"bold"}}>PARTICIPANTS : </Text>
            <FlatList horizontal={true} data = {this.state.participants}
            renderItem = {(item)=><CarteMembre membre ={item.item}/>}
            keyExtractor = {(item)=>{item.prenom}}
                
                />

            </View>
        )
    }
    taskView()
    {
        if (this.projet.mine)
        {
            return (
                <View style={{flex:2}}>
                    <Text style={{alignSelf:"center", fontWeight:"bold"}}>TACHES : </Text>
                <FlatList horizontal={true} data={this.state.tasks}
                renderItem={(item)=><CarteTaches task={item.item} isChef={this.chef.identifiant==this.props.user.identifiant}/>}
                keyExtractor={(item)=>item.nom}>

                </FlatList>
                </View>
            )
        }
    }
    /**fonction qui permet de créer une tache dans la base de données */
    sendTask(){
       if (this.nomtache)
       {
        let data = new FormData();
        data.append("id_projet", this.projet.ID);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("nom", this.nomtache)
        if(this.contenutache)data.append("description", this.contenutache)

        data = formatPostData(data);
        
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
        else{
            this.setState({tasks:[...this.state.tasks, {nom:this.nomtache, description:this.contenutache}]})
        }
        }
            
            ).catch(
            (error) => console.log(error))}
    }
    

    addWorker() /* je te laisse verifier car je comprends pas vraiment Ethan*/{
        
         let data = new FormData();
         data.append("id_projet", this.projet.ID);
         data.append("identifiant", this.props.user.identifiant);
         data.append("pass", this.props.user.pass);
         data.append("role", "membre")
         data.append("id_membre", this.props.user.identifiant)
         
 
         data = formatPostData(data);
         
         fetch('http://www.wi-bash.fr/application/AddWorker.php', {
         method: 'POST',
         headers: {
         Accept: 'multipart/form-data',
         'Content-Type': "multipart/form-data"
         },
         body: data
         }).then((reponse)=> reponse.text()).then((reponse) => {
             console.log(reponse)
         }
         
             
             ).catch(
             (error) => console.log(error))
     }

    //bouton "Ajouter une tache"
    addTask(){
        
        if(this.chef.identifiant==this.props.user.identifiant)// on  ne peut ajouter une tache que si on est chef de projet
        {return (
            <Button buttonStyle={styles.addtaskbutton} title="AJOUTER UNE TACHE"
             onPress={()=> this.sendTask()} />
                
        )}
        else{
            return null;
        }
    }


// bouton Ajoouter un participant
workerButton(){
        
    if(this.projet.mine===false)
    {return (
        <Button buttonStyle={styles.addtaskbutton} title="Participer"
         onPress={()=>this.addWorker()} />
            
    )}
    else{
        return null;
    }
}

//Corps de la vue
render(props){
    return(
        <View style={{flex:1}}>
                
            <ScrollView style={styles.scroll}>
           
            <View style={styles.infoview}>
            
            <Text>CHEF DE PROJET : {"\n"+this.chef.prenom+" "+this.chef.nom+" ("+this.chef.pseudo+")"}, 
             {" "+this.projet.DateCrea+"\n"}</Text>
            
            <View style={{paddingHorizontal:15}}>
            <Text>{"\n"+this.projet.objectifs} </Text>
            <Text>{this.projet.description}</Text>
            </View>
            
            </View>
            <View style={{flex:1}}>
            {this.memberView()/**flatlist des participants au projet*/}
            {this.workerButton()/* bouton ajouter un participant */}
            {this.taskView()}
            {this.addTask()/*bouton ajouter une tache */}
            </View>


            <Modal visible={this.state.task} animationType='fade' transparent= {true}>
            {/*boite de dialogue qui  apparaît quand on appuie sur
            "ajouter une  tache" */}
                <View style = {styles.addTask}>
               <Text style={{alignSelf: "flex-end", marginRight:10, fontSize:18}} onPress={()=>this.setState({task:false})}>X</Text> 

                <TextInput placeholder = 'nom' 
                onChangeText={(text)=>{this.nomtache=text}}
                style={styles.taskinput}></TextInput>
                
                <TextInput placeholder='Description' 
                onChangeText={(text)=>{this.contenutache = text}}
                style={styles.taskinput}></TextInput>
                
                <Button title = "Creer" onPress = {()=>{
                    this.sendTask();
                    this.setState({task:false})
                }} buttonStyle={{marginBottom:10}}/>


                <Button title="Annuler" buttonStyle={{backgroundColor:"red"}}
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
            paddingBottom: 25,
            flex:1

        },
        infoview:{
            flex:2,
            fontSize:20,
            padding:5
            //backgroundColor:"red"
        },
        
        carte:
       {
        
           width: 80,
           height: 70,
           marginLeft:2,
           marginRight: 18,
           marginVertical:30,
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
           marginTop:(windowHeight/2)-200,
           backgroundColor:"white",
           paddingTop: 20,
           paddingBottom:40,
           marginHorizontal: 30,
           borderRadius:20
       },
       taskpopup:{
           width:150,
           padding: 15,
           backgroundColor:"white",
           marginBottom:20,
           alignSelf:"center",
           opacity:1

       }
       ,
       taskinput:{
           margin:15
       },
       addtaskbutton:{
           alignSelf:"center",
           backgroundColor:"black",
           marginTop:20,
           marginBottom:10,
           
       }
    }
)