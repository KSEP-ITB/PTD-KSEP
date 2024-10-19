"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import Background from '@/public/SignInBackground.png'
import SignInText from '@/public/SIGNIN.png'
import LogoPTD from '@/public/LOGOPTD.png'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInSchema } from '@/lib/schemas'
import { signInSchemaType } from '@/lib/schemas'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignInPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push("/assignments")
  }

  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  async function onSubmit(values: signInSchemaType) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });
  
      if (result?.error) {
        console.error(result.error);
        toast.error("An error occurred when signing in, no result");
      } else {
        toast.success("Signed in successfully");
        router.push("/assigments")
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred when signing in, catch error");
    }
    
  }

  return (
    <div className='relative h-screen w-full flex items-center justify-center overflow-y-hidden bg-gradient-to-br from-[#ED462D] to-[#FD8F10] px-4'>
      <div className='bg-white/25 rounded-xl flex flex-col items-center z-10 w-full lg:w-[1000px] p-20 gap-y-4'>
        <Image
          src={LogoPTD}
          alt='Logo PTD'
          width={100}
          height={100}
        />
        <Image 
          src={SignInText}
          alt='Sign In Text'
          width={250}
          height={250}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 flex flex-col items-center'>
            <FormField 
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-[18px]'>Username</FormLabel>
                  <FormControl>
                    <Input className='bg-white focus:ring-none rounded-full w-[250px] md:max-w-none md:w-[500px]' placeholder='Enter your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-[18px]'>Password</FormLabel>
                  <FormControl>
                    <Input type='password' className='bg-white focus:ring-none rounded-full w-[250px] md:max-w-none md:w-[500px]' placeholder='Enter your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='py-4' />
            <Button type='submit' className='bg-[#F36421] text-white font-bold border-2 border-white rounded-full text-[18px] px-8 hover:bg-[#F36421]/80'>
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* BACKGROUND */}
      <Image 
        src={Background}
        alt='Star Background'
        className='absolute w-full h-[600px] translate-y-[40px] z-0 object-cover'
      />
    </div>
  )
}

export default SignInPage