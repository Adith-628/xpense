"use client";
import React, { useState, useEffect } from "react";
import { Home, PieChart, Plus, Settings, History } from "lucide-react";
import Link from "next/link";

const FloatingNavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      // Hide navbar when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { icon: <History size={24} />, label: "History", href: "/transactions" },
    { icon: <Home size={24} />, label: "Home", href: "/dashboard" },
    { icon: <Plus size={24} />, label: "Add", href: "/add-transaction" },
    // { icon: <PieChart size={24} />, label: "Analytics" },
    // { icon: <Settings size={24} />, label: "Settings" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav className=" mb-4 w-full flex justify-center">
        <div className="bg-indigo-50 rounded-full w-fit  shadow-md  px-3 py-2">
          <div className="flex justify-between gap-4 items-center">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="flex flex-col items-center group"
              >
                <div className="p-2 rounded-full transition-colors group-hover:bg-indigo-100">
                  {React.cloneElement(item.icon, {
                    className: "text-gray-600 group-hover:text-indigo-500",
                  })}
                </div>
                {/* <span className="text-xs text-gray-600 group-hover:text-blue-600 mt-1">
                  {item.label}
                </span> */}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FloatingNavBar;
