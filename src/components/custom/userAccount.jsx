import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    FileUp,
    LogOutIcon,
    UserRoundPen
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { socket } from "../../context/socket";


export function UserAccount({props}) {
    console.log(props)
    const { setIsDialogOpen, setUser, picture } = props;
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Avatar>
                            <AvatarImage src={picture} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        <p>My Account</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setIsDialogOpen(true)} className="gap-2 cursor-pointer">
                        <UserRoundPen strokeWidth={1} width={20} height={20} />
                         <p>username</p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <label className="gap-2 flex cursor-pointer" htmlFor="profile-picture">
                            <FileUp strokeWidth={1} width={20} height={20} />
                            <span>profile</span>
                        </label>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout(setUser)} className="cursor-pointer">
                        <span className="flex items-center gap-2 text-red-500">
                            <LogOutIcon width={20} height={20} strokeWidth={2} className="text-red-500" />
                            <p>logout</p>
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
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

function logout(setUser) {
    localStorage.removeItem('token')
    setUser(() => ({
        stu_email: null,
        token: null
    }));
}