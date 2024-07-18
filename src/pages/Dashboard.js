import React, { useEffect} from "react";
import { Navbar } from "../components/ui/navbar";
import { SidePanel } from "../components/sidepanel";
import { Chat } from "../components/chat";
import { socket } from "../controllers/socket";

export function Dashboard({ props }) {

  useEffect(() => {
    console.log("Dashboard => mounted");
    socket.connect();
    return () => {
      console.log("Dashboard => unmounted")
      socket.disconnect();
    }
  },[])

  return (
    <>
      <div className="grid grid-cols-5 pt-2">
        <Navbar props={props} />
        <div className="bg-slate-100 rounded mt-2  mr-2 ml-2 border">
          <SidePanel />
        </div>
        <div className="col-span-4 relative">
          <Chat />
        </div>
      </div>
    </>
  )
}