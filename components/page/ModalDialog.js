import React from "react";
import {Modal, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from "react-native";
import {Button} from "react-native-elements";
import {WiText} from "./custom"
import { Icon} from "react-native-elements";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

/**
 * Compoenent custom
 * Requested props :
 * visible (boolean)
 * close()
 * inputCount
 * firstInputHandler / secondInputHandler
 * firstInputMaxLength / secondInputMaxLength
 * firstPlaceholder / secondPlaceholder
 * editButtonTitle
 * editAction()
 * cancelButtonTitle
 */
export class EditDialog extends React.Component{
    constructor(props)
    {
        super(props);
        this.inputCount = this.props.inputCount||1;

        
    }

    render()
    {
        
        if (this.inputCount==2)
        {
        return(
            <Modal visible={this.props.visible} animationType='fade' transparent= {true}
        onRequestClose={()=>this.props.onRequestClose()}>

            <View style = {styles.view}>
                <TouchableOpacity onPress=
               {()=>{if(this.props.close)this.props.close()}}>
               <Text style={{alignSelf: "flex-end", marginRight:10, fontSize:18}}>X</Text> 
               </TouchableOpacity>

                <TextInput placeholder = {this.props.firstPlaceholder || ""} 
                onChangeText={(text)=>this.props.firstInputHandler(text)}
                style={styles.input} maxLength ={this.props.firstInputMaxLength||300}></TextInput>
                
                <TextInput placeholder = {this.props.secondPlaceholder?this.props.secondPlaceholder:""}
                onChangeText={(text)=>this.secondInputHandler(text)}
                style={styles.input} multiline={true}></TextInput>
                
                <Button title = {this.props.editButtonTitle || "Editer"} onPress = {()=>{
                    this.props.editAction();
                    if (this.props.close) this.props.close()
                }} buttonStyle={styles.editButton}/>


                <Button title= {this.props.cancelButtonTitle || "Annuler"} buttonStyle={{...style.buttonStyle, 
                backgroundColor:"red"}}
                onPress={()=>this.props.close()}/>
                       

                </View>
            </Modal>
        )}
        else
        {
            return(
                <Modal visible={this.props.visible} animationType='fade' transparent= {true}
        onRequestClose={()=>{
            if(this.props.close)this.props.close()
            }}>

            <View style = {styles.view}>
               <TouchableOpacity onPress=
               {()=>{if(this.props.close)this.props.close()}}>
               <Text style={{alignSelf: "flex-end", marginRight:10, fontSize:18}}>X</Text> 
               </TouchableOpacity>

                <TextInput placeholder = {this.props.firstPlaceholder || ""} 
                style={styles.textinput}
                onChangeText={(text)=>this.props.firstInputHandler(text)} multiline={true}
                style={styles.input} maxLength ={this.props.firstInputMaxLength||300}></TextInput>
                
                
                <Button title = {this.props.editButtonTitle || "Editer"} onPress = {()=>{
                    this.props.editAction();
                    if (this.props.close) this.props.close()
                }} buttonStyle={styles.editButton}/>


                <Button title= {this.props.cancelButtonTitle || "Annuler"} buttonStyle={{...styles.editButton, backgroundColor:"red"}}
                onPress={()=>this.props.close()}/>
                       

                </View>
            </Modal>
                        )
        }
    }
}
/**
 * visible
 * close function (fires when click on any part of the view)
 * description
 * title
 * editAction (function)
 * editButtonTitle (facultatif)
 * auxiliarAction
 * auxiliarActionTitle
 */

export class DetailDialog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {}

    }
    render()
    {
        return(
            <Modal visible={this.props.visible} transparent={true} 
                onRequestClose={()=>this.props.close()}>
                   <TouchableOpacity style={{backgroundColor:"rgba(200,200,200,0.4)", flex:1, 
                   justifyContent:"center"}}
                   onPress ={()=>{this.props.close()}}>
                    <View 
                    style = {styles.popup}>
                            <Text style={{fontWeight:"bold"}}>{this.props.title}</Text>
                            <WiText>{this.props.description}</WiText>
                            
                            {this.props.editAction?(
                            <Button title = {this.props.editButtonTitle || "Modifier"}buttonStyle= {{marginTop:15}} 
                            onPress ={()=>{
                                this.props.close()
                                this.props.editAction();
                                }} />):null}
                                {(this.props.auxiliarAction&& this.props.auxiliarActionTitle)?
                                (<Button title = {this.props.auxiliarActionTitle} buttonStyle= {{marginTop:15,
                                     backgroundColor:"black"}} 
                                     onPress ={()=>{
                                            this.props.close()
                                            this.props.auxiliarAction();
                                }} />):null}
                    </View>
                    </TouchableOpacity>
                </Modal>
        )
    }
}

export class SuccessMessage extends React.Component
{
    render()
    {    
    return(
            <Modal visible={this.props.visible} transparent={true} 
                onRequestClose={()=>this.props.close()}>
                   <TouchableOpacity style={{backgroundColor:"rgba(200,200,200,0.4)", flex:1, 
                   justifyContent:"center"}}
                   onPress ={()=>{this.props.close()}}>
                    <View 
                    style = {styles.popup}>
                         <Text>{this.props.successMessage || "Vos opérations on été effectuées avec succès"}</Text>
                         <Icon type="ionicons" name="check" size={25} color="green"/>
                    </View>
                    </TouchableOpacity>
                </Modal>
        )
    }
}

export class LoadingMessage extends React.Component
{
    render()
    {    
    return(
            <Modal visible={this.props.visible} transparent={true} 
                onRequestClose={()=>this.props.close()}>
                   <View style={{backgroundColor:"rgba(200,200,200,0.4)", flex:1, 
                   justifyContent:"center"}}>
                    <View 
                    style = {styles.popup}>
                         <Text>{this.props.message}</Text>
                         <ActivityIndicator size="large" color = "black"/>

                    </View>
                    </View>
                </Modal>
        )
    }
}



const styles = StyleSheet.create({
    view:{
        marginTop:(windowHeight/2)-200,
        backgroundColor:"white",
        paddingTop: 20,
        paddingBottom:40,
        marginHorizontal: 30,
        borderRadius:20,
        justifyContent:"space-between",
        height:windowHeight/2.7
    },
    editButton:{
        height:windowHeight/15,
        marginBottom:10
    },
    
    input:{
        margin:15,
        textAlignVertical: "top"
    },
    popup:{
        //width:200,
        padding: 15,
        paddingHorizontal:40,
        backgroundColor:"white",
        marginBottom:20,
        alignSelf:"center",
        opacity:1

    },textinput:{
        height:windowHeight/4,
        textAlignVertical:"top"
    }
})