import { useState, useEffect, useContext, useCallback } from 'react'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { BoardColumn } from './BoardColumn'

import { ColumnContextType, IColumn } from '../../interfaces/Column'
import { Task } from '../../interfaces/Task'
import { ColumnContext } from '../../context/columnContext'

export const Board = () => {
  const colContext = useContext<ColumnContextType>(ColumnContext)

  const onDragEnd = useCallback((result: DropResult) => {
    colContext.updateColumnOnDrop(result)
  }, [colContext.columns])

  const [isWindowReady, setIsWindowReady] = useState(false)

  useEffect(() => {
    setIsWindowReady(true);
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isWindowReady &&
        <div className={'flex gap-5 h-full pl-4 pt-8 dark:bg-very-dark-gray'}>
          {colContext.columns.map((arr, index: number) => (
            <BoardColumn key={index} data={arr.tasks} colId={arr.colId} />
          ))
          }
          <button
            className={'flex items-center justify-center h-full min-w-[256px] bg-[linear-gradient(180deg,#E9EFFA_0%,_rgba(233,239,250,0.5))]'}
          >
            <span className={'heading-xl'}>+ New Column </span>
          </button>
        </div>
      }
    </DragDropContext >
  )
}
