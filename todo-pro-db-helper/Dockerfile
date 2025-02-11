FROM node:20-alpine

RUN mkdir -p /opt/app
ADD . /opt/app
WORKDIR /opt/app

RUN rm -rf node_modules/
RUN yarn
