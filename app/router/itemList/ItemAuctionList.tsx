import { json, type MetaFunction } from "@remix-run/node";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IITem } from "@/interface";
import { CoItemName } from "@/components";
import { http } from "@/http";
import { useLoaderData } from "@remix-run/react";

import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Lineage2m Auction" },
    { name: "description", content: "Welcome to Lineage2m Auction" },
  ];
};

export const loader = async () => {
  const params = {
    search_keyword: '칼라드볼그',
    sale: true,
    world: true,
    page: 1,
    size: 20
  }
  const { data } = await http.get('/market/items/search', { params })
  if (data) {
    return json({
      itemList: data?.contents,
      pageInfo: data?.pagination
    })
  } else {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}

const ItemAuctionList = () => {
  const { itemList: data, pageInfo } = useLoaderData<typeof loader>()
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.item_name,
        header: '아이템명',
        size: 350,
        enableSorting: false,
        Cell: ({ row }) => (
          <CoItemName
            itemImage={row.original.image}
            itemName={row.original.item_name}
            itemGrade={row.original.grade}
            itemLevel={row.original.enchant_level}
          />
        ),
      },
      {
        accessorFn: (row) => row.server_name,
        accessorKey: 'server_name',
        header: '서버명',
        enableSorting: false,
        size: 150,
        Cell: ({ cell, row }) => (
          <span>{row.original.world ? `${cell.getValue<string>()} 월드` : cell.getValue<string>()}</span>
        )
      },
      {
        accessorKey: 'now_min_unit_price',
        header: '현재 최저가',
        size: 150,
        Cell: ({ cell }) => (
          <span>{cell.getValue<number>().toLocaleString()}</span>
        )
      },
      {
        accessorKey: 'avg_unit_price',
        header: '28일 평균가',
        size: 150,
        Cell: ({ cell }) => (
          <span>{cell.getValue<number>().toLocaleString()}</span>
        )
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableToolbarInternalActions: false,
    enableTopToolbar: false,
    initialState: { density: 'compact' },
    paginationDisplayMode: 'pages',
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default, //change default background color
    }),
  });

  return <MaterialReactTable table={table} />;
}

export default ItemAuctionList