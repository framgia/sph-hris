using api.Context;
using api.Middlewares;
using api.Schedulers;
using api.Schema.Mutations;
using api.Schema.Queries;
using api.Services;
using api.Subscriptions;
using LiteX.Storage.FileSystem;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost\\db-1,1433";
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "P@ssw0rd";
var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "hris";
var dbUser = Environment.GetEnvironmentVariable("DB_USER") ?? "sa";
var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID={dbUser};Password={dbPassword};Encrypt=True;TrustServerCertificate=True;";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy => policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddHttpResponseFormatter<CustomHttpResponseFormatter>();

builder.Services.AddGraphQLServer()
    .AddQueryType(q => q.Name("Query"))
    .UseField<AuthorizeUser>()
    .AddType<UserQuery>()
    .AddType<TimeSheetQuery>()
    .AddType<InterruptionQuery>()
    .AddType<LeaveQuery>()
    .AddType<ProjectQuery>()
    .AddType<NotificationQuery>()
    .AddType<OvertimeQuery>()
    .AddType<ChangeShiftQuery>()
    .AddType<ESLOffsetQuery>()
    .AddType<ESLChangeShiftQuery>()
    .AddType<EmployeeScheduleQuery>();

builder.Services.AddGraphQLServer()
    .AddMutationType(q => q.Name("Mutation"))
    .AddType<TimeInMutation>()
    .AddType<TimeOutMutation>()
    .AddType<SigninMutation>()
    .AddType<LogoutMutation>()
    .AddType<InterruptionMutation>()
    .AddType<TimeEntryMutation>()
    .AddType<LeaveMutation>()
    .AddType<NotificationMutation>()
    .AddType<OvertimeMutation>()
    .AddType<ApprovalMutation>()
    .AddType<ChangeShiftMutation>()
    .AddType<ESLChangeShiftMutation>()
    .AddType<ESLOffsetMutation>()
    .AddType<EmployeeScheduleMutation>()
    .AddType<EmployeeMutation>();

builder.Services.AddGraphQLServer().AddProjections().AddFiltering().AddSorting();
builder.Services.AddGraphQLServer().AddInMemorySubscriptions()
    .AddSubscriptionType<SubscriptionObjectType>();

builder.Services.AddGraphQLServer().AddType<UploadType>();
builder.Services.AddPooledDbContextFactory<HrisContext>(o => o.UseSqlServer(connectionString));

builder.Services.AddLiteXFileSystemStorageService();
builder.Services.AddHttpContextAccessor();

builder.Services.AddHostedService<TimeInScheduler>();
builder.Services.AddScoped<TimeInService>();
builder.Services.AddScoped<TimeOutService>();
builder.Services.AddScoped<TimeSheetService>();
builder.Services.AddScoped<SigninService>();
builder.Services.AddScoped<LogoutService>();
builder.Services.AddScoped<InterruptionService>();
builder.Services.AddScoped<LeaveService>();
builder.Services.AddScoped<ProjectService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<OvertimeService>();
builder.Services.AddScoped<ApprovalService>();
builder.Services.AddScoped<ChangeShiftService>();
builder.Services.AddScoped<ESLChangeShiftService>();
builder.Services.AddScoped<ESLOffsetService>();
builder.Services.AddScoped<EmployeeScheduleService>();
builder.Services.AddScoped<EmployeeService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbFactory = services.GetRequiredService<IDbContextFactory<HrisContext>>();
        using var dbContext = dbFactory.CreateDbContext();

        if (dbContext.Database.CanConnect())
        {
            dbContext.Database.Migrate();
        }
    }
    catch (Exception ex)
    {
        // Handle any exceptions that occur during database migration
        Console.WriteLine("An error occurred while migrating the database: " + ex.Message);
    }
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseCors(MyAllowSpecificOrigins);
app.UseStaticFiles();
app.UseWebSockets();
app.UseRouting();

app.UseEndpoints(endpoints => endpoints.MapGraphQL());

app.MapGet("/", () => "Hello World!");

app.Run();
