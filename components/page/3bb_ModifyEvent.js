import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';
import { formatPostData } from './security';
import {Icon} from "react-native-elements"
import {delete_event} from "../../API/api_request"
import {Calendar} from "react-native-calendars"
import {sqlToUserDate, windowHeight, windowWidth} from "./custom"
import { LoadingMessage } from './ModalDialog';

export default class ModifyEvent extends React.Component
{
  constructor(props)
  {
    super(props);
    this.eventTitle = this.props.route.params.event.nom || "";
    this.eventDescription = this.props.route.params.event.description || "";
    this.state={
      date:this.props.route.params.event.date,
      loading:false
    }
    
  }
  componentDidMount()
  {
    this.props.navigation.setOptions({headerTitle:this.props.route.params.event.nom, headerRight:()=>(
    <TouchableOpacity onPress={()=>{delete_event({})}}>
      <Icon name="trash" type="entypo"/>
    </TouchableOpacity>)})
  }

  sendModifications()
  {
    this.setState({loading:true})
    let data = new FormData();
    data.append("identifiant", this.props.user.identifiant)
    data.append("pass", this.props.user.pass);
    data.append("nom_event", this.props.route.params.event.nom)
    if (this.eventTitle) data.append("nouveau_nom", this.eventTitle)
    if (this.eventDescription) data.append("description", this.eventDescription);
    if (this.state.date) data.append("date", this.state.date)
    data = formatPostData(data)
    fetch('https://www.ypepin.com/application/Update/UpdateEvent.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
        this.setState({loading:false})
        //console.log(text)
        this.props.navigation.goBack();
            }
            ).catch(
            (error) => this.setState({loading:false}))
        
  }



/**let today = new Date()
        today = today.toLocaleDateString().split("/")
        today = "20"+today[2]+"-"+today[0]+"-"+today[1]
        
        return(
        <ScrollView style = {styles.container} 
        contentContainerStyle={styles.content}
        contentInset = {{left:0, right:0, top:0, bottom:-20}}>
            
            
            <TextInput style = {styles.textinput} placeholder = {"Nom de l'évènement"} 
            onChangeText = {(text)=>{this.nom = text}} style={{...styles.textinput}}
            autoCapitalize = {"sentences"}
            ></TextInput>

        
            <View style = {{flex:1, flexDirection:"row", marginVertical:10}}>
                
                <Calendar onDayPress = {(day)=>{this.setState({date:day});}} current= {this.props.route.params || null}
                markedDates={this.state.date?{[this.state.date.dateString]:{selected:true}}:null}
                minDate={today} style={styles.calendar}/>
                
            </View>

            <Text style= {styles.info}>Type : </Text>
           
        <View style={(os=="ios")?styles.pickerView:null}>
        <Picker
        selectedValue={this.state.type}
         style={{height: 60, width: 250}}
        onValueChange={(itemValue, itemIndex) =>
            this.setState({type: itemValue})
                    }>
                        {types.map((type)=>(
                            <Picker.Item label={type.label} value={type.value} />        
                        ))}
                    
                    </Picker>
                    </View>
            <View style={(os=="ios")?styles.descripost:null}>

                {this.ajouterDescription()}
                
                <Button buttonStyle={styles.sendbutton}onPress = {this.sendEvent} title="Post">
                    <Text  style={{color:"black", fontSize:25, textAlign:"center"}}>Poster</Text>
                    </Button>

            </View>
                
                
                    
            
        </ScrollView>
        )
    } */
  render() {
    let marked = {}
    marked[this.state.date] = {selected:true}
    return(
      <ScrollView>
          {/*}
        <View style = {{backgroundColor: 'black', alignItems: 'center'}}>
          <Text style = {styles.title}> MODIFIER EVENEMENT </Text>
        </View>*/}

        <View style = {{margin:5}}>
          <LoadingMessage message = "Modifications en cours..."
          visible = {this.state.loading} close = {()=>{this.setState({loading:false})}}/>

          <View style = {{marginTop: 20}}>
            <Text style = {{fontSize: 20}}>Titre</Text>
            
            <TextInput style = {styles.textInput}  defaultValue = {this.props.route.params.event.nom} 
            placeholderTextColor="black" onChangeText={(text)=>{if (text)this.eventTitle=text;
              else this.eventTitle = this.props.route.params.event.nom;
            /* this.props.navigation.setOptions({headerTitle:text?text:
              this.props.route.params.event.nom})*/
            }}  multiline/>
          
          </View>

          <View style={{marginTop: 20}}>
            
            <Text style={{fontSize: 20}}>Description</Text>
            
            <TextInput style = {styles.textInput}  defaultValue = {this.props.route.params.event.description}
            placeholderTextColor={"black"} onChangeText={(text)=>{this.eventDescription = text}}
            multiline={true}/>
          
          </View>
          <Calendar onDayPress = {(day)=>{this.setState({date:day});}}
                markedDates={marked}
                minDate={new Date()} theme=
                {{calendarBackground:"white", textDayFontSize:16}} onDayPress= {(day)=>{
                    this.setState({date:day.dateString})
                    
                }} style={{height:330, width:windowWidth}}/>
                <Text>{sqlToUserDate(this.state.date)}</Text>

        </View>
            
        <View style = {{marginTop: 50}}>

          <TouchableOpacity style = {[styles.button, {marginBottom: 20, backgroundColor: 'blue'}]}
          onPress = {()=>this.sendModifications()}>
            <Text style={{fontSize: 18, color:"white"}}>ENREGISTRER</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {[styles.button, {backgroundColor: 'red',}]}
          onPress = {()=>this.props.navigation.goBack()}>
            <Text style={{fontSize: 18, color:"white"}}>ANNULER</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title:
    {
      fontSize : 25, 
      color:"white", 
      padding: 10
    },
  textInput:
    {
      alignSelf: "center",
            margin: 5,
            width: windowWidth-20,
            color: "black",
            padding:7,
            textAlignVertical:'top',
            backgroundColor:"white",
           // borderRadius:20,
            shadowColor:"#000",
            shadowOpacity:0.39,
            shadowRadius:8.30,
            elevation:14

		},
	button:
	{
    //borderRadius: 5, 
    margin:5,
    padding: 10,
    alignItems: 'center',
    color:"white"
	},

});

