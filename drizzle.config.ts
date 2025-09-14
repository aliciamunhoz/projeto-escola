import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required.");
}

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    ssl: false,
  },
  out: "./drizzle", // arquivos gerados vão para a pasta drizzle
  schema: "./src/database/schema.ts", // caminho para o arquivo de schema (determina as tabelas e colunas do banco de dados)
});
