const config = require("./config")
const partiesClass = require("./parties")
const chatClass = require("./chat");
const pg = require("pg");


const pgPool = new pg.Pool(config)
const Parties = new partiesClass(pgPool)
const Chat = new chatClass(pgPool)

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


    const chatTables = `
        CREATE TABLE IF NOT EXISTS
        chat_users(
            user_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            CONSTRAINT user_unique UNIQUE (name)
        );

        CREATE TABLE IF NOT EXISTS
        chat_messages(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES chat_users(user_id),
            message VARCHAR(255) NOT NULL
        );
    `


    return new Promise((resolve, reject) => {
        pgPool.query(partiesTable).then(res => {
            pgPool.query(chatTables).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
    })
    
}


module.exports = {
    pool:pgPool,
    Parties:Parties,
    Chat:Chat,
    initialiseDatabase:initDatabase
}