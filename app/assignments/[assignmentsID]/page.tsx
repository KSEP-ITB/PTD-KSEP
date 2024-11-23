"use client"

// Library Import
import React from 'react'
import { useRouter } from 'next/navigation'

// Auth Import
import { useSession } from 'next-auth/react'

const page = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push("/sign-in")
  }

  return (
    <div>page</div>
  )
}

export default page