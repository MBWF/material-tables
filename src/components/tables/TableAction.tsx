import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ToggleOffRoundedIcon from "@mui/icons-material/ToggleOffRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, IconButton, IconButtonProps } from "@mui/material";

interface TableActionProps extends IconButtonProps {
  actionName:
    | "Edit"
    | "Active/Inactive"
    | "Visualization"
    | "SendEmail"
    | "Link"
    | "DesactiveButton"
    | "Delete";
  hasSentEmail?: boolean;
}

export function TableAction({
  actionName,
  hasSentEmail,
  ...restProps
}: TableActionProps) {
  return (
    <Tooltip
      color="primary"
      title={
        ((actionName === "Edit" && "Editar") ||
          (actionName === "Active/Inactive" && "Desativar") ||
          (actionName === "DesactiveButton" && "Ativar") ||
          (actionName === "Visualization" && "Visualizar") ||
          (actionName === "Delete" && "Apagar") ||
          (actionName === "Link" && "Link") ||
          (actionName === "SendEmail" &&
            `${hasSentEmail ? "Reenviar" : "Enviar"} convite de acesso`)) ??
        ""
      }
      disableInteractive
    >
      <IconButton color="primary" {...restProps}>
        {(actionName === "Edit" && (
          <EditRoundedIcon sx={{ width: 20, height: 20 }} />
        )) ||
          (actionName === "Active/Inactive" && (
            <ToggleOnRoundedIcon
              sx={{ width: 20, height: 20, color: "green" }}
            />
          )) ||
          (actionName === "Delete" && (
            <DeleteIcon sx={{ width: 20, height: 20 }} />
          )) ||
          (actionName === "DesactiveButton" && (
            <ToggleOffRoundedIcon
              sx={{ width: 20, height: 20, color: "red" }}
            />
          )) ||
          (actionName === "Visualization" && (
            <RemoveRedEyeRoundedIcon sx={{ width: 20, height: 20 }} />
          )) ||
          (actionName === "Link" && (
            <InsertLinkIcon sx={{ width: 20, height: 20 }} />
          )) ||
          (actionName === "SendEmail" && (
            <ForwardToInboxRoundedIcon sx={{ width: 20, height: 20 }} />
          ))}
      </IconButton>
    </Tooltip>
  );
}
