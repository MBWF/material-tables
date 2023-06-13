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
  rua: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
};

export function ModalCustom({
  handleCloseModal,
  isOpenModal,
}: NewStudentModalType) {
  const { register, handleSubmit } = useForm<AddInputsType>();

  const addSubmit: SubmitHandler<AddInputsType> = async ({
    cep,
    cidade,
    estado,
    numero,
    pais,
    rua,
  }) => {
    const response = await api.post("/enderecos", {
      cep,
      cidade,
      estado,
      numero,
      pais,
      rua,
    });

    if (response.status === 201) {
      handleCloseModal();
      window.alert("Endereco criado com sucesso.");
      return;
    }

    window.alert("Erro ao criar endereco.");
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
            id="cep"
            label="cep"
            variant="filled"
            {...register("cep")}
            fullWidth
          />
          <TextField
            id="city"
            label="Cidade"
            variant="filled"
            {...register("cidade")}
            fullWidth
          />
          <TextField
            id="state"
            label="Estado"
            variant="filled"
            {...register("estado")}
            fullWidth
          />
          <TextField
            id="number"
            label="Numero"
            variant="filled"
            {...register("numero")}
            fullWidth
          />

          <TextField
            id="pais"
            label="Pais"
            variant="filled"
            {...register("pais")}
            fullWidth
          />
          <TextField
            id="rua"
            label="Rua"
            variant="filled"
            {...register("rua")}
            fullWidth
          />

          <Button variant="contained" type="submit">
            Adicionar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
