import {
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { IItemGrade } from '@/interface'

const ItemGrade = () => {
  const filterGradeItems = useMemo<IItemGrade[]>(
    () => [
      {
        name: '전체',
        value: '',
        color: 'default',
      },
      {
        name: '일반',
        value: '1',
        color: 'info',
      },
      {
        name: '고급',
        value: '2',
        color: 'success',
      },
      {
        name: '희귀',
        value: '3',
        color: 'primary',
      },
      {
        name: '영웅',
        value: '4',
        color: 'error',
      },
      {
        name: '전설',
        value: '5',
        color: 'secondary',
      },
      {
        name: '신화',
        value: '6',
        color: 'warning',
      },
    ],
    []
  )

  const onFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value)
    },
    []
  )

  return (
    <Container>
      <Grid
        item
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card>
          <CardHeader
            subheader='아이템 등급'
            sx={{ background: 'rgb(50, 50, 50)', p: '10px' }}
          />
          <CardContent>
            <FormControl>
              <RadioGroup row defaultValue=''>
                {filterGradeItems?.map((item, idx) => {
                  return (
                    <FormControlLabel
                      key={idx}
                      label={item.name}
                      control={
                        <Radio
                          value={item.value}
                          color={item.color || 'default'}
                          onChange={(e) => onFilterChange(e)}
                        />
                      }
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        item
        sx={{
          backgroundColor: '#ffffff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1>OPTION 2</h1>
      </Grid>

      <Grid
        item
        sx={{
          backgroundColor: '#ffffff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1>OPTION 3</h1>
      </Grid>
    </Container>
  )
}

export default ItemGrade
