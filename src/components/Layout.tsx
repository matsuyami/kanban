import React, { ReactNode } from 'react'
import Ellipsis from '../assets/images/icon-vertical-ellipsis.svg'
import LightLogo from '../assets/images/logo-light.svg'
import DarkLogo from '../assets/images/logo-dark.svg'
import ChevronIcon from '../assets/images/icon-chevron-down.svg'
import AddIcon from '../assets/images/icon-add-task-mobile.svg'
import Logo from '../assets/images/logo-mobile.svg'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title='Kanban' }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className={'flex flex-row justify-between pl-4 pr-5 py-5 bg-white dark:bg-dark-gray'}>
          <div className={'flex flex-row items-center'}>
            <Logo className={'mr-4'}/>
            <h1 className={'heading-lg mr-2 text-black'}> Platform Launch </h1>
            <ChevronIcon />
          </div>
          <div className={'flex flex-row items-center gap-4'}> 
            <button className={'flex items-center justify-center w-12 h-8 bg-main-purple opacity-30 rounded-3xl'}>
              <AddIcon className={'w-3 w-3'}/>
            </button>  
            <Ellipsis className={'scale-[0.8]'}/>
          </div>
        </div>
      </header>
      {children}

      <footer>
      </footer>
    </div>
  )
}

export default Layout
