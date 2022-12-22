import { useEffect, useState, useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { BoardColumn } from './BoardColumn'

export const Board = () => {
  const initialData = [
    {
      name: 'Todo',
      colId: 'todo-1',
      tasks: [
        {id: '1', title: 'Do Crazy Stuff'}, 
        {id: '2', title: 'Build a warehouse'},
        {id: '3', title: 'Eat Potatoes'}
      ],
    },
    {
      name: 'Todo 2',
      colId: 'todo-2',
      tasks: [
        {id: '4', title: 'Fried Potatoes'}, 
        {id: '5', title: 'Fried Tomatoes'},
        {id: '6', title: 'Fried Corn'}
      ],
    }
  ]

  interface Task {
    id: string,
    title: string,
    index: number
  }

  interface Column {
    name: string,
    colId: string,
    tasks: Array<Task>
  }
  
  const [columns, setColumns] = useState(initialData)

  const reorderColItems = useCallback((col: Column, startIndex: number, destinationIndex: number): Array<Task> => {                                          
    const result = Array.from(col.tasks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(destinationIndex, 0, removed)

    return result
  }, [])


  const onDragEnd = useCallback((result: DropResult) => {
    const {source, destination} = result

    // unknown area
    if(!destination) return 

    // same spot
    if(destination.droppableId === source.droppableId && 
       destination.index === source.index) return
    
    const cols = [...columns]
    const sourceColumn = cols.find(col => source.droppableId === col.colId) 

    // same column
    if(destination.droppableId === source.droppableId){
      const newColTasks = reorderColItems(sourceColumn as Column, source.index, destination.index)
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

  }, [columns, reorderColItems])

  const [winReady, setwinReady] = useState(false)

  useEffect(() => {
    setwinReady(true);
  }, [])

  return (
    <DragDropContext 
      onDragEnd={onDragEnd}
    > 
      { winReady && 
      <div className={'flex gap-5 ml-4 mt-8'}>
        {columns.map((arr, index)=> (
            <BoardColumn key={index} data={arr.tasks} colId={arr.colId} />
          ))
        }
      </div>
      }
    </DragDropContext>
  )
}
