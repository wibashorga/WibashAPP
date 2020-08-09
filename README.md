# Wi-Bash App

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

## Dépendances a installer

-   reactNative 0.62
-   react-native-elements + (react-native-vector-icons)
-   react-navigation + dépendances usuelles + react-navigation-drawer
-   @react-navigation/stack; @react-navigation/bottom-tabs; @react-navigation/drawer
-   react-native-options-menu
-   reactNavigation
-   react-native-image-picker
-   react-native-push-notification ou react-native-wonderpush

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
-   API et base de données opé
C'est tout pour le moment. On mettra les dependances au fil du temps.

PS: si vous rencontrez des bug du style l'app refresh h24 reinstaller les dependance dans le projet

