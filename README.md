# Wi-Bash App

ATTENTION le safeAreaview devra etre integrer.
Modification a faire changer Important en Vote

## 1. Objectif

-   Pouvoir se connecter.
-   Avoir la possibilité de retourner en arrière, mémoriser la connexion pour ne pas avoir à réecrire les identifiants.

## 2. Choix entre

-   Projets
-   Evènement
-   Membres

## 3. Dans membres

-   Voir la liste des membres.
-   Pouvoir créer un membre pour ceux ayant l'autorisation, et changer son statut (visiteur, membre, admin).
-   Voir les profils avec photos, surnom nom prénom, achievements, etc.

## 4. Dans Projet

-   Avoir une case **Idée de projet**.
-   Avoir d'autres cases représentant les projets.

-   Dans la case **Idée de projet** :

    -   Pouvoir poster une idée de projet avec titre, descriptif et score.
    -   Chaque membre pourrait upvote ou downvote une fois.
    -   Si au moins 1/3 des membres ont upvote, l'idée se transforme en projet (ou tout autre interaction).

-   Pour chaque projet :

    -   Une partie **Descriptif** modifiable par le porteur de projet.
    -   Une partie **idée** pour le projet.
    -   Une partie **avancée de projet** avec des phases ajoutables et une progression comme `2/5` ou autre en fonction.
    -   Dans chaque phase une partie **idées** qu'on peut upvote ou downvote.

## 5. Partie évènement

C'est un peu la même que projet sauf que ce sont des:

-   `"je participe"`.
-   `"peut-être"`.
-   `"pas du tout"`.

Et l'évènement est automatiquement ajouté sur l'agenda Google ou IOS de ceux qui ont choisi `"je participe"` ou `"peut-être"`.

# Notes à l'équipe de dev :
    ## git commit :
        -  git pull:
        - git add .
        - git commit -m "votre message"
        - git push

## Dépendances a installer

-   reactNative 0.62
-   react-native-elements + (react-native-vector-icons)
-   react-navigation + dépendances usuelles + react-navigation-drawer
-   @react-navigation/stack; @react-navigation/bottom-tabs; @react-navigation/drawer
-   react-native-options-menu
-   reactNavigation
-   react-native-picker-select
-   react-native-image-picker
-   react-native-push-notification ou react-native-wonderpush
-   expo-image-picker

###

    npm install @react-navigation/native; npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

## Lancement du projet :

-   Cloner le projet.
-   Ouvrir le terminal.

###

    cd WibashAPP
    npm install
    npm start

## Avancement du projet
-   Vues identification et de création de compte opérationnelles
-   connexion automatique
-   Vue Liste des projet, création de projets opérationnelles
-   Vue détails du projet en construction (60%)
-   Creation de taches pour les projets opé
-   Vues liste des évènements opé
-   Création d'event opé
-   Modification d'event opé
-   Participer à un projet
-   Supprimer un projet
-   Quitter un projet
-   Home en construction
-   Vue profil en construction
-   API et base de données opé
-    Marquer une tache comme accomplie


C'est tout pour le moment. On mettra les dependances au fil du temps.

PS: si vous rencontrez des bug du style l'app refresh h24 reinstaller les dependance dans le projet

source :
https://github.com/Kureev/react-native-side-menu

## TODO LIST
-   Ajouter la possibilité de changer description, titre et objectif d'un projet (fait)
-   Possibilité de changer le nom et description d'un événement (fait)
-   Editer des actus
-   Designer la page home
-   Bouton participer à un projet (fait)
-   Désigner un administrateur pour un projet (fait)
-   Paramètres de l'appli
-   Remplacer RNPickerSelect par expo-picker (fait)
-   Emmettre une proposition dans un projet (fait)
-   Supprimer un projet (fait)
-   Supprimer une tache
-   supprimer un event
-   supprimer un participant
-   Changer le statut d'un visiteur ou d'un membre

## Fonctionnalités des prochaines mises-à-jour
-   Système de notifications (push tout d'abord)
-   Redirection vers : "faire un don"
-   Pouvoir cocher des "centres d'intérêt" pour chaque membre, et pouvoir cibler les membres par centre d'intérêt dans les messages
-   Ajouter des mots-clés pour les projets ('culture', 'programmation', 'jeu vidéo', 'Apple' ...)
-   Pourvoir gérer les paramètres : mode sombre, défilement vetical ou horizontal, couleurs etc.
-   Pouvoir transformer une proposition en tâche
-   Voir les projets enterrés


## Tutos React

### Le cycle d'un composant react :
https://www.codingame.com/playgrounds/41961/cycle-de-vie-dun-composant-react-render-et-componentdidmount

