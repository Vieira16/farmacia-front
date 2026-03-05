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

export const medicamentos: Medicamento[] = [
  { id: 1, nome: "Dorflex", fabricante: "NeoQuímica", composicao: "Dipirona + Cafeína" },
  { id: 2, nome: "Dipirona", fabricante: "EMS", composicao: "Dipirona Sódica" },
  { id: 3, nome: "Amoxicilina", fabricante: "Medley", composicao: "Amoxicilina Tri-hidratada" },
];

export const estoque: ItemEstoque[] = [
  { id: 1, medicamentoId: 1, nome: "Dorflex", lote: "A123", validade: "10/2026", quantidade: 50 },
  { id: 2, medicamentoId: 2, nome: "Dipirona", lote: "B202", validade: "03/2025", quantidade: 8 },
  { id: 3, medicamentoId: 3, nome: "Amoxicilina", lote: "C305", validade: "07/2025", quantidade: 120 },
];

export const medicos: Medico[] = [
  { id: 1, nome: "Dr. Carlos Silva", crm: "CRM/SP 12345", especialidade: "Clínica Geral" },
  { id: 2, nome: "Dra. Ana Souza", crm: "CRM/SP 67890", especialidade: "Pediatria" },
  { id: 3, nome: "Dr. João Lima", crm: "CRM/MG 11223", especialidade: "Cardiologia" },
];

export const ubsList: UBS[] = [
  { id: 1, nome: "UBS Centro", endereco: "Rua das Flores, 100", bairro: "Centro" },
  { id: 2, nome: "UBS Vila Nova", endereco: "Av. Principal, 250", bairro: "Vila Nova" },
  { id: 3, nome: "UBS Jardim", endereco: "Rua das Acácias, 45", bairro: "Jardim América" },
];