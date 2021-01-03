import React from "react";
import {Modal, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

/**
 * Compoenent custom
 * Requested props :
 * onRequestClose() (quand on appuie sur le bouton retour)
 * visible (boolean)
 * inputCount
 * firstInputHandler / secondInputHandler
 * firstInputMaxLength / secondInputMaxLength
 * firstPlaceholder / secondPlaceholder
 * editButtonTitle
 * editAction()
 * cancelButtonTitle
 * close()
 */
export class EditDialog extends React.Component{
    constructor(props)
    {
        super(props);
        this.inputCount = this.props.inputCount?this.props.inputCount:1;

        
    }

    render()
    {
        
        if (this.inputCount==2)
        {
        return(
            <Modal visible={this.props.visible} animationType='fade' transparent= {true}
        onRequestClose={()=>this.props.onRequestClose()}>

            <View style = {styles.view}>
               <Text style={{alignSelf: "flex-end", marginRight:10, fontSize:18}} onPress=
               {()=>{if(this.props.close)this.props.close()}}>X</Text> 

                <TextInput placeholder = {this.props.firstPlaceholder || ""} 
                onChangeText={(text)=>this.props.firstInputHandler(text)}
                style={styles.input} maxLength ={this.props.firstInputMaxLength}></TextInput>
                
                <TextInput placeholder = {this.props.secondPlaceholder?this.props.secondPlaceholder:""}
                onChangeText={(text)=>this.secondInputHandler(text)}
                style={styles.input}></TextInput>
                
                <Button title = {this.props.editButtonTitle || "Editer"} onPress = {()=>{
                    this.props.editAction();
                    if (this.props.close) this.props.close()
                }} buttonStyle={{marginBottom:10}}/>


                <Button title= {this.props.cancelButtonTitle || "Annuler"} buttonStyle={{backgroundColor:"red"}}
                onPress={()=>{this.setState({visible:false})}}/>
                       

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
               <Text style={{alignSelf: "flex-end", marginRight:10, fontSize:18}} onPress=
               {()=>{if(this.props.close)this.props.close()}}>X</Text> 

                <TextInput placeholder = {this.props.firstPlaceholder || ""} 
                onChangeText={(text)=>this.props.firstInputHandler(text)}
                style={styles.input} maxLength ={this.props.firstInputMaxLength}></TextInput>
                
                
                <Button title = {this.props.editButtonTitle || "Editer"} onPress = {()=>{
                    this.props.editAction();
                    if (this.props.close) this.props.close()
                }} buttonStyle={{marginBottom:10}}/>


                <Button title= {this.props.cancelButtonTitle || "Annuler"} buttonStyle={{backgroundColor:"red"}}
                onPress={()=>{this.setState({visible:false})}}/>
                       

                </View>
            </Modal>
                        )
        }
    }
}

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
                            <Text style={{fontWeight:"bold"}}>{this.props.titre}</Text>
                            <Text>{this.props.description}</Text>
                            
                            {this.props.editAction?(
                            <Button title = "Modifier" buttonStyle= {{marginTop:15}} 
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

const styles = StyleSheet.create({
    view:{
        marginTop:(windowHeight/2)-200,
        backgroundColor:"white",
        paddingTop: 20,
        paddingBottom:40,
        marginHorizontal: 30,
        borderRadius:20
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

    }
})