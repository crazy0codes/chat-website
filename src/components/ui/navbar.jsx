import React, { useContext } from "react";
import { LogOutIcon } from "lucide-react";
import { Button } from "./button";
import { Context } from "../../controllers/context";

export function Navbar() {
  const { props } = useContext(Context)
  const {setToken} = props;
  function logout() {
    localStorage.removeItem('token')
    setToken(false);
  }
  return (
    <nav className="bg-black col-span-5 h-[100%] mb-2 mr-2 ml-2 flex justify-between items-center pr-2 pl-2 bg-black rounded-[2px]">
      <p className="text-white">chat</p>
      <Button onClick={logout} className="h-[24px] text-[14px] rounded-[2px] bg-blue-400 hover:bg-red-600" >
        <LogOutIcon size={19} />
        <span className="ml-2" >logout</span>
      </Button>
    </nav>
  )
}