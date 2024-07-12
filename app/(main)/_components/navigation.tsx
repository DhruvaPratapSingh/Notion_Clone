import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isReseting, setIsReseting] = useState(false);
  const [iscollapsed, setIscollapsed] = useState(isMobile);

  const handleMouseDown=(
    event:React.MouseEvent<HTMLDivElement,MouseEvent>
  )=>{
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current=true;
    document.addEventListener("mousemove",handleMouseMove);
    document.addEventListener("mouseup",handleMouseUp);
  };
  const handleMouseMove =(e:MouseEvent)=>{
  if(!isResizingRef.current)return;
  let newWidth = e.clientX;
  if(newWidth <240) newWidth=240;
  if(newWidth>480) newWidth=480;

  if(sidebarRef.current && navbarRef.current){
    sidebarRef.current.style.width=`${newWidth}px`
  }
  }
  return (
    <div>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isReseting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
        onMouseDown={handleMouseDown}
        onClick={()=>{}}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1
        bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
      ref={navbarRef}
       className={cn(
        "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
        isReseting && "transition-all ease-in-out duration-300",
        isMobile && "left-0 w-full"
    )}
      >
<nav className="bg-transparent px-3 py-2 w-full">
    {iscollapsed && <MenuIcon role="button" className="h-6 w-6 text-muted-foreground"/>}
</nav>
      </div>
    </div>
  );
};

export default Navigation;