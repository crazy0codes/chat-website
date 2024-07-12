import React from "react";
import { Input } from "../components/ui/input";
import { Chrome, Scroll } from "lucide-react";
import { Chat, ScrollAreaDemo } from "../components/ui/chatBox";
import { ScrollArea } from "../components/ui/scroll-area";

export function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-5 h-screen ">
        <div className="bg-black"></div>
        <div className="bg-sky-700 col-span-4 relative">
          <div className="relative w-full h-screen">
            <div className="chatRoom w-full bg-white flex-grow">
              <ScrollArea className="h-[calc(100vh-57px)] w-full  border p-0.5 ">
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
              </ScrollArea>
            </div>
            <form className="absolute bottom-0 w-full pl-2 pr-2 bg-black">
              <Input placeholder="Search" className="mt-2 mb-2" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}