using System.Globalization;
using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Utils;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class EmployeeService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly EmployeeServiceInputValidation _customInputValidation;

        public EmployeeService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
            _customInputValidation = new EmployeeServiceInputValidation(_contextFactory);
        }

        public async Task<bool> AddNew(AddNewEmployeeRequest newEmployeeData, HrisContext context)
        {
            var errors = _customInputValidation.CheckAddNewEmployeeRequestInput(newEmployeeData);
            if (errors.Count > 0) throw new GraphQLException(errors);

            // Format Name
            TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
            string capitalizedName = textInfo.ToTitleCase($"{newEmployeeData.FirstName} {newEmployeeData.LastName}");

            var position = await context.Positions.FindAsync(newEmployeeData.PositionId);

            try
            {
                var newEmployee = new User
                {
                    Name = capitalizedName,
                    Email = newEmployeeData.Email,
                    RoleId = newEmployeeData.RoleId,
                    PositionId = newEmployeeData.PositionId,
                    Position = position!,
                    EmployeeScheduleId = newEmployeeData.ScheduleId != null ? (int)newEmployeeData.ScheduleId : 1
                };

                context.Users.Add(newEmployee);

                // Create data for FORMS table
                GenerateEmployeeFormInitialData(newEmployee, newEmployeeData, context);

                // Commit to database
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception(ErrorMessageEnum.FAILED_ADDING_NEW_EMPLOYEE);
            }


            return true;
        }

        // Private Methods
        private async void GenerateEmployeeFormInitialData(User user, AddNewEmployeeRequest rawNewEmployeeData, HrisContext context)
        {
            var formsList = new List<Form>();
            GenerateOnboardingForms(user, rawNewEmployeeData, formsList);
            GeneratePersonalInformationForms(user, rawNewEmployeeData, formsList);
            GenerateATMApplicationsForms(user, rawNewEmployeeData, formsList);
            GenerateLaptopMonitoringForms(user, rawNewEmployeeData, formsList);

            await context.Forms.AddRangeAsync(formsList);
        }

        private void GenerateOnboardingForms(User user, AddNewEmployeeRequest rawNewEmployeeData, List<Form> formsList)
        {
            var firstDayOnboardingFields = new[]
            {
                FirstDayOnboardingFieldEnum.TOOLS,
                FirstDayOnboardingFieldEnum.GITHUB_ACCOUNT,
                FirstDayOnboardingFieldEnum.EMAIL_TWO_FACTOR_AUTH_SCREENSHOT,
                FirstDayOnboardingFieldEnum.GITHUB_TWO_FACTOR_AUTH_SCREENSHOT,
                FirstDayOnboardingFieldEnum.E_SIGN,
                FirstDayOnboardingFieldEnum.TWO_X_TWO_PICTURE,
                FirstDayOnboardingFieldEnum.PROBATIONARY_CONTRACT,
                FirstDayOnboardingFieldEnum.SSS_LOAN,
                FirstDayOnboardingFieldEnum.PAGIBIG_LOAN,
                FirstDayOnboardingFieldEnum.SSS_MONTHLY_AMORTIZATION,
                FirstDayOnboardingFieldEnum.PAGIBIG_MONTHLY_AMORTIZATION
            };

            var formsToAdd = firstDayOnboardingFields
                .Select(field => new Form
                {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = field
                }).ToList();

            formsList.AddRange(formsToAdd);
        }

        private void GeneratePersonalInformationForms(User user, AddNewEmployeeRequest rawNewEmployeeData, List<Form> formsList)
        {
            var personalInformationFields = new[]
            {
                (PersonalInformationFieldEnum.FIRST_NAME, rawNewEmployeeData.FirstName),
                (PersonalInformationFieldEnum.MIDDLE_NAME, rawNewEmployeeData.MiddleName),
                (PersonalInformationFieldEnum.LAST_NAME, rawNewEmployeeData.LastName),
                (PersonalInformationFieldEnum.POSITION, user.Position.Name),
                (PersonalInformationFieldEnum.SSS_NUMBER, null),
                (PersonalInformationFieldEnum.TIN_NUMBER, null),
                (PersonalInformationFieldEnum.PHILHEALTH_NUMBER, null),
                (PersonalInformationFieldEnum.PAGIBIG_NUMBER, null),
                (PersonalInformationFieldEnum.BIRTHDAY, null),
                (PersonalInformationFieldEnum.EDUCATIONAL_BACKGROUND, null),
                (PersonalInformationFieldEnum.CONTACT_NUMBER, null),
                (PersonalInformationFieldEnum.MOBILE_CARRIER, null),
                (PersonalInformationFieldEnum.ADDRESS, null),
                (PersonalInformationFieldEnum.EMAIL, null),
                (PersonalInformationFieldEnum.SLACK_ACCOUNT, null),
                (PersonalInformationFieldEnum.EMERGENCY_NAME, null),
                (PersonalInformationFieldEnum.EMERGENCY_RELATIONSHIPP, null),
                (PersonalInformationFieldEnum.EMERGENCY_ADDRESS, null),
                (PersonalInformationFieldEnum.EMERGENCY_CONTACT_NUMBER, null)
            };

            var formsToAdd = personalInformationFields
                .Select(field => new Form
                {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = field.Item1,
                    Value = field.Item2
                }).ToList();

            formsList.AddRange(formsToAdd);
        }

        private void GenerateATMApplicationsForms(User user, AddNewEmployeeRequest rawNewEmployeeData, List<Form> formsList)
        {
            var atmApplicationsFields = new[]
            {
                (ATMApplicationsFieldEnum.FIRST_NAME, rawNewEmployeeData.FirstName),
                (ATMApplicationsFieldEnum.MIDDLE_NAME, rawNewEmployeeData.MiddleName),
                (ATMApplicationsFieldEnum.LAST_NAME, rawNewEmployeeData.LastName),
                (ATMApplicationsFieldEnum.MOTHER_NAME, null),
                (ATMApplicationsFieldEnum.MARITAL_STATUS, null),
                (ATMApplicationsFieldEnum.GENDER, null),
                (ATMApplicationsFieldEnum.PERMANENT_ADDRESS, null),
                (ATMApplicationsFieldEnum.CITY_MUNICIPALITY_PROVINCE, null),
                (ATMApplicationsFieldEnum.ZIP_CODE, null),
                (ATMApplicationsFieldEnum.CONTACT_NUMBER, null),
                (ATMApplicationsFieldEnum.BIRTH_PLACE, null),
                (ATMApplicationsFieldEnum.BIRTHDAY, null),
                (ATMApplicationsFieldEnum.POSITION, null),
                (ATMApplicationsFieldEnum.TIN_NUMBER, null),
                (ATMApplicationsFieldEnum.SSS_NUMBER, null)
            };

            var formsToAdd = atmApplicationsFields
                .Select(field => new Form
                {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = field.Item1,
                    Value = field.Item2
                }).ToList();

            formsList.AddRange(formsToAdd);
        }

        private void GenerateLaptopMonitoringForms(User user, AddNewEmployeeRequest rawNewEmployeeData, List<Form> formsList)
        {
            var laptopMonitoringFields = new[]
            {
                (LaptopMonitoringFieldEnum.OWNER, user.Name),
                (LaptopMonitoringFieldEnum.BRAND, null),
                (LaptopMonitoringFieldEnum.MODEL, null),
                (LaptopMonitoringFieldEnum.SERIAL_NUMBER, null),
                (LaptopMonitoringFieldEnum.COMPANY_TAG, null),
                (LaptopMonitoringFieldEnum.ISSUE_DATE, null),
                (LaptopMonitoringFieldEnum.CONDITION, null),
                (LaptopMonitoringFieldEnum.HAS_ISSUE_PROBLEM, null),
                (LaptopMonitoringFieldEnum.ISSUE_PROBLEM, null),
                (LaptopMonitoringFieldEnum.OS, null),
                (LaptopMonitoringFieldEnum.RAM, null),
                (LaptopMonitoringFieldEnum.PROCESSOR, null),
                (LaptopMonitoringFieldEnum.VIDEO_MEMORY, null),
                (LaptopMonitoringFieldEnum.OTHER_NOTE, null)
            };

            var formsToAdd = laptopMonitoringFields
                .Select(field => new Form
                {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = field.Item1,
                    Value = field.Item2
                }).ToList();

            formsList.AddRange(formsToAdd);
        }

    }
}
