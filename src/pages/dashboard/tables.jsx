import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Select,
  Option,
  Input
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  PlusCircleIcon
} from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useSnackbar } from 'notistack';
import axios from '../../http/axios';


const roleCheck = (role) => {
  switch (role) {
    case "SA":
      return 'Super Admin';
    case "TM":
      return 'Team Leader';
    case "BM":
      return 'Branch Manager';
    case "S":
      return 'Senior';
    case "A":
      return 'Admin';
    case 'V':
      return "Viewer";
    default:
      return 'None';
  }
}


export function Tables() {
  const [admins, setAdmins] = useState();
  const [data, setData] = useState();
  const [table, setTable] = useState();

  const [addOpen, setAddOpen] = useState(false);
  const [addData, setAddData] = useState();

  const [locationdata, setLocationdata] = useState([{
    label: '',
    name: '',
    level: '',
  }]);

  const [locationlabel, setLocationlabel] = useState();
  const [locationname, setLocationname] = useState();
  const [locationlevel, setLocationlevel] = useState();

  const [grouplabel, setGrouplabel] = useState();
  const [groupname, setGroupname] = useState();
  const [grouplevel, setGrouplevel] = useState();

  const [groupdata, setGroupdata] = useState();
  const { enqueueSnackbar } = useSnackbar();

  // console.log(typeof locationdata)

  useEffect(() => {
    axios.get('/admin/view', {
      withCredentials: true,
    })
      .then(function (response) {
        setAdmins(response.data);
        // console.log(response.data);
      });

    axios.get('/view/info', {
      withCredentials: true,
    }).then(function (response) {
      // console.log(response.data);
      setData(response.data);
    });

    axios.get('/table/view', {
      widthCredentials: true,
    }).then(function (response) {
      // console.log(response.data);
      setTable(response.data);
    })
  }, []);

  const handleAddOpen = (e) => {
    setAddOpen(true);
    setAddData(e);
    // console.log(addData);
  }



  const submitAddForm = (addData) => {
    console.log(addData);
    addData == 1 ? axios.post('/assetgroup/add', {
      label: grouplabel,
      name: groupname,
      level: grouplevel,
    }).then(function (response) {
      if (response.data.msg === 'success') {
        enqueueSnackbar('New Group Added', { variant: 'success' });
        setLocationname('');
        setLocationlabel('');
        setLocationlevel('');
        setAddOpen(false);
      }
    }) : axios.post('/assetlocation/add', {
      label: locationlabel,
      name: locationname,
      level: locationlevel,
    }).then(function (response) {
      if (response.data.msg === 'success') {
        enqueueSnackbar('New Group Added', { variant: 'success' });
        setLocationname('');
        setLocationlabel('');
        setLocationlevel('');
        setAddOpen(false);
      }
    })


  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Admin Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["admins", "role", "status", "started", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                admins &&
                admins.map(
                  ({ id, fname, lname, email, role, updatedAt }, key) => {
                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <UserCircleIcon
                              className='w-20'
                            />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {fname}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {roleCheck(role)}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {role}
                          </Typography>
                        </td>
                        <td className={className}>
                          {/* <Chip
                            variant="gradient"
                            color={online ? "green" : "blue-gray"}
                            value={online ? "online" : "offline"}
                            className="py-0.5 px-2 text-[11px] font-medium"
                          /> */}
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {updatedAt}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            Edit
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader variant="gradient" color="red" className='mb-8 p-6'>
          <Typography variant="h6" color="white">
            Asset Table
          </Typography>
        </CardHeader>
        <CardBody>
          <table className='w-full min-w-[640px] table-auto'>
            <thead>
              <tr>
                {
                  ["Assets", "Description"].map((items) => (
                    <th
                      key={items}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {items}
                      </Typography>
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                data && data.map((items) => (
                  <tr key={items.name}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <Typography variant="medium">
                          {items.item}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography variant="medium">
                        {items.amount}
                      </Typography>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant='gradient' color='green' className='mb-8 p-6'>
          <Typography variant='h6' color='white'>
            Configration
          </Typography>
        </CardHeader>
        <CardBody>
          <table className='w-full min-w-[640] table-auto'>
            <thead>
              <tr>
                {
                  ["Item", "View", "Add", "Edit", "Delete"].map((items) => (
                    <th
                      key={items}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography variant='small' className='text-sm font-bold uppercase text-blue-gray-400'>
                        {items}
                      </Typography>
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                table && table.map((items) => (
                  <tr key={items.id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <Typography variant="medium">
                          {items.name}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <Typography variant="medium">
                          <Select>
                            {
                              items.item.map((item) => (
                                <Option key={item.id} value={item.id}>{item.level} - {item.name} - {item.label}</Option>
                              ))
                            }
                          </Select>
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <Typography variant="medium">
                          <PlusCircleIcon
                            onClick={(e) => { handleAddOpen(items.id) }}
                            className='w-5 h-6' />
                        </Typography>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby='alert-dialog-description'
      >
        {
          addData && <>
            <DialogTitle id="alert-dialog-title">Add {addData == 1 ? 'Group' : "Location"}</DialogTitle>
            <DialogContent>
              <div >
                {addData == 1 ? <form className='flex flex-col gap-5 items-start justify-start' action="">
                  <>
                    <Input
                      name='label'
                      value={grouplabel}
                      onChange={(e) => setGrouplabel(e.target.value)}
                      label="Group Label" />
                    <Input
                      name='name'
                      value={groupname}
                      onChange={(e) => setGroupname(e.target.value)}
                      label="Group name" />
                    <Input
                      name='lavel'
                      value={grouplevel}
                      onChange={(e) => setGrouplevel(e.target.value)}
                      label="Group Level" />
                  </>
                </form> : <form className='flex flex-col gap-5 items-start justify-start' action="">
                  <Input
                    name='label'
                    value={locationlabel}
                    onChange={(e) => setLocationlabel(e.target.value)}
                    label="Location Label" />
                  <Input
                    name='name'
                    value={locationname}
                    onChange={(e) => setLocationname(e.target.value)}
                    label="Location name" />
                  <Input
                    name='level'
                    value={locationlevel}
                    onChange={(e) => setLocationlevel(e.target.value)}
                    label="Location Level" />
                </form>
                }
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => submitAddForm(addData)} variant='contained'>Add</Button>
              <Button onClick={() => setAddOpen(false)}>Cancel</Button>
            </DialogActions>
          </>
        }

      </Dialog>
    </div>
  );
}

export default Tables;
