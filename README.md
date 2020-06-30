# Easilys test
This repository has been made to code the test of **Easilys**.



## Dependencies 

- Node Js (developed with version 12.18.1)
- PostgreSQL (developed with version 12.3)

Node modules :

- Express
- Body-parser
- pg
- socket.io



## Installation

1. Download the source files
2. Install nodeJS
3. At the root of the folder, execute this command :
```
npm install
```
4. Go to postgre/config.js and edit the configuration :
```js
module.exports = {
    user: 'user',
    database:'test',
    password:'123',
    port:5432,
    idleTimeoutMillis: 30000
}
```
5. Launch the application :
```
node app.js
```
6. Go to [localhost:3000](http://localhost:3000)



## Folders organisation

#### Server side

- app.js : Main of the projet, initialise the sockets, database, express...
- rest.js : Contains all the REST API routes

**postgre folder :**

- config.js : Configuration of the database access
- postgre.js : Main manager of the database (initialisation, connection)
- chat.js : All the queries for the chat
- parties.js : All the queries for the parties

#### Client side

**css :**

- anims.css : All the animations
- fonts.css : All the fonts declarations
- reset.css : Contains the reset of the default browser styles
- global.css : Contains the code for the interfaces

**js :**

- Models : Contains the used objects for messages and parties
- rest : Contains the functions which links the client with the REST API

- chat.mjs : Manage the chat
- main.mjs : Manage the parties management

## Todo list

#### REST

- Create a party ✅
- Delete a party ✅
- Change party status ✅
- Get parties ✅
- Get the number of unfinished parties ✅
- Link with websockets ✅

#### WebClient

- Interface mockup ✅
- Interface development ✅
- Link the interface with the rest API ✅
- Use websockets ✅


#### Bonus

- Chat mockup ✅
- Implement chat in rest API ✅
- Interface development ✅
- Implement chat in client ✅
- Use websockets ✅

#### BONUS ++ ?

- Responsive design
- Get when someone is typing
- Get when someone connects / leave the chat

(❌ : not done | ⌛ : currently working on it | ✅ : done)

![Easilys logo](https://www.jaimelesstartups.fr/wp-content/uploads/2018/05/easilys.jpg)
