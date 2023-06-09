import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import DataTable, {
  TableProps as ReactDataTableProps,
} from "react-data-table-component";

interface TableProps extends ReactDataTableProps<any> {
  isSelectableRows?: boolean;
  noDataMessage?: string;
  minRowHeight?: string | number;
}

export function Table({
  isSelectableRows = false,
  noDataMessage = "Dados inexistentes.",
  minRowHeight = "4.8rem",
  ...restProps
}: TableProps) {
  return (
    <DataTable
      sortIcon={
        <ArrowUpwardRoundedIcon
          color="primary"
          fontSize="small"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
      keyField="id"
      expandableIcon={{
        collapsed: (
          <ArrowDropDownRoundedIcon
            color="primary"
            fontSize="small"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.8rem",
              height: "2.8rem",
            }}
          />
        ),
        expanded: (
          <ArrowDropUpRoundedIcon
            color="primary"
            fontSize="small"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.8rem",
              height: "2.8rem",
            }}
          />
        ),
      }}
      pagination
      responsive
      highlightOnHover
      noDataComponent={noDataMessage}
      selectableRows={isSelectableRows}
      selectableRowsHighlight={isSelectableRows}
      defaultSortFieldId={null}
      paginationPerPage={25}
      paginationRowsPerPageOptions={[25, 50, 100]}
      customStyles={{
        rows: {
          highlightOnHoverStyle: {
            backgroundColor: "var(--grey-hover)",
          },
          selectedHighlightStyle: {
            backgroundColor: "var(--grey-hover)",
          },
          style: {
            minHeight: minRowHeight,
            color: "var(--grey-800)",

            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: "1.6rem",
            textAlign: "center",
          },
        },
        headCells: {
          style: {
            backgroundColor: "var(--primary-color)",
            color: "var(--white-900)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: "1.6rem",
            textAlign: "center",
          },
        },
        cells: {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: "1.6rem",
            textAlign: "center",
          },
        },
        pagination: {
          pageButtonsStyle: {},
          style: {
            color: "var(--grey-800)",

            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: "1.6rem",
            textAlign: "center",
          },
        },
        expanderCell: {
          style: {},
        },
        expanderButton: {
          style: {},
        },
        expanderRow: {
          style: {},
        },
      }}
      {...restProps}
    />
  );
}
