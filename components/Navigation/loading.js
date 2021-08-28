import React from "react";
import {Text, View} from "react-native";

// Vue de Chargement lorsque les identifiants sont stocké par l'application
export default class Loading extends React.Component
{
    render()
    {
        return(
            <View style={{flex:1, justifyContent:"center", alignContent:"center"}}>
                <Text style={{alignSelf:"center", fontSize:22}}>Chargement...</Text>
            </View>
        )
    }
}