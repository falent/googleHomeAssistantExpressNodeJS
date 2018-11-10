FROM node:slim

RUN npm install -g nodemon@1.14.7

COPY package.json /skill/package.json

RUN mkdir -p /skill/
WORKDIR /skill/
RUN npm install

EXPOSE 8000
EXPOSE 27017

COPY entrypoint.sh /skill
RUN chmod +x /skill/entrypoint.sh

ENTRYPOINT ["sh","/skill/entrypoint.sh"]

