const express = require("express");
const bodyParser = require("body-parser");
const postgre = require("./postgre/postgre");

const app = express();
const port = 3000;

/**
 * Initalise websocket
 */
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const rest = require("./rest")(io);


/**
 * Add body parser to express's middlewares to be able to get the body of an HTTP post
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Set the /views directory as a static one on express. Express will now use it as a ressource directory
 */
app.use(express.static(__dirname + '/views'));


/**
 * Add the routes of the REST api to express
 */
app.use("/api", rest);


/**
 * Send the HTML page at the root of the website
 */
app.get("/", (req, res) => {
    res.sendFile("views/index.html", {root: __dirname })
})


/**
 * Initialising the database and then listen to the port
 */
postgre.initialiseDatabase().then(res => {
    console.log("Database has been initialised !")
    http.listen(port, () => {
        console.log(`Babyfootmanager services launched successfully ! Listening at : 127.0.0.1:${port}`)   
        /*postgre.Chat.selectOrCreateUser("test2").then((data) => {
            console.log(data.rows)
        })*/

        /*postgre.Chat.addMessage(1, "Bonjour !").then(() => {
            postgre.Chat.getLastMessages(0).then((data) => {
                console.log(data.rows)
            })
        })*/
    })
}).catch(err => {
    console.error(`Error during database initialisation ! Error : ${err}`)
})
