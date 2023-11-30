"use client"

import { cn } from "@/lib/utils";
import {LucideIcon} from "lucide-react"
import {usePathname, useRouter} from "next/navigation"
import { Router } from "next/router";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;

}

const SidebarItem = ({
    icon:Icon,
    label,
    href
}: SidebarItemProps) => {

    const pathname = usePathname()
    const router = useRouter()
    const  isActive = 
    (pathname === "/" && href ==="/" ) ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)

    const onClick = () => {
        router.push(href)
    }

    return ( 
        <button 
        type="button"
        onClick={onClick}
        className={cn(
            "flex gap-x-2 pl-6 items-center text-sm font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20 hover:font-extrabold dark:text-slate-200 dark:hover:font-bold dark:hover:bg-sky-900",
            isActive && "text-sky-700 bg-sky-200/20 hover:bg-slate-100/20 hover:font-extrabold hover:text-sky-950 dark:text-slate-200 dark:hover:font-bold dark:hover:bg-black"
        )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon 
                    size={22}
                    className={cn(
                        "text-slate-500 dark:font-bold",
                        isActive && "text-sky-700 dark:hover:font-bold dark:text-sky-200"
                    )}
                />
                {label}
            </div>

            <div
                className={cn(
                "ml-auto opacity-0 border-2 border-y-[26px] border-sky-700 h-full transition-all",
                isActive && "opacity-100"
                )}
            />
        </button>

     );
}
 
export default SidebarItem;