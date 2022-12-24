import { IColumn } from './Column'

export interface IBoard {
  name: string,
  columns: Array<IColumn> | []
}

export type BoardContextType = {
  boards: Array<IBoard> | []
  addBoard: (name: string, columns: Array<IColumn>) => void
  deleteBoard: (name: string) => void
}
