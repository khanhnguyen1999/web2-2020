FROM node:stretch-slim

COPY . /code
WORKDIR /code

COPY package.json /code
RUN npm i

RUN npm i --save bcrypt

EXPOSE 4000
ENTRYPOINT npm start