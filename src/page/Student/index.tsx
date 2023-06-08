import { useCallback, useEffect, useState } from "react";

import { Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { TableColumn } from "react-data-table-component";
import { Table } from "../../components/tables/Table";
import { TableAction } from "../../components/tables/TableAction";
import { api } from "../../services/api";

type EnderecoType = {
  id: number;
  rua: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
};

type AlunoType = {
  id: number;
  matricula: number;
  nome: string;
  cpf: string;
  endereco: EnderecoType;
  curso: string;
};

type ProfessorType = {
  id: number;
  matricula: number;
  nome: string;
  endereco: EnderecoType;
  curso: string;
};

type ProjetoType = {
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function StudentPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getStudent = async () => {
    const { data } = await api.get("/alunos");

    setStudentData(data);
  };

  useEffect(() => {
    getStudent();
  }, []);

  const [studentData, setStudentData] = useState<AlunoType[]>([
    {
      id: 1,
      matricula: 123123,
      nome: "Teste",
      cpf: "10610351651",
      endereco: {
        id: 1,
        rua: "teste",
        numero: "teste",
        cep: "teste",
        cidade: "teste",
        estado: "teste",
        pais: "teste",
      },
      curso: "computação",
    },
  ]);

  const studentTableColumns: TableColumn<AlunoType>[] = [
    {
      id: "name",
      name: "Nome",
      selector: (student: AlunoType) => student.nome,
      sortable: true,
    },
    {
      id: "age",
      name: "Idade",
      selector: (student: AlunoType) => student.matricula,
      sortable: true,
    },
    {
      id: "maintenance",
      name: "Manutenção",
      selector: useCallback((student: AlunoType) => {
        return (
          <Box component="span">
            <TableAction actionName="Edit" onClick={handleOpen} />
            <TableAction actionName="Delete" onClick={handleOpen} />
          </Box>
        ) as any;
      }, []),
      sortable: false,
      width: "20%",
      center: true,
    },
  ];

  return (
    <>
      <Box width="60%" margin="0 auto" height="100vh" paddingTop="10rem">
        <Table data={studentData} columns={studentTableColumns} />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          display="flex"
          flexDirection="column"
          gap="2rem"
          alignItems="flex-end"
        >
          <TextField
            id="standard-helperText"
            label="Nome"
            variant="filled"
            fullWidth
          />
          <TextField variant="filled" fullWidth />

          <Button variant="contained">Editar</Button>
        </Box>
      </Modal>
    </>
  );
}
