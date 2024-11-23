"use server"

import prisma from "@/lib/prisma";

export const createStudentAssignment = async (
  userId: string,
  assignmentId: string,
  link: string,
) => {
  try {
    if (!userId || !assignmentId || !link) {
      throw new Error("All fields (userId, assignmentId, and link) are required.");
    }

    const newStudentAssignment = await prisma.studentAssignment.create({
      data: {
        link,
        userId,
        assignmentId,
      },
    });

    return newStudentAssignment;
  } catch (error) {
    console.error("Error creating student assignment:", error);
    throw new Error("Unable to create student assignment.");
  }
};

export const getAllStudentAssignmentByAssignmentId = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Assignment ID is required.");
    }

    return await prisma.studentAssignment.findMany({
      where: { assignmentId: id },
    });
  } catch (error) {
    console.error("Error fetching student assignments:", error);
    throw new Error("Unable to fetch student assignments.");
  }
};

export const getStudentAssignmentByAssignmentIdAndUserId = async (
  assignmentId: string,
  userId: string
) => {
  try {
    if (!assignmentId || !userId) {
      throw new Error("Both assignmentId and userId are required.");
    }

    const data = await prisma.studentAssignment.findFirst({
      where: { assignmentId, userId },
    });

    return data !== null;
  } catch (error) {
    console.error("Error checking student assignment existence:", error);
    throw new Error("Unable to check student assignment.");
  }
};

// ASSIGNMENT FOR STUDENT (NOT SUBMISSION)
export const getAllAssignments = async () => {
  try {
    const assignments = await prisma.assignmentForStudent.findMany();

    return assignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw new Error("Unable to fetch assignments.");
  }
};

export const createAssignmentForStudent = async (
  day: string,
  title: string,
  description: string,
  dueDate: string,
  linkAttach?: string
) => {
  try {
    if (!day || !title || !description || !dueDate) {
      throw new Error("All fields (day, title, description, and dueDate) are required.");
    }

    const newAssignment = await prisma.assignmentForStudent.create({
      data: { day, title, description, dueDate, linkAttach },
    });

    return newAssignment;
  } catch (error) {
    console.error("Error creating assignment for student:", error);
    throw new Error("Unable to create assignment for student.");
  }
};

export const deleteAssignmentForStudent = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Assignment ID is required.");
    }

    return await prisma.assignmentForStudent.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting assignment for student:", error);
    throw new Error("Unable to delete assignment for student.");
  }
};

export const getAssignmentForStudentById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Assignment ID is required.");
    }

    return await prisma.assignmentForStudent.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching assignment for student:", error);
    throw new Error("Unable to fetch assignment for student.");
  }
}