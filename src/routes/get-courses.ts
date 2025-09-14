import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { z } from "zod";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get all courses",
        description: "Endpoint to retrieve all courses",
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid().describe("ID do curso"),
                title: z.string().describe("Título do curso"),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await db
        .select({
          id: courses.id,
          title: courses.title,
        })
        .from(courses);
      return reply.send({ courses: result });
    }
  );
};
