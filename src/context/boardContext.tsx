import { useState, createContext } from 'react'
import { Task } from '../interfaces/Task'
import { IColumn } from '../interfaces/Column'
import { IBoard, BoardContextType } from '../interfaces/Board'
import { DropResult } from 'react-beautiful-dnd'

const reorderColItems = (col: IColumn, startIndex: number, destinationIndex: number): Array<Task> => {
  const result = Array.from(col.tasks)
  const [removed] = result.splice(startIndex, 1)
  result.splice(destinationIndex, 0, removed)

  return result
}

export const BoardContext = createContext<BoardContextType | null>(null)

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState<Array<IBoard>>([])
  const [columns, setColumns] = useState<Array<IColumn>>([])

  const [currentBoard, setCurrentBoard] = useState<IBoard>()

  const addBoard = (board: IBoard) => {
    let isSuccess = true
    const found = boards.find(item => board.title === item.title)

    if (found) {
      isSuccess = false
    } else {
      const boardsCopy = [...boards]
      boardsCopy.push(board)
      setBoards([...boards, board])
    }
    return isSuccess
  }

  const getBoardColumns = () => {
    return currentBoard?.columns
  }

  const updateColumnOnDrop = (board: IBoard, result: DropResult) => {
    const { source, destination } = result

    // unknown area
    if (!destination) return

    // same spot
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return

    const cols = [...board.columns]
    const sourceColumn = cols.find(col => source.droppableId === col.colId)

    // same column
    if (destination.droppableId === source.droppableId) {
      const newColTasks = reorderColItems(sourceColumn as IColumn, source.index, destination.index)
      // now updated in new array                                                                                                                                                                                        
      sourceColumn.tasks = newColTasks
      setColumns(cols)

    } else {  // different column
      const destinationColumn = cols.find(col => destination.droppableId === col.colId)
      //const destinationTasks = [...destinationColumn.tasks]

      const sourceTasks = [...sourceColumn.tasks]
      const [removed] = sourceTasks.splice(source.index, 1)

      /*
      destinationTasks.splice(destination.index, 0, removed)
      destinationColumn.tasks = destinationTasks
      sourceColumn.tasks = sourceTasks
      */

      const currentTask = {
        ...removed,
        status: destinationColumn.name
      }

      setColumns(cols)
      editTaskByColumn(destinationColumn.colId, sourceColumn.colId, currentTask)
    }
  }


  const addColumn = (column: IColumn) => {
    const newBoard = { ...currentBoard }
    const cols = [...newBoard.columns]
    cols.push(column)
    newBoard.columns = cols
    setCurrentBoard(newBoard)

    const boardsCopy = [...boards]
    const replacedIndex = boards.findIndex(board => board.title === newBoard.title)
    boardsCopy[replacedIndex].columns = cols
    setBoards(boardsCopy)
  }

  const editBoard = (board: IBoard, prevTitle: string) => {
    const foundIndex = boards?.findIndex(b => b.title === prevTitle)
    if (foundIndex > -1) {
      const boardCopy = { ...boards[foundIndex] }
      boardCopy.title = board.title
      boardCopy.columns = board.columns

      setBoards(prevState => prevState.map((board, index) => {
        if (index === foundIndex) {
          return boardCopy
        }
        return board
      }))
      setCurrentBoard(boardCopy)
    }
  }

  const addTaskByColumn = (id: string, task: Task) => {
    const currentColumns = [...currentBoard.columns]
    const foundIndex = currentColumns.findIndex(col => col.colId === id)
    const foundBoardIndex = boards.findIndex(board => board.title === currentBoard.title)
    const tasks = [...currentColumns[foundIndex].tasks]

    const updateColumnTasks = currentColumns.map((col, index) => {
      if (foundIndex === index) {
        return {
          ...col,
          tasks: [...tasks, task]
        }
      }
      return col
    })

    setColumns(updateColumnTasks)

    const updatedBoards = boards.map((board, index) => {
      if (foundBoardIndex === index) {
        return {
          ...board,
          columns: updateColumnTasks
        }
      }
      return board
    })

    setBoards(updatedBoards)

    const current = updatedBoards[foundBoardIndex]
    setCurrentBoard(current)
  }

  const editTaskByColumn = (colId: string, prevColId: string, task: Task) => {
    const foundBoardIndex = boards.findIndex(board => board.title === currentBoard.title)
    const currentColumns = [...currentBoard.columns]

    if (colId === prevColId) {
      const column = { ...currentColumns.find(col => col.colId === colId) }
      const columnIndex = currentColumns.findIndex(col => col.colId === colId)

      // remove previous task
      const taskIndex = [...column.tasks].findIndex(t => t.id === task.id)
      // need to update task by current index
      const newTasks = [...column.tasks].map((t, index) => {
        if (index === taskIndex) {
          return {
            ...task
          }
        }
        return t
      })

      const updatedColumns = currentColumns.map((col, index) => {
        if (index === columnIndex) {
          return {
            ...col,
            tasks: newTasks
          }
        }
        return col
      })

      updateBoardColumns(foundBoardIndex, updatedColumns)
      // end if
    } else {
      const prevColumn = { ...currentColumns.find(col => col.colId === prevColId) }
      const prevColumnIndex = currentColumns.findIndex(col => col.colId === prevColId)

      const newColumn = { ...currentColumns.find(col => col.colId === colId) }
      const newColumnIndex = currentColumns.findIndex(col => col.colId === colId)

      const prevTasks = [...prevColumn.tasks].filter(t => t.id !== task.id)
      const newTasks = [...newColumn.tasks, task]

      const updatedPrevColumns = updateColumnTasks(currentColumns, prevColumnIndex, prevTasks)

      // update previous columns tasks
      updateBoardColumns(foundBoardIndex, updatedPrevColumns)

      const updatedCurrentColumns = updateColumnTasks(updatedPrevColumns, newColumnIndex, newTasks)

      updateBoardColumns(foundBoardIndex, updatedCurrentColumns)
      // end else
    }
  }

  const updateColumnTasks = (columns: Array<IColumn>, columnIndex: number, tasks: Array<Task>) => {
    return columns.map((col, index) => {
      if (index === columnIndex) {
        return {
          ...col,
          tasks: tasks
        }
      }
      return col
    })
  }

  const updateBoardColumns = (boardIndex: number, updatedColumns: Array<IColumn>) => {
    const updatedBoards = boards.map((board, index) => {
      if (boardIndex === index) {
        return {
          ...board,
          columns: updatedColumns
        }
      }
      return board
    })

    setBoards(updatedBoards)

    const current = updatedBoards[boardIndex]
    setCurrentBoard(current)
  }

  return <BoardContext.Provider value={{
    boards,
    addBoard,
    editBoard,
    setCurrentBoard,
    currentBoard,
    updateColumnOnDrop,
    addColumn,
    addTaskByColumn,
    editTaskByColumn,
    getBoardColumns
  }}>{children}</BoardContext.Provider>
}

