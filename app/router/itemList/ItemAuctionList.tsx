import { json, type MetaFunction } from "@remix-run/node";
import { http } from "@/http";
import { useLoaderData } from "@remix-run/react";
import { CoItemDataGrid } from "@/components";

export const meta: MetaFunction = () => {
  return [
    { title: "Lineage2m Auction" },
    { name: "description", content: "Welcome to Lineage2m Auction" },
  ];
};

export const loader = async () => {
  const params = {
    search_keyword: '아크엔젤 체인소드',
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
  const { itemList, pageInfo } = useLoaderData<typeof loader>()
  return <CoItemDataGrid data={itemList} pageInfo={pageInfo} />;
}

export default ItemAuctionList