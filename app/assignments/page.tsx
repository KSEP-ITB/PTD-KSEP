"use client"

// Library Import
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Auth Import
import { useSession } from 'next-auth/react'

// Components Import
import AssignmentHeader from '@/components/Assigment/AssignmentHeader'
import AssignmentCard from '@/components/Assigment/AssignmentCard'
import AddAssignmentDialog from '@/components/Assigment/AddAssignmentDialog'
import { toast } from 'sonner'

// Schemas Import
import { assignmentForStudentType } from '@/lib/schemas'



// import { useForm } from 'react-hook-form'
// import { assignmentForStudentSchema, assignmentForStudentType, assignmentForStudentTypeWithId } from '@/lib/schemas'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Textarea } from '@/components/ui/textarea'
// import { createAssigmentForStudent, createStudentAssigment, getAllAssigmentForStudent } from '@/actions/assigment-actions'


const dummyAssignments = [
  {
    day: "Monday",
    title: "Introduction to React",
    description: "Learn the basics of React.js, including components, state, and props.",
    dueDate: "25/11/2024",
    linkAttach: "https://example.com/react-intro-resources",
  },
];

const AssignmentsPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push("/sign-in")
  }

  if (session && session.user.role === 'USER') {
    router.push("/assignments")
  }


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

  const [assignments, setAssignments] = useState(dummyAssignments);

  const handleAddAssignment = (newAssignment: assignmentForStudentType) => {
    const id = (assignments.length + 1).toString();

    // @ts-ignore
    setAssignments([...assignments, { id, ...newAssignment }]); // Tambahkan data baru
  };

  const handleDelete = (id: string) => { 
    // @ts-ignore
    const updatedassignments = assignments.filter((item) => item.id !== id);
    setAssignments(updatedassignments);
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-pink-100 pb-20">
      <AssignmentHeader />

      { session && session.user.role === 'ADMIN' && (
        <div className='px-4 max-w-5xl w-full flex flex-col items-start'>
          <AddAssignmentDialog onAddAssignment={handleAddAssignment}/>
        </div>
      )}

      <div className="px-4 max-w-5xl w-full space-y-4">
        {assignments
          .slice()
          .reverse()
          .map((assignment, index) => (
            <AssignmentCard
              key={index}
              id={index.toString()}
              day={assignment.day}
              title={assignment.title}
              description={assignment.description}
              dueDate={assignment.dueDate}
              linkAttach={assignment.linkAttach}
              onDelete={handleDelete}
            />
        ))}
      </div>

    </div>
  )
}
export default AssignmentsPage