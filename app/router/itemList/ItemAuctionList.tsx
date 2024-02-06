import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node'
import { http } from '@/http'
import { Form, useLoaderData } from '@remix-run/react'
import { CoItemDataGrid } from '@/components'
import { useState } from 'react'
import { Button } from '@mui/material'

export const meta: MetaFunction = () => {
  return [
    { title: 'Lineage2m Auction' },
    { name: 'description', content: 'Welcome to Lineage2m Auction' },
  ]
}

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const query = new URLSearchParams(url.search)

  const params = {
    search_keyword: query?.get('keyword') || '',
    sale: true,
    world: true,
    page: 1,
    size: 20,
  }
  const { data } = await http.get('/market/items/search', { params })
  if (data) {
    return json({
      itemList: data?.contents,
      pageInfo: data?.pagination,
    })
  } else {
    throw new Response('Oh no! Something went wrong!', {
      status: 500,
    })
  }
}

const ItemAuctionList = () => {
  const { itemList, pageInfo } = useLoaderData<typeof loader>()
  const [keyword, setKeyword] = useState<string>()

  return (
    <Form>
      <input
        name='keyword'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type='submit'>검색</Button>
      <CoItemDataGrid data={itemList} pageInfo={pageInfo} />
    </Form>
  )
}

export default ItemAuctionList
