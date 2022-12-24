import {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { BoardColumn } from './BoardColumn'

import { ColumnContextType, IColumn } from '../../interfaces/Column'
import { Task } from '../../interfaces/Task'
import { ColumnContext } from '../../context/columnContext'

export const Board = () => {
  const colContext = useContext<ColumnContextType>(ColumnContext)

  const onDragEnd = useCallback((result: DropResult) => {
    colContext.updateColumnOnDrop(result)
  }, [])

  const [winReady, setwinReady] = useState(false)

  useEffect(() => {
    setwinReady(true);
  }, [])

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {winReady &&
        <div className={'flex gap-5 h-full pl-4 pt-8 dark:bg-very-dark-gray'}>
          {colContext.columns.map((arr, index: number) => (
            <BoardColumn key={index} data={arr.tasks} colId={arr.colId} />
          ))
          }
        </div>
      }
    </DragDropContext>
  )
}
