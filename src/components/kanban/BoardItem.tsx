import { Draggable } from 'react-beautiful-dnd'
import { Task } from '../../interfaces/Task'

export const BoardItem = ({ id, title, index }: Task) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div className={'flex items-center w-64 min-h-[90px] bg-white dark:bg-dark-gray rounded-lg drop-shadow-md'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={'flex flex-col w-full h-full justify-center pointer pl-4'}
            role='button'
            onClick={() => console.log('hello, world!')}
          >
            <h3 className={'heading-md text-black dark:text-white'}>{title}</h3>
            <h4 className={'heading-sm mt-2 dark:medium-gray'}>0 of 2 subtasks</h4>
          </div>
        </div>
      )}
    </Draggable>
  )
}
