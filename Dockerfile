FROM node:10-alpine

RUN npm install -g nodemon@1.14.7

RUN mkdir -p /skill
WORKDIR /

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

VOLUME /skill/node_modules

ENTRYPOINT ["sh","/entrypoint.sh"]