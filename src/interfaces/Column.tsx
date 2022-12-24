import { useState, createContext } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Task } from './Task'

export interface IColumn {
  name: string,
  colId: string,
  tasks: Array<Task>
}

export type ColumnContextType = {
  columns: Array<IColumn>,
  addColumn?: (column: IColumn) => void
  deleteColumn?: (column: IColumn) => void
  updateColumnOnDrop: (result: DropResult) => void
}

