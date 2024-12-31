FROM node:18-buster as builder

WORKDIR /app

RUN npm install -g typescript pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

COPY turbo.json . 
COPY packages ./packages
COPY apps/http-server ./apps/http-server


RUN pnpm install 
RUN pnpm run build

CMD ["pnpm", "start:api"]







