import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node'
import { http } from '@/http'
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from '@remix-run/react'
import { CoItemDataGrid } from '@/components'
import { IPagination } from '@/interface'
import { useEffect, useState } from 'react'
import { IconButton, InputBase, Paper, Divider } from '@mui/material'
import { Search } from '@mui/icons-material'
import { FilterProviderContext } from '~/context/FilterContext'
import pkg from 'lodash'

export const meta: MetaFunction = () => {
  return [
    { title: 'Lineage2m Auction' },
    { name: 'description', content: 'Welcome to Lineage2m Auction' },
  ]
}

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const query = new URLSearchParams(url.search)
  const searchItemKeyword = query?.get('searchItemKeyword') || ''
  const pageNum = Number(query?.get('page'))
  const grade = query?.get('grade')

  const params = {
    search_keyword: searchItemKeyword,
    sale: true,
    world: true,
    page: pageNum,
    size: 30,
  }
  const { data } = await http.get('/market/items/search', { params })
  if (data) {
    console.log(pkg.filter(data?.contents, (item) => item.grade === 4))

    if (grade !== '') {
      return json({
        itemList: pkg.filter(
          data?.contents,
          (item) => item.grade === Number(grade)
        ),
        pageInfo: data?.pagination,
      })
    } else {
      return json({
        itemList: data?.contents,
        pageInfo: data?.pagination,
      })
    }
  } else {
    throw new Response('Oh no! Something went wrong!', {
      status: 500,
    })
  }
}

const ItemAuctionList = () => {
  const { itemList, pageInfo } = useLoaderData<typeof loader>()
  const [keyword, setKeyword] = useState<string | null>()
  const [params, setParams] = useSearchParams()
  const [formData, setFormData] = useState({
    page: 1,
    searchItemKeyword: '',
    grade: '',
  })
  const [_, setPagination] = useState<IPagination>({
    pageIndex: 0,
    pageSize: 20,
  })
  const submit = useSubmit()
  const { ctxGradeFilter } = FilterProviderContext()

  useEffect(() => {
    if (params.size > 0) {
      setKeyword(params.get('searchItemKeyword'))
    }
  }, [params])

  useEffect(() => {
    setFormData((prevState) => {
      return {
        ...prevState,
        grade: ctxGradeFilter,
      }
    })
  }, [ctxGradeFilter])

  useEffect(() => {
    if (formData) {
      console.log('formData', formData)
      submit(formData)
    }
  }, [formData])

  const handlePageClick = (data: IPagination) => {
    setPagination(data)
    setFormData((prevState) => {
      return {
        ...prevState,
        page: data?.pageIndex + 1,
        searchItemKeyword: keyword || '',
        grade: ctxGradeFilter,
      }
    })
  }

  return (
    <Form>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2 }}
      >
        <InputBase
          name='searchItemKeyword'
          placeholder=' 아이템명 검색'
          autoFocus
          fullWidth
          value={keyword || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
          <Search />
        </IconButton>
      </Paper>

      <CoItemDataGrid
        data={itemList}
        pageInfo={pageInfo}
        pageClickEvent={handlePageClick}
      />
    </Form>
  )
}

export default ItemAuctionList
