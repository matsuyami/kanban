import { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { BoardItem } from './BoardItem'

import { v4 as uuidv4 } from 'uuid'

import { Task } from '../../interfaces/Task'


export const BoardColumn = ({ data, columnName, colId }) => {
  return (
    <Droppable droppableId={colId}>
      {provided => (
        <div className={'flex flex-col '}>
          <span className={'text-center uppercase heading-md mb-2'}>{columnName}<span className={'ml-2'}>{`(${data.length})`}</span></span>
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-4 min-w-[256px] h-full
              ${data.length < 1 ? 'border-[1px] border-dashed border-medium-gray rounded-xl' : ''}`}
          >
            {data && data.map((task: Task, index: number) => (
              <BoardItem
                key={uuidv4()}
                index={index}
                task={task}
              />
            ))
            }
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}
