import React from 'react';
import {Text, View, Modal, StyleSheet, FlatList, SafeAreaView, ScrollView} from 'react-native';
import Header from "./Header";
const token = "PPlaFk63u4E6";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous "];

class Carte extends React.Component
{
    constructor(props)
    {
        super(props);
        console.log(this.props.projet);
    }
    render()
    {
        console.log(this.props.projet.Description)
        
        return(
            <View style={styles.carte}>
                <Text style = {{fontWeight:"bold"}}>{this.props.projet.Nom}</Text>
                <Text>{this.props.projet.Description}</Text>
            </View>
        )
    }
}

export default class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true,
            projets: []
        }
        this.message = messages[parseInt(Math.random()*messages.length)];
        this.importProjects();
        setTimeout(()=> this.setState({bienvenue: false}), 2000);
    }
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        console.log(this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            json = JSON.parse(json);
            this.setState({projets:json})}).catch(
            (error) => console.log(error))
    }
    render()
    {
        return(
            <ScrollView style = {{flex:1}}>

                
                <Modal visible = {this.state.bienvenue} animationType = "slide"
                transparent= {true}>
                    <View style = {styles.modal}>
                        <Text style= {styles.message}>{this.message+this.state.user.pseudo}</Text>
                        </View>
                </Modal>
                <Header onPress = {()=>{}}/>
                <Text>Bievenue, {this.state.user.pseudo} !</Text>
            

                    <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {{fontSize : 40}} > Projet </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        <FlatList data={this.state.projets} keyExtractor={(item)=>item.ID} 
                    renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>

                        </View>
                </View>





                <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {{fontSize : 40}} > Projet </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        <FlatList data={this.state.projets} keyExtractor={(item)=>item.ID} 
                    renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>

                        </View>
                </View>




                <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {{fontSize : 40}} > Projet </Text>

                        </View>

                        <View style = {styles.containtcarte}>
                        <FlatList data={this.state.projets} keyExtractor={(item)=>item.ID} 
                    renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>

                        </View>
                </View>




            </ScrollView>
                       
        )
    }
}


const styles = StyleSheet.create(
    {
       modal:
       {
           backgroundColor: "rgb(156, 23, 84)",
           alignSelf: "center",
           marginTop: 100,
           paddingVertical: 30,
           paddingHorizontal: 5,
           borderRadius: 20
       },
       message:
       {
           color: "white",
           fontSize: 22,
           fontStyle: "italic",
           fontWeight: "bold"
       },
       categorie:
       {
           flex:1,
           height : 290
           
       },
       Titre:
       {
           height:90,
           backgroundColor: "red",
           paddingTop:15,
           alignItems : 'center',
       },
       carte:
       {
           backgroundColor: "white",
           width: 200,
           height: 150,
           marginRight: 20,
           marginTop:10,
           overflow: "hidden",
           padding:10,
          borderRadius: 20,
          
          
          
       },
       cartein:
       {
           flex : 1,
           margin : 20,
           backgroundColor: "#D3D3D3",
           height : 190,
           width : 310,
           borderRadius : 20
           
       },
       containtcarte:
       {
           flex : 1,
           margin : 10,
           
       },
       Titrecarte:
       {
           flex:1,
           alignItems : 'center',
       },
       textecarte:
       {
           flex:4,
          
       }
       
       
    }

   
                

)
