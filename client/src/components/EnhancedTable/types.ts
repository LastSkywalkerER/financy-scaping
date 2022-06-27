import Token from '@/types/Token'

export type TableFilter = (data: Token[]) => Token[]

export type Data = Record<string, any> & { id: string }

export type TableProps = {
  isLoading?: boolean
  name: string
  handleCustomClick: any
  data: Data[]
  onRowClick?: any
  checked?: string[]
  setChecked?: any
  customClickPurpose: any
  editableRow?: any
  handleFilter: (srg: TableFilter) => void
  headList: string[] | { [key: string]: string }
  conditionallyRenderedCell?: (
    column: string,
    value: any,
    index: number,
    row: any,
  ) => React.ReactElement | string | number | null
}
