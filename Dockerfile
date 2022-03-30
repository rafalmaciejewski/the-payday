FROM node:16.14.2-alpine AS builder

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json package-lock.json tsconfig.json /app/

RUN npm install

COPY src/. /app/src

ENV NODE_ENV production

RUN npm run build

FROM node:16.14.2-alpine AS runtime

ENV NODE_ENV production
WORKDIR /app

COPY package.json package-lock.json .npmrc tsconfig.json /app/

RUN npm install --production
COPY --from=builder /app/build /app/build

ENV PORT 8099

EXPOSE 8099

CMD npm run start:prod
