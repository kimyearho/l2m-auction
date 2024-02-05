import { type MetaFunction } from "@remix-run/node";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IITem } from "@/interface";
import { CoItemName } from "@/components";
import useSWR from "swr";

export const meta: MetaFunction = () => {
  return [
    { title: "Lineage2m Auction" },
    { name: "description", content: "Welcome to Lineage2m Auction" },
  ];
};

const ItemAuctionList = () => {
  const query = new URLSearchParams()
  query.append('search_keyword', '칼라드볼그')
  query.append('sale', 'true')
  query.append('world', 'true')
  query.append('page', '1')
  query.append('size', '20')
  const { data, error, isLoading } = useSWR([`/market/items/search?${query.toString()}`])

  const columns: GridColDef[] = [
    {
      field: 'itemInfo',
      headerName: '아이템명',
      width: 385,
      headerAlign: 'center',
      renderCell: (params) => (
        <CoItemName
          itemImage={params.value.image}
          itemName={params.value.item_name}
          itemGrade={params.value.grade}
          itemLevel={params.value.enchant_level}
        />
      )
    },
    { field: 'serverName', headerName: '서버명', width: 160 },
    { field: 'nowMinUnitPrice', headerName: '현 최저가', width: 160 },
    { field: 'avgUnitPrice', headerName: '28일 평균가', width: 160 },
  ];

  const getRows = () => {
    let rows = [] as IITem[]
    data?.contents?.map((item: any, idx: number) => {
      rows.push({
        id: idx,
        itemInfo: item,
        serverName: item.server_name,
        nowMinUnitPrice: item.now_min_unit_price.toLocaleString(),
        avgUnitPrice: item.avg_unit_price.toLocaleString()
      })
    })
    return rows
  }

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return <DataGrid rows={getRows()} columns={columns} />
}

export default ItemAuctionList