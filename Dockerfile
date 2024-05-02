FROM node:20-alpine as builder

COPY src ./src
COPY package.json .
COPY yarn.lock .
COPY nest-cli.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install
RUN yarn run build
CMD [ "node", "dist/main.js" ]