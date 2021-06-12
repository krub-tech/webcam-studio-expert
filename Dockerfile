FROM node:14.16.0-alpine

ARG TARGET

WORKDIR /app
COPY . /app

RUN npm i -g npm \
    && npm ci \
    && nuxt build --dotenv .env.$TARGET

EXPOSE 3000
