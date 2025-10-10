# Projeto Escola

Este é um projeto de exemplo para gerenciamento de cursos, alunos e matrículas, utilizando Node.js, Fastify, TypeScript, Drizzle ORM e PostgreSQL.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [pino-pretty](https://github.com/pinojs/pino-pretty)
- [Zod](https://zod.dev/)
- [@faker-js/faker](https://fakerjs.dev/)

## Como rodar o projeto

### 1. Clone o repositório

```sh
git clone https://github.com/seu-usuario/projeto-escola.git
cd projeto-escola
```

### 2. Instale as dependências

```sh
npm install
```

### 3. Configure o banco de dados

- Certifique-se de ter o Docker instalado.
- Suba o banco de dados PostgreSQL:

```sh
docker compose up -d
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
DATABASE_URL='postgresql://user:password@localhost:5432/desafio-escola'
NODE_ENV='development'
```

### 5. Gere e rode as migrações

```sh
npm run db:generate
npm run db:migrate
```

### 6. (Opcional) Popule o banco com dados de exemplo

```sh
npm run db:seed
```

### 7. Rode o servidor

```sh
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

## Endpoints

- `POST /courses` — Cria um novo curso
- `GET /courses` — Lista todos os cursos (com filtros)
- `GET /courses/:id` — Busca um curso pelo ID

Veja exemplos de requisições no arquivo `requisicoes.http`.

## Observações

- Os logs do servidor são formatados com `pino-pretty` para facilitar a leitura durante o desenvolvimento.
- O projeto utiliza Drizzle ORM para manipulação do banco de dados PostgreSQL.
