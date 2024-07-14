import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Message } from "./ui/message"
import { Input } from "./ui/input";
import { socket } from "../App";
import { ScrollArea } from "./ui/scroll-area";
import { handleMessage } from "../controllers/messageController";


export function Chat() {
    const [messages, setMessages] = useState([]);
    const focusMessage = useRef(null);

    useEffect(() => {
        socket.on('old-messages', (oldMessages) => {
            console.log("handling 'old-messages':", oldMessages);
            setMessages(oldMessages);
        });

        socket.on('message', function (msg) {
            console.log("handling 'message':", msg);
            setMessages((prev) => {
                console.log('prev messages state:', prev);
                const newMessages = [...prev, msg];
                console.log('new messages state:', newMessages);
                return newMessages;
            });
        });

        return () => {
            console.log('cleaning up chat component');
            socket.off('old-messages');
            socket.off('message');
        }
    }, []);

    return (
        <>
            <div className="relative w-full h-screen pr-2 h-[100%]">
                <div className="chatRoom w-full bg-white flex-grow">
                    <ScrollArea className="chat bg-slate-100 h-[calc(100vh-57px)] w-full mt-2 rounded border p-0.5 ">
                        {messages.map((message, index) => (
                            <Message key={index} props={message} ref={
                                index === messages.length - 1 ? focusMessage.current.scrollIntoView() : null
                            } />
                        ))}
                    </ScrollArea>
                </div>
                <form className="absolute bottom-0 w-full pl-2 pr-2 " onSubmit={handleMessage}>
                    <Input placeholder="Search" className="mt-2 mb-2" id="user-message" />
                </form>
            </div>
        </>
    )
}