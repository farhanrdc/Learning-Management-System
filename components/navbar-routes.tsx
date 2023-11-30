"use client"

import { UserButton, useAuth } from "@clerk/nextjs";
import ThemeButton from "./ui/ThemeButton";
import { usePathname } from "next/navigation";
import {LogOut} from "lucide-react"
import { Button } from "./ui/button";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
    const {userId} = useAuth()
    const pathname = usePathname()

    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursePage = pathname?.includes("/courses")
    const isSearchPage = pathname === "/search"


    return ( 
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-4 ml-auto">
                {isTeacherPage || isCoursePage ? (
                    <Link href="/">
                        <Button>
                            <LogOut className="w-4 h-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                ): isTeacher(userId) ? (<Link href="/teacher/courses">
                        <Button size="sm" variant="outline">
                            Teacher Mode
                        </Button>
                    </Link>
                ): null}
                <ThemeButton />
                <UserButton afterSignOutUrl="/"/>
            </div>
        </>
     );
}
 
export default NavbarRoutes;