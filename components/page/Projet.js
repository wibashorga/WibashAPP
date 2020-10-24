import React from 'react';
import Header from "./Header.js"
import {Text, View, Modal, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
const token = "PPlaFk63u4E6";

function organize_as_pairs (projets)
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
}

class CarteProjet extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }
    render()
    {
        return(
            <TouchableOpacity style = {styles.carte_projet}>
                <Text style= {styles.titrecarte}>{this.props.projet.nom}</Text>
                <Text style = {styles.description}>
                    {this.props.projet.description}
                </Text>
                
            </TouchableOpacity>

        )
    }
}

const render_proj = (item) => {
    return(
        <View style = {{flex:1, flexDirection:"row"}}>
            <CarteProjet projet = {item.item[0]}/>
            <CarteProjet projet = {item.item[1]}/>
        </View>
    )
}

export default class Projet extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
        }
        this.projets = [];
        this.importProjects();
        
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
        }).then((reponse)=> reponse.text()).then((json) => this.projets=JSON.parse(json)).catch(
            (error) => console.log(error))
    }
    render()
    {
        
        
        return(
            <View style = {{flex:1}}>
                <Header/>
                <ScrollView>
                    <FlatList data={organize_as_pairs(this.projets)} 
                    renderItem = {render_proj}/>
                </ScrollView>                           
                
            </View>
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
       carte_projet:
       {
           backgroundColor: "transparent",
           height:200,
           width:200,
           shadowColor: "#000",
            shadowOffset: {
	        width: 1,
	        height: 5},
            shadowOpacity: 0.55,
            shadowRadius: 3.84,
            elevation: 10

       },
       titrecarte:
       {
           fontWeight:"bold",
           textAlign: "center",
           fontFamily: "roboto"
       },
       description:
       {
           fontFamily: "roboto",
           overflow: "hidden"
       }
    }
)
