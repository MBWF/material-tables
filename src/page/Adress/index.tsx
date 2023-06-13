import { useCallback, useEffect, useState } from "react";

import { Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { TableColumn } from "react-data-table-component";
import { Table } from "../../components/tables/Table";
import { TableAction } from "../../components/tables/TableAction";
import { api } from "../../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { EnderecoType } from "../../models/types";
import { ModalCustom } from "./Modal";

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
  rua: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
};

export function AdressPage() {
  const [open, setOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const [studentData, setEnderecoData] = useState<EnderecoType[]>([]);
  const [selectAdress, setSelectAdress] = useState<EnderecoType>();

  const { register, handleSubmit, setValue } = useForm<EditInputsType>();

  const getEndereco = async () => {
    const { data } = await api.get("/enderecos");

    setEnderecoData(data);
  };

  const deleteAdress = async (enderecoId: number) => {
    const response = await api.delete(`/enderecos/${enderecoId}`);

    if (response.status === 200) {
      window.alert("Endereco deletado com sucesso.");
      getEndereco();
    }
  };

  const handleSetFields = (data: EnderecoType) => {
    setValue("cep", data.cep);
    setValue("cidade", data.cidade);
    setValue("estado", data.estado);
    setValue("pais", data.pais);
    setValue("rua", data.rua);
  };

  const enderecoTableColumns: TableColumn<EnderecoType>[] = [
    {
      id: "name",
      name: "Cep",
      selector: (endereco) => endereco.cep,
      sortable: true,
    },
    {
      id: "city",
      name: "Cidade",
      selector: (endereco) => endereco.cidade,
    },
    {
      id: "state",
      name: "Estado",
      selector: (endereco) => endereco.estado,
      sortable: true,
    },
    {
      id: "number",
      name: "Numero",
      selector: (endereco) => endereco.numero,
    },
    {
      id: "adress",
      name: "Rua",
      selector: (endereco) => endereco.rua,
    },

    {
      id: "maintenance",
      name: "Manutenção",
      selector: useCallback((adress: EnderecoType) => {
        return (
          <Box component="span">
            <TableAction
              actionName="Edit"
              onClick={() => {
                handleOpen();
                setSelectAdress(adress);
                handleSetFields(adress);
              }}
            />
            <TableAction
              actionName="Delete"
              onClick={() => deleteAdress(adress.id)}
            />
          </Box>
        ) as any;
      }, []),
      sortable: false,
      width: "20%",
      center: true,
    },
  ];

  const editSubmit: SubmitHandler<EditInputsType> = async ({
    cep,
    cidade,
    estado,
    numero,
    pais,
    rua,
  }) => {
    const response = await api.put(`/enderecos/${selectAdress?.id}`, {
      rua,
      numero,
      cep,
      cidade,
      estado,
      pais,
    });

    if (response.status === 200) {
      handleClose();
      window.alert("Aluno editado com sucesso.");
      getEndereco();
      return;
    }

    window.alert("Erro ao editar aluno.");
  };

  useEffect(() => {
    getEndereco();
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
        <Button variant="contained" onClick={handleOpenModal}>
          Adicionar Endereco
        </Button>
        <Table data={studentData} columns={enderecoTableColumns} />
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
              id="cep"
              label="cep"
              variant="filled"
              defaultValue={selectAdress?.cep}
              {...register("cep")}
              fullWidth
            />
            <TextField
              id="city"
              label="Cidade"
              variant="filled"
              defaultValue={selectAdress?.cidade}
              {...register("cidade")}
              fullWidth
            />
            <TextField
              id="state"
              label="Estado"
              variant="filled"
              defaultValue={selectAdress?.estado}
              {...register("estado")}
              fullWidth
            />
            <TextField
              id="number"
              label="Numero"
              variant="filled"
              defaultValue={selectAdress?.numero}
              {...register("numero")}
              fullWidth
            />

            <TextField
              id="pais"
              label="Pais"
              variant="filled"
              defaultValue={selectAdress?.pais}
              {...register("pais")}
              fullWidth
            />
            <TextField
              id="rua"
              label="Rua"
              variant="filled"
              defaultValue={selectAdress?.rua}
              {...register("rua")}
              fullWidth
            />

            <Button variant="contained" type="submit">
              Editar
            </Button>
          </Box>
        </form>
      </Modal>
      <ModalCustom
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
