import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./useritem";
import { document } from "postcss";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { Popover, PopoverTrigger ,PopoverContent} from "@/components/ui/popover";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-setting";
import { Navbar } from "@/app/(marketing)/_components/navbar";


const Navigation = () => {

  const search = useSearch();
  const settings =useSettings();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  const create = useMutation(api.documents.create);
  // const documents=useQuery(api.documents.getSearch);
  const params=useParams();
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isReseting, setIsReseting] = useState(false);
  const [isCollapsed, setIscollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetwidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 400) newWidth = 400;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}`);
      navbarRef.current.style.setProperty("width", `calc(100%-${newWidth})px`);
    }
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const resetwidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIscollapsed(false);
      setIsReseting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => {
        setIsReseting(false);
      }, 300);
    }
  };
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIscollapsed(true);
      setIsReseting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsReseting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new Note.",
    });
  };
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
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item 
          onClick={handleCreate}
          icon={Plus}
          label="add a page"
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
             <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
            className="p-0 w-72" side={isMobile ? "bottom":"right"}>
            <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetwidth}
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
        {!!params.documentId ? (
          <Navbar 
          isCollapsed={isCollapsed}
          onResetWidth={resetwidth}
          />
        ):(
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetwidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
        )}
      </div>
    </div>
  );
};

export default Navigation;
