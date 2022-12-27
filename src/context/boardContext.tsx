import { useState, createContext } from 'react'
import { IBoard, BoardContextType } from '../interfaces/Board'

export const BoardContext = createContext<BoardContextType | null>(null)

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState<Array<IBoard>>([])

  const addBoard = (board: IBoard) => {
    let isSuccess = true
    const found = boards.find(item => board.title === item.title)

    if (found) {
      isSuccess = false
    } else {
      const boardsCopy = [...boards]
      boardsCopy.push(board)
      setBoards(boardsCopy)
    }
    return isSuccess
  }

  const getBoardColumns = (board: IBoard) => {
    return board?.columns
  }

  return <BoardContext.Provider value={{ boards, addBoard, getBoardColumns }}>{children}</BoardContext.Provider>
}
