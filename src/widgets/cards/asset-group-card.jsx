import React from 'react'
import {
    ChairAlt,
    FilterNone,
    Kitchen,
    Computer,
    Print,
    LocalPrintshopOutlined,
    BorderAll,
    CorporateFare,
    TableRestaurantOutlined
} from '@mui/icons-material';
import {
    Typography
} from '@material-tailwind/react';

export default function AssetGroup({ label, name }) {

    const checkIcon = (icon) => {
        const width = 60;
        const height = 60;

        switch (icon) {
            case 'table':
                return <TableRestaurantOutlined
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'chair':
                return <ChairAlt
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'shelf':
                return <CorporateFare
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'file_cabinet':
                return <Kitchen
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'computer':
                return <Computer
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'printer':
                return <Print
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'copy':
                return <LocalPrintshopOutlined
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'other':
                return <BorderAll
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
            case 'stage':
                return <ChairAlt
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;

            default:
                return <FilterNone
                    sx={{
                        width: width,
                        height: height,
                        color: 'white'
                    }} />;
        }
    }

    return (
        <div className='rounded-xl bg-white shadow-md hover:shadow-xl w-full h-32 cursor-pointer grid grid-cols-2 p-2 cardTrans'>
            <div className='w-full h-full bg-blue-500 rounded-xl flex items-center justify-center'>

                {checkIcon(name)}
            </div>
            <div className='flex items-center justify-center px-2'>
                <Typography variant='h5'>
                    {label}
                </Typography>
            </div>
        </div>
    )
}
