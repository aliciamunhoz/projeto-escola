import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses, enrollments } from "../database/schema.ts";
import { z } from "zod";
import { asc, eq, ilike, and, type SQL, count } from "drizzle-orm";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get all courses",
        description: "Endpoint to retrieve all courses",
        querystring: z.object({
          search: z
            .string()
            .optional()
            .describe("Termo de busca para filtrar cursos"),
          orderBy: z
            .enum(["title"])
            .optional()
            .default("title")
            .describe("Campo para ordenar os cursos"),
          page: z.coerce.number().optional().default(1).describe("Página"),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid().describe("ID do curso"),
                title: z.string().describe("Título do curso"),
                enrollments: z
                  .number()
                  .describe("Número de inscrições no curso"),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query;

      const conditions: SQL[] | undefined = [];

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`));
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: courses.id,
            title: courses.title,
            enrollments: count(enrollments.id).as("enrollments"),
          })
          .from(courses)
          .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
          .groupBy(courses.id)
          .orderBy(asc(courses[orderBy]))
          .limit(10)
          .offset((page - 1) * 10)
          .where(and(...conditions)),
        db.$count(courses, and(...conditions)),
      ]);

      return reply.send({ courses: result, total });
    }
  );
};
