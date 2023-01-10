using api.Context;
using api.Schema.Mutations;
using api.Schema.Queries;
using api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost\\db-1,1433";
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "P@ssw0rd";
var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "hris";
var dbUser = Environment.GetEnvironmentVariable("DB_USER") ?? "sa";
var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID={dbUser};Password={dbPassword};Encrypt=True;TrustServerCertificate=True;";

builder.Services.AddGraphQLServer()
    .AddQueryType(q => q.Name("Query"))
    .AddType<UserQuery>()
    .AddType<TimeSheetQuery>();

builder.Services.AddGraphQLServer()
    .AddMutationType(q => q.Name("Mutation"))
    .AddType<TimeInMutation>()
    .AddType<TimeOutMutation>();

builder.Services.AddGraphQLServer().AddProjections().AddFiltering().AddSorting();

builder.Services.AddPooledDbContextFactory<HrisContext>(o => o.UseSqlServer(connectionString));
builder.Services.AddScoped<TimeInService>();
builder.Services.AddScoped<TimeOutService>();
builder.Services.AddScoped<TimeSheetService>();
var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
});

app.MapGet("/", () => "Hello World!");

app.Run();
