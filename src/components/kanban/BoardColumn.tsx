import { Droppable } from 'react-beautiful-dnd'
import { BoardItem } from './BoardItem'

import { Task } from '../../interfaces/Task'

export const BoardColumn = ({ data, columnName, colId }) => {
  return (
    <Droppable droppableId={colId}>
      {provided => (
        <div className={'flex flex-col '}>
          <span className={'text-center'}>{columnName}</span>
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-4 min-w-[256px] h-full
              ${data.length < 1 ? 'border-[1px] border-dashed border-medium-gray rounded-xl' : ''}`}
          >
            {data && data.map((task: Task, index: number) => (
              <BoardItem key={task.id} id={task.id} index={index} title={task.title} />
            ))
            }
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}
