# Microservice Boilerplate

## Production

Update .env files or mount different path

```bash

## Build the image
docker build --build-arg NODE=production . -t microservice_a

## Run and pass env
docker run --env-file ./.env -p 3000:3000 --name microservice_a_container microservice_a

```

## Development & Testing

```bash

# Build with compose as production environment
npm run docker:build
npm run docker:rebuild # to recreate on changes

# Build the image and associate volume paths and watch file changes
npm run docker:dev:build
npm run docker:dev:rebuild # in case production build is already running

```

## API Docs

http://localhost:3000/docs