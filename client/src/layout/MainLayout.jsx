import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-[#141414] text-gray-900 dark:text-white'>
        <Navbar />
        <div className="flex-1 mt-16 ">
            <Outlet />
        </div>
    </div>
  )
}
