import React from 'react'
import { Typography } from '@material-tailwind/react';
export default function AssetLocation({ label, name }) {
    return (
        <div className='rounded-xl bg-white shadow-md hover:shadow-xl w-full h-32 cursor-pointer grid grid-cols-2 p-2 cardTrans boreder border-gry-200'>
            <div className='order-2 w-full h-full bg-red-500 rounded-xl flex items-center justify-center'>
                <Typography className='text-white' variant='h3'>
                    {name}
                </Typography>
            </div>
            <div className='order-1 flex items-center justify-center px-5'>
                <Typography variant='h5'>
                    {label}
                </Typography>
            </div>
        </div>
    )
}
