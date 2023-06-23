using System.Text.Json;
using api.Context;
using api.DTOs;
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
        private readonly ESLChangeShiftService _eslChangeShiftService;
        private readonly ESLOffsetService _eslOffsetService;
        private readonly UserService _userService;
        private readonly IHttpContextAccessor _accessor;
        public NotificationService(
            IDbContextFactory<HrisContext> contextFactory,
            LeaveService leaveService, OvertimeService overtimeService,
            UserService userService, ChangeShiftService changeShiftService,
            ESLChangeShiftService eslChangeShiftService,
            ESLOffsetService eslOffsetService,
            [Service] ITopicEventSender eventSender,
            IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _leaveService = leaveService;
            _overtimeService = overtimeService;
            _changeShiftService = changeShiftService;
            _eslChangeShiftService = eslChangeShiftService;
            _eslOffsetService = eslOffsetService;
            _userService = userService;
            _accessor = accessor;
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
                    Remarks = leave.Reason,
                    IsWithPay = leave.IsWithPay
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
                        Remarks = leave.Reason,
                        IsWithPay = leave.IsWithPay
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

        // notification service for bulk overtime
        public async Task<List<OvertimeNotification>> createBulkOvertimeNotification(List<Overtime> overtimeList, int leaderId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                List<OvertimeNotification> notificationsList = new List<OvertimeNotification>();
                List<int> userIds = overtimeList.Select(overtime => overtime.UserId).ToList();
                userIds.Add(leaderId);

                var users = context.Users.Where(user => userIds.Contains(user.Id));
                var leader = users.Where(user => user.Id == leaderId).FirstOrDefault();

                var overtimeInstance = overtimeList.First();
                var projectNames = context.MultiProjects.Where(x => x.OvertimeId == overtimeInstance.Id && x.Type == MultiProjectTypeEnum.OVERTIME).Select(x => x.ProjectId == ProjectId.OTHER_PROJECT ? overtimeInstance.OtherProject : x.Project.Name);

                overtimeList.ForEach(overtime =>
                {
                    var user = users.Where(user => user.Id == overtime.UserId).FirstOrDefault();

                    var dataToManager = JsonSerializer.Serialize(new BulkOvertimeManagerData
                    {
                        User = new NotificationUser
                        {
                            Id = (int)leader?.Id!,
                            Name = leader?.Name!,
                            AvatarLink = _userService.GenerateAvatarLink(leader?.ProfileImageId ?? default(int))
                        },
                        ProjectMember = new NotificationUser
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
                    });

                    // Notification to Manager
                    var notificationToManager = new OvertimeNotification
                    {
                        RecipientId = overtime.ManagerId,
                        OvertimeId = overtime.Id,
                        Type = NotificationTypeEnum.OVERTIME,
                        Data = dataToManager
                    };
                    notificationsList.Add(notificationToManager);
                });

                await context.OvertimeNotifications.AddRangeAsync(notificationsList);

                await context.SaveChangesAsync();
                return notificationsList;
            }
        }

        public async Task<List<ChangeShiftNotification>> createChangeShiftRequestNotification(HrisContext context, ChangeShiftRequest request, int fromUserId, bool isManager = false)
        {
            var notifications = new List<ChangeShiftNotification>();
            var user = await context.Users.FindAsync(fromUserId);
            var timeEntry = await context.TimeEntries.FindAsync(request.TimeEntryId);
            var projectNames = context.MultiProjects.Where(x => x.ChangeShiftRequestId == request.Id && x.Type == MultiProjectTypeEnum.CHANGE_SHIFT).Select(x => x.ProjectId == ProjectId.OTHER_PROJECT ? request.OtherProject : x.Project.Name);

            if (isManager)
            {
                var dataToManager = JsonSerializer.Serialize(new ChangeShiftManagerData
                {
                    User = new NotificationUser
                    {
                        Id = (int)user?.Id!,
                        Name = user?.Name!,
                        AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                    },
                    Projects = projectNames,
                    RequestedTimeIn = request.TimeIn,
                    RequestedTimeOut = request.TimeOut,
                    DateRequested = timeEntry!.Date,
                    DateFiled = (DateTime)request.CreatedAt!,
                    Type = NotificationDataTypeEnum.REQUEST,
                    Description = request.Description,
                    Status = _changeShiftService.GetRequestStatus(request),
                }
                );

                // Notification to Manager
                var notificationToManager = new ChangeShiftNotification
                {
                    RecipientId = request.ManagerId,
                    ChangeShiftRequestId = request.Id,
                    Type = NotificationTypeEnum.CHANGE_SHIFT,
                    Data = dataToManager
                };
                notifications.Add(notificationToManager);
            }
            else
            {
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
                        DateRequested = timeEntry!.Date,
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
            }

            notifications.ForEach(notif =>
            {
                context.ChangeShiftNotifications.Add(notif);
                sendChangeShiftNotificationEvent(notif);
            });

            await context.SaveChangesAsync();
            return notifications;
        }
        public async Task<ESLChangeShiftNotification> createESLChangeShiftRequestNotification(HrisContext context, ESLChangeShiftRequest request)
        {
            var user = await context.Users.FindAsync(request.UserId);
            var timeEntry = await context.TimeEntries.FindAsync(request.TimeEntryId);
            var offsets = await context.ESLOffsets.Where(x => x.ESLChangeShiftRequestId == request.Id).Select(x => new ESLOffsetNotificationDTO(x)).ToListAsync();

            var data = JsonSerializer.Serialize(new ESLChangeShiftData
            {
                User = new NotificationUser
                {
                    Id = (int)user?.Id!,
                    Name = user?.Name!,
                    AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                },
                RequestedTimeIn = request.TimeIn,
                RequestedTimeOut = request.TimeOut,
                DateFiled = (DateTime)request.CreatedAt!,
                DateRequested = timeEntry!.Date,
                Type = NotificationDataTypeEnum.REQUEST,
                Description = request.Description,
                Status = _eslChangeShiftService.GetRequestStatus(request),
                Offsets = offsets
            }
            );

            var newNotification = new ESLChangeShiftNotification
            {
                RecipientId = request.TeamLeaderId,
                ESLChangeShiftRequestId = request.Id,
                Type = NotificationTypeEnum.ESL_OFFSET_SCHEDULE,
                Data = data
            };

            context.ESLChangeShiftNotifications.Add(newNotification);
            sendESLChangeShiftNotificationEvent(newNotification);

            await context.SaveChangesAsync();
            return newNotification;
        }
        public async Task<List<Notification>> CreateSummarizedOvertimeNotification(CreateSummaryRequest summarizedOvertime, HrisContext context)
        {
            var httpContext = _accessor.HttpContext!;
            var hrAdmin = (User)httpContext.Items["User"]!;

            //For multiple manager positions
            List<int> managerIds = await context.Users.Where(x => x.Role.Name!.ToLower() == RoleEnum.MANAGER && x.PositionId == PositionEnum.MANAGER).Select(x => x.Id).ToListAsync();
            List<Notification> notificationsList = new();

            var dataToManager = JsonSerializer.Serialize(new OvertimeSummaryData
            {
                User = new NotificationUser
                {
                    Id = hrAdmin!.Id,
                    Name = hrAdmin.Name!,
                    AvatarLink = _userService.GenerateAvatarLink(hrAdmin?.ProfileImageId ?? default)
                },
                StartDate = summarizedOvertime.StartDate,
                EndDate = summarizedOvertime.EndDate,
                Type = NotificationDataTypeEnum.SUMMARY
            }
            );

            managerIds.ForEach(managerId =>
            {
                // Notification to Requesting User
                var notificationToManager = new Notification
                {
                    RecipientId = managerId,
                    Type = NotificationTypeEnum.OVERTIME_SUMMARY,
                    Data = dataToManager
                };
                notificationsList.Add(notificationToManager);
                SendSummarizedOvertimeNotificationEvent(notificationToManager);
            });

            await context.Notifications.AddRangeAsync(notificationsList);
            await context.SaveChangesAsync();

            return notificationsList;
        }

        public async Task<ESLOffsetNotification> createESLOffsetRequestNotification(ESLOffset request, HrisContext context)
        {
            var user = await context.Users.FindAsync(request.UserId);
            var timeEntry = await context.TimeEntries.FindAsync(request.TimeEntryId);

            var data = JsonSerializer.Serialize(new ChangeShiftData
            {
                User = new NotificationUser
                {
                    Id = (int)user?.Id!,
                    Name = user?.Name!,
                    AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                },
                RequestedTimeIn = request.TimeIn,
                RequestedTimeOut = request.TimeOut,
                DateFiled = (DateTime)request.CreatedAt!,
                DateRequested = timeEntry!.Date,
                Type = NotificationDataTypeEnum.REQUEST,
                Description = request.Description,
                Status = _eslOffsetService.GetRequestStatus(request),
            }
            );

            var newNotification = new ESLOffsetNotification
            {
                RecipientId = request.TeamLeaderId,
                ESLOffsetId = request.Id,
                Type = NotificationTypeEnum.ESL_OFFSET,
                Data = data
            };

            context.ESLOffsetNotifications.Add(newNotification);
            sendESLOffsetNotificationEvent(newNotification);

            await context.SaveChangesAsync();
            return newNotification;
        }

        public async Task<List<Notification>> getByRecipientId(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Notifications.Where(notif => notif.RecipientId == id).OrderByDescending(notif => notif.CreatedAt).ToListAsync();
            }
        }

        public async Task<LeaveNotification> createLeaveApproveDisapproveNotification(Leave leave, int fromUserId, bool IsApproved)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var user = context.Users.Find(fromUserId);
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

        public async Task<OvertimeNotification> createOvertimeApproveDisapproveNotification(Overtime overtime, int fromUserId, bool IsApproved)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var user = context.Users.Find(fromUserId);
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
                    Remarks = overtime.Remarks,
                    ManagerRemarks = overtime.ManagerRemarks
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

        public async Task<ChangeShiftNotification> createChangeShiftApproveDisapproveNotification(HrisContext context, ChangeShiftRequest changeShift, int fromUserId, bool IsApproved)
        {
            var user = await context.Users.FindAsync(fromUserId);
            var timeEntry = await context.TimeEntries.FindAsync(changeShift.TimeEntryId);
            var projectNames = context.MultiProjects.Where(x => x.ChangeShiftRequestId == changeShift.Id && x.Type == MultiProjectTypeEnum.CHANGE_SHIFT).Select(x => x.ProjectId == ProjectId.OTHER_PROJECT ? changeShift.OtherProject : x.Project.Name);

            var dataToUser = JsonSerializer.Serialize(new ChangeShiftManagerData
            {
                User = new NotificationUser
                {
                    Id = (int)user?.Id!,
                    Name = user.Name!,
                    AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default(int))
                },
                Projects = projectNames,

                RequestedTimeIn = changeShift.TimeIn,
                RequestedTimeOut = changeShift.TimeOut,
                DateRequested = timeEntry!.Date,
                DateFiled = (DateTime)changeShift.CreatedAt!,
                Type = IsApproved ? NotificationDataTypeEnum.APPROVE : NotificationDataTypeEnum.DISAPPROVE,
                Description = changeShift.Description,
                Status = IsApproved ? RequestStatus.APPROVED : RequestStatus.DISAPPROVED,
            }
            );

            var notificationToUser = new ChangeShiftNotification
            {
                RecipientId = changeShift.UserId,
                ChangeShiftRequestId = changeShift.Id,
                Type = NotificationTypeEnum.CHANGE_SHIFT_RESOLVED,
                Data = dataToUser
            };

            context.Notifications.Add(notificationToUser);
            await context.SaveChangesAsync();

            sendChangeShiftNotificationEvent(notificationToUser);
            return notificationToUser;
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

        public async void SendSummarizedOvertimeNotificationEvent(Notification notif)
        {
            try
            {
                string topic = $"{notif.RecipientId}_{nameof(SubscriptionObjectType.OvertimeSummaryCreated)}";
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

        public async void sendESLChangeShiftNotificationEvent(ESLChangeShiftNotification notif)
        {
            try
            {
                string topic = $"{notif.RecipientId}_{nameof(SubscriptionObjectType.ESLChangeShiftCreated)}";
                await _eventSender.SendAsync(topic, notif);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async void sendESLOffsetNotificationEvent(ESLOffsetNotification notif)
        {
            try
            {
                string topic = $"{notif.RecipientId}_{nameof(SubscriptionObjectType.ESLOffsetCreated)}";
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

        public async Task<ESLChangeShiftNotification> CreateESLChangeShiftStatusRequestNotification(ESLChangeShiftRequest request, int fromUserId, HrisContext context)
        {
            var user = await context.Users.FindAsync(fromUserId);
            var timeEntry = await context.TimeEntries.FindAsync(request.TimeEntryId);
            var offsets = await context.ESLOffsets.Where(x => x.ESLChangeShiftRequestId == request.Id).Select(x => new ESLOffsetNotificationDTO(x)).ToListAsync();
            var dataToUser = JsonSerializer.Serialize(new ESLChangeShiftData
            {
                User = new NotificationUser
                {
                    Id = (int)user?.Id!,
                    Name = user?.Name!,
                    AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default)
                },
                RequestedTimeIn = request.TimeIn,
                RequestedTimeOut = request.TimeOut,
                DateRequested = timeEntry!.Date,
                DateFiled = (DateTime)request.CreatedAt!,
                Type = request.IsLeaderApproved == true ? NotificationDataTypeEnum.APPROVE : NotificationDataTypeEnum.DISAPPROVE,
                Description = request.Description,
                Status = _eslChangeShiftService.GetRequestStatus(request),
                Offsets = offsets
            }
            );

            // Notification to User
            var notificationToUser = new ESLChangeShiftNotification
            {
                RecipientId = request.UserId,
                ESLChangeShiftRequestId = request.Id,
                Type = NotificationTypeEnum.ESL_OFFSET_SCHEDULE_RESOLVED,
                Data = dataToUser
            };

            context.ESLChangeShiftNotifications.Add(notificationToUser);
            sendESLChangeShiftNotificationEvent(notificationToUser);

            await context.SaveChangesAsync();
            return notificationToUser;
        }

        public async Task<ESLOffsetNotification> CreateESLOffsetStatusRequestNotification(ESLOffset request, int fromUserId, HrisContext context)
        {
            var user = await context.Users.FindAsync(fromUserId);
            var timeEntry = await context.TimeEntries.FindAsync(request.TimeEntryId);
            var dataToUser = JsonSerializer.Serialize(new ChangeShiftData
            {
                User = new NotificationUser
                {
                    Id = (int)user?.Id!,
                    Name = user?.Name!,
                    AvatarLink = _userService.GenerateAvatarLink(user?.ProfileImageId ?? default)
                },
                RequestedTimeIn = request.TimeIn,
                RequestedTimeOut = request.TimeOut,
                DateRequested = timeEntry!.Date,
                DateFiled = (DateTime)request.CreatedAt!,
                Type = request.IsLeaderApproved == true ? NotificationDataTypeEnum.APPROVE : NotificationDataTypeEnum.DISAPPROVE,
                Description = request.Description,
                Status = _eslChangeShiftService.GetOffsetRequestStatus(request),
            }
            );

            // Notification to User
            var notificationToUser = new ESLOffsetNotification
            {
                RecipientId = request.UserId,
                ESLOffsetId = request.Id,
                Type = NotificationTypeEnum.ESL_OFFSET_RESOLVED,
                Data = dataToUser
            };

            context.ESLOffsetNotifications.Add(notificationToUser);
            sendESLOffsetNotificationEvent(notificationToUser);

            await context.SaveChangesAsync();
            return notificationToUser;
        }
    }
}
