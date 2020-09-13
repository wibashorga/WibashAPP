import React from 'react';
import {Text, View, Modal, StyleSheet, ScrollView} from 'react-native';
import Header from "./Header";
const token = "PPlaFk63u4E6";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'etait pas complet sans vous, "];

class Carte extends React.Component
{
    constructor(props)
    {
        super(props);
        console.log(this.props.projet);
    }
    render()
    {
        return(
            <View style={styles.carte}>
                <Text style = {{fontWeight:"bold"}}>{this.props.projet.Nom}</Text>
                <Text>{this.props.projet.Description}</Text>
            </View>
        )
    }
}

export default class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true,
            projets: {}
        }
        this.message = messages[parseInt(Math.random()*messages.length)];
        this.importProjects();
        setTimeout(()=> this.setState({bienvenue: false}), 2000);
    }
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        console.log(this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => {
            json = JSON.parse(json);
            this.setState({projets:json})}).catch(
            (error) => console.log(error))
    }
    render()
    {
        return(
            <View style = {{flex:1}}>

                
                <Modal visible = {this.state.bienvenue} animationType = "slide"
                transparent= {true}>
                    <View style = {styles.modal}>
                        <Text style= {styles.message}>{this.message+this.state.user.pseudo}</Text>
                        </View>
                </Modal>
                <Header onPress = {()=>{}}/>
                <Text>Bievenue, {this.state.user.pseudo} !</Text>
                <FlatList data={this.state.projets} keyExtractor={(item)=>item.ID} 
                renderItem= {(item)=><Carte projet = {item.item}/>} horizontal = {true}/>

                <ScrollView style = {{flex:1}}>


                    <View style = {styles.categorie}>

                        <View style = {styles.Titre}>
                            <Text style = {{fontSize : 40}} > Evenement </Text>


                        </View>
                        <View style = {styles.carte}>
                            <ScrollView horizontal={true} style = {{flex:1}}>

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




                            </ScrollView>

                            


                        </View>

                    </View>





                    <View style = {styles.categorie}>
                        <View style = {styles.Titre}>
                        <Text style = {{fontSize : 40}} > Projet </Text>


                        </View>
                        <View style = {styles.carte}>

                             <ScrollView horizontal={true} style = {{flex:1}}>

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


                            </ScrollView>


                        </View>


                    </View>





                    <View style = {styles.categorie}>
                        <View style = {styles.Titre}>
                        <Text style = {{fontSize : 40}} > Membres </Text>


                        </View>
                        <View style = {styles.carte}>

                             <ScrollView horizontal={true} style = {{flex:1}}>

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


                            </ScrollView>


                        </View>


                    </View>



                    <View style = {styles.categorie}>
                        <View style = {styles.Titre}>
                        <Text style = {{fontSize : 40}} > Important </Text>


                        </View>
                        <View style = {styles.carte}>

                             <ScrollView horizontal={true} style = {{flex:1}}>

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


                            </ScrollView>


                        </View>


                    </View>


                    

                </ScrollView>
                
                
                
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
           flex:1,
           backgroundColor: "red",
           alignItems : 'center',
           
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
