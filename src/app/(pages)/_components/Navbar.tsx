import { UserButton } from '@stackframe/stack'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center'>
        <Link href={"/"} className='font-bold'>Scheduler</Link>
        <UserButton/>
    </div>
  )
}

export default Navbar