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
  idProfessor: number;
  idAluno: number;
  area: string;
  resumo: string;
  palavraChave1: string;
  palavraChave2: string;
  palavraChave3: string;
  url: string;
};
