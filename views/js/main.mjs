"use strict";


import Party from './models/party.mjs';
import {getUnfinishedPartiesCount, getParties, deleteParty, createParty, updateParty} from './rest/restApi.mjs';


const unfinishedPartiesElement = document.querySelector("#parties #currentParties");
const partiesList = document.querySelector("#parties ul");

const newPartyButton = document.querySelector("#addParty span");
const newPartyInput = document.querySelector("#addParty input");

const loadMoreButton = document.querySelector("#loadMore");

const parties = []

let currentOffset = 0;


/**
 * Initisalise web socket
 */
const socket = io()


/**
 * Initialise the parties after the page loaded
 */
selectParties();

/**
 * Initialise the number of unfinished parties
 */
getUnfinishedPartiesCount().then((count, error) => {
    unfinishedPartiesElement.textContent = count
})




/**
 * Initialise add party action
 */
newPartyButton.onclick = function() {
    const value = newPartyInput.value
    if(value.length > 0) {
        newPartyInput.value = ""
        createParty(value)
    }
}

/**
 * Initialise load more button action
 */
loadMoreButton.onclick = function() {
    currentOffset+=10
    selectParties();
}



/**
 * Get the parties from the offset.
 */
function selectParties() {
    getParties(currentOffset).then(json => {

        if(json.length > 0) {
            json.map(element => {
                parties.push(new Party(element))
            });
            sortParties()
            renderParties();
        } else {
            loadMoreButton.classList.add("disabled")
        }
        
    })
}

/**
* Sort parties list
*/
function sortParties() {
    parties.sort((a, b) => b.getId() - a.getId())
}


/**
 * Render parties. Also refresh onclick events
 */
function renderParties() {
    let partiesContent = '';
    parties.map(currentParty => {
        partiesContent += currentParty.toHTML()
    })

    if(parties.length < 10) {
        loadMoreButton.classList.add("disabled")
    }

    partiesList.innerHTML = partiesContent
    const partiesCheckboxes = document.querySelectorAll("#parties .actions input");
    const partiesDelete = document.querySelectorAll("#parties .actions i");
    initOnClick(partiesCheckboxes, partiesDelete)
}


/**
 * Refresh the onclick events for actions such as set as finished or delete
 * @param partiesCheckboxes List of the DOM checkboxes elements
 * @param partiesDelete List of the DOM delete buttons elements
 */
function initOnClick(partiesCheckboxes, partiesDelete) {
    partiesCheckboxes.forEach(checkbox => {
        checkbox.onclick = function() {
            const partyId = this.getAttribute("partyId")
            const checked = this.checked

            updateParty(partyId, checked)
        }
    })

    partiesDelete.forEach(delElem => {
        delElem.onclick = function() {
            const partyId = this.getAttribute("partyId")
            deleteParty(partyId)
        }
    })
}




/**
*  WEBSOCKETS
*/


/**
 * Event called every time a new party is created. It will add the new party and render the list again
 */
socket.on("create_party", function(json) {
    unfinishedPartiesElement.textContent = parseInt(unfinishedPartiesElement.textContent)+1
    parties.push(new Party(json));
    sortParties();
    renderParties();
})

/**
 * Event called every time the status of a party is modified. It will add the new party and render the list again
 */
socket.on("set_party", function(json) {
    parties.map(party => {
        if(party.getId() == json.id) {
            party.setFinished(json.finished)

            if(json.finished) {
                unfinishedPartiesElement.textContent = parseInt(unfinishedPartiesElement.textContent)-1
            } else {
                unfinishedPartiesElement.textContent = parseInt(unfinishedPartiesElement.textContent)+1
            }
        }
    })
    renderParties();
})

/**
 * Event called every time a party is deleted. It will add the new party and render the list again
 */
socket.on("delete_party", function(json) {
    const id = json.id;
    parties.map((party, index) => {
        if(party.getId() == id) {

            if(!party.isFinished()) {
                unfinishedPartiesElement.textContent = parseInt(unfinishedPartiesElement.textContent)-1
            }

            parties.splice(index,1)
        }
    })
    renderParties();
})
