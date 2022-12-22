import { Draggable } from 'react-beautiful-dnd'

interface Item {
  id: string,
  task: string,
  index: number,
}

export const BoardItem = ({id, task, index, ...rest}: Item) => {
  return(
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div className={'w-64 min-h-[90px] pl-4 pt-5 bg-white \
          dark:bg-dark-gray rounded-lg drop-shadow-md'}
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
        >
          <div>
            <h3 className={'heading-md text-black dark:text-white'}>{task}</h3>
            <h4 className={'heading-sm mt-2 dark:medium-gray'}>0 of 2 subtasks</h4>
          </div>
        </div>
      )}
    </Draggable>
  )
}
