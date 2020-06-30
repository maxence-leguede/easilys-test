"use strict";


class Party {

    /**
     * Creates the party object based on the json
     * @param json Json containing informations about the current party
     */
    constructor(json) {
        Object.assign(this, json)
    }

    /**
     * Returns the current party's id
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the current party's name
     */
    getName() {
        return this.name;
    }

    /**
     * Returns if the current party is ended
     */
    isFinished() {
        return this.finished;
    }

    /**
     * Set the new status of the party
     * @param finish Is the current party finished
     */
    setFinished(finish) {
        this.finished = finish;
    }

    /**
     * Returns the current party in the HTML format
     */
    toHTML() {
        return `<li ${this.finished?'class="finished"':''}>
            <p>${this.name}</p>
            <div class="actions">
                <input type="checkbox" partyId=${this.id} ${this.finished?'checked':''}>
                <i class="material-icons" partyId=${this.id}>delete</i>
            </div>
        `;
    }
}

export default Party