"use server"

import prisma from "@/lib/prisma"

export const createHandbook = async (
  day: string,
  title: string,
  link: string
) => {
  try {
    if (!day || !title || !link) {
      throw new Error("All fields (day, title, and link) are required.");
    }

    const newHandbook = await prisma.handbook.create({
      data: {
        day,
        title,
        link,
      },
    });

    return newHandbook;
  } catch (error) {
    console.error("Error creating handbook:", error);
    throw new Error("Cannot create handbook");
  }
};

export const getAllHandbook = async () => {
  try {
    const handbooks = await prisma.handbook.findMany();

    return handbooks;
  } catch (error) {
    console.error("Error fetching handbooks:", error);
    throw new Error("Cannot get handbook");
  }
};

export const deleteHandbook = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Handbook ID is required.");
    }

    const deletedHandbook = await prisma.handbook.delete({
      where: {
        id,
      },
    });

    return deletedHandbook;
  } catch (error) {
    console.error("Error deleting handbook:", error);
    throw new Error("Cannot delete handbook");
  }
};