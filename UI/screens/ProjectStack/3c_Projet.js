import React from 'react';
import {Icon} from "react-native-elements";
import {Text, View, Modal, Dimensions, StyleSheet, ScrollView, TouchableOpacity, FlatList,Image,Button,SafeAreaView, ImageBackground} from 'react-native';
import {load_projects, load_project_workers, load_tasks} from "../../../API/api_request";
import {WiText} from "../../custom/custom"
import * as Font from "expo-font";
import { ActivityIndicator } from 'react-native';
const token = "PPlaFk63u4E6";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



/*Il s'agit du composant qui permet d'afficher les projets
dans une carte individuelle.
Si l'utilisateur participe au projet, ce dernier apparaît en bleu
*/
class Carte extends React.Component
{   /*on passe en paramètre du constructeur le projet, et la navigation
    */
    constructor(props)
    {
       super(props);
       
       this.chef = this.props.projet.chef || {pseudo:""};
       this.state = {selected:false}
       let data = new FormData(); data.append("id_proj",this.props.projet.ID)
       data.append("id_projet", this.props.projet.ID)
       this.workers = [];
       this.tasks = []
       if (this.props.projet.mine)load_tasks(data, (reponse)=>{this.tasks=JSON.parse(reponse)})
       load_project_workers(data, (reponse)=>{this.workers=JSON.parse(reponse)})

        if (this.chef===this.props.user.identifiant) this.chef = this.props.user;
        else{
            try{
                //On récupère l'objet js associé au  chef du projet 
                //à partir de l'objet global membres
                this.chef = this.props.membres.filter((m)=>m.identifiant==this.chef)[0];
                
            }catch(error){
                
                console.log(error)
            }
        }
        
    }
    
    render(props)
    {

        /*Chaque carte correspond à un 'TouchableOpacity'
          quand on clique dessus, on navigue vers la page du projet
          (EditProject.js)
        */
        return(
            <TouchableOpacity 
            onPress = {()=>{
                //quand on clique sur la carte on navigue vers d'édition de projet
                //à laquelle on passe en paramètre le projet courant
               if(!this.state.selected) this.props.navigation.navigate("Edit", {projet:this.props.projet, 
                chef:this.chef, tasks:this.tasks, 
            workers:this.workers})
               else {
                   this.setState({selected:false})
                this.props.unselect()}}}
                
                //quand on clique longuement on sélectionne la carte
                onLongPress = {()=>{
                   if(this.props.user.niveau<2){ this.props.select(); this.setState({selected: true})}
                }}
            style={{...styles.carte, backgroundColor:this.state.selected?"red":"white"}}
            activeOpacity={0.5} >
                
               <View>
                   <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style = {styles.titrecarte}>
                    {this.props.projet.nom}</Text>
                    <Text style={{color:"white", padding:7,display:this.props.projet.mine?null:"none", backgroundColor:"green",
                borderRadius:50, fontSize:10}}>My</Text>
                </View>
                    
                    <Text numberOfLines={3}>
                        <WiText>{this.props.objectifs+"\n"} </WiText>  
                    </Text>
                
                </View>
            </TouchableOpacity>
        )
    }
}
export default class Projet extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
            projets:
                (this.props.projets && this.props.projets instanceof Array) ?this.props.projets.map((projet)=>({...projet, selected:false})) : []
        }
        this.dataImported = false;
    
        
        
        if (this.props.route.params) 
        {
            if (this.props.route.params.refresh) this.importProjects();
        }
        this.importProjects()
        
    }
    // cette fonction récupère la liste des projets depuis l'API
    //et le stocke dans ths.state.projets
    importProjects ()
    {
        if (this.props.navigation.isFocused())
        {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        
        load_projects(data, (json) => {
            json = JSON.parse(json)
           if (this.state.projets.map(p=>{p.ID, p.mine,p.nom, p.objectifs})!== json.map(p=>{p.ID, p.mine,p.nom, p.objectifs}))
            {
            this.setState({projets:json});
            this.props.setProjects(json);
        }
        
        })
        }
    }
    

    setHeader()
    {
        
        
    }

    setHeaderTrashIcon()
    {
        this.props.navigation.setOptions({headerRight: ()=>(<TouchableOpacity onPress = {()=>{this.deleteSelectedProjects()}}><Icon name = "ios-trash" type="ionicon" color = {"white"} 
        iconStyle={{marginRight:10, padding:10}} size={35} /></TouchableOpacity>)})
    }
    unsetHeaderTrashIcon()
    {
        this.props.navigation.setOptions({headerRight: ()=>{}})
    }
    select(item)
    {
        if (this.props.user.niveau!=3){
        this.state.projets[this.state.projets.indexOf(item.item)].selected = true;
        if (item.item.chef==this.props.user.identifiant || this.props.user.niveau<2) this.setHeaderTrashIcon();
        else this.unsetHeaderTrashIcon()
        }
    }
    unselect(item)
    {
        if (this.props.user.niveau!=3)
        {
        this.state.projets[this.state.projets.indexOf(item.item)].selected = false;
        if (this.state.projets.filter(p=>p.selected).length==0) this.unsetHeaderTrashIcon();
        //si aucun projet n'est sélectionné, l'icone disparait
        }
    }
    unselectAll()
    {
        for (let p of this.state.projets) this.unselect(p)
    }
    deleteSelectedProjects()
    {
        let data = new FormData();
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        data.append("id_projet", "")
    
        for (let projet of this.state.projets.filter(p=>p.selected))
        {
            data.append("id_projet", projet.ID)
        fetch('http://www.wi-bash.fr/application/Delete/DeleteProject.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((reponse) => {
            if(reponse.indexOf("200")!==-1)
            {
            
            }
        }
            ).catch(
            (error) => console.log(error))
        }
        this.importProjects()
        this.unsetHeaderTrashIcon()
    }
    //bouton créer un  projet
    createProjectButton()
    {
        if (this.props.user.niveau!="3")
    {
        return (
            <View>
                <Button
                    title="create new project"
                    color="red"
                    onPress= {()=>{this.props.navigation.navigate("new")}}
                />
            </View>
        )
    } return null;

}
    //boucle de rafraîchissement de la liste dees projets
    componentDidMount(){
        this.importProjects()
        this.intervalID = setInterval(()=>{
            this.importProjects();
        }, 20000);

        this._unsuscribeEvent = this.props.navigation.addListener("willFocus", ()=>{console.log("Focus"); this.importProjects(); });
        
        
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
        this._unsuscribeEvent( )
    }
    render()
    {
     return(
            <ImageBackground style = {styles.conteneur}>               

               {this.state.projets?<View style = {styles.containtcarte}>
                    <FlatList 
                        data={this.state.projets} 
                        keyExtractor={(item)=>item.ID} 
                        numColumns={1}
                        renderItem= {(item)=><Carte projet = {item.item} objectifs = {item.item.objectifs}
                        navigation={this.props.navigation} membres={this.props.membres}
                        user={this.props.user}
                        select = {()=>this.select(item)                            
                        }
                        unselect = {()=>
                            this.unselect(item)
                        }
                        police={this.state.fontsLoaded?"Montserrat":""}/> } 
                        horizontal = {false}/>
                </View>:<ActivityIndicator size={45} color="white"/>}

                {this.createProjectButton()}
                                      
                
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create(
    {
       
       categorie:
       {
           flex:1,
           height : 290
       },
       Titre:
       {
           height:50,
           backgroundColor: "red",
           alignItems : 'center',
           marginBottom:(windowHeight/2)-290
       },
       conteneur:
       {
           flex : 1,
          backgroundColor:"black"          
       },
       
       containimage:{
           flex : 1,
       },
       titrecarte:
       {
           fontWeight:"bold",
           fontSize:20
       },
       textecarte:
       {
           fontSize:17
       },
       containtcarte:
       {
           flex : 2,
     
       },
       carte:
       {
           paddingTop:5,
           flex:1,
           borderRadius:10,
           alignSelf:"center",
           width:windowWidth,
           marginVertical:10,
           overflow: "hidden",
           paddingHorizontal:10,
           borderColor:"black",
           backgroundColor:"rgba(255, 255, 255, 0.5)",
           marginRight:3
          
       },
    }
)


// 








/* function organize_as_pairs (projets)
{
    let l = [];
    for (let i = 0; i<projets.length; i+=2)
    {
        let pair = [];
        pair.push(projets[i]);
        if (i<projets.length-1)pair.push(projets[i+1]);
        l.push(pair);
    }
    return l;

    const render_proj = (item) => {
    return(
        <View style = {{flex:1, flexDirection:"row"}}>
            <CarteProjet projet = {item.item[0]}/>
            <CarteProjet projet = {item.item[1]}/>
        </View>
    )
}


} */
