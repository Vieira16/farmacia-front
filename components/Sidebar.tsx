"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartBar,
  FaPills,
  FaBoxes,
  FaCashRegister,
  FaUserMd,
  FaHospital,
  FaFileAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FaChartBar },
  { href: "/medicamentos", label: "Medicamentos", icon: FaPills },
  { href: "/estoque", label: "Estoque", icon: FaBoxes },
  { href: "/caixa", label: "Frente de Caixa", icon: FaCashRegister },
  { href: "/medicos", label: "Médicos", icon: FaUserMd },
  { href: "/ubs", label: "UBS", icon: FaHospital },
  { href: "/relatorios", label: "Relatórios", icon: FaFileAlt },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-blue-950 p-6 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-10 text-white">Farmácia</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-200 hover:bg-blue-900 hover:text-white"
              }`}
            >
              <Icon className="text-sm" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}