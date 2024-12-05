import {
  LayoutDashboard,
  Package,
  Star,
  Inbox,
  ListOrdered,
  PackageSearch,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function AdminSidebar({ open, setOpen }) {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, active: true, path: "/admin" },
    {
      title: "Products",
      icon: Package,
      active: false,
      path: "/admin/products",
    },
    { title: "Favorites", icon: Star, active: false, path: "#" },
    { title: "Inbox", icon: Inbox, active: false, path: "#" },
    { title: "Order Lists", icon: ListOrdered, active: false, path: "#" },
    {
      title: "Product Stock",
      icon: PackageSearch,
      active: false,
      path: "/admin/productStock",
    },
  ];

  const bottomNavItems = [
    { title: "Settings", icon: Settings, path: "#" },
    { title: "Logout", icon: LogOut, path: "#" },
  ];

  // Close sidebar when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b">
            <span className="text-xl font-bold">3legant.</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.path}
                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                  location.pathname === item.path
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </a>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 border-t">
            {bottomNavItems.map((item) => (
              <a
                key={item.title}
                href={item.path}
                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                  location.pathname === item.path
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
