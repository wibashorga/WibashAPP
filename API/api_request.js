import { add } from "react-native-reanimated";
import {token, url} from "./api_table";
import {formatPostData} from "./security"

function post_request(request_url, data, success_callback, fail_callback)
{
    if (request_url && data && data instanceof FormData)
    {
        data = formatPostData(data)
        fetch(request_url, {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
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
        //console.log(adress)

        
        fetch(adress).then(
            (reponse)=>reponse.text()).then((text)=>{
                if (success_callback) success_callback(text)
            }).catch((error)=>
            {if (fail_callback)fail_callback(error); else console.log(request_url, " | error:\n", error)})
    }
}
//Read

export const load_events = async (args, success_callback, fail_callback) => 
get_request(url.ypepin.read.liste_events.url, args, success_callback, fail_callback)


export const load_projects = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_projets.url, args, success_callback, fail_callback)

export const load_members = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_membres.url, args, success_callback, fail_callback)

/**Liste des taches dans un projet. Args : id_proj */
export const load_tasks = async (args, success_callback, fail_callback) => 
get_request(url.ypepin.read.liste_taches.url, args, success_callback, fail_callback)

export const load_actus = async (args, success_callback, fail_callback) => 
get_request(url.ypepin.read.liste_actus.url, args, success_callback, fail_callback)

/**liste des participants à un projet. Args: id_projet */
export const load_project_workers = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_participants_projet.url, args, success_callback, fail_callback)


export const load_participants_event = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_participants_event.url, args, success_callback, fail_callback)

export const load_memos_from_project = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_memos_projet.url, args, success_callback, fail_callback)


//Create

/**Créer un compte dans l'application */
export const create_account = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_compte.url, args, success_callback, fail_callback)

/**Créer un évènement */
export const create_event = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_event.url, args, success_callback, fail_callback)

export const create_actu = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_actu.url, args, success_callback, fail_callback)

export const create_memo = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_memo.url, args, success_callback, fail_callback)

export const add_participant_to_event = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_participant_event.url, args, success_callback, fail_callback)

/**Ajouter un participant à un projet */
export const add_worker_to_project = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_participant_projet.url, args, success_callback, fail_callback)

export const add_suggestion_to_project = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_proposition_projet.url, args, success_callback, fail_callback)

export const add_task_to_project = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_tache.url, args, success_callback, fail_callback)


//Delete

export const delete_task = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.delete_task.url, args, success_callback, fail_callback)

export const delete_event = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.delete_event.url, args, success_callback, fail_callback)

//Update
/**Modifier les informations de son compte:
 * On peut changer son nom, son prenom, sa story, sa phrase de la mort... etc
 * Les arguments obligatoires sont : "identifiant", "pass"
 * Les arguments optionnels sont : "nom", "prenom", "story", "new_pass", "phrase", "mail"
 */
export const edit_my_account = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.update.update_account.url, args, success_callback, fail_callback)

export const change_worker_status = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.update.update_worker_status.url, args, success_callback, fail_callback)

