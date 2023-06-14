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
  ProjetoType,
  ProfessorType,
  SelectType,
  AlunoType,
} from "../../models/types";
import { AddModal } from "./Modal";

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
  titulo: string;
  professorId: SelectType;
  alunoId: SelectType;
  area: string;
  resumo: string;
  palavra_chave_01: string;
  palavra_chave_02: string;
  palavra_chave_03: string;
  url_documento: string;
};

export function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => {
    setIsOpenModal(false);
    getProject();
  };

  const [projectData, setProjectData] = useState<ProjetoType[]>([]);
  const [allStudents, setAllStudents] = useState<AlunoType[]>([]);
  const [allTeachers, setAllTeachers] = useState<ProfessorType[]>([]);

  const [selectedProject, setSelectedProject] = useState<ProjetoType>();

  const [student, setStudent] = useState<SelectType | null>(null);
  const [teacher, setTeacher] = useState<SelectType | null>(null);

  const { register, handleSubmit, setValue } = useForm<EditInputsType>();

  const getStudents = async () => {
    const { data } = await api.get("/alunos");

    setAllStudents(data);
  };

  const getTeachers = async () => {
    const { data } = await api.get("/professores");

    setAllTeachers(data);
  };

  const getProject = async () => {
    const { data } = await api.get("/projetos");
    setProjectData(data);
    await getStudents();
    await getTeachers();
  };

  const handleDeleteProject = useCallback(async (projectId: number) => {
    const response = await api.delete(`/projetos/${projectId}`);

    if (response.status === 200) {
      window.alert("Projeto deletado com sucesso.");
      getProject();
    }
  }, []);

  const handleSetFields = useCallback(
    (data: ProjetoType) => {
      setValue("area", data.area);
      setValue("palavra_chave_01", data.palavraChave1);
      setValue("palavra_chave_02", data.palavraChave2);
      setValue("palavra_chave_03", data.palavraChave3);
      setValue("resumo", data.resumo);
      setValue("titulo", data.titulo);
      setValue("url_documento", data.url);
    },
    [setValue]
  );

  const projectTableColumns: TableColumn<ProjetoType>[] = [
    {
      id: "titulo",
      name: "titulo",
      selector: (props: ProjetoType) => props.titulo,
      sortable: true,
    },
    {
      id: "url",
      name: "url",
      selector: (props: ProjetoType) => props.url,
    },
    {
      id: "key-01",
      name: "palavra chave 1",
      selector: (props: ProjetoType) => props.palavraChave1,
    },
    {
      id: "key-02",
      name: "palavra chave 2",
      selector: (props: ProjetoType) => props.palavraChave2,
    },
    {
      id: "key-03",
      name: "palavra chave 3",
      selector: (props: ProjetoType) => props.palavraChave3,
    },
    {
      id: "maintenance",
      name: "Manutenção",
      selector: useCallback(
        (props: ProjetoType) => {
          return (
            <Box component="span">
              <TableAction
                actionName="Edit"
                onClick={() => {
                  handleOpen();
                  setSelectedProject(props);
                  handleSetFields(props);

                  const currentStudent = allStudents.filter(
                    (student) => String(student.id) === String(props.idAluno)
                  )[0];

                  const currentTeacher = allTeachers.filter(
                    (teacher) =>
                      String(teacher.id) === String(props.idProfessor)
                  )[0];

                  setStudent({
                    label: currentStudent.nome,
                    value: currentStudent.id,
                  });

                  setTeacher({
                    label: currentTeacher.nome,
                    value: currentTeacher.id,
                  });
                }}
              />
              <TableAction
                actionName="Delete"
                onClick={() => {
                  handleDeleteProject(props.id);
                }}
              />
            </Box>
          ) as any;
        },
        [allStudents, allTeachers, handleDeleteProject, handleSetFields]
      ),
      sortable: false,
      width: "20%",
      center: true,
    },
  ];

  const editSubmit: SubmitHandler<EditInputsType> = async (data) => {
    const response = await api.put(`/projetos/${selectedProject?.id}`, {
      titulo: data.titulo,
      resumo: data.resumo,
      palavraChave1: data.palavra_chave_01,
      palavraChave2: data.palavra_chave_02,
      palavraChave3: data.palavra_chave_03,
      area: data.area,
      url: data.url_documento,
      idAluno: student?.value,
      idProfessor: teacher?.value,
    });

    if (response.status === 200) {
      handleClose();
      window.alert("Projeto editado com sucesso.");
      getProject();
      return;
    }

    window.alert("Erro ao editar aluno.");
  };

  useEffect(() => {
    getProject();
  }, []);

  if (projectData.length === 0) {
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
          Adicionar Projeto
        </Button>
        <Table data={projectData} columns={projectTableColumns} />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(editSubmit)}>
          <Box
            sx={style}
            display="flex"
            flexDirection="column"
            gap="2rem"
            alignItems="flex-end"
            maxHeight="80vh"
            overflow="scroll"
            minWidth="50vw"
          >
            <TextField
              id="title"
              label="Titulo"
              variant="filled"
              defaultValue={selectedProject?.titulo}
              {...register("titulo")}
              fullWidth
            />
            <TextField
              id="area"
              label="area"
              variant="filled"
              defaultValue={selectedProject?.area}
              {...register("area")}
              fullWidth
            />

            <TextField
              id="url"
              label="Url"
              variant="filled"
              defaultValue={selectedProject?.url}
              {...register("url_documento")}
              fullWidth
            />

            <TextField
              id="key-3"
              label="resumo"
              variant="filled"
              defaultValue={selectedProject?.resumo}
              {...register("resumo")}
              fullWidth
            />

            <TextField
              id="key-1"
              label="Palavra chave 1"
              variant="filled"
              defaultValue={selectedProject?.palavraChave1}
              {...register("palavra_chave_01")}
              fullWidth
            />

            <TextField
              id="key-2"
              label="Palavra chave 2"
              variant="filled"
              defaultValue={selectedProject?.palavraChave2}
              {...register("palavra_chave_02")}
              fullWidth
            />

            <TextField
              id="key-3"
              label="Palavra chave 3"
              variant="filled"
              defaultValue={selectedProject?.palavraChave3}
              {...register("palavra_chave_03")}
              fullWidth
            />

            <Box width="100%">
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={student}
                options={allStudents.map((student) => {
                  return {
                    label: student.nome,
                    value: student.id,
                  };
                })}
                placeholder="Aluno"
                onChange={(e) => setStudent(e)}
                value={student}
              />
            </Box>

            <Box width="100%">
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={teacher}
                options={allTeachers.map((teacher) => {
                  return {
                    label: teacher.nome,
                    value: teacher.id,
                  };
                })}
                placeholder="professor"
                onChange={(e) => setTeacher(e)}
                value={teacher}
              />
            </Box>

            <Button variant="contained" type="submit">
              Editar
            </Button>
          </Box>
        </form>
      </Modal>
      <AddModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        teachers={allTeachers}
        students={allStudents}
      />
    </>
  );
}
