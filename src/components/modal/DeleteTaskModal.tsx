import { useRef, useContext } from 'react'
import { BoardContextType } from '../../interfaces/Board'
import { BoardContext } from '../../context/boardContext'

import { useOutsideClick } from '../../hooks/useOutsideClick'

export const DeleteTaskModal = ({ showModal, setShowModal, currentTask }) => {
  const boardContext = useContext<BoardContextType>(BoardContext)
  const currentBoard = boardContext.currentBoard

  const divRef = useRef<HTMLDivElement>(null)

  useOutsideClick(divRef, () => setShowModal())

  const onDelete = () => {
    const columnId = currentBoard.columns?.find(col => col['name'] === currentTask['status'])?.colId
    boardContext.deleteTaskById(columnId, currentTask)
    setShowModal(false)
  }

  return (
    <div
      ref={divRef}
      className={`flex-col p-6 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white dark:bg-dark-gray w-full max-w-[22rem] md:max-w-[30rem] rounded-md pointer-events-auto whitespace-pre-line
        ${showModal ? 'flex' : 'hidden'}`}
    >
      <div className=
        {'{ showModal ? \'block\' : \'hidden\' } space-y-6'}>
        <div className='text-red'>
          <span>Delete this board?</span>
        </div>
        <p>
          Are you sure you want to delete the ‘{currentTask.title}’ Task? This
          action will remove the task and cannot be reversed.
        </p>
        <div className='flex gap-4'>
          <button className='flex grow flex-row items-center rounded-3xl justify-center w-48 md:w-40 h-10 md:h-12 text-white bg-red hover:bg-red-hover'
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            onClick={() => setShowModal(false)}
            className='flex grow flex-row items-center rounded-3xl justify-center w-48 md:w-40 h-10 md:h-12 text-main-purple hover:bg-main-purple hover:text-white bg-main-purple/10'>
            Cancel
          </button>
        </div>
      </div>
    </div >
  )
}
