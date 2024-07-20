import { socket } from "./socket";

export function handleMessage(roomID) {
    let stu_email = sessionStorage.getItem('stu_email');
    let msg = document.querySelector('#user-message').value;
    if (msg === '') return;
    document.querySelector('#user-message').value = '';
    const msgObj = {
        stu_email,
        msg,
        msg_delivered: new Date().toLocaleTimeString(),
    }
    let props = {
        msgObj,
        roomID
    }
    socket.emit('message',props);
}