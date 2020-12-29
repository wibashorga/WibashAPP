import React from "react";
import {Text, View,ScrollView, Button, TextInput, Switch, StyleSheet} from "react-native";


export default class ModifyProject extends React.Component
{
    constructor(props)
    {
        this.projet = this.props.navigation.params.projet;
        this.state = {open:this.projet.open==1}


    }
    updateProject()
    {

    }

    render()
    {
        return(
            <ScrollView>
                 {/*changer le titre du projet */}
                 <View style = {styles.textInputView}>
                 <TextInput placeholder = {this.projet.nom} 
                 onChangeText={(text)=>{this.projet.nom = text}}
                 style = {styles.titleInput}></TextInput>
                 </View>
                 
                 {/*changer la description du projet*/}
                 <View style = {styles.textInputView}>
                 <TextInput placeholder = {this.projet.description} 
                 onChangeText={(text)=>{this.projet.description = text}}
                 style = {styles.descriptionInput}/>
                 </View>
                 {/**changer les objectifs du projet*/}
                 <View style = {styles.textInputView}>
                 <TextInput placeholder = {this.projet.objectifs} onChangeText={(text)=>{this.projet.objectifs = text}}
                 style = {styles.goalInput}></TextInput>              
                 </View>

                 {/**déterminer si le projet est ouvert ou fermé*/}
                 <View style= {styles.openSwitchView}>
                     {this.state.open?(
                     <Text>Ouvert{"\n"}
                     <Text style={{fontSize:12, color:"rgb(100,100,100)"}}>tout le monde peut participer et s'inscrire au projet</Text></Text>):
                     (<Text>Fermé
                         <Text style={{fontSize:12, color:"rgb(100,100,100)"}}>seul le chef de projet peut 
                         ajouter des participants</Text>
                     </Text>)}
                     <Switch onValueChange={(value)=>{this.setState({open:!this.state.open}); this.projet.open = value?1:0}}
                     value={this.projet.open==1}/>
                 </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInputView:{
        borderBottomColor:"black",
        borderBottomWidth: 1,
        flex: 1
    },
    titleInput:{

    },
    goalInput:{

    },
    descriptionInput:{

    },
    openSwitchView:{
        flex:1,
        flexDirection:"row" 
    }
})