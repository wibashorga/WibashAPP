import React from 'react';
import Header from "./Header.js";

import {Text, View, Modal, StyleSheet, ScrollView, TouchableOpacity, FlatList,Image,Button,SafeAreaView} from 'react-native';
const token = "PPlaFk63u4E6";

/*Il s'agit du composant qui permet d'afficher les projets
dans une carte individuelle.
Si l'utilisateur participe au projet, ce dernier apparaît en bleu
*/
class Carte extends React.Component
{
    constructor(props)
    {
       super(props);
       
       this.chef = this.props.projet.chef;
        
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
            <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("Edit", {
                projet:this.props.projet, chef:this.chef})}}
            style={{...styles.carte, backgroundColor:this.props.projet.mine?"rgb(156,220,254)":"white"}}>
                
                <View style={styles.imagecarte}>
                
                </View>

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
           projets: this.props.projets
        }
        
        
        if (this.props.route.params) 
        {
            if (this.props.route.params.refresh) this.importProjects();
        }
        
    }
    
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        
        fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
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

    componentDidMount(){
        
        setInterval(()=>{
            this.importProjects();
        }, 20000);
    }
    render()
    {
        
        return(
            <View style = {styles.conteneur}>

                <View style = {styles.Titre} >
                    <Text style  = {{fontSize : 25, color:"white"}}> PROJETS </Text>


                </View>

                <View style = {styles.containimage}>
                    <Image 
                    style={styles.imagepro}
                    source = {require('./ressources/fond2projet.jpg')}/>
                </View>
                



                <View style = {styles.containtcarte}>
                        <FlatList data={this.state.projets} keyExtractor={(item)=>item.ID} 
                    renderItem= {(item)=><Carte projet = {item.item} 
                    navigation={this.props.navigation} membres={this.props.membres}
                    user={this.props.user}/>} horizontal = {true}/>

                </View>

                <Button
                    
                    title="edit new project"
                    color="red"
                    onPress= {()=>{this.props.navigation.navigate("new")}}
                    
                />
                                      
                
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
       
       categorie:
       {
           flex:1,
           height : 290,
       },
       Titre:
       {
           height:50,
           backgroundColor: "red",
           alignItems : 'center',
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
           width:150,
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
           fontSize:20
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
