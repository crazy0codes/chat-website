import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { SidePanel } from "../components/sidepanel";
import { Chat } from "../components/chat";
import { Context } from "../controllers/context";
import { socket } from "../controllers/socket";

export function Dashboard({ props }) {
  const [room, setRoom] = useState('global');
  const ref = useRef(true)
  const { user } = props
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  if(ref){
    ref.current = false;
    socket.emit('fresh-connection', user)
  }

  return (
    <Context.Provider value={{ room, setRoom, props }}>
      <div className="grid grid-cols-5 pt-2">
        <Navbar />
        <div className="bg-slate-100 rounded mt-2 mr-2 ml-2 border hidden md:block">
          <SidePanel />
        </div>
        <div className="col-span-5 md:col-span-4 relative">
          <Chat />
        </div>
      </div>
    </Context.Provider>
  );
}
