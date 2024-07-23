import {io} from 'socket.io-client';

const URL = process.env.REACT_APP_URL;

const email = sessionStorage.getItem('stu_email')

export const socket = io(URL, {
    autoConnect : false,
    query : {
        email : email
    }
});