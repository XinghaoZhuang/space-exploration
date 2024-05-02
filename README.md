<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Develop locally
For local development, you could put your mongo_url in .env file. And putting .env into .gitignore is a better way.
```bash
# .env
MONGO_URL = 'mongodb://localhost:27017/test'
```

## Run with docker
Build docker image with Dockerfile. We name the example image as 'space', which is used in the docker-compose file. In the docker-compose file, you should keep your MONGO_URL secret.
```bash
# build image
docker build . -t space

# docker compose
docker-compose up -d
```

## API doc
See [swagger](http://localhost:3000/api). It shows data schema and API details.

## Unit-Test
```bash
yarn run test:cov
```
---------------------------------|---------|----------|---------|---------|-------------------
File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------|---------|----------|---------|---------|-------------------
All files                        |   85.23 |      100 |   97.82 |   86.56 |                   
 src                             |   39.39 |      100 |      75 |   33.33 |                   
  app.controller.ts              |     100 |      100 |     100 |     100 |                   
  app.module.ts                  |       0 |      100 |     100 |       0 | 1-15              
  app.service.ts                 |     100 |      100 |     100 |     100 |                   
  main.ts                        |       0 |      100 |       0 |       0 | 1-19              
 src/celestial-bodies            |   87.09 |      100 |     100 |   89.28 |                   
  celestial-bodies.controller.ts |     100 |      100 |     100 |     100 |                   
  celestial-bodies.module.ts     |       0 |      100 |     100 |       0 | 1-12              
  celestial-bodies.service.ts    |     100 |      100 |     100 |     100 |                   
  constants.ts                   |     100 |      100 |     100 |     100 |                   
 src/celestial-bodies/dto        |     100 |      100 |     100 |     100 |                   
  create-celestial-body.dto.ts   |     100 |      100 |     100 |     100 |                   
  update-celestial-body.dto.ts   |     100 |      100 |     100 |     100 |                   
 src/celestial-bodies/schemas    |     100 |      100 |     100 |     100 |                   
  celestial-body.schema.ts       |     100 |      100 |     100 |     100 |                   
 src/missions                    |    87.5 |      100 |     100 |   89.65 |                   
  constants.ts                   |     100 |      100 |     100 |     100 |                   
  missions.controller.ts         |     100 |      100 |     100 |     100 |                   
  missions.module.ts             |       0 |      100 |     100 |       0 | 1-12              
  missions.service.ts            |     100 |      100 |     100 |     100 |                   
 src/missions/dto                |     100 |      100 |     100 |     100 |                   
  create-mission.dto.ts          |     100 |      100 |     100 |     100 |                   
  update-mission.dto.ts          |     100 |      100 |     100 |     100 |                   
 src/missions/schemas            |     100 |      100 |     100 |     100 |                   
  mission.schema.ts              |     100 |      100 |     100 |     100 |                   
 src/spacecrafts                 |    87.5 |      100 |     100 |   89.65 |                   
  constants.ts                   |     100 |      100 |     100 |     100 |                   
  spacecrafts.controller.ts      |     100 |      100 |     100 |     100 |                   
  spacecrafts.module.ts          |       0 |      100 |     100 |       0 | 1-12              
  spacecrafts.service.ts         |     100 |      100 |     100 |     100 |                   
 src/spacecrafts/dto             |     100 |      100 |     100 |     100 |                   
  create-spacecraft.dto.ts       |     100 |      100 |     100 |     100 |                   
  update-spacecraft.dto.ts       |     100 |      100 |     100 |     100 |                   
 src/spacecrafts/schemas         |     100 |      100 |     100 |     100 |                   
  spacecraft.schema.ts           |     100 |      100 |     100 |     100 |                   
---------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 7 passed, 7 total
Tests:       49 passed, 49 total
Snapshots:   0 total