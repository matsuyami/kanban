import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { SubTask } from '../../interfaces/Task'

import { TaskModal } from '../modal/TaskModal'
import { SubtaskModal } from '../modal/SubtaskModal'
import { DeleteTaskModal } from '../modal/DeleteTaskModal'

export const BoardItem = ({ index, task }) => {
  const [showModal, setShowModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false)

  return (
    <>
      <Draggable draggableId={task.id} key={task.id} index={index}>
        {provided => (
          <div className='flex items-center w-64 min-h-[90px] bg-white dark:bg-dark-gray rounded-lg drop-shadow-md pointer-events-auto'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='flex flex-col w-full h-full justify-center pointer pl-4'
              role='button'
              onClick={() => setShowModal(true)}
            >
              <h3 className='heading-md text-black dark:text-white break-words whitespace-pre-line'>{task.title}</h3>
              <h4 className='heading-sm py-2 dark:medium-gray'>
                {task.subtasks.filter((subtask: SubTask) => subtask.isCompleted).length}
                of {task.subtasks?.length} subtasks</h4>
            </div>
          </div>
        )}
      </Draggable>
      {showModal &&
        <SubtaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          showTaskModal={showTaskModal}
          setShowTaskModal={setShowTaskModal}
          showDeleteTaskModal={showDeleteTaskModal}
          setShowDeleteTaskModal={setShowDeleteTaskModal}
          currentTask={task} />}
      {showTaskModal && <TaskModal showModal={showTaskModal} setShowModal={setShowTaskModal} currentTask={task} action='edit' />}
      {showDeleteTaskModal && <DeleteTaskModal showModal={showDeleteTaskModal} setShowModal={setShowDeleteTaskModal} currentTask={task} />}
    </>
  )
}
