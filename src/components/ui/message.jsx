import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@radix-ui/react-avatar"

export function Message({props}) {
  let {stu_email, msg, msg_delivered, avatar} = props;
  let username = stu_email;
  avatar = avatar || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';

  return (
    <>
      <div className="message-container flex border-slate-200 border-b hover:bg-gray-200 rounded">
        <Avatar>
          <AvatarImage src={avatar} className="h-[24px] rounded-full m-2" alt="dp" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="user-details flex items-baseline">
            <b><small className="username pr-3 text-[9px]">{username}</small></b>
            <small className="timeStamp text-slate-600 text-[10px]">{msg_delivered}</small>
          </div>
          <small className="message text-slate-900 text-[12px]" >
            {msg}
          </small>
        </div>
      </div>
    </>)
}