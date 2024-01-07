import type { FieldTypes } from '../app-form/types'

export interface TableField {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  create?: boolean
  hideInEdit?: boolean
  filterOptions?: FieldTypes
  field?: FieldTypes
  hideInTable?: boolean
  hideInFilter?: boolean
  isMainFilter?: boolean
  isMain?: boolean
  icon?: string
}
export enum ViewType {
  Table = 0,
  Cards = 1,
}
