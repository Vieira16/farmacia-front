import Sidebar from "@/components/Sidebar";

export default function Caixa() {

  return (

    <div className="flex">

      <Sidebar />

      <div className="p-10 flex-1">

        <h1 className="text-3xl mb-6">
          Frente de Caixa
        </h1>

        <input
          className="border p-3 rounded bg-transparent mb-4"
          placeholder="CPF do cliente"
        />

        <input
          className="border p-3 rounded bg-transparent mb-4"
          placeholder="Médico"
        />

        <input
          className="border p-3 rounded bg-transparent mb-4"
          placeholder="UBS"
        />

        <button className="bg-blue-600 px-6 py-3 rounded">
          Finalizar Venda
        </button>

      </div>

    </div>
  );
}