import { useEffect, useState } from 'react'
import { IColumn } from '../interfaces/Column'
import { IBoard } from '../interfaces/Board'

export const useAddColumn = (board: IBoard, column: IColumn) => {
  const [columns, setColumns] = useState<Array<IColumn>>([])

  useEffect(() => {
    const cols = [...board.columns, column]
    setColumns(cols)
  }, [board.columns, columns, column])

  return columns
}
