export type EnderecoType = {
  id: number;
  rua: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
};

export type SelectType = {
  label: string;
  value: number;
};

export type AlunoType = {
  id: number;
  matricula: number;
  nome: string;
  cpf: string;
  idEndereco: number;
  curso: string;
};

export type ProfessorType = {
  id: number;
  matricula: number;
  nome: string;
  idEndereco: number;
  curso: string;
};

export type ProjetoType = {
  id: number;
  titulo: string;
  professor: ProfessorType;
  area: string;
  resumo: string;
  palavra_chave_01: string;
  palavra_chave_02: string;
  palavra_chave_03: string;
  url_documento: string;
};
