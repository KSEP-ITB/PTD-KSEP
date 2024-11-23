"use client"

// Library Import
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Auth Import
import { signOut, useSession } from 'next-auth/react'

// Utils Import
import { cn } from '@/lib/utils'

// Components Import
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

// Icons Import
import { Menu } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { LogOut } from 'lucide-react';

// Constants Import
import { navItems } from '@/lib/constants'

const Navbar = () => {
  const { data } = useSession();
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='w-full'>
      
      {/* Desktop Nav */}
      <nav className='w-full mx-auto max-w-7xl overflow-x-hidden p-4 hidden lg:flex items-center justify-between z-20'>
        <Link href="/">  
          <h1 className='font-black text-3xl text-orange-gradient text-shadow-orange'>PTD KSEP</h1>
        </Link>

        <div className='flex gap-x-12'>
          {navItems.map((item, index) => {
            if (item.requiresAuth && !data) {
              return null;
            }
            
            return (
              <Link key={index} href={item.path} className={cn(
                'text-[#B6B6B6] font-bold',
                pathname === item.path && "text-orange-gradient"
              )}>
                {item.name}
              </Link>
            )
          })}
        </div>
        
        {data && (
          <Button 
            onClick={() => {signOut()}}
            variant={"outline"} 
            className='rounded-full border-2 border-[#ED3633] text-[#ED3633] hover:text-[#ED3633]/80 flex items-center gap-x-2 transition-all hover:gap-x-4 w-[125px]'
          >
            Sign Out <LogOut className='w-4 h-4' />
          </Button>
        )}

        {!data && (
          <Link href={"/sign-in"}>
            <Button variant={"outline"} className='rounded-full border-2 border-[#ED3633] text-[#ED3633] hover:text-[#ED3633]/80 flex items-center gap-x-2 transition-all hover:gap-x-4 w-[125px]'>
              Sign In <LogIn className='w-4 h-4' />
            </Button>
          </Link>
        )}
      </nav>

      {/* Mobile Nav */}
      <div className='lg:hidden flex wrapper items-center justify-between'>
        <Link href="/">  
          <h1 className='font-black text-3xl text-orange-gradient text-shadow-orange'>PTD KSEP</h1>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu className='text-[#ED3633]' />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-center justify-center gap-y-8'>
            {navItems.map((item, index) => {
              if (item.requiresAuth && !data) {
                return null;
              }
              
              return (
                <Link key={index} href={item.path} className={cn(
                  'text-[#B6B6B6] font-bold',
                  pathname === item.path && "text-orange-gradient"
                )}>
                  <span onClick={() => setIsOpen(false)}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
            {data && (
              <Button 
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
                variant={"outline"} 
                className='rounded-full border-2 border-[#ED3633] text-[#ED3633] hover:text-[#ED3633]/80 flex items-center gap-x-2 transition-all hover:gap-x-4 w-[125px]'
              >
                Sign Out <LogOut className='w-4 h-4' />
              </Button>
            )}

            {!data && (
              <Link href={"/sign-in"}>
                <Button variant={"outline"} className='rounded-full border-2 border-[#ED3633] text-[#ED3633] hover:text-[#ED3633]/80 flex items-center gap-x-2 transition-all hover:gap-x-4 w-[125px]' onClick={() => setIsOpen(false)}>
                  Sign In <LogIn className='w-4 h-4' />
                </Button>
              </Link>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar
