import { useCallback, useEffect, useState } from "react";

import { Box, Button, Modal } from "@mui/material";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { TableColumn } from "react-data-table-component";
import { Table } from "../../components/tables/Table";
import { TableAction } from "../../components/tables/TableAction";
import { api } from "../../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  AlunoType,
  EnderecoType,
  ProfessorType,
  SelectType,
} from "../../models/types";
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
  matricula: number;
  nome: string;
  curso: string;
  adress: SelectType;
};

export function TeacherPage() {
  const [open, setOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const [teacherData, setTeacherData] = useState<ProfessorType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<ProfessorType>();
  const [currentAdress, setCurrentAdress] = useState<SelectType | null>(null);
  const [adresses, setAdresses] = useState<SelectType[]>([]);

  const { register, handleSubmit, setValue } = useForm<EditInputsType>();

  const getStudent = async () => {
    const { data } = await api.get("/professores");

    setTeacherData(data);
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

  const handleDeleteTeacher = useCallback(async (teacherId: number) => {
    const response = await api.delete(`/professores/${teacherId}`);

    if (response.status === 200) {
      window.alert("Professor deletado com sucesso.");
      getStudent();
    }
  }, []);

  const handleSetFields = useCallback(
    (data: ProfessorType) => {
      setValue("curso", data.curso);
      setValue("matricula", data.matricula);
      setValue("nome", data.nome);
    },
    [setValue]
  );

  const studentTableColumns: TableColumn<ProfessorType>[] = [
    {
      id: "name",
      name: "Nome",
      selector: (props: ProfessorType) => props.nome,
      sortable: true,
    },
    {
      id: "enrollment",
      name: "Matrícula",
      selector: (props: ProfessorType) => props.matricula,
      sortable: true,
    },
    {
      id: "course",
      name: "Curso",
      selector: (props: ProfessorType) => props.curso,
      sortable: true,
    },
    {
      id: "maintenance",
      name: "Manutenção",
      selector: useCallback(
        (props: ProfessorType) => {
          return (
            <Box component="span">
              <TableAction
                actionName="Edit"
                onClick={() => {
                  handleOpen();
                  setSelectedStudent(props);
                  handleSetFields(props);

                  const current = adresses.filter(
                    (address) => address.value === props.idEndereco
                  )[0];

                  setCurrentAdress(() => current);
                }}
              />
              <TableAction
                actionName="Delete"
                onClick={() => handleDeleteTeacher(props.id)}
              />
            </Box>
          ) as any;
        },
        [adresses]
      ),
      sortable: false,
      width: "20%",
      center: true,
    },
  ];

  const editSubmit: SubmitHandler<EditInputsType> = async (data) => {
    if (!currentAdress?.value) {
      return;
    }
    const response = await api.put(`/professores/${selectedStudent?.id}`, {
      nome: data.nome,
      matricula: String(data.matricula),
      idEndereco: currentAdress?.value,
      curso: data.curso,
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

  if (adresses.length === 0 && teacherData.length === 0) {
    return <span>loader...</span>;
  }
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
        <Button variant="contained" onClick={handleOpenModal}>
          Adicionar Professor
        </Button>
        <Table data={teacherData} columns={studentTableColumns} />
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
              {...register("nome")}
              fullWidth
            />
            <TextField
              id="enroll"
              label="matricula"
              variant="filled"
              defaultValue={selectedStudent?.matricula}
              {...register("matricula")}
              fullWidth
            />
            <TextField
              id="course"
              label="Curso"
              variant="filled"
              defaultValue={selectedStudent?.curso}
              {...register("curso")}
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
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        adresses={adresses}
      />
    </>
  );
}
