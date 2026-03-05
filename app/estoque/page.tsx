"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useApp, ItemEstoque } from "@/context/AppContext";

export default function Estoque() {
  const { estoque, medicamentos, adicionarEstoque, editarEstoque, excluirEstoque } = useApp();
  const [busca, setBusca] = useState("");

  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ medicamentoId: 0, nome: "", lote: "", validade: "", quantidade: 0 });

  const [itemSelecionado, setItemSelecionado] = useState<ItemEstoque | null>(null);
  const [editandoLote, setEditandoLote] = useState(false);
  const [formLote, setFormLote] = useState({ lote: "", validade: "" });
  const [ajuste, setAjuste] = useState(0);
  const [tipoAjuste, setTipoAjuste] = useState<"adicionar" | "remover" | "definir">("adicionar");

  const filtrados = estoque.filter((i) =>
    i.nome.toLowerCase().includes(busca.toLowerCase()) ||
    i.lote.toLowerCase().includes(busca.toLowerCase())
  );

  function badge(qtd: number) {
    if (qtd === 0) return "bg-gray-700 text-gray-300";
    if (qtd < 10) return "bg-red-700 text-white";
    if (qtd < 20) return "bg-yellow-600 text-white";
    return "bg-green-700 text-white";
  }

  function statusLabel(qtd: number) {
    if (qtd === 0) return "Esgotado";
    if (qtd < 10) return "Crítico";
    if (qtd < 20) return "Baixo";
    return "Normal";
  }

  function abrirCadastro() {
    setForm({ medicamentoId: medicamentos[0]?.id || 0, nome: medicamentos[0]?.nome || "", lote: "", validade: "", quantidade: 0 });
    setMostrarForm(true);
  }

  function salvarNovo() {
    if (!form.lote || !form.validade || form.quantidade < 0) return;
    adicionarEstoque(form);
    setMostrarForm(false);
  }

  function clicarLinha(item: ItemEstoque) {
    setItemSelecionado(item);
    setEditandoLote(false);
    setAjuste(0);
    setTipoAjuste("adicionar");
  }

  function fecharPainel() {
    setItemSelecionado(null);
    setEditandoLote(false);
  }

  function aplicarAjuste() {
    if (!itemSelecionado) return;
    let novaQtd = itemSelecionado.quantidade;
    if (tipoAjuste === "adicionar") novaQtd += ajuste;
    else if (tipoAjuste === "remover") novaQtd = Math.max(0, novaQtd - ajuste);
    else novaQtd = ajuste;
    const atualizado: ItemEstoque = { ...itemSelecionado, quantidade: novaQtd };
    editarEstoque(atualizado);
    setItemSelecionado(atualizado);
    setAjuste(0);
  }

  function abrirEdicaoLote() {
    if (!itemSelecionado) return;
    setFormLote({ lote: itemSelecionado.lote, validade: itemSelecionado.validade });
    setEditandoLote(true);
  }

  function salvarEdicaoLote() {
    if (!itemSelecionado) return;
    const atualizado: ItemEstoque = {
      ...itemSelecionado,
      lote: formLote.lote,
      validade: formLote.validade,
    };
    editarEstoque(atualizado);
    setItemSelecionado(atualizado);
    setEditandoLote(false);
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">

        {/* Tabela principal */}
        <div className="p-10 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Estoque</h1>
            <button onClick={abrirCadastro} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition">
              + Entrada de Estoque
            </button>
          </div>

          <input
            className="border border-gray-700 bg-gray-900 text-white p-3 rounded-lg mb-6 w-80 outline-none focus:border-blue-500"
            placeholder="Buscar por nome ou lote..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          {/* Modal novo lote */}
          {mostrarForm && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md border border-gray-700">
                <h2 className="text-xl font-semibold mb-6 text-white">Entrada de Estoque</h2>
                <select
                  className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-3 outline-none"
                  value={form.medicamentoId}
                  onChange={(e) => {
                    const med = medicamentos.find(m => m.id === +e.target.value);
                    setForm({ ...form, medicamentoId: +e.target.value, nome: med?.nome || "" });
                  }}
                >
                  {medicamentos.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
                </select>
                <input
                  className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-3 outline-none focus:border-blue-500"
                  placeholder="Lote"
                  value={form.lote}
                  onChange={(e) => setForm({ ...form, lote: e.target.value })}
                />
                <input
                  className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-3 outline-none focus:border-blue-500"
                  placeholder="Validade (MM/AAAA)"
                  value={form.validade}
                  onChange={(e) => setForm({ ...form, validade: e.target.value })}
                />
                <input
                  type="number"
                  className="w-full border border-gray-700 bg-gray-800 text-white p-3 rounded mb-6 outline-none focus:border-blue-500"
                  placeholder="Quantidade"
                  value={form.quantidade}
                  onChange={(e) => setForm({ ...form, quantidade: +e.target.value })}
                />
                <div className="flex gap-3">
                  <button onClick={salvarNovo} className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white transition">Salvar</button>
                  <button onClick={() => setMostrarForm(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-white transition">Cancelar</button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-left text-gray-400 text-sm">
                  <th className="px-4 py-3">Medicamento</th>
                  <th className="px-4 py-3">Lote</th>
                  <th className="px-4 py-3">Validade</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Qtd</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((i) => (
                  <tr
                    key={i.id}
                    onClick={() => clicarLinha(i)}
                    className={`border-t border-gray-800 text-gray-300 cursor-pointer transition ${
                      itemSelecionado?.id === i.id ? "bg-blue-900" : "hover:bg-gray-800"
                    }`}
                  >
                    <td className="px-4 py-3">{i.nome}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{i.lote}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{i.validade}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${badge(i.quantidade)}`}>{statusLabel(i.quantidade)}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold">{i.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painel lateral */}
        {itemSelecionado && (
          <div className="w-80 min-h-screen bg-gray-900 border-l border-gray-800 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Detalhes</h2>
              <button onClick={fecharPainel} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>

            {/* Info */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <p className="text-white font-semibold">{itemSelecionado.nome}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Lote</span>
                <span className="text-gray-200">{itemSelecionado.lote}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Validade</span>
                <span className="text-gray-200">{itemSelecionado.validade}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Quantidade</span>
                <span className={`font-bold font-mono ${itemSelecionado.quantidade < 10 ? "text-red-400" : itemSelecionado.quantidade < 20 ? "text-yellow-400" : "text-green-400"}`}>
                  {itemSelecionado.quantidade}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className={`text-xs px-2 py-0.5 rounded ${badge(itemSelecionado.quantidade)}`}>{statusLabel(itemSelecionado.quantidade)}</span>
              </div>
            </div>

            {/* Ajuste de quantidade */}
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-white font-semibold mb-3">Ajustar Quantidade</p>
              <div className="flex rounded overflow-hidden mb-3 border border-gray-700">
                {(["adicionar", "remover", "definir"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipoAjuste(t)}
                    className={`flex-1 py-1.5 text-xs transition ${tipoAjuste === t ? "bg-blue-600 text-white" : "bg-gray-900 text-gray-400 hover:bg-gray-700"}`}
                  >
                    {t === "adicionar" ? "+" : t === "remover" ? "−" : "="} {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={0}
                className="w-full border border-gray-700 bg-gray-900 text-white p-2 rounded mb-3 outline-none focus:border-blue-500 text-center text-lg font-mono"
                value={ajuste}
                onChange={(e) => setAjuste(Math.max(0, +e.target.value))}
              />
              <button
                onClick={aplicarAjuste}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white text-sm transition"
              >
                Aplicar
              </button>
            </div>

            {/* Editar lote/validade */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white font-semibold">Lote / Validade</p>
                {!editandoLote && (
                  <button onClick={abrirEdicaoLote} className="text-blue-400 hover:text-blue-300 text-xs">Editar</button>
                )}
              </div>
              {editandoLote ? (
                <>
                  <input
                    className="w-full border border-gray-700 bg-gray-900 text-white p-2 rounded mb-2 outline-none focus:border-blue-500 text-sm"
                    placeholder="Lote"
                    value={formLote.lote}
                    onChange={(e) => setFormLote({ ...formLote, lote: e.target.value })}
                  />
                  <input
                    className="w-full border border-gray-700 bg-gray-900 text-white p-2 rounded mb-3 outline-none focus:border-blue-500 text-sm"
                    placeholder="Validade (MM/AAAA)"
                    value={formLote.validade}
                    onChange={(e) => setFormLote({ ...formLote, validade: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button onClick={salvarEdicaoLote} className="flex-1 bg-blue-600 hover:bg-blue-700 py-1.5 rounded text-white text-sm transition">Salvar</button>
                    <button onClick={() => setEditandoLote(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 py-1.5 rounded text-white text-sm transition">Cancelar</button>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-sm">
                  Lote <span className="text-white">{itemSelecionado.lote}</span> · Val. <span className="text-white">{itemSelecionado.validade}</span>
                </p>
              )}
            </div>

            {/* Excluir */}
            <button
              onClick={() => {
                if (confirm("Excluir este item do estoque?")) {
                  excluirEstoque(itemSelecionado.id);
                  fecharPainel();
                }
              }}
              className="w-full bg-red-700 hover:bg-red-600 py-2 rounded text-white text-sm transition mt-auto"
            >
              Excluir Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}