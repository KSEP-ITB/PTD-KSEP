"use client"

import { getAllStudentAssigmentByAssigmentId } from '@/actions/assigment-actions'
import { getUserById } from '@/actions/user-actions'
import Banner from '@/components/Assigment/AssigmentBanner'
import { studentAssignmentTypeWithId } from '@/lib/schemas'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type SubmissionWithUser = studentAssignmentTypeWithId & { userName: string | null }

const page = () => {
  const pathname = usePathname()
  const [submissions, setSubmissions] = useState<SubmissionWithUser[]>([])

  useEffect(() => {
    const assignmentId = pathname.split('/')[2] // Asumsi URL memiliki format /assignments/{id}

    async function getAllSubmissionData() {
      try {
        if (assignmentId) {
          const data = await getAllStudentAssigmentByAssigmentId(assignmentId)
          
          // Mengambil data pengguna untuk setiap pengumpulan
          const submissionsWithUsers = await Promise.all(
            data.map(async (submission) => {
              const user = await getUserById(submission.userId)
              return {
                ...submission,
                userName: user ? user.username : 'Unknown User',
              }
            })
          )

          setSubmissions(submissionsWithUsers)
        }
      } catch (error) {
        console.error('Failed to fetch submissions:', error)
      }
    }

    getAllSubmissionData()
  }, [pathname])

  return (
    <div className="w-full min-h-screen bg-[#FFCBD5] flex flex-col items-center">
      <Banner />
      <div>
        <h2 className="text-2xl font-bold py-12">
          Submissions for Assignment {submissions.length > 0 ? submissions[0].assignmentId : 'N/A'}
        </h2>
        <ul>
          {submissions.map((item) => (
            <li key={item.id} className='px-2 py-4 border-white border-2 bg-white/25 rounded-lg'>
              <p>ID: {item.id}</p>
              <p>User: {item.userName}</p>
              <p>Link: <a href={item.link}>{item.link}</a></p>
              <p>Submitted At: {new Date(item.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default page
