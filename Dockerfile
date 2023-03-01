FROM node:16 as builder

WORKDIR /usr/src/app

RUN mkdir ./build

COPY ./routes.json ./build
COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

RUN npm run build






FROM node:16

WORKDIR /usr/src/app

ARG MONGO_DB_URL
ARG JWT_ACCESS_KEY
ARG JWT_REFRESH_KEY

ENV PORT=8080
ENV SERVER_ADDRESS=http://192.168.31.166:8080
ENV MONGO_DB_URL=${MONGO_DB_URL}
ENV JWT_ACCESS_TOKEN_SECRET=${JWT_ACCESS_KEY}
ENV JWT_REFRESH_TOKEN_SECRET=${JWT_REFRESH_KEY}

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci --production

COPY --from=builder /usr/src/app/build ./dist


EXPOSE 8080
CMD [ "node", "dist/index.js" ]
