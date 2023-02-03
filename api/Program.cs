using api.Context;
using api.Schedulers;
using api.Schema.Mutations;
using api.Schema.Queries;
using api.Services;
using LiteX.Storage.FileSystem;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost\\db-1,1433";
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "P@ssw0rd";
var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "hris";
var dbUser = Environment.GetEnvironmentVariable("DB_USER") ?? "sa";
var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID={dbUser};Password={dbPassword};Encrypt=True;TrustServerCertificate=True;";

builder.Services.AddGraphQLServer()
    .AddQueryType(q => q.Name("Query"))
    .AddType<UserQuery>()
    .AddType<TimeSheetQuery>()
    .AddType<InterruptionQuery>()
    .AddType<LeaveQuery>()
    .AddType<ProjectQuery>();

builder.Services.AddGraphQLServer()
    .AddMutationType(q => q.Name("Mutation"))
    .AddType<TimeInMutation>()
    .AddType<TimeOutMutation>()
    .AddType<SigninMutation>()
    .AddType<LogoutMutation>()
    .AddType<InterruptionMutation>()
    .AddType<TimeEntryMutation>()
    .AddType<LeaveMutation>();

builder.Services.AddGraphQLServer().AddProjections().AddFiltering().AddSorting();

builder.Services.AddGraphQLServer().AddType<UploadType>();
builder.Services.AddPooledDbContextFactory<HrisContext>(o => o.UseSqlServer(connectionString));

builder.Services.AddLiteXFileSystemStorageService();

builder.Services.AddHostedService<TimeInScheduler>();
builder.Services.AddScoped<TimeInService>();
builder.Services.AddScoped<TimeOutService>();
builder.Services.AddScoped<TimeSheetService>();
builder.Services.AddScoped<SigninService>();
builder.Services.AddScoped<LogoutService>();
builder.Services.AddScoped<InterruptionService>();
builder.Services.AddScoped<LeaveService>();
builder.Services.AddScoped<ProjectService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseEndpoints(endpoints => endpoints.MapGraphQL());

app.MapGet("/", () => "Hello World!");

app.Run();
