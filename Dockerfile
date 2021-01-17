# base image
FROM node:12.13.0 AS compile-image

# Identify the maintainer of an image:
LABEL maintainer="bandhan.roy1@gmail.com"

# install angular version 8.3.25
RUN npm install -g @angular/cli@8.3.25

# set working directory
WORKDIR /opt/realtime-stock-app-frontend

# Copy Code Base From Local
COPY . /opt/realtime-stock-app-frontend

# Install dependencies
RUN npm install

# add `./node_modules/.bin` to $PATH
ENV PATH="./node_modules/.bin:$PATH"

# build the project in prod mode
RUN ng build --prod

# Set up nginx
FROM nginx:1.15.2-alpine
RUN rm -rf /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf

# Copy config and run project
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/realtime-stock-app-frontend/dist/realtime-stock-app /usr/share/nginx/html

CMD nginx -g "daemon off;"