import { add } from "react-native-reanimated";
import {token, url} from "./api_table";
import {formatPostData} from "./security"

function post_request(request_url, data, success_callback, fail_callback)
{
    if (!(data instanceof FormData) && data instanceof Object)
    {
        let formData = new FormData();
        for (let property in data) {
            formData.append(property, data[property])
        }
        data = formData;
    }
    
    if (request_url && data && data instanceof FormData)
    {
        data = formatPostData(data)
        fetch(request_url, {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data",
        'Cache-Control': 'reload, no-store, no-cache',
            'Pragma': 'no-cache',
            'Expires': 0
        },
        body: data
        }).then((reponse)=> reponse.text()).then((text) => {
            if (success_callback)
            {
                success_callback(text)
            }
        }
            ).catch((error) => {
            if (fail_callback)
            {
                fail_callback(error)
            }
            else console.log(request_url, " | error:\n", error)
            })
     }
    
}
function get_request(request_url, args, success_callback, fail_callback)
{
    if (args instanceof Object)
    {
        let formData = new FormData();
        for (let property in args) {
            formData.append(property, args[property])
        }
        args = formData
    }
    if (request_url && (args instanceof FormData || args==null))
    {
        let adress = request_url+"?";
        if (args)
        {
        for (let arg of args.getParts())
        {
            adress += encodeURI(arg.fieldName+"="+arg.string)+"&";
        }
        }
        console.log(adress)

        
        fetch(adress, {headers: {
            'Cache-Control': 'reload, no-store, no-cache',
            'Pragma': 'no-cache',
            'Expires': -2
          }}).then(
            (reponse)=>reponse.text()).then((text)=>{
                //console.log("ay shit :", text)
                if (success_callback) success_callback(text)
            }).catch((error)=>
            {if (fail_callback)fail_callback(error); else console.log(request_url, " | error:\n", error)})
    }
}
//Read

/**args : identifiant */
export const load_events = (args, success_callback, fail_callback) => 
get_request(url.ypepin.read.liste_events.url, args, success_callback, fail_callback)

/**args: identifiant, pass */
export const load_projects = (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_projets.url, args, success_callback, fail_callback)


/** args: identifiant, pass */
export const load_members = (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_membres.url, args, success_callback, fail_callback)

/**Liste des taches dans un projet. Args : id_proj */
export const load_tasks = (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_taches.url, args, success_callback, fail_callback)

export const load_actus = (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_actus.url, args, success_callback, fail_callback)

/**liste des participants à un projet. Args: id_projet */
export const load_project_workers =  (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_participants_projet.url, args, success_callback, fail_callback)


export const load_participants_event =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_participants_event.url, args, success_callback, fail_callback)

/**identifiant, pass, id_projet */
export const load_memos_from_project =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_memos_projet.url, args, success_callback, fail_callback)


//Create

/**Créer un compte dans l'application */
export const create_account =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_compte.url, args, success_callback, fail_callback)

/**Créer un évènement */
export const create_event =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_event.url, args, success_callback, fail_callback)

export const create_actu =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_actu.url, args, success_callback, fail_callback)

export const create_memo =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_memo.url, args, success_callback, fail_callback)

export const add_participant_to_event =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_participant_event.url, args, success_callback, fail_callback)

/**Ajouter un participant à un projet */
export const add_worker_to_project =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_participant_projet.url, args, success_callback, fail_callback)

export const add_suggestion_to_project =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_proposition_projet.url, args, success_callback, fail_callback)

export const add_task_to_project =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_tache.url, args, success_callback, fail_callback)


//Delete

export const delete_task =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.delete_task.url, args, success_callback, fail_callback)

export const delete_event =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.delete_event.url, args, success_callback, fail_callback)

//Update
/**Modifier les informations de son compte:
 * On peut changer son nom, son prenom, sa story, sa phrase de la mort... etc
 * Les arguments obligatoires sont : "identifiant", "pass"
 * Les arguments optionnels sont : "nom", "prenom", "story", "new_pass", "phrase", "mail"
 */
export const edit_my_account =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.update.update_account.url, args, success_callback, fail_callback)

export const change_worker_status =   (args, success_callback, fail_callback) => 
post_request(url.ypepin.update.update_worker_status.url, args, success_callback, fail_callback)


export const set_task_as_achieved =   (args, success_callback, fail_callback) => {
    if (args instanceof FormData) args.append("achievement", "1")
    if (args instanceof Object) args = {...args, achievement:"1"}
post_request(url.ypepin.update.update_task.url, args, success_callback, fail_callback)
}
export const update_member =  (args, success_callback, fail_callback) => 
post_request(url.ypepin.update.update_member.url, args, success_callback, fail_callback)
