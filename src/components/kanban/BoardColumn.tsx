import { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { BoardItem } from './BoardItem'

export const BoardColumn = ({ data, colId }) => {
  interface Task {
    id: string,
    title: string,
    index: number,
  }

  return (
    <Droppable droppableId={colId}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={'flex flex-col gap-4 min-w-[256px]'}
        >
          {data && data.map((task: Task, index: number) => (
            <BoardItem key={task.id} id={task.id} index={index} task={task.title} />
          ))
          }
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
