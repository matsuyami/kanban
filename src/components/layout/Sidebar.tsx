import { useContext, useState, useEffect } from 'react'
import { IBoard, BoardContextType } from '../../interfaces/Board'
import { BoardContext } from '../../context/boardContext'
import { BoardModal } from '../modal/Modal'

import BoardIcon from '../../assets/images/icon-board.svg'
import SunIcon from '../../assets/images/icon-light-theme.svg'
import MoonIcon from '../../assets/images/icon-dark-theme.svg'

type Theme = 'light' | 'dark'

export const Sidebar = ({ changeBoard }) => {
  // TODO: set theme according to localStorage
  const [theme, setTheme] = useState<Theme>('light')

  const [showModal, setShowModal] = useState<boolean>(false)
  const boardContext = useContext<BoardContextType>(BoardContext)

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    theme.match('light') ? setTheme('dark') : setTheme('light')
  }

  return (
    <aside className={`flex flex-col justify-between h-[calc(100vh - 80px)] px-4 md:border-solid md:border-r-2 
        md:border-light-lines dark:md:border-dark-lines md:w-[16.75rem] bg-white dark:bg-dark-gray`}>
      <div className={'flex flex-col px-2 w-[inherit]'}>
        <h2 className={'heading-sm py-8 tracking-[2.4px] uppercase'}>All boards {`(${boardContext.boards.length})`}</h2>
        {boardContext.boards && boardContext.boards.map((board: IBoard, index: number) => (
          <button
            key={index}
            onClick={() => changeBoard(board)}
            className={'flex items-center pb-6 gap-3 heading-md'}>
            <BoardIcon />
            <span>{board.title}</span>
          </button>
        ))}
        <button className={'flex items-center pb-6 gap-3 heading-md'}
          onClick={() => setShowModal(true)}
        >
          <BoardIcon className={'[&_path]:fill-main-purple'} />
          <span className={'text-main-purple'}> + Create New Board</span>
        </button>
      </div>

      <div className={'flex items-center justify-center mb-4 w-full min-h-[3rem] bg-light-gray dark:bg-dark-gray rounded-md'}>
        <div className={'flex justify-around w-2/4'}>
          <SunIcon />
          <button
            onClick={() => toggleTheme()}
            className="w-10 h-5 bg-main-purple hover:bg-main-purple-hover rounded-xl p-[3px]"
          >
            <div
              className={`w-[14px] h-[14px] rounded-full bg-white transition 
              ${theme === 'dark' ? 'translate-x-5' : ''}`}>
            </div>
          </button>
          <MoonIcon />
        </div>
      </div>
      {showModal && <BoardModal showModal={showModal} setShowModal={setShowModal} />}
    </aside>
  )
}

