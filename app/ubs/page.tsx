"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ubsList as dadosIniciais, UBS } from "@/data/mockData";

export default function UBSPage() {
  const [lista, setLista] = useState<UBS[]>(dadosIniciais);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<UBS | null>(null);
  const [form, setForm] = useState({ nome: "", endereco: "", bairro: "" });

  function abrirCadastro() {
    setEditando(null);
    setForm({ nome: "", endereco: "", bairro: "" });
    setMostrarForm(true);
  }

  function abrirEdicao(ubs: UBS) {
    setEditando(ubs);
    setForm({ nome: ubs.nome, endereco: ubs.endereco, bairro: ubs.bairro });
    setMostrarForm(true);
  }

  function salvar() {
    if (!form.nome || !form.endereco || !form.bairro) return;
    if (editando) {
      setLista(lista.map((u) => (u.id === editando.id ? { ...editando, ...form } : u)));
    } else {
      const novoId = Math.max(...lista.map((u) => u.id), 0) + 1;
      setLista([...lista, { id: novoId, ...form }]);
    }
    setMostrarForm(false);
  }

  function excluir(id: number) {
    if (confirm("Deseja excluir esta UBS?")) {
      setLista(lista.filter((u) => u.id !== id));
    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-10 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Unidades Básicas de Saúde</h1>
          <button
            onClick={abrirCadastro}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition"
          >
            + Cadastrar UBS
          </button>
        </div>

        {mostrarForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-white">
                {editando ? "Editar UBS" : "Cadastrar UBS"}
              </h2>
              <input
                className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-3 outline-none focus:border-blue-500"
                placeholder="Nome da UBS"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              <input
                className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-3 outline-none focus:border-blue-500"
                placeholder="Endereço"
                value={form.endereco}
                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
              />
              <input
                className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-6 outline-none focus:border-blue-500"
                placeholder="Bairro"
                value={form.bairro}
                onChange={(e) => setForm({ ...form, bairro: e.target.value })}
              />
              <div className="flex gap-3">
                <button
                  onClick={salvar}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white transition"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setMostrarForm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-white transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((ubs) => (
            <div key={ubs.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-gray-600 transition">
              <h3 className="text-lg font-semibold text-white mb-2">{ubs.nome}</h3>
              <p className="text-gray-400 text-sm mb-1">{ubs.endereco}</p>
              <p className="text-gray-500 text-sm mb-4">{ubs.bairro}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => abrirEdicao(ubs)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-1 rounded text-white text-sm transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(ubs.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-1 rounded text-white text-sm transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}