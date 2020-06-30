"use strict";
/**
 * Parties object instance which allows you to manage the parties. As create or delete one, get the parties or the number of unfinished ones.
 * @param {Pool} pgPool 
 */
function Chat(pgPool) {

    /**
     * It will create a new user or select the user if he already exists with that name
     * @param {String} name The name of the user
     * @returns {Promise<json|Error>} Returns the inserted or selected row
     */
    this.selectOrCreateUser = (name) => {
        const query = `
            WITH currentuser AS (
                INSERT INTO chat_users (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name=$1
                RETURNING *
            ) 
            SELECT * FROM currentuser
        `

        const queryValues = [name]
        return new Promise((resolve, reject) => {
            pgPool.connect((err, client, done) => {
                if(err) {
                    reject(err)
                }
                client.query(query, queryValues, (err,res) => {
                    done()
                    if(err) {
                        reject(err)
                    }
                    resolve(res)
                })
            })
            
        })
    }


    /**
     * It will create a new message for the specified user
     * @param {Number} id The id of the user who sent the message
     * @param {String} message A string with a maximum of 255 characters
     * @returns {Promise<void|Error}
     */
    this.addMessage = (id, message) => {
        const query = `
            INSERT INTO chat_messages (user_id, message) VALUES($1, $2) RETURNING id
        `

        const queryValues = [id, message]
        return new Promise((resolve, reject) => {
            pgPool.connect((err, client, done) => {
                if(err) {
                    reject(err)
                }
                client.query(query, queryValues, (err,res) => {
                    done()
                    if(err) {
                        reject(err)
                    }
                    resolve(res)
                })
            })
            
        })
    }


    /**
     * It will get the 10 lasts messages from the offset.
     * @param {Number} offset 
     * @returns {Promise<json|Error} Returns a promise with the json containing the lasts messages
     */
    this.getLastMessages = (offset) => {
        const query = `
            SELECT * FROM chat_messages JOIN chat_users USING(user_id) ORDER BY id DESC LIMIT 10 OFFSET $1
        `

        const queryValues = [offset]
        return new Promise((resolve, reject) => {
            pgPool.connect((err, client, done) => {
                if(err) {
                    reject(err)
                }
                client.query(query, queryValues, (err,res) => {
                    done()
                    if(err) {
                        reject(err)
                    }
                    resolve(res)
                })
            })
            
        })
    }
}

module.exports = Chat;