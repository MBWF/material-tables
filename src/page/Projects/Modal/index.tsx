import { Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { AlunoType, ProfessorType, SelectType } from "../../../models/types";
import { api } from "../../../services/api";

type AddModalType = {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  students: AlunoType[];
  teachers: ProfessorType[];
};

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

type AddInputsType = {
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

export function AddModal({
  isOpenModal,
  handleCloseModal,
  students,
  teachers,
}: AddModalType) {
  const { register, handleSubmit } = useForm<AddInputsType>();

  const [student, setStudent] = useState<SelectType | null>(null);
  const [teacher, setTeacher] = useState<SelectType | null>(null);

  const addSubmit: SubmitHandler<AddInputsType> = async (data) => {
    console.log(data.url_documento);
    const response = await api.post("/projetos", {
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

    if (response.status === 201) {
      handleCloseModal();
      window.alert("Projeto criado com sucesso.");
      return;
    }

    window.alert("Erro ao editar aluno.");
  };

  return (
    <Modal open={isOpenModal} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(addSubmit)}>
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
            id="title-add"
            label="Titulo"
            variant="filled"
            {...register("titulo")}
            fullWidth
          />
          <TextField
            id="area-add"
            label="area"
            variant="filled"
            {...register("area")}
            fullWidth
          />

          <TextField
            id="url"
            label="Url"
            variant="filled"
            fullWidth
            {...register("url_documento")}
          />

          <TextField
            id="resumo-add"
            label="Resumo"
            variant="filled"
            {...register("resumo")}
            fullWidth
          />

          <TextField
            id="key-1-add"
            label="Palavra chave 1"
            variant="filled"
            {...register("palavra_chave_01")}
            fullWidth
          />

          <TextField
            id="key-2-add"
            label="Palavra chave 2"
            variant="filled"
            {...register("palavra_chave_02")}
            fullWidth
          />

          <TextField
            id="key-3-add"
            label="Palavra chave 3"
            variant="filled"
            {...register("palavra_chave_03")}
            fullWidth
          />

          <Box width="100%">
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={student}
              options={students.map((student) => {
                return {
                  label: student.nome,
                  value: student.id,
                };
              })}
              onChange={(e) => setStudent(e)}
              value={student}
            />
          </Box>

          <Box width="100%">
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={teacher}
              options={teachers.map((teacher) => {
                return {
                  label: teacher.nome,
                  value: teacher.id,
                };
              })}
              onChange={(e) => setTeacher(e)}
              value={teacher}
            />
          </Box>

          <Button variant="contained" type="submit">
            Adicionar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
