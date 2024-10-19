"use server"

import prisma from "@/lib/prisma";

export const createStudentAssigment = async (userId: string, assignmentId: string, link: string) => {  
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  
    if (!user || user.role !== 'USER') {
      throw new Error('Hanya pengguna dengan peran USER yang dapat mengumpulkan tugas.');
    }

    const newStudentAssigment = await prisma.studentAssignment.create({
      data: {
        link,
        userId,
        assignmentId,
      }
    })

    return newStudentAssigment
  } catch (error) {
    throw new Error('Cant create student assigment');
  }
}

export const getAllStudentAssigmentByAssigmentId = async (id: string) => {
  return await prisma.studentAssignment.findMany({
    where: {
      assignmentId: id
    }
  })
}

export const getStudentAssigmentByAssigmentIdAndUserId = async (assigmentId: string, userId: string) => {
  const data = prisma.studentAssignment.findFirst({
    where: {
      assignmentId: assigmentId,
      userId: userId
    }
  })

  return data !== null
}

export const createAssigmentForStudent = async(day: string, title: string, description: string, dueDate: string) => {
  try {
    const newAssignmentForStudent = await prisma.assignmentForStudent.create({
      data: {
        day,
        title,
        description,
        dueDate,
      },
    });

    return newAssignmentForStudent
  } catch (error) {
    throw new Error('Cant create assigment for student');
  }
}

export const getAllAssigmentForStudent = async () => {
  return await prisma.assignmentForStudent.findMany()
}

export const deleteAssigmentForStudent = async (id: string) => {
  return await prisma.assignmentForStudent.delete({
    where: {
      id,
    }
  })
}