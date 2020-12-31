import React from 'react';
import {Icon} from "react-native-elements";
import {Text, View, Modal, Dimensions, StyleSheet, ScrollView, TouchableOpacity, FlatList,Image,Button,SafeAreaView, ImageBackground} from 'react-native';
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
       
       this.chef = this.props.projet.chef;
       this.state = {selected:false}
        
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
               if(!this.state.selected) this.props.navigation.navigate("Edit", {projet:this.props.projet, chef:this.chef})
               else {
                   this.setState({selected:false})
                this.props.unselect()
                }
            }}
                
                //quand on clique longuement on sélectionne la carte
                onLongPress = {()=>{
                   
                   if(this.props.user.niveau!=3){ this.props.select(); this.setState({selected: true})}
                
                
                }}
            style={{...styles.carte, backgroundColor:this.state.selected?"red":this.props.projet.mine?"rgb(156,220,254)":"white"}}
            activeOpacity={0.8} >
                
                <View style={styles.imagecarte}></View>
                <View>
               
                <Text style = {{fontWeight:"bold", alignSelf:"center", fontSize:25}}>
                    {this.props.projet.nom}</Text>

                    <Text style={styles.textecarte}>
                        <Text style={{fontWeight:"bold"}}>Objectifs : </Text>
                        {"\n"+this.props.projet.objectifs+"\n"}</Text>

                    <Text style = {styles.textecarte}>
                    <Text style={{fontWeight:"bold"}}>Description : </Text>
                    {"\n"+this.props.projet.description+"\n"}
                        </Text>

        <Text style={styles.textecarte}> <Text style={{fontStyle:"italic"}}>Chef de projet : </Text> 
        {this.chef.pseudo}</Text>
                
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
    
        this.props.navigation.addListener("focus", ()=>this.importProjects());
        
        if (this.props.route.params) 
        {
            if (this.props.route.params.refresh) this.importProjects();
        }
        
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
        
        fetch('http://www.wi-bash.fr/application/Read/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            
            this.setState({projets:JSON.parse(json)});
            this.props.setProjects(json);
        }
            ).catch(
            (error) => console.log(error))
        }
    }
    setHeader()
    {
        this.props.navigation.setOptions({title : "PROJETS", headerStyle:{
            backgroundColor:"red"
          }, headerTitleStyle:{alignSelf:"center", color:"white", fontSize:23},
        })
        
    }

    setHeaderTrashIcon()
    {
        this.props.navigation.setOptions({headerRight: ()=>(<Icon name = "ios-trash" type="ionicon" color = {"white"} 
        iconStyle={{marginRight:10, padding:10}} size={35} onPress = {()=>{this.deleteSelectedProjects()}}/>)})
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
        
        setInterval(()=>{
            this.importProjects();
        }, 12000);
        this.setHeader()
    }
    render()
    {
     return(
            <ImageBackground style = {styles.conteneur} 
            source = {require('./ressources/fond2projet.jpg')}>

                

                <View style = {styles.containtcarte}>
                    <FlatList 
                        data={this.state.projets} 
                        keyExtractor={(item)=>item.ID} 
                        renderItem= {(item)=><Carte projet = {item.item} 
                        navigation={this.props.navigation} membres={this.props.membres}
                        user={this.props.user}
                        select = {()=>this.select(item)                            
                        }
                        unselect = {()=>
                            this.unselect(item)
                        }
                        /> } 
                        horizontal = {false}/>
                </View>

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
           backgroundColor: "black",
           
           
           
           
           
       },
       imagepro:{
           width: 380,
           height:600
       },

       carte_projet:
       {
           backgroundColor: "transparent",
           height:150,
           //marginBottom: 0,
           width:140,
           shadowColor: "#000",
            shadowOffset: {
	        width: 1,
	        height: 5},
            shadowOpacity: 0.55,
            shadowRadius: 3.84,
            elevation: 10

       },
       containimage:{
           flex : 1,
       },
       titrecarte:
       {
           fontWeight:"bold",
           textAlign: "center",
           fontFamily: "roboto"
       },
       textecarte:
       {
           fontSize:18
       },
       containtcarte:
       {
           flex : 2,
          
           
           
       },
       description:
       {
           fontFamily: "serif",
           overflow: "hidden"
       },
       carte:
       {
        
           width: 310,
           height: 400,
           marginRight: 20,
           marginTop:30,
           overflow: "hidden",
           paddingLeft:10,
          borderRadius: 20,
          backgroundColor:"white",
          
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
