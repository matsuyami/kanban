import { useRef, useContext } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { v4 as uuidv4 } from 'uuid';

import { BoardContextType } from '../../interfaces/Board'
import { BoardContext } from '../../context/boardContext'
import { Task as ITask } from '../../interfaces/Task'
import { IColumn } from '../../interfaces/Column'

export const TaskModal = ({ showModal, setShowModal, action = 'view', currentTask = undefined }) => {
  const MAX_NUMBERS_OF_INPUTS = 6

  const boardContext = useContext<BoardContextType>(BoardContext)
  const formRef = useRef<HTMLFormElement>(null)

  useOutsideClick(formRef, () => setShowModal())

  const currentBoardColumns: Array<IColumn> = boardContext.currentBoard.columns
  const [defaultStatus] = currentBoardColumns

  const defaultValues = action === 'view'
    ? {
      status: defaultStatus.name || '',
      title: '',
      description: '',
      subtasks: [{ subtask: '' }],
      id: uuidv4(),
    }
    : { ...currentTask }

  const { register, handleSubmit, control, formState: { errors } } = useForm<ITask>({
    defaultValues: defaultValues
  })

  const { fields, append } = useFieldArray({
    name: 'subtasks',
    control,
  })

  const updateTask = (data: ITask) => {
    const columnId = currentBoardColumns?.find(col => col?.name === data.status)?.colId

    if (action === 'view') {
      boardContext.addTaskByColumn(columnId, data)
    } else {
      const prevColumnId = currentBoardColumns?.find(col => col?.name === currentTask.status)?.colId
      boardContext.editTaskByColumn(columnId, prevColumnId, data)
    }
    setShowModal(false)
  }

  return (
    <form onSubmit={handleSubmit((data) => updateTask(data))} aria-hidden='true'
      ref={formRef}
      className={`flex-col p-6 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white dark:bg-dark-gray w-full max-w-[22rem] md:max-w-[30rem] rounded-md pointer-events-auto
        ${showModal ? 'flex' : 'hidden'}
      `}>
      <span className='heading-lg text-black dark:text-white mb-6'>Add New Task</span>
      <label htmlFor='boardName' className='heading-sm mb-2'>Title</label>
      <div className='relative'>
        <input type='text'
          {...register('title', { required: true })}
          id='boardName'
          placeholder='e.g. Web Design'
          className='border-2 rounded border-light-lines dark:bg-dark-gray dark:border-dark-lines w-full text-[13px] placeholder:text-medium-gray font-medium pl-4 h-[2.5rem] mb-6 ' />
        {errors?.title && <div className='absolute text-red top-[0.5rem] right-0 px-4'><span>Board Name must have value</span></div>}
      </div>

      <label htmlFor='description' className='heading-sm mb-2'>Description</label>
      <div className='relative'>
        <textarea
          name='description'
          id='description'
          placeholder="e.g It's always good to take a break. This 15 minute breakwill recharge the batteries a little."
          className='border-2 rounded border-light-lines dark:bg-dark-gray dark:border-dark-lines w-full text-[13px] placeholder:text-medium-gray font-medium pl-4 pt-2 h-[7rem] mb-6'
          {...register('description', { required: true })}
        >
        </textarea>
        {errors?.description && <div className='absolute text-red bottom-0 right-0 px-4'><span>Description can&apos;t be empty</span></div>}
      </div>
      <label htmlFor='subtasks' className={'heading-sm mb-2'}>Subtasks</label>
      {
        fields.map((field, index) => (
          <div className='relative' key={field.id}>
            <input type='text'
              placeholder='e.g. Done'
              {...register(`subtasks.${index}.subtask`, { required: true })}
              className='relative border-2 rounded border-light-lines dark:bg-dark-gray dark:border-dark-lines w-full placeholder:text-medium-gray text-[13px] font-medium pl-4 mb-4 heading-md h-[2.5rem]'
            />

            {errors?.subtasks?.[index] && <div className='absolute text-red top-[0.5rem] right-0 px-4'><span>Must have value</span></div>}
          </div>
        ))
      }
      <button
        type='button'
        onClick={() => append({
          subtask: '',
        })}
        className={`flex flex-row items-center justify-center pointer mb-6 w-full h-[2.5rem] bg-main-purple/10 hover:bg-main-purple/30 placeholder:text-medium-gray dark:bg-white dark:text-main-purple
          ${fields.length >= MAX_NUMBERS_OF_INPUTS ? 'hover:cursor-not-allowed' : ''} rounded-[1.25rem]`}
        disabled={fields.length >= MAX_NUMBERS_OF_INPUTS}>
        <span className='text-main-purple font-bold'>+Add New Subtask </span>
      </button>
      <label htmlFor='status' className='heading-sm mb-2'>Status</label>
      <select name='status' {...register('status', { required: true })} className='relative border-2 rounded border-light-lines bg-white dark:bg-dark-gray dark:border-dark-lines w-full placeholder:text-medium-gray text-[13px] font-medium pl-4 mb-6 heading-md h-[2.5rem]'>
        {currentBoardColumns && currentBoardColumns.map((col: IColumn) => {
          return <option key={col.colId} value={col.name} className='mt-3 shadow-dropbox w-full p-4 block'>{col.name}</option>
        })}
      </select>
      <input
        type='submit'
        value='Create New Task'
        className='flex flex-row items-center justify-center text-white font-bold w-full h-[2.5rem] bg-main-purple hover:bg-main-purple/70 rounded-[1.25rem]' />
    </form >
  )
}
