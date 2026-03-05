"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { medicos as dadosIniciais, Medico } from "@/data/mockData";

export default function Medicos() {
  const [lista, setLista] = useState<Medico[]>(dadosIniciais);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Medico | null>(null);
  const [form, setForm] = useState({ nome: "", crm: "", especialidade: "" });
  const [busca, setBusca] = useState("");

  const filtrados = lista.filter(
    (m) =>
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.crm.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirCadastro() {
    setEditando(null);
    setForm({ nome: "", crm: "", especialidade: "" });
    setMostrarForm(true);
  }

  function abrirEdicao(med: Medico) {
    setEditando(med);
    setForm({ nome: med.nome, crm: med.crm, especialidade: med.especialidade });
    setMostrarForm(true);
  }

  function salvar() {
    if (!form.nome || !form.crm || !form.especialidade) return;
    if (editando) {
      setLista(lista.map((m) => (m.id === editando.id ? { ...editando, ...form } : m)));
    } else {
      const novoId = Math.max(...lista.map((m) => m.id), 0) + 1;
      setLista([...lista, { id: novoId, ...form }]);
    }
    setMostrarForm(false);
  }

  function excluir(id: number) {
    if (confirm("Deseja excluir este médico?")) {
      setLista(lista.filter((m) => m.id !== id));
    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-10 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Médicos</h1>
          <button
            onClick={abrirCadastro}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition"
          >
            + Cadastrar Médico
          </button>
        </div>

        <input
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded-lg mb-6 w-80 outline-none focus:border-blue-500"
          placeholder="Buscar por nome ou CRM..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {mostrarForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-white">
                {editando ? "Editar Médico" : "Cadastrar Médico"}
              </h2>
              <input
                className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-3 outline-none focus:border-blue-500"
                placeholder="Nome completo"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              <input
                className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-3 outline-none focus:border-blue-500"
                placeholder="CRM (ex: CRM/SP 12345)"
                value={form.crm}
                onChange={(e) => setForm({ ...form, crm: e.target.value })}
              />
              <input
                className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-6 outline-none focus:border-blue-500"
                placeholder="Especialidade"
                value={form.especialidade}
                onChange={(e) => setForm({ ...form, especialidade: e.target.value })}
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

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left text-gray-400 text-sm">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">CRM</th>
                <th className="px-4 py-3">Especialidade</th>
                <th className="px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((m) => (
                <tr key={m.id} className="border-t border-gray-800 text-gray-300 hover:bg-gray-800 transition">
                  <td className="px-4 py-3">{m.nome}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{m.crm}</td>
                  <td className="px-4 py-3">{m.especialidade}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => abrirEdicao(m)}
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-white text-sm transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluir(m.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm transition"
                    >
                      Excluir
                    </button>
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