"use server"

import prisma from "@/lib/prisma"

export const createAnnouncement = async (title: string, content: string) => {
  try {
    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
      },
    });

    return announcement;
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw new Error("Cannot create announcement");
  }
};

export const getAllAnnouncement = async () => {
  try {
    const announcements = await prisma.announcement.findMany();

    return announcements;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw new Error("Cannot get announcements");
  }
};

export const deleteAnnouncement = async (id: string) => {
  try {
    if (!id) {
      throw new Error("ID is required to delete an announcement");
    }

    const deletedAnnouncement = await prisma.announcement.delete({
      where: {
        id,
      },
    });

    return deletedAnnouncement;
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw new Error("Cannot delete announcement");
  }
};