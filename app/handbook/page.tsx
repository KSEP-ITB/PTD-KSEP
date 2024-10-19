'use client'

import SearchBar from '@/components/HBSearchBar'
import Card from '@/components/HBCard'
import Jumbotron from '@/components/HBJumbotron'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { handbookSchema, handbookSchemaType, handbookSchemaTypeWithId } from '@/lib/schemas'
import { createHandbook, deleteHandbook, getAllHandbook } from '@/actions/handbook-actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const Handbook = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [handbooks, setHandbooks] = useState<handbookSchemaTypeWithId[]>([])

  if (!session) {
    router.push("/sign-in")
  }

  useEffect(() => {
    async function getAllHandbookData() {
      const data = await getAllHandbook();
      setHandbooks(data)
    }

    getAllHandbookData()
  }, [])

  const form = useForm<handbookSchemaType>({
    resolver: zodResolver(handbookSchema),
    defaultValues: {
      day: "",
      title: "",
      link: ""
    }
  })

  async function onSubmit(values: handbookSchemaType) {
    try {
      await createHandbook(values.day, values.title, values.link)
      toast("Handbook created successfully")
      setDialogOpen(false)
      const updatedHandbooks = await getAllHandbook()
      setHandbooks(updatedHandbooks)
    } catch (error) {
      console.error(error)
      toast("Failed to create handbook")
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteHandbook(id)
      toast("Handbook deleted successfully")
      const updatedHandbooks = await getAllHandbook()
      setHandbooks(updatedHandbooks)
    } catch (error) {
      console.error(error)
      toast("Failed to delete handbook")
    }
  }

  return (
    <>
      <Jumbotron/>
      {/* ADMIN ONLY */}
      {session?.user.role === 'ADMIN' && (
        <div className='bg-[#0F389B] w-full px-4 py-8 text-white flex flex-col items-center'>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button onClick={() => setDialogOpen(true)}>
                Add Handbook
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Handbook</DialogTitle>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter day...' {...form.register('day')} />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter title...' {...form.register('title')} />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter link...' {...form.register('link')} />
                      </FormControl>
                    </FormItem>
                    <div className='py-2' />
                    <Button type='submit' className='w-full'>
                      Create Handbook
                    </Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div className='bg-[#0F389B] px-20 py-20'>
        {handbooks.map((item) => (
          <Card
            key={item.id}
            HBDay={item.day}
            HBTitle={item.title}
            link={item.link}
            onDelete={() => handleDelete(item.id)}
            isAdmin={session?.user.role === "ADMIN"}
          />
        ))}
      </div>
    </>
  )
}

export default Handbook