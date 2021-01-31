import AsyncStorage from "@react-native-async-storage/async-storage";
import formatPostData from "./security"

const token = "PPlaFk63u4E6";

async function storeItem(itemKey, itemValue)
{
    try {
        AsyncStorage.setItem(itemKey, JSON.stringify(itemValue))
        }catch(e)
        {
    
        }
} 

export const storeProjects = (projets)=>storeItem("projets", projets)
export const storeMembers = (membres)=>storeItem("projets", membres)
async function load_item_from_storage(itemKey, success_callback, fail_callback)
{
    try{

        let result = await AsyncStorage.getItem(itemKey)
        if (success_callback)
        {
            success_callback(result)
        }

    }catch(e)
    {
        if (fail_callback)
        {
            fail_callback(itemKey);
        }
    }
}
 export const load_projects_from_storage = (success_callback, fail_callback) => 
 load_item_from_storage("projets", success_callback, fail_callback)

async function storePendingProject(projet)
{
    try{
       let pending = await AsyncStorage.getItem("pendingProjects");
       pending = JSON.parse(pending);
       pending.push(projet)
       AsyncStorage.setItem("pendingProjects", pending)
    }catch(e)
    {
        try{
            AsyncStorage.setItem("pendingProjects", JSON.stringify([projet]))
        }catch(err){}
    }
}

async function storePendingEvent(event)
{
    try{
        let pending = await AsyncStorage.getItem("pendingEvents");
        pending = JSON.parse(pending);
        pending.push(event)
        AsyncStorage.setItem("pendingEvents", pending)
     }catch(e)
     {
         try{
             AsyncStorage.setItem("pendingEvents", JSON.stringify([event]))
         }catch(err){}
     }
}
async function sendPendingProjects(user)
{
    try{
       let pending = await AsyncStorage.getItem("pendingEvents");
       if (pending instanceof Array)
       {
       for (let projet of pending)
       {
        let data = new FormData();
        //this.description = encode_utf8(this.description);
        data.append("token", token);
        data.append("identifiant", user.identifiant);
        data.append("pass", user.pass);
        data.append("id_proj", projet.ID);
        data.append("nom", projet.nom);
        data.append("description", projet.description);
        data.append('objectifs', projet.objectifs);
        data.append("type", projet.type);
        data.append("minimal_level", projet.minimal_level);
        data.append("open", projet.open.toString())
        data = formatPostData(data);

        fetch('http://www.wi-bash.fr/application/Create/CreaProj.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data; charset=utf-8"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
            }
            ).catch(
            (error) => console.log(error))
        
       }
    }

    }catch(e)
    {

    }
}

