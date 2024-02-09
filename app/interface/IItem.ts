export interface IITem {
  /** key */
  id: number
  /** 아이템 정보 */
  itemInfo: any
  /** 서버명 */
  serverName: string
  /** 현 최저가 */
  nowMinUnitPrice: number | string
  /** 28일 최저가 */
  avgUnitPrice: number | string
}

export interface IItemGrade {
  name: string
  value: string
  color: any
}
