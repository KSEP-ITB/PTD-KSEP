import React from 'react'

const Loading = () => {
  return (
    <div className="px-4 w-full h-[80vh] flex flex-col items-center justify-center bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
    </div>
  )
}

export default Loading
