const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const fs = require("fs");
const { parse } = require("csv-parse");

let players: any = [];

fs.createReadStream("prisma/credentials.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", (data: any) => {
    players.push({
      id: data[0],
      username: data[1],
      role: Role.USER,
      password: data[2],
    });
  })
  .on("end", function () {
    load(players);
    console.log(players);
  });

const load = async (players: any) => {
  try {
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: players,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
