import React, { useCallback, useMemo, useState, useRef } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Modal, ModalClose, Typography, Sheet, Divider } from "@mui/joy";
import ethiopianDate from "ethiopian-date";
import { toEthiopian } from "ethiopian-date";

import { Delete, Edit, QrCode } from "@mui/icons-material";
import axios from "../http/axios";
import QRCode from "@/components/QRCode";
import { useReactToPrint } from "react-to-print";
import { useSnackbar } from "notistack";
import SimpleTable from "./simple-table";
import { SimpleMantine } from "./simple-mantine";

export default function CURDTable({ data, cat, room }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});
  const [printClick, setPrintClick] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleterow, setDeleterow] = useState();
  const [QRData, setQRData] = useState();
  const printRef = useRef();
  const reportRef = useRef();
  const admin = JSON.parse(localStorage.getItem("decoded"));
  console.log(admin);

  const { enqueueSnackbar } = useSnackbar();
  const printReport = useReactToPrint({
    content: () => reportRef.current,
  });

  const printQRHandler = useReactToPrint({
    content: () => printRef.current,
  });

  const handleQROpen = (row) => {
    setOpenQR(true);
    setQRData(row.id);
  };

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      console.log(values);
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      if (admin.role == "SA" || admin.role == "TL" || admin.role == "S") {
        axios
          .put(
            "/update",
            { values },
            {
              withCredentials: true,
            }
          )
          .then(function (response) {
            if (response.data.msg == "success") {
              console.log("Success");
              enqueueSnackbar("Update Successful", { variant: "success" });
            } else if (response.data.msg == "fail") {
              console.log("fail");
              enqueueSnackbar("Failed", { vairant: "error" });
            }
          });
      } else {
        axios
          .post(
            "/addrequest",
            {
              values: values,
              name: "Delete",
              admin_id: admin.adminId,
              req_type: "Delete",
            },
            { withCredentials: true }
          )
          .then(function (response) {
            if (response.data.msg == "success") {
              enqueueSnackbar("Request Sent Successfylly", {
                variant: "success",
              });
            }
          });
      }

      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleDeleteRow = (row) => {
    console.log("Opened");
    setOpenDelete(true);
    setDeleterow(row.original);
  };

  const sendDeleteRequest = () => {
    console.log(deleterow);
    if (admin.role == "SA" || admin.role == "TL" || admin.role == "S") {
      axios
        .put(
          "/delete",
          { deleterow },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          if (response.data.msg == "success") {
            enqueueSnackbar("Item Deleted", { variant: "warning" });
            setOpenDelete(false);
          }
        });
      axios
        .post("/record/add", {
          admin_id: admin.adminId,
          role: admin.role,
          activity: "Delete",
          datas: JSON.stringify(deleterow),
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          "/addrequest",
          {
            values: deleterow,
            name: "Delete",
            admin_id: admin.adminId,
            req_type: "Delete",
          },
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.data.msg == "success") {
            enqueueSnackbar("Request Sent Successfylly", {
              variant: "success",
            });
            setOpenDelete(false);
          }
        });
    }
  };

  const printQRCode = (row) => {
    setOpenQR(true);
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        // Cell: ({ value }) => {
        //   console.log(value);
        // },
        // Cell: ({ cell, column }) => console.log(cell.getValue()),
      },
      {
        accessorKey: "printed",
        header: "Counted",
        size: 100,
        Cell: ({ cell, column }) => (
          <Box
            sx={{
              color: cell.getValue() == true ? "green" : "red",
              width: 10,
              height: 10,
            }}
          >
            {cell.getValue() == true ? (
              <p className="font-bold">Counted</p>
            ) : (
              <p className="font-bold">Not-Counted</p>
            )}
          </Box>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "asset_status",
        header: "Asset Status",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "class_code",
        header: "Class Code",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "posting_group",
        header: "Posting Group",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "sub_code",
        header: "Sub Code",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "location_code",
        header: "Location Code",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "owner",
        header: "Owner",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "entrusted_id",
        header: "Entrusted ID",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "residual_value",
        header: "Residual Value",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "purchase_date",
        header: "Purchase Date",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "date",
        }),
      },
      {
        accessorKey: "commision_date",
        header: "Commision Date",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "date",
        }),
      },
      {
        accessorKey: "asset_life",
        header: "Asset Life",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "depreciation_start_date",
        header: "Depreciation Start Date",
        size: 120,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "date",
        }),
      },
      {
        accessorKey: "document_number",
        header: "Document No_",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        type: "number",
      },
      {
        accessorKey: "unit",
        header: "Unit",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <Dialog open={openDelete}>
        <DialogTitle textAlign="center">Delete Asset</DialogTitle>
        <DialogContent>
          <h1>Are you sure you want to delete this asset</h1>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={(e) => setOpenDelete(false)}>Cancel</Button>
          <Button
            onClick={sendDeleteRequest}
            color="error"
            className="bg-red-700"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {
        <div
          style={{
            display: "none",
          }}
        >
          <div ref={reportRef}>
            {/* <SimpleTable data={data} /> */}
            {/* {cat && <SimpleMantine elements={data} cat={cat} />} */}
            {/* {room && <SimpleMantine elements={data} room={room} />} */}
            <SimpleMantine elements={data} cat={cat} rom={room} />
          </div>
        </div>
      }
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openQR}
        onClose={() => setOpenQR(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          sx={{
            maxWidth: 600,
            borderRadius: "md",
            p: 1,
            boxShadow: "md",
            border: "1px solid grey",
          }}
        >
          <ModalClose />
          <Typography
            component="h2"
            id="modal-title"
            level="h2"
            textColor="inherit"
            fontWeight="xl"
            mb={1}
          >
            QR Code
          </Typography>
          <Divider />
          <div className="flex flex-col gap-4 pt-2 pb-1">
            <div className="w-auto px-10">
              {QRData && (
                <div ref={printRef}>
                  <QRCode data={QRData} />
                </div>
              )}
            </div>
            <div className="w-full px-10">
              <button
                onClick={printQRHandler}
                className="w-full rounded-lg bg-blue-600 py-3 px-4 text-lg text-white"
              >
                Print QR
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Print QR">
              <IconButton onClick={() => handleQROpen(row.original)}>
                <QrCode />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <>
            {/* <Button
                            color="primary"
                            onClick={() => setCreateModalOpen(true)}
                            variant="contained"
                        >
                            Add Asset
                        </Button> */}
            <Button color="primary" variant="contained" onClick={printReport}>
              Print Report
            </Button>
          </>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add New Asset</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;
