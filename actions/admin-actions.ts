"use server"

import prisma from "@/lib/prisma"

export const getAllKajasep = async () => {
    try {
        const kajasep = await prisma.kajasep.findMany({
            include: {
                dejaseps: true
            }
        });    
        return kajasep;

    } catch (error) {
        console.error("Error fetching kajasep:", error);
        throw new Error("Failed to fetch all kajasep");
    }
};

// maybe it'll be needed idk
export const getAllDejasep = async () => {
    try {
        const dejasep = await prisma.user.findMany({
            where: {
                role: "USER"   
            },
            include: {
                kajasep: true
            }
        });
        return dejasep;

    } catch (error) {
        console.error("Error fetching dejasep:", error);
        throw new Error("Failed to fetch dejasep");
    }
};