FROM node:stretch-slim

COPY . /code
WORKDIR /code

COPY package.json /code
RUN npm i

RUN npm run build
RUN npm i -g serve

EXPOSE 9000
ENTRYPOINT [ "serve", "-s", "build" ]