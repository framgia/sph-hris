using System.Text.Json;
using api.Context;
using api.Entities;
using api.Enums;
using api.NotificationDataClasses;
using api.Requests;
using api.Subscriptions;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class NotificationService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly ITopicEventSender _eventSender;
        private readonly LeaveService _leaveService;
        private readonly OvertimeService _overtimeService;
        private readonly ChangeShiftService _changeShiftService;
        private readonly UserService _userService;
        public NotificationService(IDbContextFactory<HrisContext> contextFactory, LeaveService leaveService, OvertimeService overtimeService, UserService userService, ChangeShiftService changeShiftService, [Service] ITopicEventSender eventSender)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _leaveService = leaveService;
            _overtimeService = overtimeService;
            _changeShiftService = changeShiftService;
            _userService = userService;
        }

        public async Task<List<LeaveNotification>> createLeaveNotification(Leave leave)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notifications = new List<LeaveNotification>();
                var user = context.Users.Find(leave.UserId);
                var undertimeLeave = context.LeaveTypes.Where(x => x.Name != null && x.Name.ToLower() == "undertime").First();
                var projectNames = context.MultiProjects.Where(x => x.LeaveId == leave.Id && x.Type == MultiProjectTypeEnum.LEAVE).Select(x => x.ProjectId == ProjectId.OTHER_PROJECT ? leave.OtherProject : x.Project.Name);

                var dataToManager = JsonSerializer.Serialize(new LeaveManagerData
                {
                    User = new NotificationUser
                    {
                        Id = (int)user?.Id!,
                        Name = user?.Name!,
                        AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                    },
                    Projects = projectNames,
                    RequestedHours = _leaveService.LeaveDaysToHours(leave.Days),
                    DateRequested = leave.LeaveDate,
                    DateFiled = (DateTime)leave.CreatedAt!,
                    Type = NotificationDataTypeEnum.REQUEST,
                    Status = _leaveService.GetLeaveRequestStatus(leave),
                    Remarks = leave.Reason
                }
                    );

                // Notification to Manager
                var notificationToManager = new LeaveNotification
                {
                    RecipientId = leave.ManagerId,
                    LeaveId = leave.Id,
                    Type = leave.LeaveTypeId == undertimeLeave.Id ? NotificationTypeEnum.UNDERTIME : NotificationTypeEnum.LEAVE,
                    Data = dataToManager
                };
                notifications.Add(notificationToManager);
                // Notification per project
                leave.LeaveProjects.ToList().ForEach(leaveProject =>
                {
                    var project = context.Projects.FindAsync(leaveProject.ProjectId);
                    var dataToProjectLeader = JsonSerializer.Serialize(new LeaveLeaderData
                    {
                        User = new NotificationUser
                        {
                            Id = (int)user?.Id!,
                            Name = user?.Name!,
                            AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                        },
                        Projects = new List<string> { project.Result!.Name == "Others" ? leave.OtherProject! : project.Result.Name! },
                        RequestedHours = _leaveService.LeaveDaysToHours(leave.Days),
                        DateRequested = leave.LeaveDate,
                        DateFiled = (DateTime)leave.CreatedAt,
                        Type = NotificationDataTypeEnum.REQUEST,
                        Status = _leaveService.GetLeaveRequestStatus(leave),
                        Remarks = leave.Reason
                    }
                    );
                    var notificationToProjectLeader = new LeaveNotification
                    {
                        RecipientId = leaveProject.ProjectLeaderId,
                        LeaveId = leave.Id,
                        Type = leave.LeaveTypeId == undertimeLeave.Id ? NotificationTypeEnum.UNDERTIME : NotificationTypeEnum.LEAVE,
                        Data = dataToProjectLeader
                    };
                    notifications.Add(notificationToProjectLeader);
                });

                notifications.ForEach(notif =>
                {
                    context.LeaveNotifications.Add(notif);
                });

                await context.SaveChangesAsync();
                return notifications;
            }
        }

        public async Task<List<OvertimeNotification>> createOvertimeNotification(Overtime overtime)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notifications = new List<OvertimeNotification>();
                var user = context.Users.Find(overtime.UserId);
                var projectNames = context.MultiProjects.Where(x => x.OvertimeId == overtime.Id && x.Type == MultiProjectTypeEnum.OVERTIME).Select(x => x.ProjectId == ProjectId.OTHER_PROJECT ? overtime.OtherProject : x.Project.Name);

                var dataToManager = JsonSerializer.Serialize(new OvertimeManagerData
                {
                    User = new NotificationUser
                    {
                        Id = (int)user?.Id!,
                        Name = user?.Name!,
                        AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                    },
                    Projects = projectNames,
                    RequestedMinutes = overtime.RequestedMinutes,
                    DateRequested = overtime.OvertimeDate,
                    DateFiled = (DateTime)overtime.CreatedAt!,
                    Type = NotificationDataTypeEnum.REQUEST,
                    Status = _overtimeService.GetOvertimeRequestStatus(overtime),
                    Remarks = overtime.Remarks
                }
                );

                // Notification to Manager
                var notificationToManager = new OvertimeNotification
                {
                    RecipientId = overtime.ManagerId,
                    OvertimeId = overtime.Id,
                    Type = NotificationTypeEnum.OVERTIME,
                    Data = dataToManager
                };
                notifications.Add(notificationToManager);

                // Notification per project
                overtime.MultiProjects.ToList().ForEach(overtimeProject =>
                {
                    var project = context.Projects.FindAsync(overtimeProject.ProjectId);
                    var dataToProjectLeader = JsonSerializer.Serialize(new OvertimeLeaderData
                    {
                        User = new NotificationUser
                        {
                            Id = (int)user?.Id!,
                            Name = user?.Name!,
                            AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                        },
                        Projects = new List<string> { project.Result!.Name == "Others" ? overtime.OtherProject! : project.Result.Name! },
                        RequestedMinutes = overtime.RequestedMinutes,
                        DateRequested = overtime.OvertimeDate,
                        DateFiled = (DateTime)overtime.CreatedAt,
                        Type = NotificationDataTypeEnum.REQUEST,
                        Status = _overtimeService.GetOvertimeRequestStatus(overtime),
                        Remarks = overtime.Remarks
                    }
                    );

                    var notificationToProjectLeader = new OvertimeNotification
                    {
                        RecipientId = overtimeProject.ProjectLeaderId,
                        OvertimeId = overtime.Id,
                        Type = NotificationTypeEnum.OVERTIME,
                        Data = dataToProjectLeader
                    };
                    notifications.Add(notificationToProjectLeader);
                });

                notifications.ForEach(notif =>
                {
                    context.OvertimeNotifications.Add(notif);
                });

                await context.SaveChangesAsync();
                return notifications;
            }
        }

        public async Task<List<ChangeShiftNotification>> createChangeShiftRequestNotification(ChangeShiftRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notifications = new List<ChangeShiftNotification>();
                var user = context.Users.Find(request.UserId);

                // Notification per project
                request.MultiProjects.ToList().ForEach(requestProject =>
                {
                    var project = context.Projects.FindAsync(requestProject.ProjectId);
                    var dataToProjectLeader = JsonSerializer.Serialize(new ChangeShiftLeaderData
                    {
                        User = new NotificationUser
                        {
                            Id = (int)user?.Id!,
                            Name = user?.Name!,
                            AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                        },
                        Projects = new List<string> { project.Result!.Name == "Others" ? request.OtherProject! : project.Result.Name! },
                        RequestedTimeIn = request.TimeIn,
                        RequestedTimeOut = request.TimeOut,
                        DateFiled = (DateTime)request.CreatedAt!,
                        Type = NotificationDataTypeEnum.REQUEST,
                        Description = request.Description,
                        Status = _changeShiftService.GetRequestStatus(request),
                    }
                    );

                    var notificationToProjectLeader = new ChangeShiftNotification
                    {
                        RecipientId = requestProject.ProjectLeaderId,
                        ChangeShiftRequestId = request.Id,
                        Type = NotificationTypeEnum.CHANGE_SHIFT,
                        Data = dataToProjectLeader
                    };
                    notifications.Add(notificationToProjectLeader);
                });

                notifications.ForEach(notif =>
                {
                    context.ChangeShiftNotifications.Add(notif);
                });

                await context.SaveChangesAsync();
                return notifications;
            }
        }

        public async Task<List<Notification>> getByRecipientId(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Notifications.Where(notif => notif.RecipientId == id).OrderByDescending(notif => notif.CreatedAt).ToListAsync();
            }
        }

        public async Task<LeaveNotification> createLeaveApproveDisapproveNotification(Leave leave, bool IsApproved)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var user = context.Users.Find(leave.UserId);
                var undertimeLeave = await context.LeaveTypes.Where(x => x.Name != null && x.Name.ToLower() == "undertime").FirstOrDefaultAsync();
                var projectNames = await context.MultiProjects.Where(x => x.LeaveId == leave.Id && x.Type == MultiProjectTypeEnum.LEAVE).Select(x => x.ProjectId == ProjectId.OTHER_PROJECT ? leave.OtherProject : x.Project.Name).ToListAsync();

                var dataToUser = JsonSerializer.Serialize(new
                {
                    User = new
                    {
                        Id = user?.Id,
                        Name = user?.Name,
                        AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                    },
                    Projects = projectNames,
                    RequestedHours = _leaveService.LeaveDaysToHours(leave.Days),
                    DateRequested = leave.LeaveDate,
                    DateFiled = leave.CreatedAt,
                    Type = IsApproved ? NotificationDataTypeEnum.APPROVE : NotificationDataTypeEnum.DISAPPROVE,
                    Status = IsApproved ? RequestStatus.APPROVED : RequestStatus.DISAPPROVED,
                    Remarks = leave.Reason
                }
                    );

                // Notification to Requesting User
                var notificationToUser = new LeaveNotification
                {
                    RecipientId = leave.UserId,
                    LeaveId = leave.Id,
                    Type = leave.LeaveTypeId == undertimeLeave?.Id ? NotificationTypeEnum.UNDERTIME_RESOLVED : NotificationTypeEnum.LEAVE_RESOLVED,
                    Data = dataToUser
                };

                context.Notifications.Add(notificationToUser);
                await context.SaveChangesAsync();

                sendLeaveNotificationEvent(notificationToUser);
                return notificationToUser;
            }
        }

        public async Task<OvertimeNotification> createOvertimeApproveDisapproveNotification(Overtime overtime, bool IsApproved)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var user = context.Users.Find(overtime.UserId);
                var projectNames = context.MultiProjects.Where(x => x.OvertimeId == overtime.Id && x.Type == MultiProjectTypeEnum.OVERTIME).Select(x => x.ProjectId == ProjectId.OTHER_PROJECT ? overtime.OtherProject : x.Project.Name);

                var dataToUser = JsonSerializer.Serialize(new
                {
                    User = new
                    {
                        Id = user?.Id,
                        Name = user?.Name,
                        AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                    },
                    Projects = projectNames,
                    RequestedMinutes = overtime.RequestedMinutes,
                    DateRequested = overtime.OvertimeDate,
                    ApprovedMinutes = overtime.ApprovedMinutes,
                    DateFiled = overtime.CreatedAt,
                    Type = IsApproved ? NotificationDataTypeEnum.APPROVE : NotificationDataTypeEnum.DISAPPROVE,
                    Status = IsApproved ? RequestStatus.APPROVED : RequestStatus.DISAPPROVED,
                    Remarks = overtime.Remarks
                }
                );

                // Notification to Requesting User
                var notificationToUser = new OvertimeNotification
                {
                    RecipientId = overtime.UserId,
                    OvertimeId = overtime.Id,
                    Type = NotificationTypeEnum.OVERTIME_RESOLVED,
                    Data = dataToUser
                };

                context.Notifications.Add(notificationToUser);
                await context.SaveChangesAsync();

                sendOvertimeNotificationEvent(notificationToUser);
                return notificationToUser;
            }
        }

        public async void sendLeaveNotificationEvent(LeaveNotification notif)
        {
            try
            {
                string topic = $"{notif.RecipientId}_{nameof(SubscriptionObjectType.LeaveCreated)}";
                await _eventSender.SendAsync(topic, notif);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async void sendOvertimeNotificationEvent(OvertimeNotification notif)
        {
            try
            {
                string topic = $"{notif.RecipientId}_{nameof(SubscriptionObjectType.OvertimeCreated)}";
                await _eventSender.SendAsync(topic, notif);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async void sendChangeShiftNotificationEvent(ChangeShiftNotification notif)
        {
            try
            {
                string topic = $"{notif.RecipientId}_{nameof(SubscriptionObjectType.ChangeShiftCreated)}";
                await _eventSender.SendAsync(topic, notif);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<Notification>> IsReadAll(int id)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var Notif = await context.Notifications.Where(x => x.RecipientId == id).ToListAsync();
            foreach (var notification in Notif)
            {
                notification.IsRead = true;
                context.Notifications.Update(notification);
                await context.SaveChangesAsync();
            }
            return await context.Notifications.Where(x => x.RecipientId == id).ToListAsync();
        }

        public async Task<string> ReadNotification(NotificationRequest notification)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    var notificationDetial = await context.Notifications.Where(c => c.Id == notification.Id).FirstAsync();
                    notificationDetial.ReadAt = DateTime.Now;
                    context.Notifications.Update(notificationDetial);
                    await context.SaveChangesAsync();
                    transaction.Commit();
                    return "Updated successfully!";
                }
                catch (Exception)
                { return "There's an error!"; }
            }
        }
    }
}
