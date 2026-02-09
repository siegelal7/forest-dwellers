"use client"; // Required to use usePathname hook

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Forums", href: "/forum" },
    // { name: "Services", href: "/services" },
    // { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* <div className="text-xl font-bold text-blue-600">MyLogo</div> */}
      
      <div className="flex gap-6">
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
      </div>
    </nav>
  );
};

export default Navbar;
