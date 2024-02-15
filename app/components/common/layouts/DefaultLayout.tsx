import { Outlet } from '@remix-run/react'
import { Grid } from '@mui/material'
import { CoFilterItemGrade, CoHeader, CoFooter } from '@/components'
import { FilterProvider } from '~/context/FilterContext'

export const DefaultLayout = () => {
  return (
    <>
      <FilterProvider>
        <CoHeader title='리니지2M 시세표' />
        <Grid container component='main' mt={2}>
          <Grid
            mt={5}
            item
            xs={3}
            sx={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <CoFilterItemGrade />
          </Grid>
          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
        <CoFooter
          title='Footer'
          description='Something here to give the footer a purpose!'
        />
      </FilterProvider>
    </>
  )
}

export default DefaultLayout
