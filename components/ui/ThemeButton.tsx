'use client'
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react'

import {SunIcon, MoonIcon} from "@heroicons/react/24/solid"
const ThemeButton = () => {
    const [mounted, setMounted] = useState(false)
    const {resolvedTheme, setTheme} = useTheme() // To Know what theme right now (dark or light)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    
    return ( 
        <button
            aria-label="Toogle Dark Mode"
            type="button"
            className="p-1 rounded-lg transition-all"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light':'dark')}
         >
            {resolvedTheme === 'dark' ? (
                <SunIcon className="h-7 w-7 text-orange-300"/>
            ):(
                <MoonIcon className="h-7 w-7 text-black"/>
            )}
        </button>
     );
}
 
export default ThemeButton;