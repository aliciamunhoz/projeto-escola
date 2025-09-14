import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get course by ID",
        description: "Endpoint to retrieve a course by its ID",
        response: {
          200: z.object({
            course: z.object({
              id: z.uuid().describe("ID do curso"),
              title: z.string().describe("Título do curso"),
              description: z.string().nullable().describe("Descrição do curso"),
            }),
          }),
          404: z.string().describe("Curso não encontrado"),
        },
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const courseId = request.params.id;

      const course = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (course.length > 0) {
        return reply.send({ course: course[0] });
      }
      return reply.status(404).send("Curso não encontrado");
    }
  );
};
