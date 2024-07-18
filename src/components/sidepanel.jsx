import React, { useEffect } from 'react';
import '../styles/index.css';
import { Input} from './ui/input';
import { socket } from "../controllers/socket"

export function SidePanel() {
    useEffect(() => {
        socket.on('joinRoom', function (roomID) {
            socket.join(roomID)
            console.log(socket.id + " has joined the " + roomID)
        })
        
        socket.on('leaveRoom', function (roomID) {
            socket.leave(roomID)
            console.log(socket.id + " has left the " + roomID)
        })
    }, [])

    return (
        <>
            <Input type="email" placeholder="join room"  className="focus:visible-ring" />
            <small className="text-center ml-2">Rooms your in</small>
            <div className="roomsList max-h-[240px] overflow-y-auto m-2 border rounded cursor-pointer">
             rooms list here
            </div>
        </>
    )
}