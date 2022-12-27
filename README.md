## Description

HRIS is an internal project for the admin team of Sun Asterisk PH that aims to help and ease admin operations.

## Technologies used:

- ASP.NET Core (Web) 6
- MSSQL
- GraphQL
- NextJS
- Typescript
- TailwindCSS

## Prerequites:

- [Dotnet SDK 6 LTS](https://dotnet.microsoft.com/en-us/download)
- [Node LTS](https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi)
- [MSSQL Server Management Studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Manual Setup

1. git clone `git@github.com:abduljalilpalala/sph-hris.git`
2. cd sph-hris
3. cd client
4. npm install
5. cp .env.example .env.local
6. Go to the client folder and set the `NEXT_PUBLIC_BACKEND_URL` variable in `.env` with the api endpoint
7. cd ../api
8. create a database connection string in appsettings.json e.g.

```javascript
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=sample;Trusted_Connection=True;"
})
```

9. dotnet run

## Commands to run the app manually

1. cd sph-hris
2. cd client
3. npm run dev
4. cd ../api
5. dotnet run

## Docker Setup

1. git clone `git@github.com:abduljalilpalala/sph-hris.git`
2. cd sph-hris
3. cp .env.api.example .env.api
4. cp .env.client.example .env.client
5. cp .env.db.example .env.db
6. `docker compose build` or `docker compose up --build` (this will automatically build and run the containers)
7. `docker compose up` (To stop docker containers, run: `docker compose down`)

## Commands to run the app with Docker

- docker compose build (to build the images)
- docker compose up (to run the containers)
- docker compose up --build (to build and run the containers)
- docker compose down (to stop the containers)

## Database Setup

- Open MSSQL Server Management Studio
- Connect to your local or docker database engine (e.g `localhost\<container-name>,<port>`)
- Fill username (e.g. `sa` - default username) and password
- Click connect
