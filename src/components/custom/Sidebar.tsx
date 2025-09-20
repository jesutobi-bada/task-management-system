"use client";
import React from "react";
import { Element3, Note1, Folder2, People, MessageQuestion, NotificationBing, Call, Calendar, Note, Add, ClipboardText, Profile2User, GlobalSearch, ArrowCircleRight, ArrowCircleLeft } from "iconsax-reactjs";
import { LuArrowLeftToLine, LuArrowRightFromLine, LuChevronDown, LuChevronUp } from "react-icons/lu";
import Logo from "./Logo";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";


// Icon component mapping
const IconComponents = {
  Element3,
  Note1,
  Folder2,
  People,
  MessageQuestion,
  NotificationBing,
  Call,
  Calendar,
  Note,
  Add,
  ClipboardText,
  Profile2User,
  GlobalSearch,
  ArrowCircleRight,
  ArrowCircleLeft
};

const sidebarLinks = [
  {
    name: "Home",
    route: "/",
    icon: "Element3",
  },
  {
    name: "MKVanBinnen",
    route: "/mkvanbinnen",
    icon: "Note1",
  },
  {
    name: "Document Management",
    route: "/document-management",
    icon: "Folder2",
  },
  {
    name: "Patient Information",
    route: "/patient-information",
    icon: "People",
  },
  {
    name: "Agenda",
    route: "/agenda",
    icon: "Calendar",
  },
  {
    name: "My Department",
    route: "/my-department",
    icon: "Profile2User",
    children: [
      {
        name: "News",
        route: "/news",
      },
      {
        name: "Members",
        route: "/members",
      },
      {
        name: "To-Do",
        route: "/todos",
      },
      {
        name: "Form Task",
        route: "/form-task",
      },
      {
        name: "Agenda",
        route: "/agenda",
      },
      {
        name: "Follow up system",
        route: "/follow-up",
      },
      {
        name: "Group Settings",
        route: "/group-settings",
      },
    ],
  },
  {
    name: "Phone numbers",
    route: "/phone-numbers",
    icon: "Call",
  },
  {
    name: "My to do Protocols",
    route: "/protocols",
    icon: "ClipboardText",
  },
  {
    name: "My Notifications",
    route: "/notifications",
    icon: "NotificationBing",
  },
  {
    name: "Knowledge Base",
    route: "/knowledge-base",
    icon: "MessageQuestion",
  },
  {
    name: "Super Admin",
    route: "/super-admin",
    icon: "GlobalSearch",
  },
  {
    name: "Admin",
    route: "/admin",
    icon: "Profile2User",
    children: [
      {
        name: "Agenda",
        route: "/admin/agenda",
      },
      {
        name: "News",
        route: "/admin/news",
      },
      {
        name: "Poll",
        route: "/admin/poll",
      },
      {
        name: "Department Rules",
        route: "/admin/department-rules",
      },
      {
        name: "Follow up system",
        route: "/admin/follow-up",
      },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleSubmenuClick = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <nav
      className={`
        h-full
        border-r border-primary
        p-3
        space-y-10
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "lg:w-1/4"}
        flex flex-col
      `}
    >
      <div className={`flex justify-between items-center ${isCollapsed && "justify-center"}`}>
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
        `}>
          <Logo />
        </div>
        <button
          className="bg-secondary-light rounded-lg h-10 w-10 flex items-center justify-center text-lg"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <LuArrowRightFromLine /> : <LuArrowLeftToLine />}
        </button>
      </div>
      <div className="space-y-7 flex-1 overflow-y-auto no-scrollbar">
        {sidebarLinks.map((link, index) => {
          // Get the icon component
          const IconComponent = IconComponents[link.icon as keyof typeof IconComponents];
          
          // Determine if the current link or any of its children are active
          const isActive = pathname === link.route || (
            link.children && link.children.some(child => pathname === child.route)
          );

          return (
            <div key={index} className="relative group">
              <Link
                href={link.route || "#"}
                onClick={(e) => {
                  if (link.children) {
                    e.preventDefault();
                    handleSubmenuClick(link.name);
                  }
                }}
                className={`
                  flex items-center py-3 px-3 rounded-lg
                  transition-colors duration-200
                  hover:bg-gray-100
                  ${isCollapsed ? "justify-center" : "gap-3"}
                  ${isActive ? "bg-teal-50 text-teal-600" : "text-gray-600"}
                `}
              >
                <div className={`${isCollapsed ? "w-6 h-6" : "w-6 h-6"} flex justify-center items-center flex-shrink-0`}>
                  {IconComponent && <IconComponent size={20} />}
                </div>
                {!isCollapsed && (
                  <>
                    <span className="font-semibold overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out">
                      {link.name}
                    </span>
                    {link.children && (
                      <div className="ml-auto">
                        {openSubmenu === link.name ? <LuChevronUp /> : <LuChevronDown />}
                      </div>
                    )}
                  </>
                )}
              </Link>
              
              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {link.name}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                </div>
              )}
              {link.children && openSubmenu === link.name && !isCollapsed && (
                <div className="pl-8 mt-2 space-y-4">
                  {link.children.map((child, childIndex) => {
                    const isChildActive = pathname === child.route;

                    return (
                      <Link
                        href={child.route}
                        key={childIndex}
                        className={`
                          flex items-center gap-3 py-2 px-3 rounded-lg
                          ${isChildActive ? "bg-primary-light text-primary" : "text-gray-600"}
                          transition-colors duration-200
                          hover:bg-gray-100
                        `}
                      >
                        <span className={`font-semibold ${isChildActive ? "text-primary" : "text-gray-600"}`}>
                          {child.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;


// TODO: Persist collapse state
// TODO: Look for the exact icons