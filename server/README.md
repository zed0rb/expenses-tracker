## Setup

1. `npm install`
2. Create a PostgreSQL database.
3. Add credentials to `.env` file based on `.env.example` in server folder.

This is application for managing you budget. It provides APIs for creating acc,
fetching, updating, and deleting transactions.

## Running the server

In development mode:

```bash
# automatically restarts the server
npm run dev
```

## Tests

```bash
# runs tests
npm test
```

## Usage

1. Start the server:


2. The server will start listening on port 3000 by default.

3. You can now interact with the API using tools like Postman or curl.

## API Endpoints

- `POST /v1/trpc/user.signup`: create new acc. It needs 2 fields: {email, password}. 
- `POST /v1/trpc/user.login`: to log in to acc (returns authentication token). Fields: {email, password}. 
- `GET /v1/trpc/user.balance`: get user balance. Authenticated procedure.
- `POST /v1/trpc/transaction.create`: to create transaction it also updates user balance. Authenticated procedure. 
Fields: {type (deposit or withdraw), amount, description}. 
- `GET /v1/trpc/transaction.find`: get a list of user transactions.
- `POST /v1/trpc/transaction.list`: get a list of user transactions for specific type of transaction. Field: { type (deposit or withdraw)
- `POST /v1/trpc/transaction.remove`: removed transaction. Fields: {id}

