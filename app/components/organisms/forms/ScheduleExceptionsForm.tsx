import moment, { Moment } from "moment";
import IScheduleForm, { IScheduleFormResolver } from "../../../api/types/schedule/IScheduleForm";
import MyFormProvider from "../../../providers/MyFormProvider";
import SuccessErrorToastsPair from "../../modals/toasts/SuccessErrorToastsPair";
import UseScheduleQuery from "../../../api/requests/schedule/queries/UseScheduleQuery";
import EmptyNotification from "../../EmptyNotification";
import SetTime from "../../../helpers/dates/SetTime";
import MyDatePicker from "../../atoms/forms/dates/MyDatePicker";
import { useState } from "react";
import MyDaySchedulePicker from "../../atoms/forms/dates/MyDaySchedulePicker";
import GetHoursBetweenTwoDates from "../../../helpers/dates/GetHoursBetweenTwoDates";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { ClientError } from "graphql-request";
import { useFormContext } from "react-hook-form";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import GetFullAvaliableHours from "../../../helpers/dates/GetFullAvaliableHours";
import UseScheduleMutation from "../../../api/requests/schedule/mutations/UseScheduleMutation";

function ScheduleExceptionsForm() {
    const QueryClient = useQueryClient();
    const ScheduleQuery = UseScheduleQuery();
    const { mutate, isSuccess, isError } = UseScheduleMutation(() => {
        QueryClient.invalidateQueries(["UserSchedule"]);
    });
    const CurrentDate = moment().tz('Europe/Warsaw');

    const ScheduleStartTimeMoment = SetTime(CurrentDate, typeof ScheduleQuery.data?.ScheduleStartTime === 'string' ? 
        ScheduleQuery.data?.ScheduleStartTime : '00:00');
    const ScheduleEndTimeMoment = SetTime(CurrentDate, typeof ScheduleQuery.data?.ScheduleEndTime === 'string' ? 
        ScheduleQuery.data?.ScheduleEndTime : '00:00');

    const Values: IScheduleForm = {
        Id: ScheduleQuery.data?.Id,
        TutorId: ScheduleQuery.data?.TutorId,
        Timezone: "Warszawa / Polska",
        ScheduleStartTime: ScheduleStartTimeMoment,
        ScheduleEndTime: ScheduleEndTimeMoment,
        LessonDuration: ScheduleQuery.data?.LessonDuration ? ScheduleQuery.data.LessonDuration : 60,
        AvaliableHours: ScheduleQuery.data?.AvaliableHours ? ScheduleQuery.data.AvaliableHours : [],
        ExceptionDates: ScheduleQuery.data?.ExceptionDates ? ScheduleQuery.data.ExceptionDates : [],
        AdditionDates: ScheduleQuery.data?.AdditionDates ? ScheduleQuery.data.AdditionDates : [],
    };

    if (!ScheduleQuery.data?.Id) {
        return <EmptyNotification Message="Twój kalendarz pozostaje pusty dopóki nie stworzysz harmonogramu" />;
    }

    return (
        <MyFormProvider<IScheduleForm> FormResolver={IScheduleFormResolver} DefaultValues={Values} 
            IsFetched={ScheduleQuery.isFetched} OnSubmit={(FormData: IScheduleForm) => mutate(FormData)} 
            ClassName="mx-auto max-w-[750px] my-6"
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
    const [EditableDates, SetEditableDates] = useState<Moment []>([
        moment().tz('Europe/Warsaw').subtract(3, 'day'), 
        moment().tz('Europe/Warsaw').subtract(2, 'day'),
        moment().tz('Europe/Warsaw').subtract(1, 'day'),
        moment().tz('Europe/Warsaw'),
        moment().tz('Europe/Warsaw').add(1, 'day'),
        moment().tz('Europe/Warsaw').add(2, 'day'), 
        moment().tz('Europe/Warsaw').add(3, 'day')
    ]);

    const SetEditableDatesFromCalnendar = (Date: Moment) => {
        SetEditableDates([
            Date.clone().subtract(3, 'day'), 
            Date.clone().subtract(2, 'day'), 
            Date.clone().subtract(1, 'day'), 
            Date, 
            Date.clone().add(1, 'day'),
            Date.clone().add(2, 'day'),
            Date.clone().add(3, 'day')
        ]);
    };

    const ToggleHour = (Day: string, Hour: string, Action: string) => {
        const ExceptionDates = watch('ExceptionDates');
        const AdditionDates = watch('AdditionDates');

        const EditableDate = EditableDates.find((Date) => Date.date().toString() === Day);
        const DayOfTheWeek = EditableDate?.day();
        const EditableDateWithTime = SetTime(EditableDate!, Hour);
        const AvaliableHoursSchedule = ScheduleQuery.data!.AvaliableHours[DayOfTheWeek!].Item2;

        if (AvaliableHoursSchedule.includes(Hour)) {
            if (Action === 'ADD') {
                const NewExceptionDates = ExceptionDates.filter((ExceptionDate: string) => 
                    ExceptionDate !== EditableDateWithTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
                setValue('ExceptionDates', NewExceptionDates);
            } else {
                const NewExceptionDates = [...ExceptionDates, EditableDateWithTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ')];
                setValue('ExceptionDates', NewExceptionDates);
            }
        } else {
            if (Action === 'ADD') {
                const NewAdditionDates = [...AdditionDates, EditableDateWithTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ')];
                setValue('AdditionDates', NewAdditionDates);
            } else {
                const NewAdditionDates = AdditionDates.filter((AdditionDate: string) => 
                    AdditionDate !== EditableDateWithTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
                setValue('AdditionDates', NewAdditionDates);
            }
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between mt-9">
                <div className="flex flex-col mr-0 mb-6 sm:mr-10 sm:mb-0">
                    <h5 className="mb-3 text-lg font-bold text-dark">
                        Potrzebujesz zmienić swój harmonogram dla konkretnego dnia?
                    </h5>
                    <p className="mb-0 text-base font-semibold text-semi-dark-alt text-justify">
                        Poniższy kalendarz umożliwia wybranie dowolnej daty, dla której chcesz dodać daną godzinę lub ją usunąć. 
                        W ten sposób możesz dokładnie dopasować swój kalendarz do swojego indywidualnego życiowego harmonogramu i nieprzewidzianych wcześniej wydarzeń.
                    </p>
                </div>
                <MyDatePicker
                    Name="Calendar"
                    OnChange={SetEditableDatesFromCalnendar}
                    FullWidth
                    Shadow
                    Inline
                />
            </div>
            <div className="flex flex-row my-8 justify-evenly">
                {[...EditableDates].map((EditableDate: Moment, Index: number) => (
                    <MyDaySchedulePicker 
                        Day={EditableDate.date().toString()} 
                        key={Index}
                        Hours={Hours} 
                        ActiveHours={GetFullAvaliableHours(
                            ScheduleQuery.data!.AvaliableHours[EditableDate.day()].Item2, 
                            EditableDate, 
                            watch('ExceptionDates'), 
                            watch('AdditionDates')
                        )}
                        ToggleHour={ToggleHour} 
                    />
                ))}
            </div>
            <MyStandardButton Type="submit" Text="Zapisz kalendarz" onClick={() => {}} 
                Icon="icon-[material-symbols--calendar-month-rounded]" 
                ClassName="mt-8 bg-brand-purple-light hover:text-dark px-8 mx-auto md:px-20 md:ml-auto md:mr-0 w-auto" 
            />
        </>
    );
};

export default ScheduleExceptionsForm;