"use strict";


class Party {
    constructor(json) {
        console.log(json)
        Object.assign(this, json)
        console.log(this.finished)
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    isFinished() {
        return this.finished;
    }

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