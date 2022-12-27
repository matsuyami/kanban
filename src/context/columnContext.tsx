import { createContext, useState } from 'react'

import { IColumn, ColumnContextType } from '../interfaces/Column'
import { Task } from '../interfaces/Task'

import { DropResult } from 'react-beautiful-dnd'

const initialData = [
  {
    name: 'Todo',
    colId: 'todo-1',
    tasks: [
      { id: '1', title: 'Do Crazy Stuff' },
      { id: '2', title: 'Build a warehouse' },
      { id: '3', title: 'Eat Potatoes' }
    ],
  },
  {
    name: 'Todo 2',
    colId: 'todo-2',
    tasks: [
      { id: '4', title: 'Fried Potatoes' },
      { id: '5', title: 'Fried Tomatoes' },
      { id: '6', title: 'Fried Corn' }
    ],
  }
]

const reorderColItems = (col: IColumn, startIndex: number, destinationIndex: number): Array<Task> => {
  const result = Array.from(col.tasks)
  const [removed] = result.splice(startIndex, 1)
  result.splice(destinationIndex, 0, removed)

  return result
}

export const ColumnContext = createContext<ColumnContextType | null>(null)

export const ColumnProvider = ({ children }) => {

  const [columns, setColumns] = useState<Array<IColumn>>(initialData)

  const updateColumnOnDrop = (result: DropResult) => {
    const { source, destination } = result

    // unknown area
    if (!destination) return

    // same spot
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return

    const cols = [...columns]
    const sourceColumn = cols.find(col => source.droppableId === col.colId)

    // same column
    if (destination.droppableId === source.droppableId) {
      const newColTasks = reorderColItems(sourceColumn as IColumn, source.index, destination.index)
      // now updated in new array                                                                                                                                                                                        
      sourceColumn.tasks = newColTasks
      setColumns(cols)

    } else {  // different column
      const destinationColumn = cols.find(col => destination.droppableId === col.colId)
      const destinationTasks = [...destinationColumn.tasks]

      const sourceTasks = [...sourceColumn.tasks]
      const [removed] = sourceTasks.splice(source.index, 1)

      destinationTasks.splice(destination.index, 0, removed)
      destinationColumn.tasks = destinationTasks
      sourceColumn.tasks = sourceTasks
      setColumns(cols)
    }
  }


  const addColumn = (column: IColumn) => {
    const col = [...columns]
    col.push(column)
    setColumns(col)
  }


  return <ColumnContext.Provider value={{ columns, addColumn, updateColumnOnDrop }}>{children}</ColumnContext.Provider>
}

