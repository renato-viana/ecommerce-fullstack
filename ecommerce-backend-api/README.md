# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

### Notes

- I'm using Docker with docker compose to start the database and the API and run the migrations.
- I have used the "[wait-for-it.sh](https://github.com/vishnubob/wait-for-it)" script to wait for the database and migrations to run.

### Commands

- 'docker image build -t ecommerce-api .' Build the image.
- 'docker-compose up' Starts the containers with AWS configuration.
- 'docker-compose -f docker-compose.test.yml up' Starts the local environment with docker-compose.test.yml

### Ports

- Api expose port 8080.
- Postges DB expose port 5433 for external connections and for docker internal connections is port 5432.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### Environment variables - requested

- POSTGRES_HOST=ecommerce-postgres
- POSTGRES_DB=ecommerce-db
- POSTGRES_DB_TEST=full_stack_test
- POSTGRES_USER=full_stack_dev
- POSTGRES_PASSWORD=password123
- POSTGRES_PORT=5432
- ENV=dev
- API_HOST=ecommerce-api
- API_PORT=8080
- BCRYPT_PASSWORD=speak-friend-and-enter
- SALT_ROUNDS=10
- TOKEN_SECRET=alohomora123!
