import { useRef, useContext } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { v4 as uuidv4 } from 'uuid';

import CrossIcon from '../../assets/images/icon-cross.svg'

import { BoardContextType } from '../../interfaces/Board'
import { BoardContext } from '../../context/boardContext'
import { IBoard } from '../../interfaces/Board'
import { Task } from '../../interfaces/Task'

export const ColumnModal = ({ showModal, setShowModal }) => {
  const MAX_NUMBERS_OF_INPUTS = 6

  const boardContext = useContext<BoardContextType>(BoardContext)
  const formRef = useRef<HTMLFormElement>(null)
  useOutsideClick(formRef, () => setShowModal())

  const prevBoardTitle = boardContext.currentBoard.title
  const currentBoardColumns = boardContext.currentBoard.columns

  const { register, handleSubmit, control, formState: { errors } } = useForm<IBoard>({
    defaultValues: {
      title: prevBoardTitle,
      columns: currentBoardColumns,
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'columns',
    control,
  })

  const handleBoardUpdate = (data: IBoard) => {
    setShowModal(false)
    boardContext.editBoard(data, prevBoardTitle)
  }

  const isError = (index: number) => (errors?.columns?.[index]?.name)

  const registerInput = (index: number) => ({
    ...register(`columns.${index}.name`, { required: true })
  })


  return (
    <form onSubmit={handleSubmit((data) => handleBoardUpdate(data))} aria-hidden='true'
      ref={formRef}
      className={`flex-col p-6 px-8 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white dark:bg-dark-gray w-full max-w-[22rem] md:max-w-[31rem] rounded-md pointer-events-auto
        ${showModal ? 'flex' : 'hidden'}
      `}>
      <span className='heading-lg text-black dark:text-white mb-6 '>Add New Column</span>
      <label htmlFor='boardName' className='heading-sm mb-2'>Board Name</label>
      <div className='relative'>
        <input type='text'
          {...register('title', { required: true })}
          id='boardName'
          placeholder='e.g. Web Design'
          className='border-2 rounded border-light-lines dark:bg-dark-gray dark:border-dark-lines w-full pl-4 h-[2.5rem] mb-6' />
        {errors?.title && <div className='absolute text-red top-[0.5rem] right-0 px-4'><span>Board Name must have value</span></div>}
      </div>
      <label className={'heading-sm mb-2'}>Board Columns</label>
      {
        fields.map((_, index: number) => (
          <div className={'relative'} key={uuidv4()}>
            <input type='text'
              placeholder='e.g. Done'
              {...registerInput(index)}
              className='relative border-2 rounded border-light-lines dark:bg-dark-gray dark:border-dark-lines w-full pl-4 mb-4 h-[2.5rem]'
            />
            <CrossIcon
              onClick={() => remove(index)}
              className='absolute cursor-pointer top-[0.7rem] right-[-1.5rem]' />
            {isError(index) && <div className={'absolute text-red top-[0.5rem] right-0 px-4'}><span>Can&apos;t be empty</span></div>}
          </div>
        ))
      }
      <button
        type='button'
        onClick={() => append({
          name: '',
          colId: uuidv4(),
          tasks: new Array<Task>(),
        })}
        className={`flex flex-row items-center justify-center mb-6 mt-4 w-full h-[2.5rem] bg-main-purple/10 hover:bg-main-purple/30 dark:bg-white dark:text-main-purple
          ${fields.length >= MAX_NUMBERS_OF_INPUTS ? 'hover:cursor-not-allowed' : ''} rounded-[1.25rem]`}
        disabled={fields.length >= MAX_NUMBERS_OF_INPUTS}>
        <span className='text-main-purple font-bold'>+Add New Column</span>
      </button>
      <input
        type='submit'
        value='Create New Board'
        className='flex flex-row items-center justify-center text-white font-bold w-full h-[2.5rem] bg-main-purple hover:bg-main-purple/70 rounded-[1.25rem]' />
    </form >
  )
}

