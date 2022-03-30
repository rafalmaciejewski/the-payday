FROM node:16.14.2-alpine AS builder

WORKDIR /app

RUN npm install -g "@nestjs/cli@8.2.4"

COPY package.json package-lock.json .npmrc nest-cli.json tsconfig.json tsconfig.build.json /app/

RUN npm install

COPY src/. /app/src

ENV NODE_ENV production

RUN npm run build

FROM node:16.14.2-alpine AS runtime

ENV NODE_ENV production
WORKDIR /app

COPY package.json package-lock.json .npmrc /app/

RUN npm install --production
COPY --from=builder /app/dist /app/dist

ENV PORT 3000

EXPOSE 3000

CMD npm run start:prod
