FROM node:slim

RUN npm install -g nodemon@1.14.7

COPY package.json /skill/package.json

RUN mkdir -p /skill/
WORKDIR /skill/


COPY entrypoint.sh /skill/
WORKDIR /skill/
RUN chmod +x /skill/entrypoint.sh

ENTRYPOINT ["sh","/skill/entrypoint.sh"]
