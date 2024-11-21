"use client"

import AssignmentHeader from '@/components/Assigment/AssignmentHeader'
import AssignmentCard from '@/components/Assigment/AssignmentCard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { assignmentForStudentSchema, assignmentForStudentType, assignmentForStudentTypeWithId } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { createAssigmentForStudent, createStudentAssigment, getAllAssigmentForStudent } from '@/actions/assigment-actions'
import { toast } from 'sonner'

const AssignmentsPage = () => {
  // const { data: session } = useSession()
  // const router = useRouter()
  // const [dialogOpen, setDialogOpen] = useState(false)
  // const [assigment, setAssigment] = useState<assignmentForStudentTypeWithId[]>([])

  // useEffect(() => {
  //   async function getAllAssigmentData() {
  //     const data = await getAllAssigmentForStudent()
  //     setAssigment(data)
  //   }

  //   getAllAssigmentData()
  // }, [])

  // // if (!session) {
  // //   router.push("/sign-in")
  // // }

  // const form = useForm<assignmentForStudentType>({
  //   resolver: zodResolver(assignmentForStudentSchema),
  //   defaultValues: {
  //     day: "",
  //     title: "",
  //     description: "",
  //     dueDate: "",
  //     linkAttach: "",
  //   }
  // })

  // async function onSubmit(values: assignmentForStudentType) {
  //   console.log(values)
  //   try {
  //     await createAssigmentForStudent(values.day, values.title, values.description, values.dueDate)
  //     toast("Successfully created an assigment")
  //     setDialogOpen(false)

  //     const data = await getAllAssigmentForStudent()
  //     setAssigment(data)
  //   } catch (error) {
  //     toast("Failed to create an assigment")
  //   }
  // }

  // const handleDeleteAssignment = (id: string) => {
  //   setAssigment(prev => prev.filter(assignment => assignment.id !== id))
  // }
  
  return (
    <div className="w-full h-full">
      <AssignmentHeader />

      {/* ADMIN ONLY
      {session?.user.role === "ADMIN" && (
        <div className='bg-[#FFCBD5] w-full px-4 py-8 text-white flex flex-col items-center justify-center
        '>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button onClick={() => setDialogOpen(true)}>
                Add Assigment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Assigment</DialogTitle>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                      control={form.control}
                      name='day'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Day</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter day...' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter title...' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder='Enter description...'
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name='dueDate'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>dueDate</FormLabel>
                          <FormControl>
                            <Input placeholder='Ikutin format DD/MM/YYYY' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    /><FormField 
                    control={form.control}
                    name='linkAttach'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link Attachment</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter link attachment' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                    <div className='py-2' />
                    <Button type='submit' className='w-full'>
                      Create Announcement
                    </Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>  
      )}
      
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-4">
        {assigment.map((assignment, index) => (
          <AssignmentCard
            key={index}
            id={assignment.id}
            day={assignment.day}
            title={assignment.title}
            description={assignment.description}
            dueDate={assignment.dueDate}
            linkAttach={assignment.linkAttach}
            onDelete={handleDeleteAssignment}
          />
        ))}
      </div>
      </div> */}
    </div>
  )
}
export default AssignmentsPage