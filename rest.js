const express = require('express');

/**
 * Initialise the REST api and declare the websocket instance (used to broadcast events)
 * @param {SocketIO.Server} ioInstance 
 */
const initRestAPI = (ioInstance)=> {
    router = express.Router();

    const postgre = require("./postgre/postgre");


    /**
     * Route of /api/parties/ in GET method. Will return the count of unfinished parties
     */
    router.get("/parties/", (req,res) => {
        postgre.Parties.getUnfinishedPartiesCount().then((data) => {
            res.send({
                count:data
            })
        }).catch((error) => {
            res.status(500).send(error)
        })
    })

    /**
     * Route of /api/parties/:offset in GET method. Will return the parties based on the offset
     * @param {Number} :offset
     */
    router.get("/parties/:offset", (req, res) => {
        postgre.Parties.getParties(req.params.offset).then(data => {
            res.status(302).send(data.rows)
        }).catch((error) => {
            res.status(500).send(error)
        })
    })

    /**
     * Route of /api/parties/create in POST method. Will create a new party base on the name variable sendend in the body and return the inserted row
     */
    router.post("/parties/create", (req, res) => {
        if(req.body.name) {
            postgre.Parties.addParty(req.body.name).then((data) => {
                ioInstance.emit("create_party", data.rows[0])
                res.sendStatus(302)
                //data.rows[0]
            }).catch((error) => {
                res.status(500).send(error)
            })
        } else {
            res.sendStatus(403)
        }
    })

    /**
     * Route of /api/parties/set in POST method. Will update a party status.
     */
    router.post("/parties/set", (req, res) => {
        if(req.body.id && req.body.finished != null) {
            postgre.Parties.updateFinishStatus(req.body.id, req.body.finished).then(() => {
                ioInstance.emit("set_party", {id:req.body.id, finished:req.body.finished})
                res.sendStatus(302)
            }).catch((error) => {
                res.status(500).send(error)
            })
        } else {
            res.sendStatus(403)
        }
    })


    /**
     * Route of /api/parties/:id in DELETE method. Will delete a party based on the asked id
     * @param {Number} :id
     */
    router.delete("/parties/:id", (req,res) => {
        postgre.Parties.removeParty(req.params.id).then((id) => {
            ioInstance.emit("delete_party", {id:id})
            res.sendStatus(302)
        }).catch((error) => {
            res.status(500).send(error)
        })
    })

    return router;
}


module.exports = initRestAPI