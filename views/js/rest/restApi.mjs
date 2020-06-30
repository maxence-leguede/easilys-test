import Party from "../models/party.mjs"

/**
 * Get the number of unfinished parties.
 * @returns {Promise<Number|Error>} A promise with the count of unfinished parties
 */
export const getUnfinishedPartiesCount = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/parties/", {
            method:"GET"
        }).then(res => res.json()).then(json => {
            resolve(json.count)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Select the parties from offset+1 to offset+11 and returns them
 * @param offset The offset to start selecting the parties
 * @returns {Promise<json|Error>} A promise with the selected parties in json
 */
export const getParties = (offset) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/parties/${offset}`, {
            method:"GET"
        }).then(res => res.json()).then(json => {
            resolve(json)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Add a party to the database and returns the inserted line.
 * @param {string} name 
 * @returns {Promise<json|Error>} A promise with the inserted rows in json
 */
export const createParty = (name) => {
    return new Promise((resolve, reject) => {
        fetch("/api/parties/create", {
            method:"POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:name})
        }).then(res => res.json()).then(json => {
            resolve(json)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Delete a party from the database
 * @param {Number} partyId The id of the party to delete
 */
export const deleteParty = (partyId) => {
    fetch(`/api/parties/${partyId}`, {
        method:"DELETE"
    })
}


export const updateParty = (partyId, finished) => {
    fetch("/api/parties/set", {
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id:partyId,
            finished:finished
        })
    })
}