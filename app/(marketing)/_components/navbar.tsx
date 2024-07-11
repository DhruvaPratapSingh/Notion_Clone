"use client"

import { useScroll } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar=()=>{
    const scrolled = useScroll();
    return(
        <div className={cn("z-50 dark:bg-[#1f1f1f] bg-background fixed top-0 flex items-center w-full p-6",scrolled && "border-b shadow-sm")}>
           <Logo/>
           <div className="md:ml-auto md:justify-end justify-between flex items-center gap-x-2 w-full"> 
            <ModeToggle/>
           </div>

        </div>
    )
}