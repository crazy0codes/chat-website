import React, { useContext, useState } from "react";
import { Context } from "../../context/context";
import { socket } from "../../context/socket";
import { EditProfileDialog } from "../ui/editProfile";
import { UserAccount } from "./userAccount";


export function Navbar({ picture }) {
  const { props } = useContext(Context)
  const { setUser } = props;
  let [isDialogOpen, setIsDialogOpen] = useState(false);

  //To update username
  function editUsername() {
    let username = document.getElementById('update-username').value;
    socket.emit("update-username", username);
  }


  return (
    <nav className="col-span-5 h-[100%] flex justify-between ml-2 mt-1 mr-2 p-2 items-center bg-black rounded-[2px]">
      <input
        id="profile-picture"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={changePfp}
      />
      <h1 className="text-white text-xl">chat</h1>
      <UserAccount
        props={{
          picture,
          setIsDialogOpen,
          setUser
        }}
      />
      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editUsername={editUsername}
      />
    </nav>
  )
}

function changePfp(e) {
  console.log("file Uploaded!!")
  let file = e.target.files[0];
  uploadImage(file)
}

const uploadImage = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    const base64data = reader.result;
    socket.emit('edit-pfp', { image: base64data });
  };
};