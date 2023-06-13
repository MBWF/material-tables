import { Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { SelectType } from "../../../models/types";
import { api } from "../../../services/api";

type NewStudentModalType = {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  adresses: SelectType[];
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
  matricula: number;
  nome: string;
  curso: string;
  adress: SelectType;
};

export function NewStudentModal({
  isOpenModal,
  handleCloseModal,
  adresses,
}: NewStudentModalType) {
  const { register, handleSubmit } = useForm<AddInputsType>();
  const [currentAdress, setCurrentAdress] = useState<SelectType | null>(null);

  const addSubmit: SubmitHandler<AddInputsType> = async (data) => {
    const response = await api.post("/alunos", {
      matricula: String(data.matricula),
      nome: data.nome,
      idEndereco: currentAdress?.value,
      curso: data.curso,
    });

    if (response.status === 201) {
      handleCloseModal();
      window.alert("Professor editado com sucesso.");
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
        >
          <TextField
            id="name"
            label="Nome"
            variant="filled"
            {...register("nome")}
            fullWidth
          />
          <TextField
            id="enroll"
            label="matricula"
            variant="filled"
            {...register("matricula")}
            fullWidth
          />
          <TextField
            id="course"
            label="Curso"
            variant="filled"
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
            Adicionar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
