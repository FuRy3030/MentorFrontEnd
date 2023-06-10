import moment, { Moment } from "moment";
import IScheduleForm, { IScheduleFormResolver } from "../../../api/types/schedule/IScheduleForm";
import MyFormProvider from "../../../providers/MyFormProvider";
import UseMutateSchedule from "../../../api/requests/schedule/mutations/UseMutateSchedule";
import UseUserClaims from "../../../hooks/auth/UseUserClaims";
import SuccessErrorToastsPair from "../../modals/toasts/SuccessErrorToastsPair";
import UseScheduleQuery from "../../../api/requests/schedule/queries/UseScheduleQuery";
import EmptyNotification from "../../EmptyNotification";
import SetTime from "../../../helpers/dates/SetTime";
import MyDatePicker from "../../atoms/forms/dates/MyDatePicker";
import { useState } from "react";
import MyDaySchedulePicker from "../../atoms/forms/dates/MyDaySchedulePicker";
import GetHoursBetweenTwoDates from "../../../helpers/dates/GetHoursBetweenTwoDates";
import { UseQueryResult } from "@tanstack/react-query";
import { ClientError } from "graphql-request";
import { useFormContext } from "react-hook-form";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import GetFullAvaliableHours from "../../../helpers/dates/GetFullAvaliableHours";

function ScheduleExceptionsForm() {
    const ScheduleQuery = UseScheduleQuery();
    const { mutate, isSuccess, isError } = UseMutateSchedule();
    const CurrentDate = moment().tz('Europe/Warsaw');

    const ScheduleStartTimeMoment = SetTime(CurrentDate, typeof ScheduleQuery.data?.ScheduleStartTime === 'string' ? 
        ScheduleQuery.data?.ScheduleStartTime : '00:00');
    const ScheduleEndTimeMoment = SetTime(CurrentDate, typeof ScheduleQuery.data?.ScheduleEndTime === 'string' ? 
        ScheduleQuery.data?.ScheduleEndTime : '00:00');

    const Values: IScheduleForm = {
        Id: ScheduleQuery.data?.Id,
        UserId: UseUserClaims()?.Id,
        Timezone: "Warszawa / Polska",
        ScheduleStartTime: ScheduleStartTimeMoment,
        ScheduleEndTime: ScheduleEndTimeMoment,
        LessonDuration: ScheduleQuery.data?.LessonDuration ? ScheduleQuery.data.LessonDuration : 60,
        AvaliableHours: ScheduleQuery.data?.AvaliableHours ? ScheduleQuery.data.AvaliableHours : [],
        ExceptionDates: ScheduleQuery.data?.ExceptionDates ? ScheduleQuery.data.ExceptionDates : [],
        AdditionDates: ScheduleQuery.data?.AdditionDates ? ScheduleQuery.data.AdditionDates : [],
    };

    if (!ScheduleQuery.data?.Id) {
        return <EmptyNotification />;
    }

    return (
        <MyFormProvider<IScheduleForm> FormResolver={IScheduleFormResolver} DefaultValues={Values}
            OnSubmit={(FormData: IScheduleForm) => console.log(FormData)} ClassName="mx-auto max-w-[700px] my-6"
        >
            <InnerForm 
                ScheduleQuery={ScheduleQuery} 
                ScheduleStartTimeMoment={ScheduleStartTimeMoment} 
                ScheduleEndTimeMoment={ScheduleEndTimeMoment} 
            />
            <SuccessErrorToastsPair 
                SuccessTitle="Harmonogram został zapisany"
                ErrorTitle="Zapisywanie harmonogramu nie powiodło się"
                IsSuccessToastTriggered={isSuccess}
                IsErrorToastTriggered={isError}
                SuccessContent={
                    <p className="text-base font-medium">
                        Twój harmonogram został zaaktualizowany i od teraz będzie dostępny dla wszystkich uczniów.
                    </p>
                }
                ErrorContent={
                    <p className="text-base font-medium">
                        Niestety nie udało nam się zapisać twojego nowego harmonogramu. Spróbuj ponownie później. W przypadku utrzymywania się błędu, skontaktuj się z nami.
                    </p>
                }
            />
        </MyFormProvider>
    );
};

const InnerForm = (Props: { ScheduleQuery: UseQueryResult<IScheduleForm, ClientError>, 
    ScheduleStartTimeMoment: Moment, ScheduleEndTimeMoment: Moment }) => 
{
    const { ScheduleQuery, ScheduleStartTimeMoment, ScheduleEndTimeMoment } = Props;
    const { watch, setValue } = useFormContext();

    const Hours = GetHoursBetweenTwoDates(ScheduleStartTimeMoment, ScheduleEndTimeMoment, ScheduleQuery.data?.LessonDuration!);
    const [EditableDates, SetEditableDates] = useState<Moment []>([moment().tz('Europe/Warsaw'), moment().tz('Europe/Warsaw'), moment().tz('Europe/Warsaw')]);

    const SetEditableDatesFromCalnendar = (Date: Moment) => {
        SetEditableDates([Date.clone().subtract(1, 'day'), Date, Date.clone().add(1, 'day')]);
    };

    const ToggleHour = (Day: string, Hour: string, Action: string) => {
        const ExceptionDates = watch('ExceptionDates');
        const AdditionDates = watch('AdditionDates');

        const EditableDate = EditableDates.find((Date) => Date.date().toString() === Day);
        const DayOfTheWeek = EditableDate?.day();
        const EditableDateWithTime = SetTime(EditableDate!, Hour);
        const AvaliableHoursSchedule = ScheduleQuery.data!.AvaliableHours[DayOfTheWeek!].item2;

        if (AvaliableHoursSchedule.includes(Hour)) {
            if (Action === 'ADD') {
                const NewExceptionDates = ExceptionDates.filter((ExceptionDate: string) => 
                    ExceptionDate !== EditableDateWithTime.format());
                setValue('ExceptionDates', NewExceptionDates);
            } else {
                const NewExceptionDates = [...ExceptionDates, EditableDateWithTime.format()];
                setValue('ExceptionDates', NewExceptionDates);
            }
        } else {
            if (Action === 'ADD') {
                const NewAdditionDates = [...AdditionDates, EditableDateWithTime.format()];
                setValue('AdditionDates', NewAdditionDates);
            } else {
                const NewAdditionDates = AdditionDates.filter((AdditionDate: string) => 
                    AdditionDate !== EditableDateWithTime.format());
                setValue('AdditionDates', NewAdditionDates);
            }
        }
    };

    return (
        <>
            <div className="flex flex-row justify-between gap-x-4">
                <MyDatePicker
                    Name="Calendar"
                    OnChange={SetEditableDatesFromCalnendar}
                    FullWidth
                    Shadow
                    Inline
                />
                <div className="flex flex-row justify-between gap-x-5">
                    {[...EditableDates].map((EditableDate: Moment, Index: number) => (
                        <MyDaySchedulePicker 
                            Day={EditableDate.date().toString()} 
                            key={Index}
                            Hours={Hours} 
                            ActiveHours={GetFullAvaliableHours(
                                ScheduleQuery.data!.AvaliableHours[EditableDate.day()].item2, 
                                EditableDate, 
                                watch('ExceptionDates'), 
                                watch('AdditionDates')
                            )}
                            ToggleHour={ToggleHour} 
                        />
                    ))}
                </div>
            </div>
            <MyStandardButton Type="submit" Text="Zapisz kalendarz" onClick={() => {}} 
                Icon="icon-[material-symbols--calendar-month-rounded]" 
                ClassName="ml-auto mt-8 bg-brand-purple-light hover:text-dark px-20" 
            />
        </>
    );
};

export default ScheduleExceptionsForm;