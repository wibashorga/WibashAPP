import React from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import {Icon} from "react-native-elements";
const windowHeight = Dimensions.get("window").height
/*
class NavBar extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
    return*/

const NavBar = ({navigation}) => (
<View style = {styles.navbar}>
  <Icon name ="home" size={30} color = "white" 
  onPress = {()=> navigation.navigate("connexion")} />

    <Icon name ="search1" type="antdesign" size={30} color = "white"
    onPress = {()=> navigation.navigate("search")}/>
    
    <Icon name="feather" type = "feather" size={30} color = "white"
    onPress = {()=>navigation.navigate("commentaire")}/>
    
    <Icon name = "person" type="ionicons" size={30} color = "white"/>
</View>
)

const styles = StyleSheet.create({
        navbar:
        {
            height: windowHeight/12,
            backgroundColor: "black",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            
          }
    }
)
export default NavBar;