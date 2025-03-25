import React from 'react'
import Navbar from './_components/Navbar'

const Layout = ({children} : Readonly<{children : React.ReactNode}>) => {
  return (
    <div className='w-full h-screen flex flex-col px-10 pt-6 md:px-20'>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout