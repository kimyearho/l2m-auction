import { useEffect, useMemo, useState } from 'react'
import { produce } from 'immer'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { CoItemName } from '@/components'

const ItemDataGrid = (props: any) => {
  const { data, pageInfo, pageClickEvent } = props
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  })

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
          <span>
            {row.original.world
              ? `${cell.getValue<string>()} 월드`
              : cell.getValue<string>()}
          </span>
        ),
      },
      {
        //
        accessorKey: 'now_min_unit_price',
        header: '현재 최저가',
        size: 150,
        Cell: ({ cell }) => (
          <>
            <i className='ico-world'></i>
            <i className='ico-price'></i>
            <span>{cell.getValue<number>().toLocaleString()}</span>
          </>
        ),
      },
      {
        accessorKey: 'avg_unit_price',
        header: '28일 평균가',
        size: 150,
        Cell: ({ cell }) => (
          <>
            <i className='ico-world'></i>
            <i className='ico-price'></i>
            <span>{cell.getValue<number>().toLocaleString()}</span>
          </>
        ),
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableToolbarInternalActions: false,
    enableTopToolbar: false,
    initialState: {
      density: 'compact',
      pagination: pagination,
    },
    state: {
      pagination: pagination,
    },
    rowCount: pageInfo?.total || 1,
    paginationDisplayMode: 'pages',
    muiPaginationProps: {
      color: 'secondary',
      shape: 'rounded',
      variant: 'outlined',
      showRowsPerPage: false,
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      if (typeof updater !== 'function') return
      const newPageInfo = updater(table.getState().pagination)
      setPagination(newPageInfo)
      pageClickEvent(newPageInfo)
    },
  })

  return <MaterialReactTable table={table} />
}

export default ItemDataGrid
