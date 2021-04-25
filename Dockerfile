FROM node:14.16.0-alpine AS frontend
WORKDIR /app
COPY . /app
RUN apk update && apk add --no-cache python \
    && npm config set unsafe-perm true \
    && npm install -g npm \
    && npm ci \
    && npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=frontend /app/dist /etc/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
