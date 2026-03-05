import Sidebar from "@/components/Sidebar";
import { estoque, medicos, ubsList } from "@/data/mockData";

export default function Relatorios() {
  const medicMaisEstoque = [...estoque].sort((a, b) => b.quantidade - a.quantidade).slice(0, 3);
  const medicMenorEstoque = [...estoque].sort((a, b) => a.quantidade - b.quantidade).slice(0, 3);

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-10 flex-1">
        <h1 className="text-3xl font-bold mb-2 text-white">Relatórios</h1>
        <p className="text-gray-400 mb-8">Análise geral do sistema</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medicamentos mais dispensados */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">📦 Maior Estoque</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-2">Medicamento</th>
                  <th className="pb-2 text-right">Qtd.</th>
                </tr>
              </thead>
              <tbody>
                {medicMaisEstoque.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800 text-gray-300">
                    <td className="py-3">{item.nome}</td>
                    <td className="py-3 text-right">
                      <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs">
                        {item.quantidade} un.
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Estoque crítico */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">⚠️ Estoque Crítico</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-2">Medicamento</th>
                  <th className="pb-2 text-right">Qtd.</th>
                </tr>
              </thead>
              <tbody>
                {medicMenorEstoque.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800 text-gray-300">
                    <td className="py-3">{item.nome}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.quantidade < 10 ? "bg-red-900 text-red-300" : "bg-yellow-900 text-yellow-300"
                      }`}>
                        {item.quantidade} un.
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Médicos cadastrados */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">👨‍⚕️ Médicos Cadastrados</h2>
            <ul className="space-y-3">
              {medicos.map((m) => (
                <li key={m.id} className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div>
                    <p className="text-gray-300 text-sm">{m.nome}</p>
                    <p className="text-gray-500 text-xs">{m.crm}</p>
                  </div>
                  <span className="text-xs text-blue-400 bg-blue-900 px-2 py-1 rounded">
                    {m.especialidade}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* UBS cadastradas */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">🏥 UBS Cadastradas</h2>
            <ul className="space-y-3">
              {ubsList.map((u) => (
                <li key={u.id} className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div>
                    <p className="text-gray-300 text-sm">{u.nome}</p>
                    <p className="text-gray-500 text-xs">{u.endereco}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {u.bairro}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}