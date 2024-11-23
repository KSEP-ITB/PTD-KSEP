"use server"

import prisma from "@/lib/prisma"

export const getUserByUsername = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = password === user.password
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  return user;
};

export const getUserRole = async (username: string): Promise<string | null> => {
  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        role: true, 
      },
    });

    if (!user) {
      throw new Error(`User with username "${username}" not found`);
    }

    return user.role;
  } catch (error) {
    throw new Error("Failed to retrieve user role");
  }
};

// export const getUserById = async (id: string) => {
//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         id
//       }
//     })

//     return user;
//   } catch (error) {
//     throw new Error("Cannot find the specific user")    
//   }
// }