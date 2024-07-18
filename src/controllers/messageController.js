import { socket } from "./socket";

export function handleMessage(e) {
    e.preventDefault();
    let message = document.querySelector('#user-message').value;
    if (message === '') return;
    document.querySelector('#user-message').value = '';
    const msgObj = {
        msg: message,
        msg_delivered: new Date().toLocaleTimeString(),
    }

    let currentRoom = null;
    socket.emit('message', { msgObj, currentRoom });
}