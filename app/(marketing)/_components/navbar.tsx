"use client"

import { useScroll } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Ghost, Link } from "lucide-react";
import { Spinner } from "@/components/spinner";

export const Navbar=()=>{
    const {isAuthenticated,isLoading}=useConvexAuth();
    const scrolled = useScroll();
    return(
        <div className={cn("z-50 dark:bg-[#1f1f1f] bg-background fixed top-0 flex items-center w-full p-6",scrolled && "border-b shadow-sm")}>
           <Logo/>
           <div className="md:ml-auto md:justify-end justify-between flex items-center gap-x-2 w-full">
            {isLoading && (
                <Spinner/>
            )} 
            {
                !isAuthenticated && !isLoading && (
                    <>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button size="sm">
                           Get Motion Free
                        </Button>
                    </SignInButton>
                    </>
                )
            }
            {isAuthenticated && !isLoading &&(
                <>
                <Button variant="ghost" size="sm" asChild>
                <Link href="/documents" >
                Enter Motion
                </Link>
                    </Button>
                    <UserButton afterSignOutUrl="/"/>
                    </>
            )}
            <ModeToggle/>
           </div>

        </div>
    )
}