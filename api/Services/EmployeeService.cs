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
        private void GenerateEmployeeFormInitialData(User user, AddNewEmployeeRequest rawNewEmployeeData, HrisContext context)
        {
            context.Forms.AddRange(new List<Form>(){
                // For First Day Onboarding
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.TOOLS
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.GITHUB_ACCOUNT
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.EMAIL_TWO_FACTOR_AUTH_SCREENSHOT
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.GITHUB_TWO_FACTOR_AUTH_SCREENSHOT
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.E_SIGN
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.TWO_X_TWO_PICTURE
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.PROBATIONARY_CONTRACT
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.SSS_LOAN
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.PAGIBIG_LOAN
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.SSS_MONTHLY_AMORTIZATION
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.FIRST_DAY_ONBOARDING,
                    Field = FirstDayOnboardingFieldEnum.PAGIBIG_MONTHLY_AMORTIZATION
                },

                // For Personal Information
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.FIRST_NAME,
                    Value = rawNewEmployeeData.FirstName,
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.MIDDLE_NAME,
                    Value = rawNewEmployeeData.MiddleName,
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.LAST_NAME,
                    Value = rawNewEmployeeData.LastName,
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.POSITION,
                    Value = user.Position.Name,
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.SSS_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.SSS_NUMBER
                },new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.TIN_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.PHILHEALTH_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.PAGIBIG_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.BIRTHDAY
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.EDUCATIONAL_BACKGROUND
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.CONTACT_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.MOBILE_CARRIER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.ADDRESS
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.EMAIL
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.SLACK_ACCOUNT
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.EMERGENCY_NAME
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.EMERGENCY_RELATIONSHIPP
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.EMERGENCY_ADDRESS
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.PERSONAL_INFORMATION,
                    Field = PersonalInformationFieldEnum.EMERGENCY_CONTACT_NUMBER
                },

                // For ATM Applications
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.FIRST_NAME,
                    Value = rawNewEmployeeData.FirstName,
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.MIDDLE_NAME,
                    Value = rawNewEmployeeData.MiddleName,
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.LAST_NAME,
                    Value = rawNewEmployeeData.LastName,
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.MOTHER_NAME
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.MARITAL_STATUS
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.GENDER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.PERMANENT_ADDRESS
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.CITY_MUNICIPALITY_PROVINCE
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.ZIP_CODE
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.CONTACT_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.BIRTH_PLACE
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.BIRTHDAY
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.POSITION
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.TIN_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.ATM_APPLICATIONS,
                    Field = ATMApplicationsFieldEnum.SSS_NUMBER
                },

                // For Laptop Monitoring
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.OWNER,
                    Value = user.Name
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.BRAND
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.MODEL
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.SERIAL_NUMBER
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.COMPANY_TAG
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.ISSUE_DATE
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.CONDITION
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.HAS_ISSUE_PROBLEM
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.ISSUE_PROBLEM
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.OS
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.RAM
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.PROCESSOR
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.VIDEO_MEMORY
                },
                new Form {
                    User = user,
                    Type = FormTypeEnum.LAPTOP_MONITORING,
                    Field = LaptopMonitoringFieldEnum.OTHER_NOTE
                },
            });
        }

    }
}
