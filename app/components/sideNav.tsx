import React from "react";
import { IoHomeOutline, IoPersonAddOutline, IoCreateOutline, IoTrashOutline, IoPeopleOutline } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <IoHomeOutline size={20} />
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: <IoPeopleOutline size={20} />
  },
];

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex justify-center items-center p-6">
        <IoIosContact color="white" size={64} />
      </div>
      <nav className="flex flex-col gap-2 mt-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/10 text-white hover:bg-slate-600 transition"
          >
            {link.icon}
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
}

