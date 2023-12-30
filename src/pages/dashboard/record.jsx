import React, { useEffect, useMemo, useState } from 'react';
import axios from '../../http/axios';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    TextField,
} from '@mui/material';

import { AccountCircle, Send } from '@mui/icons-material';


function Record() {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('/record/view', {
            withCredentials: true,
        }).then(function (response) {
            setData(response.data);
            console.log(response.data);
        })
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'admin_id',
                header: 'Admin ID',
            },
            {
                accessorKey: 'admin_name',
                header: 'Admin Name',
            },
            {
                accessorKey: 'role',
                header: 'Role',
            },
            {
                accessorKey: 'activity',
                header: 'Activity',
            },



        ]
    );
    return (
        <div className='min-h-screen flex flex-col gap-1'>
            <div className='text-3xl flex flex-col gap-3'>
                <h1 className='font-bold text-4xl text-blue-700'>Records</h1>
                <hr className='w-1/3 border  text-blue-700 border-red-800' />
            </div>
            {
                data &&
                <div>
                    <MaterialReactTable
                        columns={columns}
                        data={data}
                        enableColumnActions={false}
                        enableColumnFilters={false}
                        enablePagination={false}
                        enableSorting={false}
                        enableRowActions
                        enableBottomToolbar={false}
                        enableTopToolbar={true}
                        muiTableBodyRowProps={{ hover: true }}
                        renderRowActionMenuItems={({ closeMenu }) => {
                            [
                                <MenuItem
                                    key={0}
                                    onClick={() => {
                                        // View profile logic...
                                        closeMenu();
                                    }}
                                    sx={{ m: 0 }}
                                >
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    View Profile
                                </MenuItem>,
                                <MenuItem
                                    key={1}
                                    onClick={() => {
                                        // Send email logic...
                                        closeMenu();
                                    }}
                                    sx={{ m: 0 }}
                                >
                                    <ListItemIcon>
                                        <Send />
                                    </ListItemIcon>
                                    Send Email
                                </MenuItem>,]

                        }}

                    // renderTopToolbarCustomActions={({ table }) => {
                    //     const handleDeactivate = () => {
                    //         table.getSelectedRowModel().flatRows.map((row) => {
                    //             alert('deactivating ' + row.getValue('name'));
                    //         });
                    //     };

                    //     const handleActivate = () => {
                    //         table.getSelectedRowModel().flatRows.map((row) => {
                    //             alert('activating ' + row.getValue('name'));
                    //         });
                    //     };

                    //     const handleContact = () => {
                    //         table.getSelectedRowModel().flatRows.map((row) => {
                    //             alert('contact ' + row.getValue('name'));
                    //         });
                    //     };

                    //     return (
                    //         <div style={{ display: 'flex', gap: '0.5rem' }}>
                    //             <Button
                    //                 color="error"
                    //                 disabled={!table.getIsSomeRowsSelected()}
                    //                 onClick={handleDeactivate}
                    //                 variant="contained"
                    //             >
                    //                 Deactivate
                    //             </Button>
                    //             <Button
                    //                 color="success"
                    //                 disabled={!table.getIsSomeRowsSelected()}
                    //                 onClick={handleActivate}
                    //                 variant="contained"
                    //             >
                    //                 Activate
                    //             </Button>
                    //             <Button
                    //                 color="info"
                    //                 disabled={!table.getIsSomeRowsSelected()}
                    //                 onClick={handleContact}
                    //                 variant="contained"
                    //             >
                    //                 Contact
                    //             </Button>
                    //         </div>
                    //     );
                    // }}

                    />
                </div>}
        </div>
    );
}

export default Record;