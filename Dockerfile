FROM node:9.8.0

RUN git clone https://github.com/healthenabled/gdhi-app.git

WORKDIR $PWD/gdhi-app

RUN npm config set unsafe-perm=true
RUN npm install
RUN npm test
RUN npm run build
RUN npm run package

FROM centos/httpd

COPY --from=0 $PWD/gdhi-app/dist /var/www/html
