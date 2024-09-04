import { X } from 'lucide-react'
import React from 'react'

export default function Room({props}){
    console.log(props)
    const {roomName, selectedRoom, exitRoom} = props;
    return(
        <>
        <div className='flex justify-between mb-2 m-1 p-1'>
            <p onClick={selectedRoom}>{roomName}</p>
            <X className='text-red-500 exit-Room' onClick={exitRoom}/>
        </div>
        </>
    )
}