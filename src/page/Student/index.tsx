import { useCallback, useEffect, useState } from "react";

import { Box, Button, Modal } from "@mui/material";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { TableColumn } from "react-data-table-component";
import { Table } from "../../components/tables/Table";
import { TableAction } from "../../components/tables/TableAction";
import { api } from "../../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlunoType, EnderecoType, SelectType } from "../../models/types";
import { NewStudentModal } from "./Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

type EditInputsType = {
  name: string;
  enroll: number;
  cpf: string;
  course: string;
  adress: SelectType;
};

export function StudentPage() {
  const [open, setOpen] = useState(false);
  const [isOpenNewStudentModal, setIsOpenNewStudentModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenNewStudentModal = () => setIsOpenNewStudentModal(true);
  const handleCloseNewStudentModal = () => setIsOpenNewStudentModal(false);

  const [studentData, setStudentData] = useState<AlunoType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<AlunoType>();
  const [currentAdress, setCurrentAdress] = useState<any>(null);
  const [adresses, setAdresses] = useState<SelectType[]>([]);

  const { register, handleSubmit, setValue } = useForm<EditInputsType>();

  const getStudent = async () => {
    const { data } = await api.get("/alunos");

    setStudentData(data);
  };

  const getAdresses = async () => {
    const { data } = await api.get<EnderecoType[]>("/enderecos");

    const formatedData = data.map((dt: EnderecoType) => {
      return {
        label: dt.rua,
        value: dt.id,
      };
    });

    setAdresses(formatedData);
  };

  const getDeleteStudent = async (studentId: number) => {
    const response = await api.delete(`/alunos/${studentId}`);

    if (response.status === 200) {
      window.alert("Estudante deletado com sucesso.");
      getStudent();
    }
  };

  const handleSetFields = (data: AlunoType) => {
    setValue("name", data.nome);
    setValue("enroll", data.matricula);
    setValue("cpf", data.cpf);
    setValue("course", data.curso);
  };

  const studentTableColumns: TableColumn<AlunoType>[] = [
    {
      id: "name",
      name: "Nome",
      selector: (student: AlunoType) => student.nome,
      sortable: true,
    },
    {
      id: "enrollment",
      name: "Matrícula",
      selector: (student: AlunoType) => student.matricula,
      sortable: true,
    },
    {
      id: "course",
      name: "Curso",
      selector: (student: AlunoType) => student.curso,
      sortable: true,
    },
    {
      id: "maintenance",
      name: "Manutenção",
      selector: useCallback((student: AlunoType) => {
        return (
          <Box component="span">
            <TableAction
              actionName="Edit"
              onClick={() => {
                console.log(adresses);
                handleOpen();
                setSelectedStudent(student);
                handleSetFields(student);
                setCurrentAdress({
                  label: "Rua 01",
                  value: student.idEndereco,
                });
              }}
            />
            <TableAction
              actionName="Delete"
              onClick={() => getDeleteStudent(student.id)}
            />
          </Box>
        ) as any;
      }, []),
      sortable: false,
      width: "20%",
      center: true,
    },
  ];

  const editSubmit: SubmitHandler<EditInputsType> = async (data) => {
    const response = await api.put(`/alunos/${selectedStudent?.id}`, {
      matricula: String(data.enroll),
      nome: data.name,
      cpf: data.cpf,
      idEndereco: currentAdress?.id,
      curso: data.course,
    });

    if (response.status === 200) {
      handleClose();
      window.alert("Aluno editado com sucesso.");
      getStudent();
      return;
    }

    window.alert("Erro ao editar aluno.");
  };

  useEffect(() => {
    getStudent();
    getAdresses();
  }, []);

  return (
    <>
      <Box
        width="60%"
        margin="0 auto"
        height="100vh"
        paddingTop="10rem"
        fontSize="0.2rem"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        gap="2rem"
      >
        <Button variant="contained" onClick={handleOpenNewStudentModal}>
          Adicionar Aluno
        </Button>
        <Table data={studentData} columns={studentTableColumns} />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(editSubmit)}>
          <Box
            sx={style}
            display="flex"
            flexDirection="column"
            gap="2rem"
            alignItems="flex-end"
          >
            <TextField
              id="name"
              label="Nome"
              variant="filled"
              defaultValue={selectedStudent?.nome}
              {...register("name")}
              fullWidth
            />
            <TextField
              id="enroll"
              label="matricula"
              variant="filled"
              defaultValue={selectedStudent?.matricula}
              {...register("enroll")}
              fullWidth
            />
            <TextField
              id="cpf"
              label="CPF"
              variant="filled"
              defaultValue={selectedStudent?.cpf}
              {...register("cpf")}
              fullWidth
            />
            <TextField
              id="course"
              label="Curso"
              variant="filled"
              defaultValue={selectedStudent?.curso}
              {...register("course")}
              fullWidth
            />
            <Box width="100%">
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={currentAdress}
                options={adresses}
                onChange={(e) => setCurrentAdress(e)}
                value={currentAdress}
              />
            </Box>

            <Button variant="contained" type="submit">
              Editar
            </Button>
          </Box>
        </form>
      </Modal>
      <NewStudentModal
        isOpenNewStudentModal={isOpenNewStudentModal}
        handleCloseNewStudentModal={handleCloseNewStudentModal}
        adresses={adresses}
      />
    </>
  );
}
