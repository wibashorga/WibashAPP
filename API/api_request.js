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
    if (request_url && args instanceof FormData)
    {
        let adress = request_url+"?";
        if (args)
        {
        for (let arg of args.getParts())
        {
            adress += encodeURI(arg.fieldName+"="+arg.string)+"+";
        }
        }
        console.log(adress)

        
        fetch(adress).then(
            (reponse)=>reponse.text()).then((text)=>{
                if (success_callback) success_callback(text)
            }).catch((error)=>
            {if (fail_callback)fail_callback(error); else console.log(request_url, " | error:\n", error)})
    }
}

export const load_events = async (args, success_callback, fail_callback) => 
get_request(url.ypepin.read.liste_events.url, args, success_callback, fail_callback)


export const load_projects = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_projets.url, args, success_callback, fail_callback)

export const load_members = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_membres.url, args, success_callback, fail_callback)

export const load_tasks = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_taches.url, args, success_callback, fail_callback)

export const load_participants_event = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_participants_event.url, args, success_callback, fail_callback)

export const add_participant_event = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.create.creer_participant_event.url, args, success_callback, fail_callback)
