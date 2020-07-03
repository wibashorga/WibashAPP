import React from "react";
import {View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";

const Header = ()=> (
    <View style = {styles.header}>
        <Icon name = "menu" type = "ionicons" iconStyle={{alignSelf:"flex-start"}}
        color = "white" size = {30}/>
    </View>
)
const styles = StyleSheet.create(
    {
    header:
  {
    height: windowHeight/12,
    backgroundColor: "black",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  }
    }
)
export default Header;