FROM node:14.16.0-alpine

ARG TARGET

WORKDIR /app
COPY . /app

RUN npm i -g npm \
    && npm ci \
    && sh -c 'npm run build_$TARGET'

EXPOSE 3000
