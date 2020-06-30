"use strict";

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
        }).then(res => {
            resolve()
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

/**
 * Update the specified party status
 * @param partyId Id of the party to update
 * @param finished Is the party finished
 */
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




/**
 * Sign in with the specified username and get it data
 * @param username Username to sign in
 * @returns {Promise<json|Error>} A promise with the inserted or selected row in json
 */
export const signinCall = (username) => {
    return new Promise((resolve, reject) => {
        fetch("/api/chat/login", {
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:username
            })
        }).then(text => text.json()).then(data => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        })
    });
}

/**
 * Select chat messages from offset+1 to offset+11
 * @param offset Offset where start selection
 * @returns {Promise<json|Error>} A promise with the selected rows in json
 */
export const getChatMessages = (offset) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/chat/messages/${offset}`)
        .then(text => text.json()).then(data => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        })
    });
}

/**
 * Send the message from the specified user
 * @param id id of the current user
 * @param name Name of the current user
 * @param message Message to send
 */
export const sendMessage = (id, name, message) => {
    fetch("/api/chat/post", {
        method:"POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id:id,
            name:name,
            message:message
        })
    })
}