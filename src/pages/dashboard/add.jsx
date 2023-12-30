import React, { useEffect, useState } from 'react'
import {
} from '@material-tailwind/react';
import {
    Typography,
    Grid,
    TextField,
    IconButton,
    Button,
    MenuItem
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import axios from '../../http/axios';
import ConfirmDialog from '@/components/ConfirmDialog';

function Add() {
    const [isSuccess, setIsSuccess] = useState("");
    const [alettMsg, setAlertMsg] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    // Select Statement Vaiables
    const [agroup, setAgroup] = useState([]);
    const [alocation, setAlocation] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const thing = JSON.parse(localStorage.getItem('decoded'));
    const admin_id = thing.adminId;
    const role = thing.role;

    // Date Pickers
    const [purchaseDate, setPurchaseDate] = useState();
    const [commissionDate, setCommissionDate] = useState();
    const [depreciationDate, setDepreciationDate] = useState();

    const astatus = [
        { id: 1, label: "Active", value: "active" },
        { id: 2, label: "In-Active", value: "in-active" }
    ];

    const aunit = [
        { id: 1, label: "Pcs", value: "Pcs" }
    ]

    useEffect(() => {
        axios.get('/assetlocation', {
            withCredentials: true,
        }).then(function (response) {
            console.log(response.data);
            setAlocation(response.data);
        });
        axios.get('/assetgroup', {
            withCredentials: true
        }).then(function (response) {
            setAgroup(response.data);
        });

    }, []);


    const [inputFields, setInputFields] = useState([
        {
            asset_no: '',
            name: '',
            asset_group: '',
            asset_status: '',
            class_code: '',
            posting_group: '',
            sub_code: '',
            location_code: '',
            owner: '',
            entrusted_id: '',
            price: '',
            residual_value: '',
            purchase_date: '',
            commission_date: '',
            asset_life: '',
            depreciation_start_date: '',
            document_number: '',
            quantity: '',
            unit: '',
        },
    ]);

    const handleFormChange = (index, event, check) => {
        let data = [...inputFields];
        if (event.$L == "en") {
            if (check == "purchase_date") {
                data[index]['purchase_date'] = event.$d;
            }
            if (check == "commission_date") {
                data[index]['commission_date'] = event.$d;
            }
            if (check == "depreciation_date") {
                data[index]['depreciation_date'] = event.$d;
            }
            console.log(event);
            setInputFields(data);
        } else {
            data[index][event.target.name] = event.target.value;
            setInputFields(data);
        }
    }

    const addFields = () => {
        let newfield = {
            asset_no: '',
            name: '',
            asset_group: '',
            asset_status: '',
            class_code: '',
            posting_group: '',
            sub_code: '',
            location_code: '',
            owner: '',
            entrusted_id: '',
            price: '',
            residual_value: '',
            purchase_date: '',
            commission_date: '',
            asset_life: '',
            depreciation_start_date: '',
            document_number: '',
            quantity: '',
            unit: '',
        };
        setIsSuccess("info");
        setInputFields([...inputFields, newfield]);
        setAlertMsg("item Added");
    };


    const handleClickOpen = () => {
        setDialogOpen(true);
    }
    const handleClose = () => {
        setDialogOpen(false);
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
        setIsSuccess('info');
        setAlertMsg("item Removed");
    };

    const submitHandler = () => {
        handleClose();
        console.log(inputFields);
        console.log(value);
        axios.post('/add', { inputFields, admin_id: admin_id, admin_role: thing.role })
            .then(function (response) {
                if (response.data.msg === 'success') {
                    setAlertMsg('Saved Successfully');
                    enqueueSnackbar('Saved Successfully', { variant: "success" })
                    setIsSuccess('success');
                    clearAllHandler();
                }
            })
            .catch(function (response) {
                enqueueSnackbar('Error', { variant: 'error' })
                setAlertMsg('Something Went Wrong');
            });

        axios.post('/record/add', {
            admin_id: admin_id,
            role: role,
            activity: 'Add',
            datas: inputFields
        });
    };

    const clearAllHandler = () => {
        setInputFields([]);
    }
    const alertStyle = {
        postion: "absolute",
        top: "20vh",
        left: "10%",
        ml: "20%",
        mt: 3,
        height: "10%",
        width: "20%",
    }
    return (
        <div className='min-h-screen flex flex-col gap-1'>
            <div className='flex flex-col gap-3'>
                <Typography variant='h4' color='blue'>
                    Add Asset
                </Typography>
                <hr className='border  text-blue-700 border-red-800' />
            </div>
            <div>
                <ConfirmDialog
                    dialogOpen={dialogOpen}
                    handleClose={handleClose}
                    confirmAction={submitHandler}
                    title="Are You Sure?"
                    message="Do you want to save this Assets"
                />
                <Grid
                    sx={{ py: 2 }}
                    container>

                </Grid>
                <Grid item lg={12} sm={12} md={12} sx={{ p: 5, mt: -3 }}>
                    <Grid container spacing={4}>
                        {inputFields.map((input, index) => (
                            <Grid
                                key={index}
                                container
                                spacing={2}
                                sx={{
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    ml: 3,
                                    mt: 3,
                                    backgroundColor: "white",
                                    pb: 2,
                                    pr: 2,
                                    borderRadius: '10px'
                                }}
                            >
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="name"
                                        label="Name"
                                        type="text"
                                        value={input.name}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="asset_no"
                                        label="Asset Number"
                                        type="text"
                                        value={input.asset_no}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="asset_group"
                                        label="Asset Group"
                                        select
                                        value={input.asset_group}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth
                                    >
                                        {agroup && agroup.map((items) => (
                                            <MenuItem key={items.id} value={items.name}>
                                                {items.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="asset_status"
                                        label="Asset Status"
                                        // type="text"
                                        select
                                        value={input.asset_status}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth
                                    >
                                        {astatus && astatus.map((items) => (
                                            <MenuItem key={items.id} value={items.value}>
                                                {items.label}
                                            </MenuItem>
                                        ))}

                                    </TextField>
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="class_code"
                                        label="Class Code"
                                        type="text"
                                        value={input.class_code}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="posting_group"
                                        label="Posting Group"
                                        type="text"
                                        value={input.posting_group}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="sub_code"
                                        label="Sub Code"
                                        type="text"
                                        value={input.sub_code}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="location_code"
                                        label="Location Code"
                                        select
                                        value={input.location_code}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth
                                    >
                                        {alocation && alocation.map((items) => (
                                            <MenuItem key={items.id} value={items.name}>
                                                {items.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="owner"
                                        label="Owner"
                                        type="text"
                                        value={input.owner}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="entrusted_id"
                                        label="Entrusted Id"
                                        type="text"
                                        value={input.entrusted_id}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="price"
                                        label="Price"
                                        type="text"
                                        value={input.price}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="residual_value"
                                        label="Residual Value"
                                        type="text"
                                        value={input.residual_value}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            name="purchase_date"
                                            label="Purchase Date"
                                            value={purchaseDate}
                                            onChange={(event) => {
                                                handleFormChange(index, event, "purchase_date");
                                                setPurchaseDate(event.$d);

                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            fullWidth />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            name="commission_date"
                                            label="Commission Date"
                                            value={commissionDate}
                                            onChange={(event) => {
                                                handleFormChange(index, event, "commission_date");
                                                setCommissionDate(event.$d);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            fullWidth />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="asset_life"
                                        label="Asset Life"
                                        type="text"
                                        value={input.asset_life}
                                        onChange={(event) => handleFormChange(index, event)}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            name="depreciation_start_date"
                                            label="Depreciation Start Date"
                                            value={depreciationDate}
                                            onChange={(event) => {
                                                handleFormChange(index, event, "depreciation_date");
                                                setDepreciationDate(event.$d);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            fullWidth />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="document_number"
                                        label="Document Number"
                                        type="text"
                                        value={input.document_number}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="quantity"
                                        label="Quantity"
                                        type="text"
                                        value={input.quantity}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth />
                                </Grid>
                                <Grid item sm={6} md={2} lg={3}>
                                    <TextField
                                        required
                                        name="unit"
                                        label="Unit"
                                        select
                                        value={input.unit}
                                        onChange={(event) => handleFormChange(index, event, "no")}
                                        fullWidth >
                                        {
                                            aunit && aunit.map((items) => (
                                                <MenuItem key={items.id} value={items.value}>
                                                    {items.label}
                                                </MenuItem>
                                            ))
                                        }

                                    </TextField>
                                </Grid>
                                <Grid item xs={1} lg={1} sm={1} md={1}
                                    sx={{
                                        mt: ""
                                    }}>
                                    <IconButton onClick={() => removeFields(index)}>
                                        <RemoveIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Grid>

                            </Grid>
                        ))}
                        <Grid item lg={12} md={12} sm={12}>
                            <IconButton type="submit" onClick={addFields} size="large">
                                <AddIcon />
                            </IconButton>
                        </Grid>
                        <Grid item lg={8}>
                            <Button
                                type="submit"
                                sx={{ marginRight: "2rem" }}
                                onClick={handleClickOpen}
                                variant="contained"
                            >
                                Save
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Clear All
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default Add
