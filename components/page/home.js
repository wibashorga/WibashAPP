import React from 'react';
import {Text, View} from 'react-native';
import Header from "./Header";

export default class Home extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user
        }
        
    }
    render()
    {
        console.log("render")
        return(
            <View style = {{flex:1}}>
                <Header onPress = {()=>{}}/>
                <Text>Bievenue, {this.state.user.pseudo} !</Text>
                
            </View>
        )
    }
}
