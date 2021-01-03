import { ThemeProvider } from "@react-navigation/native";
import React from "react";
import {Icon}  from "react-native-elements";
import {Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet, Modal, Alert} from "react-native";
import {Button,BottomSheet,ListItem} from "react-native-elements";
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
const hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString();              
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
                <Text style={{fontSize:13, fontStyle: "italic"}}>{this.props.role}</Text>
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

                <Modal visible={this.state.visible} transparent={true} 
                onRequestClose={()=>this.setState({visible:false})}>
                   <TouchableOpacity style={{backgroundColor:"rgba(200,200,200,0.4)", flex:1, 
                   justifyContent:"center"}}
                   onPress ={()=>{this.setState({visible:false})}}>
                    <View 
                    style = {styles.taskpopup}>
                            <Text style={{fontWeight:"bold"}}>{this.props.task.nom}</Text>
                            <Text>{this.props.task.description}</Text>
                            
                            {["Chef de projet", "Organisateur"].includes(this.props.role)?(
                            <Button title = "Modifier" buttonStyle= {{marginTop:15}} 
                            onPress ={()=>{
                                this.setState({visible:false})
                                this.props.navigation.navigate("ModifyTask");
                                }} />):null}
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
        this.state = {participants:[], task:false, tasks:[], suggestion:false, 
            suggestions:[], bottomSheetVisible:false, reunion:false};

        this.nomtache ='';
        this.contenu="";
        this.role = "";
        this.suggestion = "";
        console.log("bootom :", this.state.bottomSheetVisible);
        
        this.importTasks();
        this.importWorkers();
        this.importSuggestions();
        
    }
    //en travaux
    generateOptionsList()
    {
        const close = ()=>{this.setState({bottomSheetVisible:false})}
        
        if (this.role == "Membre")
        {
            return [
                {title:"Proposer quelque chose",
                onPress:()=>{close(); this.openSuggestionDialog()}},
                {title:"Quitter le projet",
                onPress:()=>{
                    close();
                    this.quitProject()
                }},
                
                {title:"Fermer",
                onPress:()=>{close()}}
            ]
        }
        if (this.role=="Organisateur")
        {
            return [
                {title:"Ajouter une tache",
                onPress:()=>{close(); this.setState({task:true})}},
                {title:"Proposer quelque chose",
                onPress:()=>{close(); this.openSuggestionDialog()}},
                     {title:"Ajouter un participant",
                     onPress:()=>{}},
                     {title:"Editer une note à l'équipe",
                     onPress:()=>{}},
                     {title:"Quitter le projet",
                     onPress:()=>{}},
                ,{title:"Fermer",
                onPress:()=>{close()}}
            ]
        }
        if (this.role=="Chef de projet")
        {
            return [
                {title:"Ajouter une tache",
                onPress:()=>{close(); this.setState({task:true})}},
                {title:"Proposer quelque chose",
                onPress:()=>{close(); this.openSuggestionDialog()}},
                {title:"Ajouter un participant",
                onPress:()=>{}},
                {title:"Editer une note à l'équipe",
                onPress:()=>{}},
                {title:"Décreter une réunion",
                onPress:()=>{}},
                {title:"Gérer les team",
                onPress:()=>{}},
                {title:"Paramètres",
                onPress:()=>{}},
                {title:"Quitter le projet",
                onPress:()=>{message("Sorry bud'", "Vous ne pouvez pas quitter le projet sans avoir nommé un nouveau chef de projet")}},
                ,{title:"Fermer",
                onPress:()=>{close()}}
            ]
        }
        
        return []
    }
    /**importe la liste des participats depuis l'API 
     puis la stocke dans this.state.participants
     */
    openSuggestionDialog()
    {
        this.setState({suggestion:true})
    }
    importWorkers ()
    {
        let data = new FormData();
        data.append("id_projet", this.projet.ID);
        
        fetch('http://www.wi-bash.fr/application/Read/ListWorkers.php', {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
                'Content-Type': "multipart/form-data"
            },
            body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            
            json = JSON.parse(json);
            console.log(json)
            if (this.props.route.params.projet.mine) {
                this.role = json.find((w)=>w.identifiant==this.props.user.identifiant).role
                this.setHeader()
            }
            
            this.setState({participants:json})
        }
        ).catch(
            (error) => console.log(error))
        }
        //importe la liste des taches
        importTasks(){
            fetch("http://www.wi-bash.fr/application/Read/ListeTaches.php?id_proj="+this.projet.ID).then((reponse)=>
            reponse.text()).then((reponse)=>{
            //console.log(reponse)
            reponse = JSON.parse(reponse);
            
            this.setState({tasks:reponse})}).catch((error)=>console.log(error))
            
        }
        importSuggestions()
        { fetch("http://www.wi-bash.fr/application/Read/ListeIdeeProjets.php?id_proj="+this.projet.ID).then((reponse)=>
        reponse.text()).then((reponse)=>{
            reponse = JSON.parse(reponse);
            
            this.setState({suggestions:reponse})}).catch((error)=>console.log(error))
            
        }
        //permet de définir la header bar de la vue
        setHeader()
        {
            this.props.navigation.setOptions({title:this.projet.nom.toUpperCase(),
                headerTitleStyle:{
                    alignSelf:"center",
                    paddingRight: windowWidth/9
                }, headerRight:()=> this.projet.mine?(
                    <Icon name="circle-with-plus" type="entypo"  iconStyle={{marginRight:10}} size={30}
                    onPress={()=>this.setState({bottomSheetVisible:!this.state.bottomSheetVisible})}/>):null})
                    
                }
                //vue liste des participants
                memberView()
                {
                    return (
                        <View>
                <Text style={{alignSelf:"center", fontWeight:"bold"}}>PARTICIPANTS : </Text>
            <FlatList horizontal={true} data = {this.state.participants}
            renderItem = {(item)=><CarteMembre membre ={item.item}/>}
            keyExtractor = {(item)=>{hashCode(item.identifiant)}}
            
            />

            </View>
        )
    }
    //vue liste des taches
    taskView()
    {
        if (this.projet.mine)
        {
            return (
                <View style={{flex:2}}>
                    <Text style={{alignSelf:"center", fontWeight:"bold"}}>TACHES : </Text>
                <FlatList horizontal={true} data={this.state.tasks}
                renderItem={(item)=>
                    <CarteTaches task={item.item} isChef={this.chef.identifiant==this.props.user.identifiant}
                    role = {this.role} navigation = {this.props.navigation}/>}
                    keyExtractor={(item)=>hashCode(item.nom)} >

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
            data.append("id_proj", this.projet.ID);
            data.append("identifiant", this.props.user.identifiant);
            data.append("pass", this.props.user.pass);
            data.append("nom", this.nomtache)
            if(this.contenutache)data.append("description", this.contenutache)
            
            data = formatPostData(data);
            
            fetch('http://www.wi-bash.fr/application/Create/AddTask.php', {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': "multipart/form-data"
                },
                body: data
            }).then((reponse)=> reponse.text()).then((reponse) => {
                console.log(reponse)
                if (reponse.indexOf("200")===-1) message('Oups !', 
                "Nous n'avons pu créer cette tâche... Peut-être le nom de la tâche existe-t-il déjà ?")
                else{
                    this.setState({tasks:[{nom:this.nomtache, description:this.contenutache}, ...this.state.tasks]})
                }
            }
            
            ).catch(
                (error) => console.log(error))}
            }
            
            sendSuggestion(){
                if (this.suggestion)
                {
                    let data = new FormData();
                    data.append("id_projet", this.projet.ID);
                    data.append("identifiant", this.props.user.identifiant);
         data.append("pass", this.props.user.pass);
         data.append("proposition", this.suggestion)
         if(this.contenutache)data.append("description", this.contenutache)
         
         data = formatPostData(data);
         
         fetch('http://www.wi-bash.fr/application/Create/CreaPropositionProjet.php', {
             method: 'POST',
             headers: {
                 Accept: 'multipart/form-data',
                 'Content-Type': "multipart/form-data"
                },
                body: data
            }).then((reponse)=> reponse.text()).then((reponse) => {
                console.log(reponse)
                if (reponse.indexOf("200")===-1) message('Oups !', 
                "Nous n'avons pu émettre cette proposition... Décidément, les génies sont incompris")
                else{
                    this.importSuggestions()             
                }
            }
            
            ).catch(
                (error) => console.log(error))}
            }
            
            
            addWorker()/*Ajoute un participant au projet*/{
                
                let data = new FormData();
                data.append("id_projet", this.projet.ID);
                data.append("identifiant", this.props.user.identifiant);
                data.append("pass", this.props.user.pass);
                data.append("role", "membre")
                data.append("id_membre", this.props.user.identifiant)
                
                
                data = formatPostData(data);
                
                fetch('http://www.wi-bash.fr/application/Create/AddWorker.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'multipart/form-data',
                        'Content-Type': "multipart/form-data"
                    },
                    body: data
                }).then((reponse)=> reponse.text()).then((reponse) => {
                    console.log("", reponse) 
                    if (reponse.includes("200"))
                    {
                        message("Félicitations !", "Vous serez bientôt ajouté au projet")
                        this.props.navigation.goBack();
                    }
                }
                
                ).catch(
                    (error) => console.log(error))
     }
     quitProject()
     {
         Alert.alert("o_O", "Voulez-vous vraiment quitter le projet ?", [
             {
                 text:"Non, je reste",
                 onPress:()=>{}
                },
                {
                    text:"C'est bon, j'en ai assez",
                    onPress: ()=>{
                        let data = new FormData();
                        data.append("id_projet", this.projet.ID);
                        data.append("identifiant", this.props.user.identifiant);
                        data.append("pass", this.props.user.pass);
                        
                        
                        data = formatPostData(data);
                        
                        fetch('http://www.wi-bash.fr/application/Delete/QuitterProjet.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'multipart/form-data',
                                'Content-Type': "multipart/form-data"
         },
         body: data
        }).then((reponse)=> reponse.text()).then((reponse) => {
            //console.log(reponse)
            this.props.navigation.goBack();
        }
        
        ).catch(
            (error) => console.log(error))
        }
        }
    ])
}

//boite de dialogue créer une tache
addTaskDialog()
{
    return(
        
        <Modal visible={this.state.task} animationType='fade' transparent= {true}
        onRequestClose={()=>this.setState({task:false})}>
            {/*boite de dialogue qui  apparaît quand on appuie sur
            "ajouter une  tache" */}
                <View style = {styles.addTask}>
               <Text style={{alignSelf: "flex-end", marginRight:10, fontSize:18}} onPress={()=>this.setState({task:false})}>X</Text> 

                <TextInput placeholder = 'nom' 
                onChangeText={(text)=>{this.nomtache=text}}
                style={styles.taskinput} maxLength ={70}></TextInput>
                
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

)
}

// bouton Ajouter un participant
workerButton(){
    
    if(this.projet.mine===false && this.props.user.niveau!=3 && this.projet.open)
    {return (
        <Button buttonStyle={styles.addtaskbutton} title="Participer"
        onPress={()=>this.addWorker()} />          
        )}
    else{
        return null;
    }
}


addSuggestionDialog()
{
    return(<Modal visible={this.state.suggestion} animationType='fade' transparent= {true}
            onRequestClose={()=>this.setState({suggestion:false})}>
            {/*boite de dialogue qui  apparaît quand on appuie sur
            "ajouter une  tache" */}
                <View style = {styles.addTask}>
               <Text style={{alignSelf: "flex-end", marginRight:10, fontSize:18}} 
               onPress={()=>this.setState({suggestion:false})}>X</Text> 
                
                <TextInput placeholder='Une idée ?' 
                onChangeText={(text)=>{this.suggestion = text}}
                multiline={true}
                style={{...styles.taskinput, height:40}}></TextInput>
                
                <Button title = "Lancer l'idée" onPress = {()=>{
                    this.sendSuggestion();
                    this.setState({suggestion:false})
                }} buttonStyle={{marginBottom:10}}/>


                <Button title="Se dégonfler" buttonStyle={{backgroundColor:"red"}}
                onPress={()=>{this.setState({suggestion:false})}}/>


                </View>
            </Modal>)

}

boiteAIdees()
{
    if (this.projet.mine)
    {
        return(
            <View style={{padding:5}}>
                <Text style={{fontSize:20, marginLeft:4}}>{this.state.suggestions?"BOITE A IDEES":null}</Text>
            <ScrollView style={styles.boite}>
                {this.state.suggestions?this.state.suggestions.map((s)=>
                (<View style={styles.idee}>
                <Text style={styles.textIdee}>{s.proposition+"\n"}</Text>
                </View>)):null}
            </ScrollView>
            </View>
        )
    }return null;
}
componentDidMount(){
this.setHeader();
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
            {this.boiteAIdees()}
            </View>


            {this.addTaskDialog()}
            {this.addSuggestionDialog()}
            </ScrollView>
            <BottomSheet
                        isVisible={this.state.bottomSheetVisible}
                    containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                    modalProps={{"onRequestClose": ()=>this.setState({bottomSheetVisible:false})}}  >
                                    {this.generateOptionsList().map((l, i) => (
                                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                        <ListItem.Content>
                                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                        </ListItem.Content>
                                        </ListItem>
                                    ))}
                             </BottomSheet>
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
           margin:15,
           textAlignVertical: "top"
       },
       addtaskbutton:{
           alignSelf:"center",
           backgroundColor:"black",
           marginTop:20,
           marginBottom:10,
           padding:15,paddingHorizontal: 25
           
       },
       boite:{
           //borderColor:"black",
           //borderWidth: 2,
           //borderBottomWidth:
           //paddingHorizontal:3
           
       },idee:
       {
           borderColor: "black",
           borderWidth: 2,
           borderBottomWidth:1
       },
       textIdee:{
           padding:4
       }

    }
)