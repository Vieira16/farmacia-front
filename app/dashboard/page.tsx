import Sidebar from "@/components/Sidebar";

export default function Dashboard() {

  return (

    <div className="flex">

      <Sidebar />

      <div className="p-10 flex-1 grid grid-cols-4 gap-6">

        <div className="border rounded p-6">
          Medicamentos cadastrados
          <h2 className="text-3xl">3</h2>
        </div>

        <div className="border rounded p-6">
          Quantidade total
          <h2 className="text-3xl">230 ml</h2>
        </div>

        <div className="border rounded p-6">
          Estoque baixo
          <h2 className="text-3xl">2</h2>
        </div>

        <div className="border rounded p-6">
          Disponíveis
          <h2 className="text-3xl">5</h2>
        </div>

      </div>

    </div>
  );
}