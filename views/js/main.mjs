"use strict";


import Party from './models/party.mjs';
import {getUnfinishedPartiesCount, getParties, deleteParty, createParty, updateParty} from './rest/restApi.mjs';


const unfinishedPartiesElement = document.querySelector("#parties #currentParties");
const partiesList = document.querySelector("#parties ul");

const newPartyButton = document.querySelector("#addParty span");
const newPartyInput = document.querySelector("#addParty input");

const loadMoreButton = document.querySelector("#loadMore");

let currentOffset = 0;



/**
 * Initialise the parties after the page loaded
 */
selectPartiesAndRender();

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
    selectPartiesAndRender();
}



/**
 * Get the parties from the offset and render them. Also refresh onclick events
 */
function selectPartiesAndRender() {
    getParties(currentOffset).then(json => {

        if(json.length > 0) {
            const parties = json.map(element => new Party(element));
            parties.sort((a, b) => a.getId() - b.getId())
    
    
            let partiesContent = '';
            parties.map(currentParty => {
                partiesContent += currentParty.toHTML()
            })
    
            if(parties.length < 10) {
                loadMoreButton.classList.add("disabled")
            }
    
            partiesList.innerHTML += partiesContent
            const partiesCheckboxes = document.querySelectorAll("#parties .actions input");
            const partiesDelete = document.querySelectorAll("#parties .actions i");
            initOnClick(partiesCheckboxes, partiesDelete)
        } else {
            loadMoreButton.classList.add("disabled")
        }
        
    })
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