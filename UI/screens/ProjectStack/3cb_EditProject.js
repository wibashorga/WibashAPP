import { ThemeProvider } from "@react-navigation/native";
import React from "react";
import {Icon}  from "react-native-elements";
import {Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList, StyleSheet, Modal, Alert, SectionList} from "react-native";
import {Button,BottomSheet,ListItem} from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { formatPostData } from "../../custom/security";
import { EditDialog, LoadingMessage } from "../../custom/ModalDialog";
import * as api from "../../../API/api_request";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {lightBlue, WiText, colors, IdleBackground} from "../../custom/custom";
import {DetailDialog} from "../../custom/ModalDialog";
import { set } from "react-native-reanimated";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const token = "PPlaFk63u4E6";

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

function setListAsPairs(array)
{
    let l = [];
    let max = (array.length%2 == 0)?array.length-1:array.length-2;
    let i;
    for (i = 1; i <= max; i+=2)
    {
        l.push([array[i-1], array[i]])
    }
    if (i===array.length) l.push([array[array.length-1]])
    return l;
}

const themes = [{theme:"participants", color:"orange"},{theme:"taches", color:lightBlue},
{theme:"idees", color:"black"}, {theme:"notes", color:"white", textColor:"black"}]

class CarteMembre extends React.Component
{
    constructor(props)
    {super(props)    
    }
   
    render(props)
    {

        return(
            <View style={{...styles.carte, marginTop:10}}>
                <TouchableOpacity onPress={()=>{this.props.onPress(this.props.membre)}}>
                <Text>
                    {this.props.membre.prenom.toUpperCase()+"\n"+this.props.membre.nom.toUpperCase()}</Text>
                    </TouchableOpacity>
                <Text style={{fontSize:13, fontStyle: "italic"}}>{this.props.membre.role}</Text>
            </View>
        )
    }
}

class CarteMemo extends React.Component
{
    constructor(props)
    {super(props)
        this.state = {
            editMode:false
        }
        this.text = this.props.memo.contenu
    }
   
    render()
    {
        if (this.state.editMode)
        {
            return (
                <View>
                <TextInput defaultValue = {this.text} multiline
                onChangeText = {(text)=> {this.text = text}} style = {{...styles.carteMemo, backgroundColor:"rgb(150,205,220)"}}>
                </TextInput>
                <TouchableOpacity onPress = {()=>{
                    this.setState({editMode:false});
                    if (this.text!==this.props.memo.contenu)
                    {
                    api.update_memo({identifiant:this.props.user.identifiant, pass:this.props.user.pass,
                    id_projet:this.props.memo.id_projet,memo:this.props.memo.contenu, new_content:this.text},
                    (response)=>{
                        console.log(response)
                        if (response.indexOf("200")!==-1){
                            if (this.props.updateMemos) this.props.updateMemos()
                        }
                    })}}}>
                <Icon type='octicon' name='pencil' color={'grey'} size={24} 
                                />
                </TouchableOpacity>
                
                </View>
            )
        }
        else
        {
        return(
            <View>
                <TouchableOpacity style={styles.carteMemo}
                onLongPress= {()=>{
                if (this.props.isChef)this.setState({editMode:true})}}>
                    <WiText>{this.props.memo.contenu}</WiText>
                    </TouchableOpacity>
                
            </View>
        )}
    }
}

class CarteTheme extends React.Component
{
    constructor(props)
    {super(props)
    }
   
    render(props)
    {

        return(
        <TouchableOpacity style={{height:windowHeight/10, 
                width:windowWidth/3.1, backgroundColor:this.props.color, 
            alignContent:"center", justifyContent:"center", marginTop:15}}
            onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                <Text style={{alignSelf:"center", color:this.props.textColor||"white", fontSize:windowHeight/50, 
            fontWeight:"bold"}}>
                    {this.props.theme.toUpperCase()}
                    </Text>
        </TouchableOpacity>
        
        )
    }
}

//chaque tache est affichée dans une carte individuelle. Quand on appuie dessus ça affiche une petite fenêtre 
//pour voir la totalité du contenu
class CarteTaches extends React.Component{
    constructor(props)
    {
        super(props);
        this.state= {visible:false, achieved:this.props.task.achieved=="1"}
        this.closeDialog = ()=>{this.setState({visible:false})}
    }
    render()
    {
        let achieved = this.state.achieved
        
        let bg_color = "white", textColor="black";
        if(this.urgent)
        {
            bg_color="red";
            textColor = "white"
        }
        //if(achieved) bg_color=colors.green

        return(
            <TouchableOpacity style = {{paddingVertical:15, borderBottomWidth:1,
                 width:windowWidth, backgroundColor:bg_color,
                flex:1, marginVertical:0, borderRadius:0}} 
                onPress={()=>{this.setState({visible:true})}}>

                <Text style={{fontSize:17, color:textColor, alignSelf:"center", marginBottom:5}}>{this.props.task.nom}</Text>
                <Text style={{color:textColor}}>{achieved?"":this.props.task.description}</Text>

                {(achieved)?<Icon type="ionicons" name="check" size={25} color="green"/>:null
                /* icone tache accomplie*/}

                <DetailDialog visible= {this.state.visible} close = {()=> this.closeDialog()}
                title = {this.props.task.nom} description = {this.props.task.description}
                editAction = {["Chef de projet", "Organisateur"].includes(this.props.role)&&
                !achieved?()=>{
                    this.setState({visible:false})
                    this.props.navigation.navigate("ModifyTask", {task:this.props.task});
                    }:null} 
            auxiliarAction = {["Chef de projet", "Organisateur"].includes(this.props.role)
                    && !achieved?
                    ()=>{Alert.alert("Cette tâche est-elle terminée ?", "",[
                        {text:"OUI", onPress:()=>{api.set_task_as_achieved({identifiant:this.props.user.identifiant, pass:this.props.user.pass,
                            id_projet:this.props.task.id,nom:this.props.task.nom}, (reponse)=>{
                                if (reponse.indexOf("200")!==-1)this.setState({achieved:true})})}}
                        , {text:"NON",onPress:()=>{this.closeDialog()}}
                    ])}:null} auxiliarActionTitle = {"Tache Accomplie"}/>

                
            </TouchableOpacity>
        ) 
        
    }
    }
    class DoubleCarteTaches extends React.Component
    {
        constructor(props)
    {
        super(props);
        this.tache1 = this.props.task[0];
        if (this.props.task.length==2)
        {
            this.tache2 = this.props.task[1];
        }
        
        
    }
        render(){
            
            if (this.tache2)
            {
            return(
                <View style = {{flexDirection:"row", alignSelf:"center", justifyContent:"space-between"}}>
                    <CarteTaches task={this.tache1} isChef={this.props.isChef}
                    role={this.props.role} navigation = {this.props.navigation}
                    user={this.props.user}/>
                    
                    <CarteTaches task={this.tache2} isChef={this.props.isChef}
                    role={this.props.role} navigation = {this.props.navigation}
                    user={this.props.user}/>

                </View>
            )}else{
                return(
                <CarteTaches task={this.tache1} isChef={this.props.isChef}
                role={this.props.role} navigation = {this.props.navigation} 
                user={this.props.user}/>
                )
            }
        }
    }
    //-----

    class CarteSuggestion extends React.Component
    {
        constructor(props)
        {super(props)
            
        
        }
       
        render(props)
        {
            let s = this.props.suggestion;
            
            if (this.props.uid==s.id_membre|| this.props.isChief)
            {

            return(
                <View style={styles.idee}>
                <Text style={styles.textIdee}>{this.props.suggestion.proposition+"\n"}</Text>
                <TouchableOpacity style={{alignSelf:"flex-end", marginRight:5, padding:3}}>
                    <Icon name="trash" type = "entypo"/></TouchableOpacity>
                </View>
            )
            }else
            {
                return(
                    <View style={styles.idee}>
                    <Text style={styles.textIdee}>{this.props.suggestion.proposition+"\n"}</Text>
                    </View>
                )
            }
        }
    }

    //-----



export default class EditProject extends React.Component{
constructor(props){
    super(props);
        this.projet = this.props.route.params.projet;
        this.chef = this.props.route.params.chef;
        this.state = {participants: this.props.route.params.workers || [], task:false, tasks:this.props.route.params.tasks || [], suggestion:false, 
            suggestions:[], bottomSheetVisible:false, reunion:false, 
            memos:[], categories:[],
            workerOptions:false, calendarVisible:false,
        meetingDate:null, numberOfLines:null,
        createMemoDialog: false, loadingMemos:false,
        selectedTheme:"participants"};

        this.nomtache ='';//nom de la tache qu'on va créer
        this.contenu="";//contenu d'une tache
        this.role = "";//le role est défini dans importWorker
        this.suggestion = "";
        this.descriptionReunion = "";
        this.selectedMember = "";
       
        
        this.importTasks();
        this.importWorkers();
        this.importSuggestions();
        
        
        
    }
     //permet de définir la header bar de la vue
     setHeader()
     {
         this.props.navigation.setOptions({title:this.projet.nom.toUpperCase(),
             headerTitleStyle:{
                 alignSelf:"center",
                 paddingRight: windowWidth/9
             }, headerRight:()=> this.projet.mine?(
                 <TouchableOpacity onPress={()=>
                    this.setState({bottomSheetVisible:!this.state.bottomSheetVisible})}><Icon name="plus" type="evilicon"  iconStyle={{marginRight:10}} size={45}
                 /></TouchableOpacity>):null})
                 
             }

    //liste des options quand on appuie sur le bouton "+" en haut à droite
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
                    this.quitProject();
                    close();
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
                     onPress:()=>{close(); this.setState({createMemoDialog:true})}},
                     {title:"Quitter le projet",
                     onPress:()=>{close();
                    this.quitProject()}},
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
                onPress:()=>{close(); this.setState({createMemoDialog:true})}},
                {title:"Programmer une réunion",
                onPress:()=>{close(); this.setState({reunion:true})}},
                {title:"Gérer les team",
                onPress:()=>{}},
                {title:"Paramètres",
                onPress:()=>{close();
                this.props.navigation.navigate("ModifyProject", {projet:this.projet})}},
                {title:"Quitter le projet",
                onPress:()=>{message("Sorry bud'", "Vous ne pouvez pas quitter le projet sans avoir nommé un nouveau chef de projet")}},
                ,{title:"Fermer",
                onPress:()=>{close()}}
            ]
        }
        
        return []
    }

    generateWorkerOptions()
    {
       const close = ()=>{this.setState({workerOptions:false})}//on ferme le bottomsheet (voir fonction render())

        if (this.selectedMember)
       {
        let member = this.selectedMember.prenom+" "+this.selectedMember.nom;
        if (this.role==="Organisateur")
        {
            if (this.projet.open)
            {
            return[
                {title:(this.selectedMember.role=="Organisateur")?"Enlever à "+member+" le titre d'organisateur":
                "Nommer "+member+" organisateur",
                onPress:()=>{
                    if (this.selectedMember.role=="Organisateur")this.sendWorkerStatus(this.selectedMember.identifiant, "Membre");
                    else this.sendWorkerStatus(this.selectedMember.identifiant, "Organisateur")
                    close();  this.selectedMember=""}}, 
                    {title:"Retirer du projet",
                    onPress:()=>{
                        Alert.alert("o_O", "Voulez-vous vraiment retirer "+member+" du projet",[{
                            title:"OUI",
                            onPress:()=>{
                                this.sendWorkerStatus(this.selectedMember.identifiant, "out")
                            }
                        }], {title:"NON", onPress:()=>{}}) ; close(); this.selectedMember=""}},
                {title:"Fermer", 
            onPress:()=>{close()}}
            ]
            }else{
                return [
                    {title:"Nommer organisateur (le projet est fermé)",
                onPress:()=>{},disabled:true},
                {title:"Fermer", 
            onPress:()=>{close()}}
                ]
            }
        }
        if (this.role == "Chef de projet")
        {
            return[
                
                {title:(this.selectedMember.role=="Organisateur")?"Enlever à "+member+" le titre d'organisateur":
                "Nommer "+member+" organisateur",
                onPress:()=>{
                    if (this.selectedMember.role=="Organisateur")this.sendWorkerStatus(this.selectedMember.identifiant, "Membre");
                    else this.sendWorkerStatus(this.selectedMember.identifiant, "Organisateur")
                    close();  this.selectedMember=""}},            
                {title:"Nommer chef de projet à ma place",
                onPress:()=>{Alert.alert("o_O", "Voulez-vous vraiment céder le poste ? Et nommer "+member+" chef du projet",[{
                    text:"OUI",
                    onPress:()=>{
                        
                        this.sendWorkerStatus(this.selectedMember.identifiant, "Chef de projet");
                        this.setState({bottomSheetVisible:false})
                    }}, {text:"NON", onPress:()=>{}}], {title:"NON", onPress:()=>{}})}},
                {title:"Retirer du projet",
                onPress:()=>{this.sendWorkerStatus(this.selectedMember.identifiant, "out"); close(); this.selectedMember=""}},
                {title:"Fermer", 
            onPress:()=>{close()}}
            ]
        }
    }return []
    }
    /**importe la liste des participats depuis l'API 
     puis la stocke dans this.state.participants
     */
    importWorkers ()
    {   
        let data = new FormData();
        data.append("id_projet", this.projet.ID);
        api.load_project_workers(data, (json)=>{
            json = JSON.parse(json);
            this.props.route.params.projet.mine = json.find((i)=>i.identifiant==this.props.user.identifiant)!=null
            if (this.props.route.params.projet.mine) {
                this.role = json.find((w)=>w.identifiant==this.props.user.identifiant).role
                this.setHeader()
            }this.setState({participants:json})})
        
}
sendWorkerStatus(id_membre, role)
{
        let data = new FormData();
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("id_projet", this.projet.ID);
        data.append("id_membre", id_membre)
        data.append("role", role)
        api.change_worker_status(data,(reponse) => {console.log(reponse);
            if (reponse.indexOf("200")!==-1) this.importWorkers()})
        
}
        //importe la liste des taches, puis la stocke dans this.state.tasks
    importTasks(){
            if (this.props.user.niveau !== 3 && this.projet.mine)
            {
            let data = new FormData();
            data.append("id_proj", this.projet.ID)
            api.load_tasks(data, (reponse)=>{this.setState({tasks:JSON.parse(reponse)})})
            }
        }
        importCategories()
        {
            api.load_categories_of_tasks({identifiant:this.props.user.identifiant, pass:this.props.user.pass, 
                id_projet: this.projet.ID}, (text)=>{
                    
                    let categories = JSON.parse(text)
                    for (let i in categories)
                    {
                        categories[i] = {title:categories[i], 
                            data:this.state.tasks.filter(item=>item.categorie==categories[i])}
                    }
                    
                    this.setState({categories:categories})
                })
        }

        importMemos(showMessage=false){
            if(showMessage) this.setState({loadingMemos:true})
    api.load_memos_from_project({identifiant:this.props.user.identifiant, pass:this.props.user.pass, 
        id_projet: this.projet.ID}, (text)=>{this.setState({memos:JSON.parse(text), loadingMemos:false})})
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
            
            fetch('https://www.ypepin.com/application/Create/AddTask.php', {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': "multipart/form-data"
                },
                body: data
            }).then((reponse)=> reponse.text()).then((reponse) => {
                
                if (reponse.indexOf("200")===-1) {message('Oups !', 
                "Nous n'avons pu créer cette tâche... Peut-être le nom de la tâche existe-t-il déjà ?")
                console.log(reponse)}
                else{
                    this.setState({tasks:[{nom:this.nomtache, description:this.contenutache}, ...this.state.tasks]})
                }
            
            }
            
            ).catch(
                (error) => console.log(error))}
            this.nomtache = "";
            this.contenutache = "";

}
            //---------

    sendMeeting()
    {
        if (this.descriptionReunion && this.state.meetingDate)
        {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.props.user.identifiant);
        data.append("pass", this.props.user.pass);
        data.append("nom", "Reunion " + this.projet.nom);
        data.append("date", this.state.meetingDate.dateString);
        data.append('type', "Réunion");
        data.append("id_projet", this.projet.ID)
        if (this.decisions) data.append("decisions", this.decisions);
        data.append("description", this.descriptionReunion);
        
        api.create_event(data, (text) => {
            if (text.search("200")!==-1) {message("Well done !", "Votre réunion a bien été ajoutée à l'agenda.\n"+
            "Seuls les participants au projet pourront la consulter dans leur calendrier")
        }else message ('Oups', "Nous n'avons pas pu créer la réunion")})

        }
    }
    meetingCalendar()
    {
       if  (this.role==="Chef de projet")
       {
        return(
            <Modal visible={this.state.calendarVisible} transparent={true} 
                onRequestClose={()=>this.setState({calendarVisible:false})}>

                <TouchableOpacity style={{backgroundColor:"rgba(200,200,200,0.4)", flex:1, 
                   justifyContent:"center"}}
                   onPress ={()=>{this.setState({calendarVisible:false})}}>
                    
                    <Calendar onDayPress = {(day)=>{this.setState({meetingDate:day});}}
                markedDates={this.state.meetingDate?{[this.state.meetingDate.dateString]:{selected:true}}:null}
                minDate={new Date()}/>
                
                <TouchableOpacity style={styles.calendarButton}
                 onPress={()=>{ 
                     if (this.state.meetingDate)
                     {this.sendMeeting()
                    this.setState({calendarVisible:false})
                    }
                    }}>
                    <Text style={{color:"white", alignSelf:"center"}}>CONFIRMER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.calendarButton, backgroundColor:"red"}}
                 onPress={()=>{ this.setState({calendarVisible:false})
                    }}>
                    <Text style={{color:"white", alignSelf:"center"}}>ANNULER</Text>
                    </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

        )
    } return null;
    }
        //------------    
    
        sendSuggestion(){
        if (this.suggestion)
                {
                    this.setState({loadingMemos:true})
                    let data = new FormData();
                    data.append("id_projet", this.projet.ID);
                    data.append("identifiant", this.props.user.identifiant);
         data.append("pass", this.props.user.pass);
         data.append("proposition", this.suggestion)
         if(this.contenutache)data.append("description", this.contenutache)
         
         data = formatPostData(data);

         api.add_suggestion_to_project(data,(reponse) => {
            this.setState({loadingMemos:false})
            if (reponse.indexOf("200")===-1) message('Oups !', 
            "Nous n'avons pu émettre cette proposition... Décidément, les génies sont incompris")
            else{
                this.importSuggestions()             
            }
        })
         }
            }
            
    //---------------        
    addWorker()/*Ajoute un participant au projet*/{
                
                let data = new FormData();
                data.append("id_projet", this.projet.ID);
                data.append("identifiant", this.props.user.identifiant);
                data.append("pass", this.props.user.pass);
                data.append("role", "membre")
                data.append("id_membre", this.props.user.identifiant)
                
                
                data = formatPostData(data);
                
                fetch('https://www.ypepin.com/application/Create/AddWorker.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'multipart/form-data',
                        'Content-Type': "multipart/form-data"
                    },
                    body: data
                }).then((reponse)=> reponse.text()).then((reponse) => {
                    
                    if (reponse.includes("200"))
                    {
                        message("Félicitations !", "Vous serez bientôt ajouté au projet")
                        this.props.navigation.goBack();
                    }
                }
                
                ).catch(
                    (error) => console.log(error))
     }

     createMemo()
     {
         if (this.memo)
         {
             let data = new FormData()
             data.append("identifiant", this.props.user.identifiant)
             data.append("pass", this.props.user.pass)
             data.append("contenu", this.memo)
             data.append("id_projet", this.projet.ID)
             api.create_memo(data, (text)=>this.importMemos(true))
             this.setState({createMemoDialog:false})
             this.memo = "";

         }
     }
     
     //-------------------
     //permet de quitter un projet dans la base de données
     //on retourne directement à la vue "liste des projets"
     quitProject()
     {
        console.log("quit") 
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
                        
                        fetch('https://www.ypepin.com/application/Delete/QuitterProjet.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'multipart/form-data',
                                'Content-Type': "multipart/form-data"
         },
         body: data
        }).then((reponse)=> reponse.text()).then((reponse) => {
            
            this.props.navigation.goBack();
        }
        
        ).catch(
            (error) => console.log(error))
        }
        }
    ])
}
        //On récupère les suggestions depuis l'API. Puis on les stocke dans le state
        //Elles seront affichées dans la boite à idées
        importSuggestions()
        { 
            const data = new FormData()
            data.append("id_proj", this.projet.ID);
            //
            fetch("https://www.ypepin.com/application/Read/ListeIdeeProjets.php?id_proj="+this.projet.ID).then((reponse)=>
        reponse.text()).then((reponse)=>{
            
            reponse = JSON.parse(reponse);
            
            this.setState({suggestions:reponse})}).catch((error)=>console.log(error))
            
        }

    //ouvre la boite de dialogue qui permet de créer une suggestion
    openSuggestionDialog()
    {
        this.setState({suggestion:true})
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
/**
 * Ci-dessous les composants visuels 
 */

theme_item(theme, item_title)
{
    theme = theme == this.state.selectedTheme ? "":theme
    return(
    <View>
        <TouchableOpacity style={styles.theme_item_view} onPress={()=>{this.setState({selectedTheme:theme})
                this.importTasks(); this.importSuggestions(); this.importWorkers(); this.importMemos(); this.importCategories()}}
                onLongPress={()=>{if (theme=="idees") this.openSuggestionDialog()
                if (theme == "notes") this.setState({createMemoDialog:true})}} >
                <Text style={styles.theme_item}>{">"} {item_title} </Text>
        </TouchableOpacity>
    </View>)
}

memberView()
   {
    return (
            <View style={styles.memberView}>
                <Text style={{alignSelf:"center", fontWeight:"bold"}}>PARTICIPANTS : </Text>
            <FlatList horizontal={true} data = {this.state.participants}
            renderItem = {(item)=><CarteMembre membre ={item.item} onPress = {(worker)=>{
                if (item.item.role!=="Chef de projet" && ["Chef de projet", "Organisateur"].includes(this.role) && item.item.identifiant!==this.props.user.identifiant)
                {
                    this.setState({workerOptions:true});
                    this.selectedMember =  worker;
                }
            }}/>}
            keyExtractor = {(item)=>{hashCode(item.identifiant)}}
            
            />

            </View>
        )
  
    }

taskView()
{
    
    
    if (this.projet.mine)
    {
       if (this.state.selectedTheme=="taches") 
       { 
       if (this.state.tasks && this.state.categories)
        {
        console.log("Categories :"+this.state.categories)
        return (
            <View>
                 {this.theme_item("taches", "Taches")}
            <View style={{maxHeight:windowHeight*0.5, marginBottom:10}}>
                <SectionList nestedScrollEnabled stickySectionHeadersEnabled
          sections={this.state.categories}
          keyExtractor={(item, index) => item.nom+index}
          renderItem={({ item }) => <CarteTaches task={item} isChef={this.chef.identifiant==this.props.user.identifiant}
          role = {this.role} navigation = {this.props.navigation} user={this.props.user}/>}
          renderSectionHeader={({section:{title} }) => (
            <View style={{backgroundColor:colors.blue, width:windowWidth, padding:10,
            marginBottom:10}}>
            <Text style={{fontWeight:"bold", fontSize:22, alignSelf:"center", color:"white"}}>{title}</Text></View>
          )}
        />
            {/*<FlatList nestedScrollEnabled={true}  data={setListAsPairs(this.state.tasks)}
            renderItem={(item)=>      
                <DoubleCarteTaches task={item.item} isChef={this.chef.identifiant==this.props.user.identifiant}
                role = {this.role} navigation = {this.props.navigation} user={this.props.user}/>}
                keyExtractor={(item)=>hashCode(item[0].nom)}>

            </FlatList>*/}
            </View>
            </View>
        )}

        return(<View>
            {this.theme_item("taches", "Taches")}
        <Text style={{alignSelf:"center"}}>Aucune tâche</Text></View>)
        }
        return this.theme_item("taches", "Taches")
    
        }
        
    
}

boiteAIdees()
{
    
    
    if (this.projet.mine)
    {
       if (this.state.selectedTheme=="idees")
        {
        if (this.state.suggestions)
       {
        return(
            <View style={{padding:5, maxHeight:windowHeight*0.6}}>
                {this.theme_item("idees", "Idées")}
            
                <FlatList data={this.state.suggestions} keyExtractor= {(item, index)=>index+item.proposition+item.id_membre} nestedScrollEnabled
                renderItem={(s)=>(<CarteSuggestion suggestion={s.item} isChief={this.projet.chef==this.props.user.identifiant}
                    uid={this.props.user.identifiant}/>)}/>
            
            </View>
        )}
        return(
            <View style={{alignContent:"center", justifyContent:"center", paddingTop:10}}>
                {this.theme_item("idees", "Idées")}
                <Text style={{alignSelf:"center"}}>Aucune idée proposée pour le moment</Text>
            </View>
        )
        }
        return(
            this.theme_item("idees", "Idées")
        )
    }
    
}

memoView()
{
    if (this.projet.mine)
    {
        if (this.state.selectedTheme=="notes")
        {
        if (this.state.memos)
        {
        return(
           <View style={{maxHeight:windowHeight/2}}>{this.theme_item("notes", "Notes")}
            <FlatList data={this.state.memos} nestedScrollEnabled
                keyExtractor={item=>item.contenu}
            renderItem={(item)=>
                <CarteMemo memo={item.item} user={this.props.user} isChef={["Organisateur", "Chef de projet"].includes(this.role)} 
                updateMemos={()=>this.importMemos(true)}/>}></FlatList>
                </View>
        )}
        return(
            this.theme_item("notes", "Notes")
        )}
        return  this.theme_item("notes", "Notes")
    }
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
componentDidMount(){
this.setHeader();

 this.importCategories()
api.load_memos_from_project({identifiant:this.props.user.identifiant, pass:this.props.user.pass, 
    id_projet: this.projet.ID}, (text)=>{this.setState({memos:JSON.parse(text)})})

}




//Corps de la vue
render(props){
    console.log("render")
    return(
        <View style={{flex:1, backgroundColor:"white"}}>
                
            <ScrollView style={styles.scroll}>
           
        <View style={styles.infoview}>            
            <ScrollView contentContainerStyle={styles.descriptionBox}>
           <Text numberOfLines={this.state.numberOfLines?null:10} style={{fontSize:16, textAlign:"justify"}}
           dataDetectorType="all" selectable>
               <View>
               <Text style={{fontWeight:"bold", alignSelf:"center", borderBottomWidth:2}}>OBJECTIFS</Text></View>
               <WiText>{"\n"+this.projet.objectifs+"\n\n"}</WiText>
               <View><Text style={{fontWeight:"bold", alignSelf:"center", borderBottomWidth:2}}>DESCRIPTION</Text></View>
                <WiText  numberOfLines={this.state.numberOfLines?null:3} >{"\n"+this.projet.description+"\n"}</WiText>
                </Text>
                <TouchableOpacity onPress={()=>this.setState({numberOfLines:!this.state.numberOfLines})}>
                    <Icon name={this.state.numberOfLines?"chevron-up":"chevron-down"} size={32} type="font-awesome" color={colors.blue}/>
                </TouchableOpacity>
            </ScrollView>
            </View>


            <View style={{flex:1}}>
            {this.memberView()/**flatlist des participants au projet*/}
            {this.workerButton()/* bouton ajouter un participant */}
            {this.taskView()}
            {this.boiteAIdees()}
            {this.memoView()}
            </View>


            {this.addTaskDialog()}
            {this.addSuggestionDialog()}
            <EditDialog visible={this.state.reunion} inputCount={1}
            firstInputHandler={(text)=>{this.descriptionReunion=text}} close={()=>this.setState({reunion:false})}
            editButtonTitle="Ajouter à l'agenda" firstPlaceholder="Objet de la réunion"
            editAction={()=>{this.setState({reunion:false, calendarVisible:true})}}/>
            {this.meetingCalendar()}
            
            <EditDialog visible={this.state.createMemoDialog} inputCount={1}
            firstInputHandler={(text)=>{this.memo=text}} close={()=>this.setState({createMemoDialog:false})}
            editButtonTitle="Publier la note" firstPlaceholder="Quoi de neuf dans le projet ?"
            editAction={()=>{this.createMemo()}} firstInputMaxLength={500}/>

            <LoadingMessage message="Mise à jour" visible={this.state.loadingMemos}/>
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
            <BottomSheet
             isVisible={this.state.workerOptions}
              containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            modalProps={{"onRequestClose": ()=>this.setState({workerOptions:false})}}  >
             {this.generateWorkerOptions().map((l, i) => (
                                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}
                                        disabled={l.disabled}>
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
            flex:3,
            fontSize:20,
            padding:0
            //backgroundColor:"red"
        },
        descriptionBox:
        {
            paddingHorizontal:15, 
            paddingVertical:2, 
            borderColor:"black",
            marginBottom:5
            
            
        },
        theme_item:{
            fontWeight:"700",
            paddingVertical:10,
            fontSize:18, 
          },
          theme_item_view:{
            borderBottomWidth:2,
            marginBottom:4,
          },
  
        carte:
       {
           width: 100,
           height: 70,
           marginLeft:2,
           marginRight: 18,
           marginVertical:30,
           paddingTop:7,
           overflow: "hidden",
           paddingLeft:10,
          borderRadius: 20,
          backgroundColor:colors.yellow,
          opacity:0.8,
          shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:8.30,
            elevation:14,
            shadowOffset: {
                width: 0,
                height: 8,
            }  
       },

       carteMemo:
       {
           backgroundColor:"lightgrey", 
            margin:10, 
            marginVertical:25,
            padding:5,
            paddingBottom:8,
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
       idee:
       {
           borderColor: colors.chocolate,
           borderWidth: 2,
           borderBottomWidth:1
       },
       textIdee:{
           padding:4
       }, 
       calendarButton:{backgroundColor:"black", 
       width:200, 
       margin:7, 
       alignSelf:"center", 
       padding:15},
       memberView:{
           justifyContent:"space-around"
       }

    }
)