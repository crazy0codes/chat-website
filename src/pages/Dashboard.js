import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/custom/navbar";
import { SidePanel } from "../components/custom/sidepanel";
import { Chat } from "../components/custom/chat";
import { Context } from "../context/context";
import { socket } from "../context/socket";

export function Dashboard({ props }) {
  const [room, setRoom] = useState('global');
  const [picture, setPicture] = useState(null);
  const ref = useRef(true)
  const { user } = props
  useEffect(() => {
    socket.connect();
    
    //To update profile
    socket.on('updated-pfp',(imgUrl) => {
      setPicture( () => imgUrl);
      console.log(imgUrl)
    })

    //fetch user profile
    socket.on('fetch-pfp', (imgUrl) => {
      console.log("imgUrl :" , imgUrl);
      setPicture(() => imgUrl);
    });

    //Update changed username
    socket.on('updated-username', username => {
      localStorage.setItem('username',username);
    })

    return () => {
      socket.off('updated-username');
      socket.off('pfp');
      socket.off('fetch-pfp');
      socket.disconnect();
    };
  }, []);

  if(ref){
    ref.current = false;
    socket.emit('fresh-connection', user)
  }

  return (
    <Context.Provider value={{ room, setRoom, props }}>
      <div className="grid grid-cols-5">
        <Navbar picture={picture} />
        <div className="bg-slate-100 rounded mt-2 mr-2 ml-2 border">
          <SidePanel />
        </div>
        <div className="col-span-5 md:col-span-4 relative">
          <Chat picture={picture}/>
        </div>
      </div>
    </Context.Provider>
  );
}
