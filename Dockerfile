FROM node:14.16.0-alpine

WORKDIR /app
COPY . /app

RUN npm i -g npm \
    && npm ci \
    && npm run build

EXPOSE 3000
