import React, { useState, useEffect } from 'react';
import { Table } from '@mantine/core';
import { toEthiopian } from 'ethiopian-date';
import logo from '../assets/images/logo.png'
import axios from '../http/axios';

export const SimpleMantine = ({ elements, cat, rom }) => {
    const [catagory, setCatagory] = useState();
    const [room, setRoom] = useState();
    useEffect(() => {
        {
            cat && axios.post('/changenamelabel', { catagory: cat }, {
                withCredentials: true,
            })
                .then(function (response) {
                    setCatagory(response.data);
                    // console.log(response.data);
                });
        }
        {
            rom && axios.post('/changenamelabelroom', { room: rom }, {
                withCredentials: true,
            })
                .then(function (response) {
                    setRoom(response.data);
                    // console.log(response.data);
                });
        }

    }, []);



    const rows = elements.map((element) => (
        <tr key={element.id}>
            <td className='w-3'>{element.id}</td>
            <td>{element.name}</td>
            <td>{element.asset_group}</td>
            <td>{element.asset_status}</td>
            <td>{element.class_code}</td>
            <td>{element.posting_group}</td>
            <td className='text-sm w-32'>{element.sub_code}</td>
            <td>{element.location_code}</td>
            <td>{element.owner}</td>
            <td>{element.entrusted_id}</td>
            <td>{element.price}</td>
            {/* <td>{element.residual_value}</td> */}
            <td>{element.purchase_date}</td>
            <td>{element.commission_date}</td>
            {/* <td>{element.asset_life}</td> */}
            {/* <td>{element.depreciation_start_date}</td> */}
            <td>{element.document_number}</td>
            <td>{element.quantity}</td>
            <td>{element.unit}</td>
            {/* <td>{element.printed}</td> */}
        </tr>
    ));

    const nowDate = new Date();
    const newDate = toEthiopian(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate());

    return (
        <>
            <div className='w-full h-auto py-10 px-5 flex flex-row items-center justify-between'>
                <div>
                    <img className='w-44' src={logo} alt="FHC Logo" />
                </div>
                <div className='flex flex-col items-center justify-center '>
                    <h1>የቋሚ ንብረት ቆጠራ ቅጽ</h1>
                    <h1>መ/ቤቱ ስም፡ የፌዴራል ቤቶች ኮርፖራሽን በጀት ዓመት 2014</h1>
                    <h1>በጀት ዓመት 2014</h1>
                    <h1>የተቆጠረበት ቀን ሐምሌ/2014ዓ.ም.</h1>
                    {catagory && <div className='flex flex-row gap-2 items-end'><h1 className='text-xl'>Asset Type:- </h1>  <h1 className='text-lg font-bold'>{catagory}</h1></div>}
                    {room && <div className='flex flex-row gap-2 items-end'><h1 className='text-xl'>Room:- </h1>  <h1 className='text-lg font-bold'>{room}</h1></div>}
                </div>
                <div>
                    <img className='w-44' src={logo} alt="FHC Logo" />
                </div>
            </div>
            <Table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Asset Gorup</th>
                        <th>Asset Status</th>
                        <th>Class Code</th>
                        <th>Posting Group</th>
                        <th>Sub Code</th>
                        <th>Location Code</th>
                        <th>Owner</th>
                        <th>Entrusted Id</th>
                        <th>Price</th>
                        {/* <th>Residual Value</th> */}
                        <th>Purchase Date</th>
                        <th>Commission Date</th>
                        {/* <th>Asset Life</th> */}
                        {/* <th>Depreciation Start Date</th> */}
                        <th>Document Number</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        {/* <th>Printed</th> */}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}