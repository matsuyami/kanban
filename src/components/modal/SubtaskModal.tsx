import { useEffect, useState, useRef, useContext, MouseEvent } from 'react'
import { BoardContextType } from '../../interfaces/Board'
import { SubTask, Task } from '../../interfaces/Task'
import { BoardContext } from '../../context/boardContext'

import { Checkbox } from '../form/Checkbox'
import { DeleteTaskModal } from '../modal/DeleteTaskModal'
import { TaskModal } from '../modal/TaskModal'

import { useOutsideClick } from '../../hooks/useOutsideClick'
import { IColumn } from '../../interfaces/Column'

import Ellipsis from '../../assets/images/icon-vertical-ellipsis.svg'

interface SubtaskModalProps {
  showModal: boolean
  showTaskModal: boolean
  showDeleteTaskModal: boolean
  setShowModal: (showModal?: boolean) => void
  setShowTaskModal: (showModal?: boolean) => void
  setShowDeleteTaskModal: (showModal?: boolean) => void
  currentTask: Task
}

export const SubtaskModal = ({
  showModal,
  setShowModal,
  showTaskModal,
  setShowTaskModal,
  showDeleteTaskModal,
  setShowDeleteTaskModal,
  currentTask }: SubtaskModalProps) => {
  const boardContext = useContext<BoardContextType>(BoardContext)
  const currentBoard = boardContext.currentBoard

  const [showOptions, setShowOptions] = useState(false)

  const divRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  useOutsideClick(divRef, setShowModal)

  const onSubtaskChange = (index: number) => {
    const subtaskCopy = [...currentTask.subtasks]
    subtaskCopy[index] = {
      ...subtaskCopy[index],
      isCompleted: !subtaskCopy[index].isCompleted
    }

    const boards = [...boardContext.boards]
    const board = boards.find(board => board.title === currentBoard.title)
    const boardIndex = boards.findIndex(board => board.title === currentBoard.title)

    if (board) {
      const columnIndex = board.columns.findIndex((column: IColumn) =>
        column.tasks.find(task => task['id'] === currentTask['id']))

      const taskIndex = board.columns[columnIndex].tasks.findIndex((task: Task) => task.id === currentTask.id)

      const newTask = {
        ...currentTask,
        subtasks: subtaskCopy
      }

      boards[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1)
      boards[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 0, newTask)
      boardContext.editBoard(boards[boardIndex], currentBoard.title)
    }
  }

  const onEditClick = () => {
    setShowModal(false)
    setShowOptions(prev => !prev)
    setShowTaskModal(true)
  }

  const onDeleteClick = () => {
    setShowModal(false)
    setShowOptions(prev => !prev)
    setShowDeleteTaskModal(true)
  }

  return (
    <div ref={divRef} className={`flex-col p-6 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white dark:bg-dark-gray w-full max-w-[22rem] md:max-w-[30rem] rounded-md pointer-events-auto whitespace-pre-line
        ${showModal ? 'flex' : 'hidden'}`}>
      <span className='heading-lg text-black dark:text-white mb-6 break-words whitespace-pre-line'>{currentTask.title}</span>
      <button
        onClick={() => setShowOptions(prev => !prev)}
        className='absolute z-20 hover:cursor-pointer py-2 px-6 top-4 right-6 translate-x-1/2'>
        <Ellipsis />
      </button>
      {showOptions &&
        <div
          ref={optionsRef}
          className='absolute top-[4rem] right-[-3rem]'>
          <div className={`{w-48 h-24 flex flex-col gap-2 p-4 z-30 items-start justify-center rounded-xl bg-white ${showModal} ? 'flex' : 'hidden'}`}>
            <div role="button" onClick={onEditClick}> Edit Task</div>
            <div role="button"
              className='text-red'
              onClick={onDeleteClick}> Delete Task</div>
          </div>
        </div>
      }
      <p className='body-lg break-words	whitespace-pre-line'>{currentTask.description}</p>
      <div className='body-md py-4'>
        <span className='pr-1'>Subtasks</span>
        <span>{`( ${currentTask.subtasks.filter(subtask => subtask.isCompleted).length} of ${currentTask.subtasks.length} )`}</span>
      </div>
      <div className='flex flex-col gap-3'>
        {currentTask.subtasks.map((subtask: SubTask, index: number) => (
          <Checkbox
            id={index}
            label={subtask.title}
            onChange={onSubtaskChange}
            isChecked={subtask.isCompleted}
            key={index} />
        ))}
      </div>
    </div >
  )
}
