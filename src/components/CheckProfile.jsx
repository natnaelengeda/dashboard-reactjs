import React, { useEffect, useState } from 'react'
import { ProfileInfoCard } from '@/widgets/cards'
import {
    Tooltip
} from '@material-tailwind/react';
import {
    PencilIcon
} from '@heroicons/react/24/solid';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Divider
} from "@material-tailwind/react";
import axios from '../http/axios';
import { useSnackbar } from 'notistack';

const roleCheck = (role) => {
    switch (role) {
        case "SA":
            return 'Super Admin';
        case "TL":
            return 'Team Leader';
        case "S":
            return 'Senrior';
        case "BM":
            return 'Branch Manager';
        case "A":
            return 'Admin';
        case "V":
            return 'Viewer';
        default:
            return 'None';
    }
}

const checkDesc = (desc) => {
    switch (desc) {
        case "SA":
            return "Super Admin Can Add, Delete, Edit and Read Datas on the platform";
        case "TL":
            return 'Team Leader Can Delete, Edit and Read Data';
        case "S":
            return 'Senior can Delete, Edit and Read Data';
        case "BM":
            return 'Branch Manager can Read Data and Reports';
        case "A":
            return 'Admin can Add and send requests for Team leader and senior';
        case "V":
            return 'Can only view data';
        default:
            return 'None';
    }
}

export default function CheckProfile({ data }) {
    const [allData, setallData] = useState([]);
    const [open, setOpen] = useState(false);
    const [stage, setStage] = useState('main');
    const [formValues, setFormValues] = useState([]);
    const [password, setPassword] = useState();
    const id = JSON.parse(localStorage.getItem('decoded'));
    const { enqueueSnackbar } = useSnackbar();

    const handleOpen = () => {
        setStage('main');
        setFormValues([]);
        setOpen(!open);
    };

    const handleInuptChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    }

    const changeAccount = () => {
        console.log('clicked')
        axios.put('/profile/updateprofile', {
            id: id.adminId,
            data: formValues,
            password: password,
            old: data
        }, {
            withCredentials: true,
        }).then(function (response) {
            if (response.data.msg == 'success') {
                enqueueSnackbar('Profile Updated', { variant: 'success' });
                // setFormValues([]);
                handleOpen();
            }
            else if(response.data.msg == 'password'){
                enqueueSnackbar("Password Incorrect", {variant: 'error'})
            }
        })
    }

    const changePassword = () =>{
        console.log('clicked');
        axios.put('/profile/updatepassword',{
            id: id.adminId,
            data: formValues,
        },{
            withCredentials: true,
        }).then(function(response){
          if(response.data.msg == 'success'){
            enqueueSnackbar('Password Updated', {variant: 'success'});
            //   setFormValues([]);
              handleOpen();
          }
          else if(response.data.msg == 'password'){
            enqueueSnackbar('Password Incorrect', {variant: 'error'})
          }
        })

        
    }

    return (
        <>
            <div>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>User Account Setting</DialogHeader>
                    {stage == 'main' ? (<DialogBody divider>
                        <div className='w-full flex flex-col gap-5'>
                            <Button
                                color='green'
                                style={{
                                    height: 50
                                }}
                                onClick={() => setStage('account')}
                            >

                                <span>Change User Account</span>
                            </Button>
                            <Button style={{
                                height: 50
                            }}
                                onClick={() => setStage('password')}
                            >
                                <span> Change Password</span>
                            </Button>
                        </div>
                    </DialogBody>) :
                        stage == 'account' ? (
                            <DialogBody divider>
                                <div className='w-3/4 flex flex-col gap-2'>
                                    <div className=' flex flex-col gap-5'>
                                        <Input onChange={(e) => handleInuptChange(e)} name='fname' label='First Name' />
                                        <Input onChange={(e) => handleInuptChange(e)} name='lname' label='Last Name' />
                                        <Input onChange={(e) => handleInuptChange(e)} name='uname' label='Username' />
                                    </div>
                                    {/* <Divider/> */}
                                    <br />
                                    <div className='flex flex-col gap-5'>
                                        <h1>Enter Password to Confirm</h1>
                                        <Input onChange={(e) => setPassword(e.target.value)} label="Password" />
                                    </div>
                                    <div>
                                        <Button onClick={changeAccount}>Submit</Button>
                                    </div>
                                </div>
                            </DialogBody>
                        ) : stage == 'password' ? (
                                <DialogBody divider>
                                    <div className='w-3/4 flex flex-col gap-2'>
                                        <div className=' flex flex-col gap-5'>
                                            <Input onChange={(e) => handleInuptChange(e)} name='oldpassword' label='Old Password' />
                                            <Input onChange={(e) => handleInuptChange(e)} name='newpassword' label='New Password' />
                                            {/* <Input onChange={(e) => handleInuptChange(e)} name='confpassword' label='Confirm Password' /> */}
                                        </div>
                                        {/* <Divider/> */}
                                        <br />
                                        <div>
                                            <Button onClick={changePassword}>Submit</Button>
                                        </div>
                                    </div>
                                </DialogBody>
                            ) : null
                    }
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>

                    </DialogFooter>
                </Dialog>
            </div>
            <ProfileInfoCard
                title="Profile Information"
                description={checkDesc(data.role)}
                details={{
                    "full name": data.fname + " " + data.lname,
                    mobile: data.phone_number,
                    email: data.email,
                    role: roleCheck(data.role),
                    username: data.uname,

                }}
                action={
                    <Tooltip content="Edit Profile">
                        <PencilIcon onClick={handleOpen} className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                    </Tooltip>
                }
            /></>
    )
}
