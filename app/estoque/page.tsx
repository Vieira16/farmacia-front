"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { estoque as dadosIniciais, ItemEstoque } from "@/data/mockData";

export default function Estoque() {
  const [lista] = useState<ItemEstoque[]>(dadosIniciais);
  const [busca, setBusca] = useState("");

  const filtrados = lista.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()) ||
    item.lote.toLowerCase().includes(busca.toLowerCase())
  );

  function statusEstoque(quantidade: number) {
    if (quantidade < 10) return { label: "Crítico", classes: "bg-red-900 text-red-300" };
    if (quantidade < 20) return { label: "Baixo", classes: "bg-yellow-900 text-yellow-300" };
    return { label: "Normal", classes: "bg-green-900 text-green-300" };
  }

  function isVencido(validade: string) {
    const [mes, ano] = validade.split("/").map(Number);
    const dataValidade = new Date(ano, mes - 1, 1);
    return dataValidade < new Date();
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-10 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Estoque</h1>
          <span className="text-gray-400 text-sm">{filtrados.length} itens encontrados</span>
        </div>

        <input
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded-lg mb-6 w-80 outline-none focus:border-blue-500"
          placeholder="Buscar por nome ou lote..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((item) => {
            const status = statusEstoque(item.quantidade);
            const vencido = isVencido(item.validade);
            return (
              <div
                key={item.id}
                className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-gray-600 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{item.nome}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${status.classes}`}>
                    {status.label}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-400">
                  <p><span className="text-gray-500">Lote:</span> {item.lote}</p>
                  <p>
                    <span className="text-gray-500">Validade:</span>{" "}
                    <span className={vencido ? "text-red-400 font-medium" : ""}>
                      {item.validade} {vencido && "⚠ VENCIDO"}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-500">Quantidade:</span>{" "}
                    <span className="text-white font-medium">{item.quantidade} un.</span>
                  </p>
                </div>
              </div>
            );
          })}

          {filtrados.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center py-10">
              Nenhum item encontrado para &quot;{busca}&quot;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}