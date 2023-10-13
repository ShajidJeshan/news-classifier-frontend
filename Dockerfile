FROM nginx:alpine
ENV TZ="Asia/Dhaka"
COPY ./dist /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d
RUN chmod -R 777 /usr/share/nginx/html
RUN chmod -R 777 /etc/nginx/conf.d

