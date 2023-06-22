# books-be
## How to run

First, set up `.env` file using the template `.env.example`:

```bash
cp .env.example .env
```

You need to fill out environment in `.env` file before going to next steps.
You can set DATABASE_URL="" because I haven't used it yet

After configuring environment, you can run app with:

```bash
yarn install
yarn start
```