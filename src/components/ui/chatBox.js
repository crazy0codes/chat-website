import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-separator"

export function ScrollAreaDemo() {
  return (<h1>ScrollAreaDemo</h1>)
}

export function Chat() {
  return (
    <>
      <div className="message-container flex border-slate-200 border-b hover:bg-gray-200 rounded">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" className="h-[24px] rounded-full m-2" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="user-details flex items-baseline">
           <b><small className="username pr-3 text-[9px]">shadcn</small></b>
            <small className="timeStamp text-slate-600 text-[10px]">6:30</small>
          </div>
          <small className="message text-slate-900 text-[12px]" >
          message
          </small>
        </div>
      </div>
    </>)
}