import {token, url} from "./api_table";
import {formatPostData} from "./security"

function post_request(request_url, data, success_callback, fail_callback)
{
    if (request_url && data && data instanceof FormData)
    {
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
        for (let arg of data.getParts())
        {
            adress += encodeURI(arg.fieldName+"="+arg.string)+"+";
        }

        
        fetch(adress).then(
            (reponse)=>reponse.text()).then((text)=>{
                if (success_callback) success_callback(text)
            }).catch((error)=>
            {if (fail_callback)fail_callback(error); else console.log(request_url, " | error:\n", error)})
    }
}

export const load_events = async (args, success_callback, fail_callback) => 
get_request(url.ypepin.read.liste_events, args, success_callback, fail_callback)


export const load_projects = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_projets, args, success_callback, fail_callback)

export const load_members = async (args, success_callback, fail_callback) => 
post_request(url.ypepin.read.liste_membres, args, success_callback, fail_callback)

