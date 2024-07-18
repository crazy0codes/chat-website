import React, { useRef, useEffect, useState } from "react";
import { Message } from "./ui/message";
import { Input } from "./ui/input";
import { socket } from "../controllers/socket";
import { ScrollArea } from "./ui/scroll-area";
import { handleMessage } from "../controllers/messageController";

export function Chat() {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleOldMessages = (oldMessages) => {
            console.log("handling 'old-messages':", oldMessages);
            setMessages(oldMessages);
        };

        const handleNewMessage = (msg) => {
            console.log("handling 'message':", msg);
            setMessages((prev) => [...prev, msg]);
        };

        socket.on('old-messages', handleOldMessages);
        socket.on('message', handleNewMessage);

        return () => {
            console.log('cleaning up chat component');
            socket.off('old-messages', handleOldMessages);
            socket.off('message', handleNewMessage);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    return (
        <div className="relative w-full h-screen pr-2">
            <div className="chatRoom w-full bg-white flex-grow">
                <ScrollArea className="bg-slate-100 h-[calc(100vh-57px)] w-full mt-2 rounded border p-0.5">
                    {messages.map((message, index) => (
                        <Message key={index} props={message} className="msg-box" />
                    ))}
                    <div ref={messagesEndRef} />
                </ScrollArea>
            </div>
            <form className="absolute bottom-0 w-full pl-2 pr-2" onSubmit={handleMessage}>
                <Input placeholder="Type a message..." className="mt-2 mb-2" id="user-message" />
            </form>
        </div>
    );
}