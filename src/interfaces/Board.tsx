import { IColumn } from './Column'

export interface IBoard {
  title: string,
  columns: Array<IColumn> | []
}

export type BoardContextType = {
  boards: Array<IBoard> | []
  deleteBoard?: (name: string) => void
  getBoardColumns: (board: IBoard) => void
  addBoard: (board: IBoard) => boolean
}
