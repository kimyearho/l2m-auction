import { Box } from '@mui/material'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import pkg from 'react-lazy-load-image-component'
const { LazyLoadImage } = pkg

interface IItemNameProps {
  /** 아이템 이미지 */
  itemImage: string
  /** 아이템명 */
  itemName: string
  /** 4: 영웅 | 5: 전설 | 6: 신화 */
  itemGrade: number | 4 | 5 | 6
  /** 인챈트 레벨 */
  itemLevel: number
}

const ItemName = (props: IItemNameProps) => {
  const { itemImage, itemLevel, itemName, itemGrade } = props

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <LazyLoadImage
          width={36}
          height={36}
          src={itemImage}
          placeholder={
            <img src={itemImage} width={36} height={36} loading='lazy' />
          } // SSR 이슈 솔루션 (https://github.com/Aljullu/react-lazy-load-image-component/issues/86)
        />
        <span
          className={classNames({
            'pl-10': true,
            'grade-4': itemGrade === 4,
            'grade-5': itemGrade === 5,
            'grade-6': itemGrade === 6,
          })}
        >
          {itemLevel > 0 ? `+${itemLevel}` : null}&nbsp;{itemName}
        </span>
      </Box>
    </>
  )
}

export default ItemName
