"use client"

import { UploadButton } from '@/utils/uploadthing';
import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {
  const { data: session, status } = useSession()
  console.log(session)
  
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          console.log(error)
        }}
      />
      {/* ADMIN ONLY */}
      <div className='bg-[#4E2865] w-full px-4 py-2 text-white'>
      {session ? (
        <p>Selamat datang, {session.user?.name}</p>
      ) : (
        <p>Silakan masuk</p>
      )}
      </div>  
    </div>
  )
}

export default page