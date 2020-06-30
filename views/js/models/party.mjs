"use strict";


class Party {
    constructor(json) {
        Object.assign(this, json)
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

    setFinished(finish) {
        this.finished = finish;
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