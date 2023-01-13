import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TaskModal } from '../modal/TaskModal'

export const BoardItem = ({ index, task }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <div className='flex items-center w-64 min-h-[90px] bg-white dark:bg-dark-gray rounded-lg drop-shadow-md'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='flex flex-col w-full h-full justify-center pointer pl-4'
              role='button'
              onClick={() => setShowModal(true)}
            >
              <h3 className='heading-md text-black dark:text-white'>{task.title}</h3>
              <h4 className='heading-sm mt-2 dark:medium-gray'>0 of {task.subtasks?.length} subtasks</h4>
            </div>
          </div>
        )}
      </Draggable>
      {showModal && <TaskModal showModal={showModal} setShowModal={setShowModal} action='edit' currentTask={task} />}
    </>
  )
}
