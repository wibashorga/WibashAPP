import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';
import Header from "./Header";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivé aujourd'hui ? ", "Wi-Bash n'était pas complet sans vous, "];

export default class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true
        }
        this.message = messages[parseInt(Math.random()*messages.length)];
        setTimeout(()=> this.setState({bienvenue: false}), 2000);
    }
    render()
    {
        console.log(this.state.user)
        return(
            <View style = {{flex:1}}>
                <Modal visible = {this.state.bienvenue} animationType = "slide"
                transparent= {true}>
                    <View style = {styles.modal}>
                        <Text style= {styles.message}>{this.message+this.state.user.pseudo}</Text>
                        </View>
                </Modal>

                <Header onPress = {()=>{}}/>
                <Text>Bievenue, {this.state.user.pseudo} !</Text>
                
            </View>
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
       }
    }


)
