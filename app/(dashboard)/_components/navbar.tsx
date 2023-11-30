import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";


const Navbar = () => {
    return ( 
        <header className="p-4 flex items-center shadow-sm border-b h-full bg-white dark:bg-gray-800">
            <MobileSidebar />
            <NavbarRoutes />
        </header>
     );
}
 
export default Navbar;