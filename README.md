# AngularApp_EFCodeFirst

A full-stack employee management application. The Angular client lets you list, create, edit, and delete employees; an ASP.NET Core Web API provides the backend, with Entity Framework Core using a code-first model and SQL Server.

## Tech stack

- Angular 22 and TypeScript
- ASP.NET Core on .NET 10
- Entity Framework Core 10 and SQL Server

## Project layout

- `angularapp_efcodefirst.client/` — Angular application and employee UI
- `AngularApp_EFCodeFirst.Server/` — ASP.NET Core API, EF Core context, model, and migrations
- `AngularApp_EFCodeFirst.slnx` — solution containing the client and server projects

## Prerequisites

- .NET 10 SDK
- Node.js and npm
- A SQL Server instance
- The EF Core command-line tool (`dotnet-ef`) to apply migrations, if it is not already installed

## Configure the database

The server reads the `DefaultConnection` connection string from `AngularApp_EFCodeFirst.Server/appsettings.json`. The checked-in value is configured for a local SQL Server instance using Windows trusted authentication. Update it for your SQL Server installation before running the application. Avoid committing credentials or other secrets; use user secrets or environment-specific configuration instead.

From the repository root, apply the included EF Core migration:

```bash
dotnet tool install --global dotnet-ef  # only needed if dotnet-ef is not installed
dotnet ef database update --project AngularApp_EFCodeFirst.Server --startup-project AngularApp_EFCodeFirst.Server
```

The migration creates the employee table in the configured database.

## Run the application

Restore the client dependencies:

```bash
cd angularapp_efcodefirst.client
npm ci
cd ..
```

Run the server from the repository root:

```bash
dotnet run --project AngularApp_EFCodeFirst.Server --launch-profile https
```

The ASP.NET Core SPA proxy starts the Angular development server. Open the client URL shown in the server output (configured as `https://localhost:60401`). The API is served by the backend, and the development proxy forwards `/api` requests to it.

To run the client separately instead, start the backend and then run:

```bash
cd angularapp_efcodefirst.client
npm start
```

## Employee API

The API base path is `/api/Employee`:

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/Employee` | List employees |
| `GET` | `/api/Employee/{id}` | Get an employee |
| `POST` | `/api/Employee` | Create an employee |
| `PUT` | `/api/Employee/{id}` | Update an employee |
| `DELETE` | `/api/Employee/{id}` | Delete an employee |

Employee records have an `Id`, `Name`, and `Salary`.

In development, the API's OpenAPI document is available at `/openapi/v1.json` on the backend.

## Build and test

Build the Angular client:

```bash
cd angularapp_efcodefirst.client
npm run build
```

Run the Angular unit tests:

```bash
cd angularapp_efcodefirst.client
npm test
```
