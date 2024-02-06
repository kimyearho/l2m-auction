import { LoaderFunction, redirect } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  //* path가 /movie일때 /movie/list로 리다이렉트처리
  if (url.pathname === '/' || url.pathname === '') {
    return redirect('/worldItemAuctionList')
  }
  return null
}
