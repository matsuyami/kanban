import BoardIcon from '../../assets/images/icon-board.svg'

// make useWindow hook to use width
// if width > 768 px or so render sidebar in layout

export const Sidebar = () => {
  return (
    <aside className={'flex flex-col h-screen px-6 md:border-solid md:border-r-2 md:border-light-lines dark:md:border-dark-lines md:w-[16.75rem] bg-white dark:bg-dark-gray'}>
      <div className={'flex flex-col w-[inherit]'}>
        <h2 className={'heading-sm py-8 tracking-[2.4px] uppercase'}>All boards (4)</h2>
        <button className={'flex items-center pb-6 gap-3 heading-md'}>
          <BoardIcon/>
          <span>Marketing Plan</span>
        </button>
        <button className={'flex items-center pb-6 gap-3 heading-md'}>
          <BoardIcon className={'[&_path]:fill-main-purple'}/>
          <span className={'text-main-purple'}> + Create New Board</span>
        </button>
      </div>

    </aside>
  )
}

