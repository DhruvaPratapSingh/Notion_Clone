"use client"
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";

const UserItem = () => {
    const {user}=useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex items-center text-sm p-33 w-full hover:bg-primary/5">
        <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5"> 
             <AvatarImage src={user?.imageUrl} />
            </Avatar>
             <span className="text-start font-medium line-clamp-1">
                {user?.fullName}&apos;s Motion
             </span>
        </div>
        <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
     <DropdownMenuContent className="w-80"
     align="start"
     alignOffset={11}
     forceMount
     >
      <div className="flex flex-col space-y-4 p-2">
<p className="text-xs font-medium leading-none text-muted-foreground">
    {user?.emailAddresses[0].emailAddress}
</p>
      </div>
     </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

export default UserItem;
