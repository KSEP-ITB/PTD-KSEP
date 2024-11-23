"use client"

// Library Import
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Auth Import
import { useSession } from 'next-auth/react'

// Actions Import
import { getAssignmentForStudentById } from '@/actions/assigment-actions'

// Schemas Import
import { assignmentForStudentTypeWithId } from '@/lib/schemas'

// Components Import
import { Button } from '@/components/ui/button'

const page = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const [assignment, setAssignment] = useState<assignmentForStudentTypeWithId>();

  if (!session) {
    router.push("/sign-in")
  }

  useEffect(() => {
    const id = pathname?.split("/").pop();

    const fetchAssignment = async () => {
      try {
        if (id) {
          const assignmentData = await getAssignmentForStudentById(id);
          if (assignmentData) {
            setAssignment(assignmentData);
          }
        }
      } catch (error) {
        console.error(error);
      } 
    };

    fetchAssignment();
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-pink-100 pb-20">
      <div />

      {assignment && (
        <div className="w-full max-w-5xl p-6 bg-gradient-to-b from-purple-200 to-pink-200 border-white rounded-lg text-gray-800">
          <h1 className="text-3xl font-bold mb-4 text-purple-600">{assignment.day}</h1>
          <h3 className="text-2xl font-semibold mb-6 text-pink-600">{assignment.title}</h3>
          
          <div
            className="overflow-x-auto bg-white p-4 rounded-md mb-6 text-gray-700 shadow-sm border border-purple-100"
            dangerouslySetInnerHTML={{ __html: assignment.description }}
          ></div>
        
          <p className="text-sm mb-6">
            <span className="font-semibold text-purple-500">Due Date:</span>{" "}
            <span className="font-medium">{assignment.dueDate}</span>
          </p>
        
          <Button className="px-6 py-2 text-white bg-pink-300 hover:bg-pink-400 font-medium rounded-md shadow-md transition duration-200">
            See Attachment
          </Button>
        </div>    
      )}
    </div>
  )
}

export default page