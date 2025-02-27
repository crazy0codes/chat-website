import React, { useRef, useEffect, useState, useContext } from "react";
import { Message } from "../ui/message";
import { Input } from "../ui/input";
import { socket } from '../../context/socket';
import { ScrollArea } from "../ui/scroll-area";
import { handleMessage } from "../../context/messageController";
import { Context } from "../../context/context";

export function Chat({picture}) {
    const {room} = useContext(Context);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        
        const handleOldMessages = (oldMessages) => {
            setMessages(oldMessages);
            console.log(oldMessages)
        };

        const handleNewMessage = (msg) => {
            console.log("handleNewMessage :")
            console.log(msg)
            setMessages((prev) => [...prev, msg]);
        };

        socket.emit('join-room',room);
        socket.on('old-messages', handleOldMessages);
        socket.on('message', handleNewMessage);

        return () => {
            socket.off('old-messages', handleOldMessages);
            socket.off('message', handleNewMessage);
        };
    }, [room]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    return (
        <div className="relative w-full pr-2">
            <div className="chatRoom w-full bg-white flex-grow">
                <ScrollArea className="bg-slate-100 h-[calc(100vh-57px)] w-full mt-2 rounded border p-0.5 pb-[55px]">
                    {messages.map((message, index) => (
                        <Message key={index} props={message} className="msg-box" />
                    ))}
                    <div ref={messagesEndRef} />
                </ScrollArea>
            </div>
            <form className="absolute bottom-0 w-full pl-2 pr-2" onSubmit={(e) => {
                e.preventDefault();
                handleMessage({room, picture})
            }}>
                <Input placeholder="Type a message..." className="mt-2 mb-2" id="user-message" />
            </form>
        </div>
    );
}