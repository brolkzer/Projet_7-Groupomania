# PROJET 7 - GROUPOMANIA

Le projet numéro 7 a pour mission de développer pour son client Groupomania un réseau social d'entreprise.
Il est demandé d'utiliser une BDD SQL, un framework JS.

Ce projet utilise le framework [React] accompagné de son util [ReactRedux] pour utiliser un store.
Côté server, notre base de données est en SQL, sous MariaDB.
Afin de simplifier la manipulation de données et les requêtes server/client, l'Object Relationnal Mapper [Sequelize] est utilisé.

# - Installer les dépendances

Ouvrir un terminal à la racine du projet, se positionner sur le dosser [client] avec la commande `cd client`,
puis lancer le script `npm install`.

Ouvrir un nouveau terminal à la racine du projet, se positionner sur le dossier [server] avec la commande `cd server`,
puis lancer le script `npm install`.

## - Démarrer le front-end

Ouvrir un terminal à la racine du dossier, se positionner sur le dossier [client] avec la commande `cd client`,
puis lancer le script `npm start`.

## - Démarrer le back-end

Ouvrir un terminal à la racine du dossier, se positionner sur le dosser [server] avec la commande `cd server`,
puis lancer le script `npm run dev`.

Cela dit la BDD ne sera pas importée, il faut créer sa propre DB SQL, la nommer `Groupomania`, ou comme vous le souhaitez ( dans ce cas il faut modifier la variable d'environnement back-end ), et ensuite créer vos propres utilisateurs, vos posts, vos commentaires.

### - Créer les variables d'environnements front et back

### - BACK-END LOCAL ENV

PORT=`utiliser le port qui vous convient`
DB_HOST=localhost
DB_USER=`your username`
DB_PASS=`your password`
DB_NAME=Groupomania
DB_DIALECT=mariadb
JWT_TOKEN=RANDOM_TOKEN_SECRET

### - FRONT-END LOCAL ENV

REACT_APP_API_URL=`localhost:utiliser le port qui vous convient`
