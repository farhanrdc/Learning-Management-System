import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
    return ( 
        <div className="overflow-y-auto h-full flex flex-col border-r shadow-sm bg-white dark:bg-gray-900">
            <div className="w-full flex justify-center">
                <Logo />
            </div>

            <div>
                <SidebarRoutes />
            </div>
        </div>
     );
}
 
export default Sidebar;