import React from "react";
import {Text, View, TouchableOpacity, ScrollView, FlatList, StyleSheet} from "react-native";

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
        this.state = {participants:[]};
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
            console.log(json, this.projet.ID);
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

render(props){
    return(
        <View>
                {this.header()}
            <ScrollView>
            <Text style = {styles.nomProjet}>{this.projet.nom.toUpperCase()}</Text>
            <View>
            <Text>Chef de projet : {this.projet.chef}, {this.projet.date}</Text>
            </View>
            <Text>{this.projet.description}</Text>

            {this.memberView()}


            </ScrollView>
        </View>
    )
}

}

const styles = StyleSheet.create(
    {
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
           
       }
    }
)