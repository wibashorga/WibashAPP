const wibash_prefix = "https://www.wi-bash.fr/application/"
const ypepin_prefix = "https://www.ypepin.com/application/"

export const token = "PPlaFk63u4E6";//certains scripts php requièrent le token

//Cette table contitent l'ensemble des urls de l'api à cheval sur les différents sites
export const url = {
wibash:{
    read:{
        liste_projets:{url: wibash_prefix+"Read/ListeProjets.php", args:[]},
        liste_events:{url:wibash_prefix+"Read/ListEvent.php", args:["identifiant"]},
        liste_membres:{url:wibash_prefix+"Read/ListeMembres.php",args:["token","identifiant", "pass"]},
        liste_participants_projets:{url:wibash_prefix+"Read/ListWorkers.php", args:["id_projet"]},
        liste_taches:{url:wibash_prefix+"Read/ListeTaches.php",args:[/**... */]},
        liste_idees_projet:{url:wibash_prefix+"Read/ListeIdeeProjets.php",args:["id_proj"]},
        login:{url:wibash_prefix+"Read/login.php", args:["token","identifiant", "pass"]},
    },
    create:{
        creer_compte:{url: wibash_prefix+"Create/CreaCompte.php", args:["identifiant", "pseudo","pass", "#nom",  "#prenom","#mail", "#phrase", "#story"]},
        creer_tache:{url: wibash_prefix+"Create/CreaProj.php", args:["token",/**to be continued */]},
        creer_proposition_projet:{url: wibash_prefix+"Create/CreaPropositionProjet.php", args:[/**to be continued */]},
        creer_event:{url: wibash_prefix+"Create/CreateEvent.php", args:["token", "identifiant", "pass", "nom", "date", "type", "#description"]},
        creer_participant_projet:{url: wibash_prefix+"Create/AddWorker.php", args:[/**to be continued */]},
        creer_participant_event:{url: wibash_prefix+"Create/AddParticipantEvent.php", args:[/**to be continued */]},
        creer_tache:{url: wibash_prefix+"Create/AddTask.php", args:["identifiant", "pass", "nom", "#description"]},
    },
    update:{
        udpate_event:{url: wibash_prefix+"Update/UpdateEvent.php", args:[/**to be continued */]},
        update_projet:{url: wibash_prefix+"Update/UpdateProject.php", args:[/**to be continued */]},
        update_task:{url: wibash_prefix+"Update/UpdateTask.php", args:[/**to be continued */]},
        upgrade_member:{url: wibash_prefix+"Update/UpgradeMember.php", args:[/**to be continued */]},
        update_worker_status:{url: wibash_prefix+"Update/WorkerStatus.php", args:["identifiant","pass", "id_membre", "role"]},
    },
    delete:{
        delete_event:{url: wibash_prefix+"Create/DeleteEvent.php", args:[/**to be continued */]},
        delete_projet:{url: wibash_prefix+"Create/DeleteProject.php", args:[/**to be continued */]},
        quitter_projet:{url: wibash_prefix+"Create/QuitterProjet.php", args:[/**to be continued */]},
    }
    },
    ypepin:{
        read:{
            liste_projets:{url: ypepin_prefix+"Read/ListeProjets.php", args:[]},
            liste_events:{url:ypepin_prefix+"Read/ListEvent.php", args:["identifiant"]},
            liste_membres:{url:ypepin_prefix+"Read/ListeMembres.php",args:["token","identifiant", "pass"]},
            liste_participants_projet:{url:ypepin_prefix+"Read/ListWorkers.php", args:["id_projet"]},
            liste_participants_event:{url:ypepin_prefix+"Read/ListeParticipantsEvent.php", args:["nom", "date"]},
            liste_taches:{url:ypepin_prefix+"Read/ListeTaches.php",args:["id_proj"]},
            liste_suggestions_projet:{url:ypepin_prefix+"Read/ListeIdeeProjets.php",args:["id_proj"]},
            liste_idees_projet:{url:ypepin_prefix+"Read/ListeIdeeProjets.php",args:["id_proj"]},
            liste_actus:{url:ypepin_prefix+"Read/ListeActus.php",args:[]},
            liste_memos_projet:{url:ypepin_prefix+"Read/ListeMemosProjet.php",args:["id", "pass", "id_projet"]},
            login:{url:ypepin_prefix+"Read/login.php", args:["token","identifiant", "pass"]},
        },
        create:{
            creer_compte:{url: ypepin_prefix+"Create/CreaCompte.php", args:["identifiant", "pseudo","pass", "#nom",  "#prenom","#mail", "#phrase", "#story"]},
            creer_tache:{url: ypepin_prefix+"Create/CreaProj.php", args:["token",/**to be continued */]},
            creer_proposition_projet:{url: ypepin_prefix+"Create/CreaPropositionProjet.php", args:[/**to be continued */]},
            creer_event:{url: ypepin_prefix+"Create/CreateEvent.php", args:["token", "identifiant", "pass", "nom", "date", "type", "#description"]},
            creer_participant_projet:{url: ypepin_prefix+"Create/AddWorker.php", args:[/**to be continued */]},
            creer_participant_event:{url: ypepin_prefix+"Create/AddParticipantEvent.php", args:["identifiant", "pass", "nom", "date"]},
            creer_tache:{url: ypepin_prefix+"Create/AddTask.php", args:["identifiant", "pass", "nom", "#description"]},
            creer_actu:{url: ypepin_prefix+"Create/CreateActu.php", args:["identifiant", "pass", "actu"]},
            creer_memo:{url: ypepin_prefix+"Create/CreateMemo.php", args:["identifiant", "pass", "contenu", "id_projet"]},
            
        },
        update:{
            udpate_event:{url: ypepin_prefix+"Update/UpdateEvent.php", args:[/**to be continued */]},
            update_projet:{url: ypepin_prefix+"Update/UpdateProject.php", args:[/**to be continued */]},
            update_task:{url: ypepin_prefix+"Update/UpdateTask.php", args:[/**to be continued */]},
            update_member:{url: ypepin_prefix+"Update/UpdateMember.php", args:[/**to be continued */]},
            update_worker_status:{url: ypepin_prefix+"Update/WorkerStatus.php", args:["identifiant","pass", "id_membre", "role"]},
            update_account:{url: ypepin_prefix+"Update/UpdateAccount.php", args:["identifiant","pass", "#args : story, nom, etc."]},
            
        },
        delete:{
            delete_event:{url: ypepin_prefix+"Delete/DeleteEvent.php", args:[/**to be continued */]},
            delete_project:{url: ypepin_prefix+"Delete/DeleteProject.php", args:[/**to be continued */]},
            delete_task:{url: ypepin_prefix+"Delete/DeleteTask.php", args:["id_projet", "nom"]},
            delete_suggestion:{url: ypepin_prefix+"Delete/DeleteSuggestion.php", args:["id_projet", "nom"]},
            quitter_projet:{url: ypepin_prefix+"Delete/QuitterProjet.php", args:[/**to be continued */]},
        }
    }
}
