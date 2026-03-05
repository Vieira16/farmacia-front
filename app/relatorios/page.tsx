import Sidebar from "@/components/Sidebar";

export default function Relatorios() {

  return (

    <div className="flex">

      <Sidebar />

      <div className="p-10 flex-1 grid grid-cols-2 gap-6">

        <div className="border p-6 rounded">
          Medicamentos que mais saíram
        </div>

        <div className="border p-6 rounded">
          Médicos que mais receitaram
        </div>

        <div className="border p-6 rounded">
          Atendimento por funcionário
        </div>

        <div className="border p-6 rounded">
          UBS com mais receitas
        </div>

      </div>

    </div>
  );
}