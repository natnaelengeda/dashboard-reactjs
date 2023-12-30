import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const BasicTable = ({ data }) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //access nested data with dot notation
                header: 'ID',
            },
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'asset_group', //normal accessorKey
                header: 'Address',
            },
            {
                accessorKey: 'asset_status',
                header: 'Asset Status',
            },
            {
                accessorKey: 'class_code',
                header: 'Class Code',
            },
            {
                accessorKey: 'posting_group',
                header: 'Posting Group',
            },
            {
                accessorKey: 'sub_code',
                header: 'Sub Code',
            },
            {
                accessorKey: 'location_code',
                header: 'Location Code',
            },
            {
                accessorKey: 'owner',
                header: 'Owner',
            },
            {
                accessorKey: 'entrusted_id',
                header: 'Entrusted Id',
            },
            {
                accessorKey: 'price',
                header: 'Price',
            },
            {
                accessorKey: 'residual_value',
                header: 'Residual Value',
            },
            {
                accessorKey: 'purchase_date',
                header: 'Purchase Date',
            },
            {
                accessorKey: 'commission_date',
                header: 'Commission Date',
            },
            {
                accessorKey: 'asset_life',
                header: 'Asset Life',
            },
            {
                accessorKey: 'depreciation_start_date',
                header: 'Depreciation Start Date',
            },
            {
                accessorKey: 'document_number',
                header: 'Document Number',
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
            },
            {
                accessorKey: 'unit',
                header: 'Unit',
            },
            {
                accessorKey: 'printed',
                header: 'Printed',
            },
        ],
        [],
    );

    return <MaterialReactTable columns={columns} data ={data}/>
}

export default BasicTable;