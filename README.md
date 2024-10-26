# I-ASOS semestral assignment

## Progress

Project's progress can be viewed in [changelog](./changelog.md).

## About

## Installation

### Run developement mode in docker

**Note: install prettier plugin in your IDE and set to reformat the code on save**

```bash
$ docker compose up -d
```

### Run developement mode in local

#### Need to fill these .env variables of your pg database (with example):

- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=postgres
- DB_NAME=postgres

#### Run these commands:

```bash
$ npm install
$ npm run start:dev
```

...
