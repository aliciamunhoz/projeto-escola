import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";

async function seed() {
  const coursesInsert = await db
    .insert(courses)
    .values([
      {
        title: "Docker",
        description: "Curso básico de Docker",
      },
      {
        title: "Kubernetes",
        description: "Curso básico de Kubernetes",
      },
      {
        title: "Node.js",
        description: "Curso básico de Node.js",
      },
      {
        title: "React",
        description: "Curso básico de React",
      },
    ])
    .returning();

  const usersInsert = await db
    .insert(users)
    .values([
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
    ])
    .returning();

  await db.insert(enrollments).values([
    { userId: usersInsert[0].id, courseId: coursesInsert[0].id },
    { userId: usersInsert[0].id, courseId: coursesInsert[1].id },
    { userId: usersInsert[1].id, courseId: coursesInsert[1].id },
    { userId: usersInsert[1].id, courseId: coursesInsert[2].id },
    { userId: usersInsert[2].id, courseId: coursesInsert[2].id },
    { userId: usersInsert[2].id, courseId: coursesInsert[3].id },
    { userId: usersInsert[3].id, courseId: coursesInsert[3].id },
    { userId: usersInsert[3].id, courseId: coursesInsert[0].id },
    { userId: usersInsert[4].id, courseId: coursesInsert[0].id },
    { userId: usersInsert[4].id, courseId: coursesInsert[1].id },
  ]);

  console.log("Seeded database");
}

seed();
