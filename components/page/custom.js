import React from "react";
import {Text} from "react-native"
export const lightBlue ="rgb(156,220,254)";


export class WiText extends React.Component
{
  constructor(props){
    super(props)
    this.text = this.props.children
    this.split()
    
    
  }
  split()
  {
    let customizable = false;
    
    if (this.text instanceof String) customizable= true;
    else {
        try{
            this.text=this.text.join("")
            customizable = true
        }catch(e){}
    }
    if (customizable)
    {
    let boldRegexp = /[ ]\*.+\*[ ]/g
    let plainText = this.text.split(boldRegexp)
    let boldText = this.text.match(boldRegexp) || []
    boldText = boldText.map((item)=>(
    <Text style={{fontWeight:"bold"}}>{" "+item.slice(2, item.length-2)+" "}</Text>))
    let flattened = [];
    for (let i = 0; i < plainText.length; i++)
    {
      flattened.push(plainText[i])
      if (i<boldText.length) flattened.push(boldText[i])
    }
    this.text = flattened
    }

  }
  
   render()
   {
       
     return(
       <Text dataDetectorType="link" style={this.props.style||{}}>
         {this.text}
       </Text>
     )
   }
}
