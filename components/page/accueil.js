import React from 'react';
import { StyleSheet, Text, Image, View,Dimensions, TouchableOpacity} from 'react-native';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default class Accueil extends React.Component 
{
  constructor(props){
    super(props);
    this.state = {
    userName : "Yoel Pépin"
  }
}
  render()
  {
  return (
    
    <View style = {styles.container}>
      <View style = {{}}>
        <Image source = {require("./ressources/VFeu.jpg")} style = {{width: 100, height: 100, alignSelf: "center"}}/>
        <Text style = {{textAlign: "center"}}> {this.state.userName+"\n"}</Text>
        <Text style  = {{textAlign:"center", fontWeight: "bold", fontSize: 22}}> Accueil : {"\n"}</Text>
      </View>
      
      

      <View style= {styles.choosePage}>
        
        <TouchableOpacity onPress = {()=>{}} style = {{...styles.choosePageButton, backgroundColor:"red"}}>
          <Text style= {styles.choosePageText}>Projets</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress = {()=>{}} style = {{...styles.choosePageButton, backgroundColor: "rgb(248, 186,0)"}}>
          <Text style= {styles.choosePageText}>Événements</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress = {()=>{}} style = {{...styles.choosePageButton, backgroundColor:"black"}}>
          <Text style= {styles.choosePageText}>Membres</Text>
        </TouchableOpacity>
      </View>

    </View>
  
    
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    backgroundColor: "beige"
    
    
      
  },
  choosePage:
  {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: windowHeight/10,
    
    

  },
  choosePageButton:
  {
    borderRadius: 15,
    alignSelf: "center",
    paddingVertical: 15,
    width: windowWidth - 40,
    

  }, 
  choosePageText:
  {
    color: "white",
    textAlign: "center",
    fontSize: 22
  }
});
