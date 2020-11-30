import React from 'react';
import {View, StyleSheet, StatusBar, Dimensions,Text} from 'react-native';
import {Icon} from "react-native-elements";


const windowHeight = Dimensions.get("window").height;

export default class Header extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        StatusBar.setHidden(true);
        return(
        
        <View style = {styles.container}>
            <Icon name = "menu" type = "Entypo" color = "white" iconStyle = {styles.icon}
            onPress = {()=>this.props.onPress()}/>
            
            <Text style = {styles.textetitre} > Wi-bash </Text>

                    
                
            
        </View>


        
        )
    }
}
const styles = StyleSheet.create(
    {
        container:
        {
            backgroundColor: "red", 
            flexDirection: "row",
            alignContent: "center",
            height: windowHeight/12,
            
        },
        icon:
        {
            marginLeft: 10,
            marginTop: 40,
            alignSelf: "flex-start",
        },
        textetitre:{
            marginTop:20,
            marginLeft:70,
            marginEnd:60,
            fontSize:40,
            color:"white",
            

       },
    }
)
