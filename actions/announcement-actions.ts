"use server"

import prisma from "@/lib/prisma"

export const createAnnouncement = async (title: string, content: string) => {
  try {
    await prisma.announcement.create({
      data: {
        title,
        content,
      }
    })
  } catch (error) {
    throw new Error("Cannot create announcement")
  }
}

export const getAllAnnouncement = async () => {
  try {
    return await prisma.announcement.findMany()
  } catch (error) {
    console.log(error)
    throw new Error("Cannot get announcement")
  }
}

export const deleteAnnouncement = async (id: string) => {
  await prisma.announcement.delete({
    where: {
      id
    }
  })
}
