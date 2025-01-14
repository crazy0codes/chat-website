import React, { useContext, useEffect, useState } from 'react';
import '../../styles/index.css'
import { Input } from '../ui/input';
import { Context } from '../../context/context';
import { socket } from '../../context/socket';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import Room from '../ui/room';
import { Button } from '../ui/button';
import {MessageSquare, MessagesSquare, PhoneCallIcon } from 'lucide-react';


export function SidePanel({}) {
    const { setRoom} = useContext(Context)
    const [rooms, setRooms] = useState(["global"])

    function roomsList(arr) {
        setRooms(arr)
    }

    function selectedRoom(e){
        let option = e.target.innerText;
        setRoom(option)
    }

    function exitRoom(e){
        let room = e.target.previousSibling.innerText;
        console.log(room);
        socket.emit('exit-room',room);
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
            <form onSubmit={handleJoinRoom} className='mb-[10px]'>
                <Input type="text" placeholder="join room" id="join-room" className="focus:visible-ring mb-1 outline-0" />
            </form>
            <h3 className="bg-blue-500 rounded text-white font-medium h-[38px] flex items-center pl-2 gap-4"><MessagesSquare /><small>rooms your in</small></h3>
            <div className="roomsList max-h-[240px] overflow-y-auto m-2 border rounded cursor-pointer">
               <ScrollArea>
               {rooms.map( roomName => {
                return(
                    <>
                    <Room key={roomName} props={
                        {
                        roomName,
                        selectedRoom,
                        exitRoom
                        }}/>
                    </>
                )
               })}
               </ScrollArea>
            </div>
            <Button className="w-[100%] mt-3 bg-blue-500 hover:bg-green-500">
                <PhoneCallIcon className='mr-2 h-[20px] w-[20px]'/>
                <p>video call</p>
            </Button>
        </>
    )
}