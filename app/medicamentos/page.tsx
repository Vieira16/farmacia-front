import Sidebar from "@/components/Sidebar";

const medicamentos = [
  {
    nome: "Dorflex",
    fabricante: "NeoQuímica",
    composicao: "Dipirona + Cafeína"
  },
  {
    nome: "Dipirona",
    fabricante: "EMS",
    composicao: "Dipirona Sódica"
  }
];

export default function Medicamentos() {

  return (

    <div className="flex">

      <Sidebar />

      <div className="p-10 flex-1">

        <h1 className="text-3xl mb-6">
          Medicamentos
        </h1>

        <button className="mb-6 bg-blue-600 px-4 py-2 rounded">
          Cadastrar Medicamento
        </button>

        <table className="w-full border">

          <thead>

            <tr className="border">

              <th>Nome</th>
              <th>Fabricante</th>
              <th>Composição</th>
              <th>Ações</th>

            </tr>

          </thead>

          <tbody>

            {medicamentos.map((m, i) => (

              <tr key={i} className="border text-center">

                <td>{m.nome}</td>
                <td>{m.fabricante}</td>
                <td>{m.composicao}</td>

                <td className="space-x-2">

                  <button className="bg-yellow-500 px-3 py-1 rounded">
                    Editar
                  </button>

                  <button className="bg-red-500 px-3 py-1 rounded">
                    Excluir
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}