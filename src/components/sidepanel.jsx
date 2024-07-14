import React from 'react';
import '../styles/index.css';
import { InputWithButton } from './ui/inputWithButton';

export function SidePanel() {
    return (
        <>
            <InputWithButton />
            <small className="text-center ml-2">Rooms your in</small>
            <div className="roomsList max-h-[240px] overflow-y-auto m-2 border rounded cursor-pointer">
             rooms list here
            </div>
        </>
    )
}