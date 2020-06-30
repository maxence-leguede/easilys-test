"use strict";
import {signinCall, getChatMessages, sendMessage} from './rest/restApi.mjs';
import Message from './models/message.mjs';


/**
 * Initialise connection informations
 */
const connectionInformations = {connected:false}

/**
 * Selecting dom elements
 */

const chat = document.querySelector("#chat")

const chatButton = document.querySelector('#chatButton');
const chatNotification = document.querySelector("#chatButton #notification");

const loginPopup = document.querySelector('#chatPopup');
const loginCloseButton = document.querySelector('#chatPopup .close')
const usernameInput = document.querySelector('#chatPopup #setUsername input');
const login = document.querySelector('#chatPopup #setUsername span');

const chatElement = document.querySelector("#chatContainer");
const closeChatElement = document.querySelector("#chatContainer .close");
const chatLoadMore = document.querySelector("#chatLoadMore");


const messageContainer = document.querySelector("#messagesContainer")
const messageListElement = document.querySelector("#messagesContainer ul");
const messageInput = document.querySelector("#chatContainer #sendMessage input");
const messageSendButton = document.querySelector("#chatContainer #sendMessage span");


/**
 * Initialising chat messages, web socket and current offset
 */
const chatMessages = [];
const socket = io();

let currentChatOffset = 0;


/**
 * Open the chat sign in popup
 */
function openChatLoginPopup() {
    chat.classList.remove("disabled");
    loginPopup.classList.remove("disabled");
}

/**
 * Close the chat sign in popup
 */
function closeChatLoginPopup() {
    chat.classList.add("disabled");
    loginPopup.classList.add("disabled");
}

/**
 * Close the chat interface
 */
function closeChat() {
    chat.classList.add("disabled");
    chatElement.classList.add("disabled")
}

/**
 * Open the chat interface
 */
function openChat() {
    if(!chatNotification.classList.contains("disabled")) {
        chatNotification.classList.add("disabled");
    }
    chat.classList.remove("disabled");
    chatElement.classList.remove("disabled")
    renderChat(true);
}

/**
 * Render the chat messages in the container
 * @param scrollToBottom Set if we have to scroll to the newest message
 */
function renderChat(scrollToBottom) {
    let chatContent = ''
    chatMessages.sort((a,b) => b.getId() - a.getId());
    chatMessages.map(message => {
        chatContent += message.toHTML();
    })
    messageListElement.innerHTML = chatContent;

    if(scrollToBottom) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

/**
 * Get the message input value and send the message if it is valid
 */
function trySendMessage() {
    const message = messageInput.value;

    if(message.length > 0 && message.length <= 255) {
        sendMessage(connectionInformations.id, connectionInformations.name, message);
        messageInput.value = "";
    }
}

/**
 * Try to login with the specified username in the sign in popup input. Then set connection informations and get last messages
 */
function tryLogin() {
    const username = usernameInput.value;

    if(username.length > 0) {
        signinCall(username).then(data => {
            connectionInformations.connected = true
            connectionInformations.id = data.user_id
            connectionInformations.name = data.name
            
            currentChatOffset = 0;

            getChatMessages(currentChatOffset).then(data => {
                data.map(json => {
                    chatMessages.push(new Message(json, connectionInformations.id))
                });

                if(data.length < 10) {
                    chatLoadMore.classList.add("disabled");
                }

                openChat();
            })

            closeChatLoginPopup();
        })
    }
}


/**
 * 
 * EVENTS
 * 
 */

 /**
  * Get when we have to send the chat message and try to send it
  */
messageInput.addEventListener("keydown", (event) => {
    if(event.keyCode == 13) { // Enter
        trySendMessage()
    }
})

messageSendButton.onclick = function() {
    trySendMessage()
}


/**
 * Get when we have to load more chat messages
 */
chatLoadMore.onclick = function() {
    currentChatOffset+=10;
    getChatMessages(currentChatOffset).then(data => {
        if(data.length > 0) {
            data.map(json => {
                chatMessages.push(new Message(json, connectionInformations.id))
            });

            if(data.length < 10) {
                chatLoadMore.classList.add("disabled");
            }
    
            renderChat(false);
        } else {
            chatLoadMore.classList.add("disabled");
        }
        
    })
}


/**
 * Get when we have to close chat and closes it
 */
closeChatElement.onclick = function() {
    closeChat();
}


/**
 * Get when we have to sign in and try to
 */
usernameInput.addEventListener("keydown", (event) => {
    if(event.keyCode == 13) { // Enter
        tryLogin()
    }
})

login.onclick = function() {
    tryLogin()
}



/**
 * Get when we have to close the chat sign in popup
 */
loginCloseButton.onclick = function() {
    closeChatLoginPopup()
}


/**
 * Get when we have to open the chat (click on the right bottom button)
 */
chatButton.onclick = function() {
    if(!connectionInformations.connected) {
        openChatLoginPopup()
    } else {
        openChat();
    }
}


/**
 * Handle when we recieve a new chat message using websockets 
 */
socket.on("new_message", (data) => {
    if(connectionInformations.connected) {
        chatMessages.push(new Message(data, connectionInformations.id))
        renderChat(true)
    }
    if(chatNotification.classList.contains("disabled") && data.user_id != connectionInformations.id) {
        chatNotification.classList.remove("disabled");
    }
})