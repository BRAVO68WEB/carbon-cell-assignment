FROM oven/bun:latest

WORKDIR /app

COPY package.json ./

RUN bun i

COPY . .

EXPOSE 3000

CMD [ "bun", "run", "dev" ]