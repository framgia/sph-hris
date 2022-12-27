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

## Installation

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

## Commands to run the app

1. cd sph-hris
2. cd client
3. npm run dev
4. cd ../api
5. dotnet run

## Database Setup

- Open MSSQL Server Management Studio
- Connect to your local database engine
- Create a database
