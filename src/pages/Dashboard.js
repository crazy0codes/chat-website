import React, { useEffect, useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { SidePanel } from "../components/sidepanel";
import { Chat } from "../components/chat";
import { Context } from "../controllers/context";
import { socket } from "../controllers/socket";

export function Dashboard({ props }) {
  const [room, setRoom] = useState('global');

  useEffect(() => {
    socket.connect();
    socket.emit("fresh-connection",props.user)
    return () => {
      socket.disconnect();
    };
  }, [props.user]);

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
