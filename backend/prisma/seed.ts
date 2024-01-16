import { PrismaClient } from '@prisma/client';
import { users } from './seeds/users.seed';
import { companies } from './seeds/companies.seed';
const prisma = new PrismaClient();

async function main() {
  await addCompanies();
  await addUsers();
}

const addCompanies = async () => {
  for (const empresa of companies) {
    const result = await prisma.empresa.findFirst({
      where: {
        id: empresa.id,
      },
    });

    if (!result) {
      await prisma.empresa.create({
        data: empresa,
      });
    }
  }
};

const addUsers = async () => {
  for (const usuario of users) {
    const result = await prisma.usuario.findFirst({
      where: {
        id: usuario.id,
      },
    });

    if (!result) {
      await prisma.usuario.create({
        data: usuario,
      });
    }
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
