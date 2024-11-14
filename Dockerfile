FROM nginx:1.27.2
COPY nginx.conf /etc/nginx/nginx.conf

ADD /storybook-static /usr/share/nginx/html

EXPOSE 8080
