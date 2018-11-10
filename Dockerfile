FROM node:slim

RUN apt-get update && apt-get install -y \
    wget

RUN npm install -g nodemon@1.14.7

COPY package.json /skill/package.json

RUN mkdir -p /skill/
WORKDIR /skill/
RUN npm install
WORKDIR /skill/
RUN cat entrypoint.sh | tr -d '\r' > entrypointNew.sh
RUN chmod +x /skill/entrypointNew.sh

ENTRYPOINT ["sh","/skill/entrypointNew.sh"]
