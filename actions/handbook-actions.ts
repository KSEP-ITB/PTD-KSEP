"use server"

import prisma from "@/lib/prisma"

export const createHandbook = async (day: string, title: string, link: string) => {
  try {
    await prisma.handbook.create({
      data: {
        day,
        title,
        link,
      }
    })
  } catch (error) {
    throw new Error("Cannot create handbook")
  }
}

export const getAllHandbook = async () => {
  try {
    return await prisma.handbook.findMany()
  } catch (error) {
    throw new Error("Cannot get handbook")
  }
}

export const deleteHandbook = async (id: string) => {
  await prisma.handbook.delete({
    where: {
      id
    }
  })
}