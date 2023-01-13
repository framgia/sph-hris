using api.Services;

namespace api.Schedulers
{
    public class TimeInScheduler : IHostedService
    {
        public IServiceScopeFactory _serviceScopeFactory;
        private Timer? _timer;
        private readonly ILogger<TimeInScheduler> _logger;
        public TimeInScheduler(IServiceScopeFactory serviceScopeFactory, ILogger<TimeInScheduler> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        Task IHostedService.StartAsync(CancellationToken cancellationToken)
        {
            TimeSpan interval = TimeSpan.FromHours(24);
            var nextRunTime = DateTime.Today.AddDays(1);
            _logger.LogInformation(DateTime.Now.ToString());
            var curTime = DateTime.Now;
            var firstInterval = nextRunTime.Subtract(curTime);
            _logger.LogInformation(firstInterval.ToString());
            Action action = () =>
            {
                _logger.LogInformation("Begin Time In Scheduler");
                var t1 = Task.Delay(firstInterval);
                t1.Wait();
                _logger.LogInformation("Creating Time In Entry");
                _timer = new Timer(
                    TimeIn,
                    null,
                    TimeSpan.Zero,
                    interval
                );
            };
            Task.Run(action);
            return Task.CompletedTask;
        }

        private async void TimeIn(object? state)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                TimeInService scoped = scope.ServiceProvider.GetRequiredService<TimeInService>();
                await scoped.CreateAll();
            }
        }

        Task IHostedService.StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }
    }
}
