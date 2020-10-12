// fait toi plaisir
const token  = "***";//le vrai token n'est pas affiché pour des raisons de sécurité
function format(champ)
{
  return champ.replace('"', '\"');
}
export async function createAccount(id, pass, pseudo, nom, prenom, mail, phrase)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("pseudo", pseudo);
  data.append("nom", nom);
  data.append("prenom", prenom);
  data.append("phrase", phrase);
  data.append("mail", mail);
  data.append("token", token);
  fetch('http://www.wi-bash.fr/application/CreaCompte.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
}).then((reponse)=>reponse.text()).then((text)=>console.log(text)).catch((error)=>{console.log(error)});

};

export async function login (id, pass)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("token", token);
  fetch('http://www.wi-bash.fr/application/CreaCompte.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
}).then((reponse)=>reponse.text()).then((text)=>JSON.parse(text)).catch((error)=>{console.log(error)});
};
/* on peut changer les informations suivantes :
pseudo, nom, prenom, phrase, story, pass, competence
==> le champ 'action' peut prendre les valeurs ci-dessus
Dans le cas où il vaut 'competence', la valeur du champ sera composer du nom_de_lacompetence-score (ex : php-2, js-3, blender-0)
*/
export async function changeMyInfo(id, pass, action, new_value)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("token", token);
  data.append("action", action);
  data.append("champ", new_value);
  fetch('http://www.wi-bash.fr/application/monCompte.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
}).then((reponse)=>reponse.text()).then((text)=>console.log(text)).catch((error)=>{console.log(error)});
};

async function getMemberList(id, pass)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("token", token);
  fetch('http://www.wi-bash.fr/application/ListeMembres.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
}).then((reponse)=>reponse.text()).then((text)=>JSON.parse(text)).catch((error)=>{console.log(error)});
};
