# Tictactrip Rest Api

[Lien vers le projet deployé](https://tictactrip-client.vercel.app/)

## Structure du projet

### Configs & Models

Le projet utilise mongoDB en tant que base de donnée. (configs>mongo.js)
Le model utilisé permet simplement de stocker les informations permettant le controle des informations de l'utilisateur. Seul emissionDate et nbJustifiedCharacters sont modifiés au fil des requêtes pour suivre le nombre de justification effectué dans un laps de temps donné.

### Controllers

Le dossier auth contient les middlewares permettant l'authentification du token et la mise à jour des données relatives aux dates et nombres de justifications effectuées par l'utilisateur.
Une fois arrivé à 80000 charactères justifiés en moins de 24h l'utilisateur ne peut plus utiliser ce token (payment require) à moins d'attendre ou d'en générer un nouveau.

Le dossier formatter permet la justification de text. Celle ci n'est pas encore optimisé et toujour en amélioration.

### app.js

Contient deux routes:

- "/api/justify" permettant de justifier le texte.
- "/api/token" permettant la création d'un nouveau token et de le stocker avec ses informations relatives dans la base de donnée.

## Lien vers le repertoire contenant le frontend

[Lien vers le code du back](https://github.com/HugoLansade/tictactrip-client).
