FROM nginx:1.27.3-alpine-slim
COPY nginx.conf /etc/nginx/nginx.conf

ADD /storybook-static /usr/share/nginx/html

EXPOSE 8080
