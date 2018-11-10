FROM node:slim

RUN apt-get update && apt-get install -y \
    dos2unix

RUN npm install -g nodemon@1.14.7

COPY package.json /skill/package.json

RUN mkdir -p /skill/
WORKDIR /skill/
RUN npm install

EXPOSE 8000
EXPOSE 27017

COPY entrypoint.sh /skill
<<<<<<< HEAD
RUN dos2unix /skill/entrypoint.sh
RUN chmod +x /skill/entrypoint.sh

ENTRYPOINT ["sh","/skill/entrypoint.sh"]
