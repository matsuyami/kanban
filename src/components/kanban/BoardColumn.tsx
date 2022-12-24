import { Droppable } from 'react-beautiful-dnd'
import { BoardItem } from './BoardItem'

import { Task } from '../../interfaces/Task'

export const BoardColumn = ({ data, colId }) => {
  return (
    <Droppable droppableId={colId}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={'flex flex-col gap-4 min-w-[256px]'}
        >
          {data && data.map((task: Task, index: number) => (
            <BoardItem key={task.id} id={task.id} index={index} title={task.title} />
          ))
          }
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
