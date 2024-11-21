// "use server"

// import prisma from "@/lib/prisma"

export const getUserByUsername = async (username: any, password: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
        password
      }
    })

    return user
  } catch (error) {
    throw new Error("Cannot find the specific user")    
  }
}

// export const getUserRole = async (username: any) => {
//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         username
//       }
//     })

//     return user?.role
//   } catch (error) {
//     throw new Error("Cannot find the specific user")    
//   }
// }

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