FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf

ADD /storybook-static /usr/share/nginx/html

EXPOSE 8080
