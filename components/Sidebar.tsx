"use client";

import { cn } from "@/utils";
import { Layout, Phone, PhoneCall, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HumeLogo from "./logos/Hume"; // Add this import

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Layout,
  },
  {
    name: "Call with Bot",
    href: "/call",
    icon: Phone,
  },
  {
    name: "Call History",
    href: "/history",
    icon: History,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full bg-card border-r">
      <div className="h-14 border-b flex items-center px-3">
        <Link href={navItems?.[0]?.href}>
          <HumeLogo className="h-5 w-auto" />
        </Link>
      </div>
      <nav className="p-3 space-y-2 overflow-y-auto h-[calc(100vh-3.5rem)]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
              "hover:bg-accent transition-colors",
              pathname === item.href ? "bg-accent" : "transparent"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
