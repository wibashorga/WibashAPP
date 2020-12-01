import React from 'react';
import {Text, View, Modal, StyleSheet, FlatList,Button} from 'react-native';
const token = "PPlaFk63u4E6";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous", "Anthony COLVIL est un homme parfait"];

export default class Reglage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true
        }
        
    }
    
    render()
    {
        
        return(
            <View style = {{flex:1}}>
                <View style = {styles.option}>
                    <View style = {styles.conteneurimage}>
                        <Text>image profile</Text>

                    </View>

                    <View style = {styles.logo}>
                        <Text> les medailles</Text>

                    </View>

                </View>



                <View style = {styles.contenue}>
                    <Text>contenue</Text>

                </View>
                
            </View>

        )
    }
}

const styles = StyleSheet.create(
    {
        option:{
            flex:1,
            backgroundColor:"green",
            flexDirection:"row",
        },
        contenue:{
          flex:5,
          backgroundColor:"yellow",  
        },
        conteneurimage:{
            flex:1,
            backgroundColor:"red",
        },
        logo:{
            flex:2,
            backgroundColor:"green",
        }

    }
)