import React from "react";
import { Input } from "../components/ui/input";
import { Chat } from "../components/ui/chatBox";
import { ScrollArea } from "../components/ui/scroll-area";
import { InputWithButton } from "../components/ui/inputWithButton";
import { Navbar } from "../components/ui/navbar";

export function Dashboard() {
  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-5 h-full">
        <div className="rounded m-2 border">
          <InputWithButton />
          <small className="text-center ml-2">Rooms your in</small>
          <div className="roomsList max-h-[240px] overflow-y-auto m-2 border rounded cursor-pointer">
            <Chat />
            <Chat />
            <Chat />
          </div>
        </div>
        <div className="col-span-4 relative">
          <div className="relative w-full h-screen pr-2">
            <div className="chatRoom w-full bg-white flex-grow">
              <ScrollArea className="h-[calc(100vh-57px)] w-full mt-2 rounded border p-0.5 ">
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
            <form className="absolute bottom-0 w-full pl-2 pr-2 ">
              <Input placeholder="Search" className="mt-2 mb-2" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}