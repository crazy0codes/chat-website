import React, { useContext, useState } from "react";
import { Context } from "../../controllers/context";
import { socket } from "../../controllers/socket";
import { EditProfileDialog } from "./editProfile";
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
    <nav className="bg-black col-span-5 h-[100%] mb-2 mr-2 ml-2 flex justify-between items-center pr-2 pl-2 bg-black rounded-[2px]">
      <input
        id="profile-picture"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={changePfp}
      />
      <p className="text-white">chat</p>
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