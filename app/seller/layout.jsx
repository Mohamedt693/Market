'use client'
import Footer from '@/components/seller/Footer'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React from 'react'
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
    return (
        <div>
            <ToastContainer />
            <Navbar />
            <div className='flex w-full'>
                <Sidebar />
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout