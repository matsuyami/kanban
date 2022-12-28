import { DropResult } from 'react-beautiful-dnd'
import { IColumn } from './Column'

export interface IBoard {
  title: string,
  columns: Array<IColumn> | []
}

export type BoardContextType = {
  boards: Array<IBoard> | []
  currentBoard: IBoard
  updateColumnOnDrop: (board: IBoard, result: DropResult) => void
  getBoardColumns: (board: IBoard) => Array<IColumn>
  setCurrentBoard: (board: IBoard) => void
  addBoard: (board: IBoard) => boolean
  editBoard: (board: IBoard, prevTitle: string) => void
  addColumn: (column: IColumn) => void
  deleteBoard?: (name: string) => void
}
