"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
    const {isAuthenticated,isLoading}=useConvexAuth();
    return (
      <div className='max-w-3xl space-y-4'>
          <h1 className='text-3xlmd:text-6xl sm:text-5xl font-bold' >
              Your Ideas, Document, & Plans, unified.
              Welcome to <span className='underline'>Motion</span>
          </h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
          Notes-store is the connected workspace where <br />
          better, faster work happens
        </h3>
        {isLoading && (
          <div className='w-full flex items-center justify-center'><Spinner size="lg"/></div>
          
        )}
        {isAuthenticated && !isLoading && (
        <Button asChild>
          
          <Link href="/documents">Enter Motion
          <ArrowRight className='h-4 w-4 ml-2'/>
          </Link>
        </Button>
        )}
          {!isAuthenticated && !isLoading && (
            <SignInButton mode="modal">
             <Button>
              Get Motion free
              <ArrowRight className='h-4 w-4 ml-2'/>
             </Button>
            </SignInButton>
          )}
      </div>
    )
  }
  
  export default Heading
  