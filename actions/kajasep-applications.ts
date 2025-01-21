"use server";

import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@prisma/client"; // If needed

/**
 * Create/submit a Kajasep application.
 * This will also increment the Kajasep's `totalApplicants`.
 *
 * NOTE: A user can only have ONE application total.
 * Remove that unique constraint or use a composite
 * index if you want multiple Kajasep applications per user.
 */
export const createKajasepApplication = async (
  userId: string,
  kajasepId: string,
  message?: string
) => {
  try {
    if (!userId || !kajasepId) {
      throw new Error("User ID and Kajasep ID are required.");
    }

    // check if user already has an application (if needed)
     const existing = await prisma.kajasepApplication.findUnique({
       where: { applicantId: userId },
     });
     if (existing) {
       throw new Error("User already applied.");
     }

    // Atomic transaction: create application & increment totalApplicants
    const [newApplication] = await prisma.$transaction([
      prisma.kajasepApplication.create({
        data: {
          applicantId: userId,
          kajasepId,
          message,
        },
      }),
      prisma.kajasep.update({
        where: { id: kajasepId },
        data: {
          totalApplicants: { increment: 1 },
        },
      }),
    ]);

    return newApplication;
  } catch (error) {
    console.error("Error creating Kajasep application:", error);
    throw new Error("Unable to create Kajasep application.");
  }
};

/**
 * Cancel (remove) a user's application.
 * This deletes the application and decrements the Kajasep's `totalApplicants`.
 *
 * Because we have @unique on `applicantId`, we can do a simple
 * findUnique by the user. Otherwise, we should find by (kajasepId, applicantId).
 */
export const cancelKajasepApplication = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to cancel an application.");
    }

    // Find the application by userId
    const existingApp = await prisma.kajasepApplication.findUnique({
      where: { applicantId: userId },
    });

    if (!existingApp) {
      throw new Error("Application not found for this user.");
    }

    // Atomic transaction: delete application & decrement totalApplicants
    const [deletedApp] = await prisma.$transaction([
      prisma.kajasepApplication.delete({
        where: { applicantId: userId },
      }),
      prisma.kajasep.update({
        where: { id: existingApp.kajasepId },
        data: {
          totalApplicants: { decrement: 1 },
        },
      }),
    ]);

    return deletedApp;
  } catch (error) {
    console.error("Error canceling Kajasep application:", error);
    throw new Error("Unable to cancel Kajasep application.");
  }
};

/**
 * Change/modify the application status or message.
 *
 * NOTE: PLEASE USE THE ACTION ON THE kajasep-actions.ts FOR ACCEPT/REJECT APPLICATIONS
 * E.g., from APPLIED -> APPROVED or REJECTED, etc.
 * Also can modify the message if needed.
 */
export const updateKajasepApplication = async (
  applicationId: string,
  {
    applyStatus,
    message,
  }: {
    applyStatus?: ApplicationStatus;
    message?: string;
  }
) => {
  try {
    if (!applicationId) {
      throw new Error("Application ID is required.");
    }

    // Update only fields that are provided
    const updatedData: any = {};
    if (applyStatus) updatedData.applyStatus = applyStatus;
    if (message !== undefined) updatedData.message = message;

    const updatedApp = await prisma.kajasepApplication.update({
      where: { id: applicationId },
      data: updatedData,
    });

    return updatedApp;
  } catch (error) {
    console.error("Error updating application:", error);
    throw new Error("Unable to update application.");
  }
};

/**
 * Count how many applicants a Kajasep has.
 * If you rely on the `totalApplicants` field, you can also just
 * read that from Kajasep. Or you can count from the DB directly.
 */
export const countKajasepApplicants = async (kajasepId: string) => {
  try {
    if (!kajasepId) {
      throw new Error("Kajasep ID is required to count applicants.");
    }

    const count = await prisma.kajasepApplication.count({
      where: { kajasepId },
    });

    return count;
  } catch (error) {
    console.error("Error counting Kajasep applicants:", error);
    throw new Error("Unable to count Kajasep applicants.");
  }
};
