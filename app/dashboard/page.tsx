import Sidebar from "@/components/Sidebar";
import { medicamentos, estoque } from "@/data/mockData";

export default function Dashboard() {
  const totalMedicamentos = medicamentos.length;
  const totalQuantidade = estoque.reduce((acc, item) => acc + item.quantidade, 0);
  const estoqueBaixo = estoque.filter((item) => item.quantidade < 20).length;
  const disponiveis = estoque.filter((item) => item.quantidade > 0).length;

  const cards = [
    { label: "Medicamentos cadastrados", value: totalMedicamentos, color: "border-blue-500" },
    { label: "Quantidade total em estoque", value: `${totalQuantidade} un.`, color: "border-green-500" },
    { label: "Estoque baixo (< 20 un.)", value: estoqueBaixo, color: "border-red-500" },
    { label: "Disponíveis", value: disponiveis, color: "border-yellow-500" },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-10 flex-1">
        <h1 className="text-3xl font-bold mb-2 text-white">Dashboard</h1>
        <p className="text-gray-400 mb-8">Visão geral do sistema</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, i) => (
            <div key={i} className={`border-l-4 ${card.color} bg-gray-900 rounded-lg p-6`}>
              <p className="text-gray-400 text-sm mb-2">{card.label}</p>
              <h2 className="text-3xl font-bold text-white">{card.value}</h2>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Estoque Crítico</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-2">Medicamento</th>
                <th className="pb-2">Lote</th>
                <th className="pb-2">Validade</th>
                <th className="pb-2">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {estoque
                .filter((item) => item.quantidade < 20)
                .map((item) => (
                  <tr key={item.id} className="border-b border-gray-800 text-gray-300">
                    <td className="py-3">{item.nome}</td>
                    <td className="py-3">{item.lote}</td>
                    <td className="py-3">{item.validade}</td>
                    <td className="py-3">
                      <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs">
                        {item.quantidade} un.
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}