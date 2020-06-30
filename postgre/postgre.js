const config = require("./config")
const partiesClass = require("./parties")
const pg = require("pg")


const pgPool = new pg.Pool(config)
const Parties = new partiesClass(pgPool)


/**
 * Initialise the database by creating the tables used by the application if they don't exist
 * @returns {Promise<any|Error>} A promise with the result of the query
 */
const initDatabase = () => {

    const partiesTable = `CREATE TABLE IF NOT EXISTS
        parties(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            finished BOOLEAN NOT NULL
        );
    `;


    return new Promise((resolve, reject) => {
        pgPool.query(partiesTable).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
    
}



pgPool.on("connect", () => {
    console.log("Connection established with the database !")
    
})

module.exports = {
    pool:pgPool,
    Parties:Parties,
    initialiseDatabase:initDatabase
}