import React from 'react';
import {Text} from 'react-native';

export default class Home extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.navigation.params
        }
    }
    render()
    {
        return(
            <Text>  Ayyyyyyyyyyy chié !!!! </Text>
        )
    }
}
