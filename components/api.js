function format(champ)
{
  return champ.replace('"', '\"');
}
export async function createAccount(id, pass, pseudo, nom, prenom, phrase)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("pseudo", pseudo);
  data.append("nom", nom);
  data.append("prenom", prenom);
  data.append("phrase", phrase);
  fetch('http://www.wi-bash.fr/CreaCompte.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
}).then((reponse)=>reponse.text()).then((text)=>console.log(text)).catch((error)=>{console.log(error)});

};
