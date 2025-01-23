"use client"
// Library Import
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
// Component Import
import CaKSEPHeader from '@/components/CaKSEP/CaKSEPHeader'
import { getApplicationByApplicantId } from '@/actions/kajasep-applications'

const page = () => {
  const { data: session } = useSession()
  const [myApplication, setMyApplication] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getMyApplication() {
      try {
        if (session?.user.id) {
          const data = await getApplicationByApplicantId(session?.user.id)
          setMyApplication(Array.isArray(data) ? data : [data])
        }
      } catch (error) {
        console.log("Error fetching application:", error)
      } finally {
        setIsLoading(false)
      }
    }
    getMyApplication()
  }, [session?.user.id])

  return (
    <div className="w-full h-full flex flex-col items-center space-y-8 bg-[#FF5F6D]/25 pb-20">
      <CaKSEPHeader />

      {/* Display Applications */}
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-white mb-4">My Applications</h2>
        
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : myApplication.length > 0 ? (
          <div className="space-y-4">
            {myApplication.map((application, index) => (
              <div
                key={index}
                className="w-full bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] p-4 rounded-md shadow-md text-white"
              >
                <p><strong>Kajasep ID:</strong> {application.kajasepId}</p>
                <p><strong>Message:</strong> {application.message || "No message provided"}</p>
                <p>
                  <strong>Status:</strong> {application.applyStatus}
                </p>
                <p><strong>Created At:</strong> {new Date(application.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(application.updatedAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white italic">You have no applications yet.</p>
        )}
      </div>
    </div>
  )
}

export default page