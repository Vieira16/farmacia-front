import Link from "next/link";

export default function Sidebar() {
  return (

    <div className="w-64 bg-blue-950 p-6 min-h-screen">

      <h1 className="text-2xl font-bold mb-10">
        Farmácia
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/dashboard">Dashboard</Link>

        <Link href="/medicamentos">
          Medicamentos
        </Link>

        <Link href="/estoque">
          Estoque
        </Link>

        <Link href="/caixa">
          Frente de Caixa
        </Link>

        <Link href="/medicos">
          Médicos
        </Link>

        <Link href="/ubs">
          UBS
        </Link>

        <Link href="/relatorios">
          Relatórios
        </Link>

      </nav>
    </div>
  );
}