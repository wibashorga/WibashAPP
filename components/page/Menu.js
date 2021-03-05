import React from 'react';
import {View, Text} from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements'
import Navigation from '../Navigation/Navigation';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  }
]



export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.userRole = this.getRole
    }

    getRole () {
        if (this.props.user.niveau == '2') return 'Membre'
        if (this.props.user.niveau == '1') return 'Developpeur'
        if (this.props.user.niveau == '0') return 'Administrateur'
    }

    setHeader() {
      this.props.navigation.setOptions({
        headerShown: false
      })
    }
    
    componentDidMount(){
      this.setHeader();
   }
   

    render () {
        return (
            <View>
                {
                    list.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar source={{uri: l.avatar_url}} />
                        <ListItem.Content>
                        <ListItem.Title>{this.props.user.prenom} {this.props.user.nom}</ListItem.Title>
                        <ListItem.Subtitle>{this.userRole}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron name='chevron-right' type='evilicon' 
                            onPress={() => this.props.navigation.navigate("Profil")}/>
                    </ListItem>
                    ))
                }
                
                <Text>
                  <Divider style={{ backgroundColor: 'blue' }} />
                </Text>
            </View>
        );
    }
}
/*
<ListItem>
      <Avatar source={require('../images/avatar1.jpg')} />
      <ListItem.Content>
        <ListItem.Title>Limited supply! Its like digital gold!</ListItem.Title>
        <View style={styles.subtitleView}>
          <Image source={require('../images/rating.png')} style={styles.ratingImage}/>
          <Text style={styles.ratingText}>5 months ago</Text>
        </View>
      </ListItem.Content>
      
    </ListItem>


styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
})
*/