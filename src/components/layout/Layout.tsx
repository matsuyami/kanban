import React, { ReactNode } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import Ellipsis from '../../assets/images/icon-vertical-ellipsis.svg'
import LightLogo from '../../assets/images/logo-light.svg'
import DarkLogo from '../../assets/images/logo-dark.svg'
import ChevronIcon from '../../assets/images/icon-chevron-down.svg'
import AddIcon from '../../assets/images/icon-add-task-mobile.svg'
import Logo from '../../assets/images/logo-mobile.svg'
import Head from 'next/head'

import { Sidebar } from './Sidebar'
import { BoardItem } from '../kanban/BoardItem'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title='Kanban' }: Props) => {
  const { width } = useWindowSize() 
  const isTabletSize = width >= 768

  const addBoardItem = () => {
    console.log('board item added')
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className={'flex flex-row items-center h-20 bg-white dark:bg-dark-gray'}>
          <div className={'flex md:min-w-[16.75rem] px-4 md:border-solid md:border-r-2 md:border-light-lines dark:md:border-dark-lines items-center h-full'}>
            <Logo/>
          </div>
          <div className={'flex flex-row grow py-5 justify-between'}>
            <div className={'flex flex-row gap-2 md:pl-4 items-center'}>
              <h1 className={'heading-lg text-black dark:text-white'}> Platform Launch </h1>
                <ChevronIcon />
            </div>
            <div className={'flex flex-row items-center pr-5 gap-4'}> 
              <button className={'flex flex-row items-center justify-center w-12 md:w-40 h-8 md:h-12 bg-main-purple opacity-30 rounded-3xl'}
                onClick={() => addBoardItem() }
              >
                {!isTabletSize && <AddIcon className={'w-3 w-3'}/> }
                {isTabletSize && <span className={'text-white font-bold'}>+ Add New Task </span> }
              </button>  
              <Ellipsis className={'scale-[0.8]'}/>
            </div> 
          </div>
        </div>
      </header>
      <div className={'flex flex-row flex-grow'}>
        {isTabletSize && <Sidebar/> }
        <main className={'overflow-y-auto w-full min-h-screen whitespace-nowrap'}>
          { children }
        </main>
      </div>
      <footer>
      </footer>
    </div>
  )
}
