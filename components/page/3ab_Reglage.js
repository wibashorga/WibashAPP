import React from 'react';
import {Text, View, Modal, StyleSheet, FlatList} from 'react-native';
const token = "PPlaFk63u4E6";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous", "Anthony COLVIL est un homme parfait"];

export default class Reglage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true
        }
        this.message = messages[parseInt(Math.random()*messages.length)];
        setTimeout(()=> this.setState({bienvenue: false}), 2000);


        
    }
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => console.log(json)).catch(
            (error) => console.log(error))
    }
    render()
    {
        console.log(this.state.user)
        this.importProjects();
        return(
            <View style = {{flex:1}}>


                <View style = {styles.Titre} >
                    <Text style  = {{fontSize : 25}}> Important </Text>


                </View>


                <Button
  onPress={navigation.openDrawer()  }
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
                

                <FlatList style = {{flex:1}}>

                    
                    <View style = {styles.cartein}>
                        <View style = {styles.containtcarte}>

                            <View style = {styles.Titrecarte}>

                                <Text style  = {{fontSize : 25}}> Titre </Text>

                            </View>

                                
                            <View style = {styles.textecarte}>

                                <Text style  = {{fontSize : 20}}>
                                Paphius quin etiam et Cornelius senatores,
                                    ambo venenorum artibus pravis se polluisse confessi, 
                                    eodem pronuntiante Maximino sunt interfecti.  
                                </Text>

                            </View>
                            
                            

                        </View>
                        

                    </View>





                    <View style = {styles.cartein}>
                        <View style = {styles.containtcarte}>

                            <View style = {styles.Titrecarte}>

                                <Text style  = {{fontSize : 25}}> Titre </Text>

                            </View>

                                
                            <View style = {styles.textecarte}>

                                <Text style  = {{fontSize : 20}}>
                                Paphius quin etiam et Cornelius senatores,
                                    ambo venenorum artibus pravis se polluisse confessi, 
                                    eodem pronuntiante Maximino sunt interfecti.  
                                </Text>

                            </View>
                            
                            

                        </View>
                        

                    </View>



                    <View style = {styles.cartein}>
                        <View style = {styles.containtcarte}>

                            <View style = {styles.Titrecarte}>

                                <Text style  = {{fontSize : 25}}> Titre </Text>

                            </View>

                                
                            <View style = {styles.textecarte}>

                                <Text style  = {{fontSize : 20}}>
                                Paphius quin etiam et Cornelius senatores,
                                    ambo venenorum artibus pravis se polluisse confessi, 
                                    eodem pronuntiante Maximino sunt interfecti.  
                                </Text>

                            </View>
                            
                            

                        </View>
                        

                    </View>




                    <View style = {styles.cartein}>
                        <View style = {styles.containtcarte}>

                            <View style = {styles.Titrecarte}>

                                <Text style  = {{fontSize : 25}}> Titre </Text>

                            </View>

                                
                            <View style = {styles.textecarte}>

                                <Text style  = {{fontSize : 20}}>
                                Paphius quin etiam et Cornelius senatores,
                                    ambo venenorum artibus pravis se polluisse confessi, 
                                    eodem pronuntiante Maximino sunt interfecti.  
                                </Text>

                            </View>
                            
                            

                        </View>
                                        

                    </View>

                   
                </FlatList>
                
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
       modal:
       {
           backgroundColor: "rgb(156, 23, 84)",
           alignSelf: "center",
           marginTop: 100,
           paddingVertical: 30,
           paddingHorizontal: 5,
           borderRadius: 20
       },
       message:
       {
           color: "white",
           fontSize: 22,
           fontStyle: "italic",
           fontWeight: "bold"
       },
       categorie:
       {
           flex:1,
           height : 290
           
       },
       Titre:
       { 
           backgroundColor: "red",
           alignItems : 'center',
           height : 90,
           paddingTop : 30 
       },
       carte:
       {
           flex:4,
           backgroundColor: "white",
           

       },
       cartein:
       {
           flex : 1,
           margin : 20,
           backgroundColor: "#D3D3D3",
           height : 190,
           width : 310,
           borderRadius : 20
           
       },
       containtcarte:
       {
           flex : 1,
           margin : 10,
           
       },
       Titrecarte:
       {
           flex:1,
           
           alignItems : 'center',
       },
       textecarte:
       {
           flex:4,
          
       }
       
       
    }
)