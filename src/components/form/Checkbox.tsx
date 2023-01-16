import { useState } from 'react'

import CheckedIcon from '../../assets/images/icon-check.svg'

interface CheckboxProps {
  id: number,
  label: string,
  isChecked: boolean,
  onChange: (id: number) => void,
}

export const Checkbox = ({
  id,
  label,
  isChecked,
  onChange
}: CheckboxProps) => {

  // if is checked show the box as checked please

  return (
    <div className='bg-light-gray dark:bg-very-dark-gray rounded p-2 flex flex-row'>
      <label className='relative cursor-pointer mr-2'>
        <input type='checkbox'
          onChange={() => onChange(id)}
          checked={isChecked}
          className={`appearance-none w-4 h-4 rounded-sm
          bg-white break-words whitespace-pre-line 
          checked:bg-main-purple `}
        />
        <CheckedIcon className='absolute top-[0.4rem] right-[2.75px]' />
      </label>
      <div className={`heading-sm leading-5 break-all whitespace-pre-line ${isChecked ? 'line-through' : ''}`}>{label}</div>
    </div>
  )
}
