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
- Implement chat in rest API ⌛
- Interface development ❌
- Implement chat in client ❌
- Use websockets ❌

(❌ : not done | ⌛ : currently working on it | ✅ : done)

![Easilys logo](https://www.jaimelesstartups.fr/wp-content/uploads/2018/05/easilys.jpg)
