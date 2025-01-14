import { socket } from "./socket";

export function handleMessage({room, picture}) {
    let roomID = room;
    let stu_dp = picture;
    console.log(stu_dp)
    let stu_email = localStorage.getItem('stu_email');
    let msg = document.querySelector('#user-message').value;
    if (msg === '') return;
    document.querySelector('#user-message').value = '';
    const msgObj = {
        stu_dp,
        stu_email,
        msg,
        msg_delivered: new Date().toLocaleTimeString(),
    }
    socket.emit('message', {msgObj, roomID});
}