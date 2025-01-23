const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const fs = require("fs");
const { parse } = require("csv-parse");

// Function to process a CSV file
const processCSV = (filePath: string, role: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const players: any[] = [];

    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (data: any) => {
        players.push({
          id: data[0],
          username: data[1],
          role: role,
          password: data[2],
        });
      })
      .on("end", () => resolve(players))
      // @ts-ignore
      .on("error", (error) => reject(error));
  });
};

// Main function to load data into the database
const load = async () => {
  try {
    // Read data from both CSV files
    const userPlayers = await processCSV("prisma/ksep_caksep.csv", Role.USER);
    const kajasepPlayers = await processCSV("prisma/ksep_kajasep.csv", Role.KAJASEP);

    // Combine both datasets
    const allPlayers = [...userPlayers, ...kajasepPlayers];

    // Clear existing data and insert new data
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: allPlayers,
    });

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seeding function
load();
