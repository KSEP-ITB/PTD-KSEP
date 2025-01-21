"use server";

import prisma from "@/lib/prisma";

export const getKajasepFromUserId = async (userId: string) => {
  if (!userId) {
    throw new Error("Id is required");
  }

  try {
    const kajasep = await prisma.kajasep.findUnique({
      where: {
        userId,
      },
    });

    return kajasep;
  } catch (error) {
    throw new Error("Failed to fetch kajasep");
  }
};

export const getApplicationsFromKjasepId = async (kajasepId: string) => {
  if (!kajasepId) {
    throw new Error("Id is required");
  }

  try {
    const applications = await prisma.kajasepApplication.findMany({
      where: {
        kajasepId,
      },
      select: {
        id: true,
        applicant: {
          select: {
            username: true,
          },
        },
        message: true,
        applyStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return applications;
  } catch (error) {
    throw new Error("Failed to fetch applications");
  }
};

export const getDejasepFromKajasepId = async (id: string) => {
  if (!id) {
    throw new Error("Id is required");
  }

  try {
    const kajasep = await prisma.kajasep.findUnique({
      where: {
        id,
      },
      select: {
        dejaseps: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!kajasep) {
      throw new Error("Kajasep not found");
    }

    return kajasep.dejaseps;
  } catch (error) {
    throw new Error("Failed to fetch dejasep");
  }
};

interface UpdateKajasepParams {
  name?: string;
  nickname?: string;
  description?: string;
  requirement?: string;
  imageUrl?: string;
}

export const updateKajasepInfo = async (
  id: string,
  params: UpdateKajasepParams
) => {
  if (!id) {
    throw new Error("Id is required");
  }

  try {
    const updateData = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      throw new Error("No fields provided to update");
    }

    const kajasep = await prisma.kajasep.update({
      where: { id },
      data: updateData,
    });

    return kajasep;
  } catch (error) {
    throw new Error("Failed to update info");
  }
};

export const acceptDejasep = async (
  kajasepId: string,
  dejasepId: string,
  applicationId: string
) => {
  if (!kajasepId || !dejasepId || !applicationId) {
    throw new Error(
      "All fields (kajasepId, dejasepId, applicationId) are required"
    );
  }

  try {
    const kajasep = await prisma.kajasep.update({
      where: {
        id: kajasepId,
      },
      data: {
        dejaseps: {
          connect: { id: dejasepId },
        },
      },
    });

    if (!kajasep) {
      throw new Error("Kajasep not found");
    }

    const dejasep = await prisma.user.update({
      where: {
        id: dejasepId,
      },
      data: {
        acceptedKajasep: {
          connect: { id: kajasepId },
        },
      },
    });

    if (!dejasep) {
      throw new Error("Dejasep not found");
    }

    const application = await prisma.kajasepApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        applyStatus: "APPROVED",
      },
    });

    if (!application) {
      throw new Error("Application not found");
    }

    return { kajasep, dejasep, application };
  } catch (error) {
    throw new Error(`Failed to accept dejasep`);
  }
};

export const rejectDejasep = async (
  kajasepId: string,
  dejasepId: string,
  applicationId: string
) => {
  if (!kajasepId || !dejasepId || !applicationId) {
    throw new Error("applicationId required");
  }

  try {
    const application = await prisma.kajasepApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        applyStatus: "REJECTED",
      },
    });

    return application;
  } catch (error) {
    throw new Error(`Failed to reject dejasep`);
  }
};
