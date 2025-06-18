"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets"
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from '@clerk/nextjs'


function Navbar() {
    const { isSeller, router, user } = useAppContext();
    const {openSignIn} = useClerk();


    return (
        <nav className='flex items-center justify-between py-3 px-6 md:px-16 lg:px-32 border-b border-gray-300 text-gray-700'>
            <Image 
            src={assets.logo} 
            alt='logo' 
            className='cusrsor-pointer w-28 md:w-32' 
            onClick={() => router.push('/')}
            />
            <div className='flex items gap-4 lg:gap-8 max-md:hidden'>
                <Link href='/' className='hover:text-gray-900 transition'>Home</Link>
                <Link href='/' className='hover:text-gray-900 transition'>Shop</Link>
                <Link href='/' className='hover:text-gray-900 transition'>About us</Link>
                <Link href='/' className='hover:text-gray-900 transition'>Contact</Link>
                {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
            </div>
            <ul className='hidden md:flex items-center gap-4'>
                <Image src={assets.search_icon} alt='search' className='w-4 h-4'/>
                {user ?
                <>
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Cart' labelIcon={<CartIcon />} onClick={()=> router.push('/cart')}/>
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Orders' labelIcon={<BagIcon />} onClick={()=> router.push('/my-orders')}/>
                    </UserButton.MenuItems>
                </UserButton>
                </>
                : 
                <button onClick={openSignIn} className='flex items-center gap-2 hover:text-gray-900 transition'>
                    <Image src={assets.user_icon} alt='user'/>
                    Account
                </button>
                }
            </ul>
            <div className='flex items-center gap-3 md:hidden'>
                {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
                { user ? 
                <>
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Home' labelIcon={<HomeIcon />} onClick={()=> router.push('/')}/>
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Products' labelIcon={<BoxIcon />} onClick={()=> router.push('/all-products')}/>
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Cart' labelIcon={<CartIcon />} onClick={()=> router.push('/cart')}/>
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Orders' labelIcon={<BagIcon />} onClick={()=> router.push('/my-orders')}/>
                    </UserButton.MenuItems>
                </UserButton>
                </> : 
                <button onClick={openSignIn} className='flex items-center gap-2 hover:text-gray-900 transition'>
                    <Image src={assets.user_icon} alt='user'/>
                    Account
                </button>
                }
            </div>
        </nav>
    )
}

export default Navbar
