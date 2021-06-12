FROM nginx:stable-alpine

ARG CONFIG_NAME
COPY $CONFIG_NAME.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
