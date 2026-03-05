import Sidebar from "@/components/Sidebar";

export default function Estoque() {

  return (

    <div className="flex">

      <Sidebar />

      <div className="p-10 flex-1">

        <h1 className="text-3xl mb-6">
          Estoque
        </h1>

        <input
          className="border p-3 rounded mb-6 w-80 bg-transparent"
          placeholder="Buscar medicamento"
        />

        <div className="grid grid-cols-3 gap-6">

          <div className="border p-6 rounded">
            Dorflex
            <p>Lote: A123</p>
            <p>Validade: 10/2026</p>
            <p>Quantidade: 50</p>
          </div>

          <div className="border p-6 rounded">
            Dipirona
            <p>Lote: B202</p>
            <p>Validade: 03/2025</p>
            <p>Quantidade: 80</p>
          </div>

        </div>

      </div>

    </div>
  );
}