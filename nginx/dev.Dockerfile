FROM nginx
#overrite default.conf
COPY ./dev.default.conf /etc/nginx/conf.d/default.conf 