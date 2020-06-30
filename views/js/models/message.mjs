"use strict";
export default class Message {

    /**
     * Creates the message object based on json
     * @param json Current message json
     * @param myId Id of the current user
     */
    constructor(json, myId) {
        this.myId = myId;
        Object.assign(this, json)
    }

    /**
     * Returns the current message id
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the sender id
     */
    getSender() {
        return this.user_id;
    }

    /**
     * Returns the sender username
     */
    getSenderName() {
        return this.name;
    }

    /**
     * Returns the current message in HTML format
     */
    toHTML() {
        return `
            <li ${this.myId == this.getSender() ? 'class="self"':''}>
                <span>${this.getSenderName()}</span>
                <p class="background-${this.myId == this.getSender() ? "green":"blue"} white">${this.message}</p>
            </li>
        `;
    }
}