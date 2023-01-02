import { useState, useEffect, useContext, useCallback } from 'react'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { BoardColumn } from './BoardColumn'
import { ColumnModal } from '../modal/ColumnModal'

import { IColumn } from '../../interfaces/Column'
import { BoardContextType } from '../../interfaces/Board'
import { BoardContext } from '../../context/boardContext'

export const Board = () => {
  const [isWindowReady, setIsWindowReady] = useState(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const boardContext = useContext<BoardContextType>(BoardContext)
  const currentBoard = boardContext.currentBoard
  const boardColumns = boardContext.currentBoard?.columns

  const onDragEnd = useCallback((result: DropResult) => {
    const currBoard = { ...currentBoard }
    boardContext.updateColumnOnDrop(currBoard, result)
  }, [boardContext, currentBoard])

  useEffect(() => {
    setIsWindowReady(true);
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isWindowReady &&
        <div className={'flex gap-5 h-full pl-4 pt-8 dark:bg-very-dark-gray'}>
          {boardColumns &&
            boardColumns.map((arr: IColumn, index: number) => (
              <BoardColumn key={index} columnName={arr.name} data={arr.tasks} colId={arr.colId} />
            ))
          }
          {boardColumns?.length > 0 &&
            <button
              className={`flex items-center justify-center h-full min-w-[256px] 
            dark:bg-[linear-gradient(180deg,rgba(43,44,55,.25),rgba(43,44,55,.125))]
            bg-[linear-gradient(180deg,#E9EFFA_0%,_rgba(233,239,250,0.5))] `}
              onClick={() => setShowModal(true)}
            >
              <span className={'heading-xl'}>+ New Column </span>
            </button>
          }
        </div>
      }
      {showModal && boardContext.currentBoard &&
        <ColumnModal showModal={showModal} setShowModal={setShowModal} />
      }
    </DragDropContext >
  )
}
