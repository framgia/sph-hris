using api.Context;
using api.Enums;
using api.Requests;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class ApprovalMutation
    {
        public async Task<bool> ApproveDisapproveOvertime(ApproveOvertimeRequest approvingData, [Service] ApprovalService _approvalService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();

                await _approvalService.ApproveDisapproveOvertime(approvingData);

                transaction.Commit();

                return true;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        public async Task<string> ApproveDisapproveAllOvertimeSummaryAsync(ApproveOvertimeSummaryRequest approvingDatas, [Service] ApprovalService _approvalService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                var approvalTasks = approvingDatas.ApproveOvertimeRequests.Select(x => _approvalService.ApproveDisapproveSummaryOvertime(x, context));
                await Task.WhenAll(approvalTasks);

                await context.SaveChangesAsync();
                return SuccessMessageEnum.OVERTIME_SUMMARY_REVIEW_SUBMITTED;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        public async Task<bool> ApproveDisapproveLeave(ApproveLeaveUndertimeRequest approvingData, [Service] ApprovalService _approvalService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();

                await _approvalService.ApproveDisapproveLeave(approvingData);

                transaction.Commit();

                return true;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        public async Task<bool> ApproveDisapproveUndertime(ApproveLeaveUndertimeRequest approvingData, [Service] ApprovalService _approvalService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();

                await _approvalService.ApproveDisapproveUndertime(approvingData);

                transaction.Commit();

                return true;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        public async Task<bool> ApproveDisapproveChangeShift(ApproveChangeShiftRequest approvingData, [Service] ApprovalService _approvalService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();

                await _approvalService.ApproveDisapproveChangeShift(approvingData);

                transaction.Commit();

                return true;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }
    }
}
