"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { medicos, ubsList, estoque } from "@/data/mockData";

interface ItemVenda {
  medicamentoId: number;
  nome: string;
  quantidade: number;
}

export default function Caixa() {
  const [cpf, setCpf] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [ubsId, setUbsId] = useState("");
  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [medItemId, setMedItemId] = useState("");
  const [qtd, setQtd] = useState(1);
  const [sucesso, setSucesso] = useState(false);

  function adicionarItem() {
    if (!medItemId) return;
    const med = estoque.find((e) => e.id === Number(medItemId));
    if (!med) return;

    const existe = itens.find((i) => i.medicamentoId === med.id);
    if (existe) {
      setItens(itens.map((i) =>
        i.medicamentoId === med.id ? { ...i, quantidade: i.quantidade + qtd } : i
      ));
    } else {
      setItens([...itens, { medicamentoId: med.id, nome: med.nome, quantidade: qtd }]);
    }
    setMedItemId("");
    setQtd(1);
  }

  function removerItem(id: number) {
    setItens(itens.filter((i) => i.medicamentoId !== id));
  }

  function finalizarVenda() {
    if (!cpf || !medicoId || !ubsId || itens.length === 0) {
      alert("Preencha todos os campos e adicione ao menos um medicamento.");
      return;
    }
    setSucesso(true);
    setCpf("");
    setMedicoId("");
    setUbsId("");
    setItens([]);
    setTimeout(() => setSucesso(false), 3000);
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-10 flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-white">Frente de Caixa</h1>

        {sucesso && (
          <div className="bg-green-900 border border-green-600 text-green-300 px-4 py-3 rounded-lg mb-6">
            ✅ Venda finalizada com sucesso!
          </div>
        )}

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-white">Dados do Atendimento</h2>

          <input
            className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded-lg mb-3 outline-none focus:border-blue-500"
            placeholder="CPF do paciente"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <select
            className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded-lg mb-3 outline-none focus:border-blue-500"
            value={medicoId}
            onChange={(e) => setMedicoId(e.target.value)}
          >
            <option value="">Selecione o Médico</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>{m.nome} — {m.crm}</option>
            ))}
          </select>

          <select
            className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded-lg outline-none focus:border-blue-500"
            value={ubsId}
            onChange={(e) => setUbsId(e.target.value)}
          >
            <option value="">Selecione a UBS</option>
            {ubsList.map((u) => (
              <option key={u.id} value={u.id}>{u.nome} — {u.bairro}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-white">Medicamentos</h2>

          <div className="flex gap-3 mb-4">
            <select
              className="flex-1 border border-gray-700 bg-gray-800 text-white p-3 rounded-lg outline-none focus:border-blue-500"
              value={medItemId}
              onChange={(e) => setMedItemId(e.target.value)}
            >
              <option value="">Selecione o medicamento</option>
              {estoque.map((e) => (
                <option key={e.id} value={e.id}>{e.nome} (Lote: {e.lote})</option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              className="w-24 border border-gray-700 bg-gray-800 text-white p-3 rounded-lg outline-none focus:border-blue-500"
              value={qtd}
              onChange={(e) => setQtd(Number(e.target.value))}
            />
            <button
              onClick={adicionarItem}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
            >
              Adicionar
            </button>
          </div>

          {itens.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-2">Medicamento</th>
                  <th className="pb-2">Qtd.</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr key={item.medicamentoId} className="border-b border-gray-800 text-gray-300">
                    <td className="py-2">{item.nome}</td>
                    <td className="py-2">{item.quantidade}</td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => removerItem(item.medicamentoId)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum medicamento adicionado.</p>
          )}
        </div>

        <button
          onClick={finalizarVenda}
          className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-medium transition"
        >
          Finalizar Venda
        </button>
      </div>
    </div>
  );
}