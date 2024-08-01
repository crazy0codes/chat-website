import React, { useContext, useEffect, useState } from 'react';
import '../styles/index.css';
// import { Input } from './ui/input';
import { Context } from '../controllers/context';
import { socket } from '../controllers/socket';
import { ScrollArea } from '@radix-ui/react-scroll-area';


export function SidePanel() {
    const { setRoom} = useContext(Context)
    const [rooms, setRooms] = useState(["global"])

    function roomsList(arr) {
        console.log("Rooms are ",arr)
        setRooms(arr)
    }

    function selectedRoom(e){
        let option = e.target.innerText;
        setRoom(option)
    }

    useEffect(() => {
        socket.emit('user-rooms',function(){});
        socket.on("current-rooms",roomsList)
        return () => {
            socket.off('current-rooms',roomsList)
            socket.off('user-rooms');
        }
    }, []);

    function handleJoinRoom(e) {
        e.preventDefault();
        let roomid = document.querySelector('#join-room').value;
        setRoom(roomid)
    }

    return (
        <>
            <form onSubmit={handleJoinRoom}>
                <input type="text" placeholder="join room" id="join-room" className="focus:visible-ring" />
            </form>
            <small className="text-center ml-2">Rooms your in</small>
            <div className="roomsList max-h-[240px] overflow-y-auto m-2 border rounded cursor-pointer">
               <ScrollArea>
               {rooms.map( ele => {
                return(
                    <>
                        <span onClick={selectedRoom}>{ele}</span>
                        <br/>
                    </>
                )
               })}
               </ScrollArea>
            </div>
        </>
    )
}