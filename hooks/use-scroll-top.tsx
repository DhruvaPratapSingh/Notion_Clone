import { useEffect, useState } from "react"

export const useScroll=(threshold=10)=>{
    const [scrolled,setscrolled]=useState(false);
    useEffect(()=>{
       const handleScroll=()=>{
        if(window.scrollY >threshold){
            setscrolled(true);
        }
        else{
            setscrolled(false);
        }
       }
        window.addEventListener("scroll",handleScroll);
        return ()=>window.removeEventListener("scroll",handleScroll);
    },[threshold]);
    return scrolled;
}