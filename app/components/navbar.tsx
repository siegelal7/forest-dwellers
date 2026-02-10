"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/app/actions/auth";
// Remove the import { auth } from "@/auth" here! 
// You can't use it in a client component.

const Navbar = ({ session }) => { // 1. Accept session as a prop
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Forums", href: "/forum" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex gap-6 items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        {/* 2. Check the session prop passed from the server */}
        {session ? (
          <button
            onClick={async () => await handleSignOut()}
            className="text-sm font-medium text-gray-600 transition-colors hover:text-red-500 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium transition-colors hover:text-blue-500"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
