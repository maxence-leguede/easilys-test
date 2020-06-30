
/**
 * Parties object instance which allows you to manage the parties. As create or delete one, get the parties or the number of unfinished ones.
 * @param {Pool} pgPool 
 */
function Parties(pgPool) {

    /**
     * Add a party to the database and returns the inserted line.
     * @param {string} name 
     * @returns {Promise<json|Error>} A promise with the inserted rows in json
     */
    this.addParty = (name) => {
        const query = `
            INSERT INTO parties (name, finished) VALUES ($1, $2) RETURNING *
        `
    
        const queryValues = [name, false]
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
     * Select the parties from offset+1 to offset+11 and returns them
     * @param {Number} offset 
     * @returns {Promise<json|Error>} A promise with the selected parties in json
     */
    this.getParties = (offset) => {
        const query = `
            SELECT * FROM parties ORDER BY id DESC LIMIT 10 OFFSET $1
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


    /**
     * Delete a party from the database and returns the deleted party ID.
     * @param {Number} partyId 
     * @returns {Promise<Number|Error>} A promise with the deleted party's Id
     */
    this.removeParty = (partyId) => {
        const query = `
            DELETE FROM parties WHERE id=$1
        `
        const queryValues = [partyId]
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
                    resolve(partyId)
                })
            })
            
        })
    }



    /**
     * Get the number of unfinished parties in the database.
     * @returns {Promise<Number|Error>} A promise with the count of unfinished parties
     */
    this.getUnfinishedPartiesCount = () => {
        const query = `
            SELECT COUNT(*) FROM parties WHERE NOT finished
        `
    
        return new Promise((resolve, reject) => {
            pgPool.connect((err, client, done) => {
                if(err) {
                    reject(err)
                }
                client.query(query, (err,res) => {
                    done()
                    if(err) {
                        reject(err)
                    }
                    resolve(res.rows[0].count)
                })
            })
            
        })
    }


    /**
     * Update the status (if ended or not) of a party in the database
     * @param {Number} id The party id
     * @param {Boolean} finished Is the party finished 
     * @returns {Promise<void|Error>} 
     */
    this.updateFinishStatus = (id, finished) => {
        const query = `
            UPDATE parties SET finished=$1 WHERE id=$2
        `

        const queryValues = [finished, id]
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
                    resolve()
                })
            })
        })
    }
}







module.exports = Parties;