"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Medicamento {
  id: number;
  nome: string;
  fabricante: string;
  composicao: string;
}

export interface ItemEstoque {
  id: number;
  medicamentoId: number;
  nome: string;
  lote: string;
  validade: string;
  quantidade: number;
}

export interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
}

export interface UBS {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
}

export interface ItemVenda {
  medicamentoId: number;
  nome: string;
  quantidade: number;
}

export interface Venda {
  id: number;
  data: string;
  cpfPaciente: string;
  medico: string;
  ubs: string;
  itens: ItemVenda[];
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const medicamentosIniciais: Medicamento[] = [
  { id: 1, nome: "Dorflex", fabricante: "NeoQuímica", composicao: "Dipirona + Cafeína" },
  { id: 2, nome: "Dipirona", fabricante: "EMS", composicao: "Dipirona Sódica" },
  { id: 3, nome: "Amoxicilina", fabricante: "Medley", composicao: "Amoxicilina Tri-hidratada" },
];

const estoqueInicial: ItemEstoque[] = [
  { id: 1, medicamentoId: 1, nome: "Dorflex", lote: "A123", validade: "10/2026", quantidade: 50 },
  { id: 2, medicamentoId: 2, nome: "Dipirona", lote: "B202", validade: "03/2025", quantidade: 8 },
  { id: 3, medicamentoId: 3, nome: "Amoxicilina", lote: "C305", validade: "07/2025", quantidade: 120 },
];

const medicosIniciais: Medico[] = [
  { id: 1, nome: "Dr. Carlos Silva", crm: "CRM/SP 12345", especialidade: "Clínica Geral" },
  { id: 2, nome: "Dra. Ana Souza", crm: "CRM/SP 67890", especialidade: "Pediatria" },
  { id: 3, nome: "Dr. João Lima", crm: "CRM/MG 11223", especialidade: "Cardiologia" },
];

const ubsIniciais: UBS[] = [
  { id: 1, nome: "UBS Centro", endereco: "Rua das Flores, 100", bairro: "Centro" },
  { id: 2, nome: "UBS Vila Nova", endereco: "Av. Principal, 250", bairro: "Vila Nova" },
  { id: 3, nome: "UBS Jardim", endereco: "Rua das Acácias, 45", bairro: "Jardim América" },
];

// ─── Context Type ─────────────────────────────────────────────────────────────

interface AppContextType {
  // Medicamentos
  medicamentos: Medicamento[];
  adicionarMedicamento: (m: Omit<Medicamento, "id">) => void;
  editarMedicamento: (m: Medicamento) => void;
  excluirMedicamento: (id: number) => void;

  // Estoque
  estoque: ItemEstoque[];
  adicionarEstoque: (item: Omit<ItemEstoque, "id">) => void;
  editarEstoque: (item: ItemEstoque) => void;
  excluirEstoque: (id: number) => void;
  descontarEstoque: (medicamentoId: number, quantidade: number) => void;

  // Médicos
  medicos: Medico[];
  adicionarMedico: (m: Omit<Medico, "id">) => void;
  editarMedico: (m: Medico) => void;
  excluirMedico: (id: number) => void;

  // UBS
  ubsList: UBS[];
  adicionarUBS: (u: Omit<UBS, "id">) => void;
  editarUBS: (u: UBS) => void;
  excluirUBS: (id: number) => void;

  // Vendas
  vendas: Venda[];
  registrarVenda: (v: Omit<Venda, "id" | "data">) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(medicamentosIniciais);
  const [estoque, setEstoque] = useState<ItemEstoque[]>(estoqueInicial);
  const [medicos, setMedicos] = useState<Medico[]>(medicosIniciais);
  const [ubsList, setUbsList] = useState<UBS[]>(ubsIniciais);
  const [vendas, setVendas] = useState<Venda[]>([]);

  function nextId(list: { id: number }[]) {
    return list.length > 0 ? Math.max(...list.map((i) => i.id)) + 1 : 1;
  }

  // Medicamentos
  const adicionarMedicamento = (m: Omit<Medicamento, "id">) =>
    setMedicamentos((prev) => [...prev, { id: nextId(prev), ...m }]);
  const editarMedicamento = (m: Medicamento) =>
    setMedicamentos((prev) => prev.map((x) => (x.id === m.id ? m : x)));
  const excluirMedicamento = (id: number) =>
    setMedicamentos((prev) => prev.filter((x) => x.id !== id));

  // Estoque
  const adicionarEstoque = (item: Omit<ItemEstoque, "id">) =>
    setEstoque((prev) => {
      const existe = prev.find((e) => e.medicamentoId === item.medicamentoId && e.lote === item.lote);
      if (existe) {
        return prev.map((e) =>
          e.medicamentoId === item.medicamentoId && e.lote === item.lote
            ? { ...e, quantidade: e.quantidade + item.quantidade }
            : e
        );
      }
      return [...prev, { id: nextId(prev), ...item }];
    });
  const editarEstoque = (item: ItemEstoque) =>
    setEstoque((prev) => prev.map((x) => (x.id === item.id ? item : x)));
  const excluirEstoque = (id: number) =>
    setEstoque((prev) => prev.filter((x) => x.id !== id));
  const descontarEstoque = (medicamentoId: number, quantidade: number, estoqueId?: number) =>
    setEstoque((prev) =>
      prev.map((e) => {
        if (estoqueId) return e.id === estoqueId ? { ...e, quantidade: Math.max(0, e.quantidade - quantidade) } : e;
        return e.medicamentoId === medicamentoId ? { ...e, quantidade: Math.max(0, e.quantidade - quantidade) } : e;
      })
    );

  // Médicos
  const adicionarMedico = (m: Omit<Medico, "id">) =>
    setMedicos((prev) => [...prev, { id: nextId(prev), ...m }]);
  const editarMedico = (m: Medico) =>
    setMedicos((prev) => prev.map((x) => (x.id === m.id ? m : x)));
  const excluirMedico = (id: number) =>
    setMedicos((prev) => prev.filter((x) => x.id !== id));

  // UBS
  const adicionarUBS = (u: Omit<UBS, "id">) =>
    setUbsList((prev) => [...prev, { id: nextId(prev), ...u }]);
  const editarUBS = (u: UBS) =>
    setUbsList((prev) => prev.map((x) => (x.id === u.id ? u : x)));
  const excluirUBS = (id: number) =>
    setUbsList((prev) => prev.filter((x) => x.id !== id));

  // Vendas
  const registrarVenda = (v: Omit<Venda, "id" | "data">) => {
    const novaVenda: Venda = {
      id: nextId(vendas),
      data: new Date().toLocaleString("pt-BR"),
      ...v,
    };
    setVendas((prev) => [novaVenda, ...prev]);
    // Desconta estoque para cada item da venda (por lote se disponível)
    v.itens.forEach((item: any) => descontarEstoque(item.medicamentoId, item.quantidade, item.estoqueId));
  };

  return (
    <AppContext.Provider
      value={{
        medicamentos, adicionarMedicamento, editarMedicamento, excluirMedicamento,
        estoque, adicionarEstoque, editarEstoque, excluirEstoque, descontarEstoque,
        medicos, adicionarMedico, editarMedico, excluirMedico,
        ubsList, adicionarUBS, editarUBS, excluirUBS,
        vendas, registrarVenda,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider");
  return ctx;
}