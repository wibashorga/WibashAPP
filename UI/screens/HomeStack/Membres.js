import React, { useState } from 'react';
import { ScrollView, Image,StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { WiText } from '../../custom/custom';
import {load_members} from "../../../API/api_request"
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

function MemberCard(props){
  props.membre.role = ["dev", "administrateur", "membre", "visiteur"][props.membre.niveau]
  props.membre.mail = props.membre.mail==null || props.membre.mail=="null"?"":props.membre.mail
  return(
  <TouchableOpacity style={styles.bulle} onPress = {()=>props.setMember(props.membre)}>
    <Image source={{uri:props.membre.photo_profil}} 
    style={{height:100, width:100, borderRadius:50}}></Image>
    <Text>{props.membre.prenom+" "+props.membre.nom}</Text>

  </TouchableOpacity>)
} 


function Members(props) {
  let user = props.route.params.user;
    const [members, setMembers] = useState([])
    const [membre, setSelectedMember] = useState({})
    React.useEffect(()=>{
      if (!members.length)
      {
    load_members({identifiant:user.identifiant, pass:user.pass},
      (text)=>{setMembers(JSON.parse(text));setSelectedMember(JSON.parse(text)[0]) 
        membre.role = ["dev", "administrateur", "membre", "visiteur"][membre.niveau]
      membre.mail = membre.mail==null || membre.mail=="null"?"":membre.mail})
    }
    
    }
      )
      
  return (
    <View style={styles.container}>
      <View style={{flex : 3,}}>
      {membre && membre.nom?
      <ScrollView style = {styles.conteneur} contentContainerStyle={{justifyContent:"center"}}>
            <Image source={{uri:membre.photo_profil||"/../../ressources/default_pp.jpg"}} 
                style= {styles.image}></Image>
        
        <Text style = {{fontWeight:"bold", fontSize:24, alignSelf: "center"}}>{membre.prenom+" "+membre.nom}
        <Text  style = {{fontStyle:"italic", fontWeight:"normal", fontSize:15}}>({membre.role}) </Text></Text>
        <Text style={{fontSize:18}} selectable={true} dataDetectorType = "all">
            <Text selectable style={{color:"blue", fontStyle:"italic"}}>{membre.mail+" \n"}</Text>

        <Text>Mon crédo : {membre.phrase+"\n\n"}</Text>
        <Text>{membre.story}</Text>

        </Text>
            {/*this.adminInfo()*/}
           
            </ScrollView>:<ActivityIndicator size={25}/>}</View>
     <View style={styles.bottomView}> 
     <FlatList horizontal data={members} keyExtractor={item=>item.identifiant} renderItem={(item)=><MemberCard membre={item.item}
     setMember = {(m)=>{
       setSelectedMember(m)
     }}/>}/>
     </View>
    </View>
  );
}
export default MembersScreen = ({navigation, route})=>(<Members navigation = {navigation} route={route}/>)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"space-between",
    
  },
  Titre:
  {
      
      backgroundColor: "red",
      alignItems : 'center',
  },
  conteneur:
  {
      width: windowWidth,
      backgroundColor: "white",
      paddingTop:5,
      paddingHorizontal:3,
      marginBottom:20
      
  },
  image: {width:windowWidth/2, 
   height:windowWidth/2, 
   alignSelf:"center" , borderRadius:15},
   bulle:{
     marginHorizontal:10,

   },
   bottomView:{
     flex:1,
  
   }

});
