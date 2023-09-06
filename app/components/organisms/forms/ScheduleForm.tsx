import moment from "moment";
import IScheduleForm, { IScheduleFormResolver } from "../../../api/types/schedule/IScheduleForm";
import MyFormProvider from "../../../providers/MyFormProvider";
import MyStandardButton from "../../atoms/buttons/MyStandardButton";
import MySelectField from "../../atoms/forms/MySelectField";
import MyTextField from "../../atoms/forms/MyTextField";
import MyTimeRangeField from "../../atoms/forms/dates/MyTimeRangeField";
import WeeklyHourPicker from "../../molecules/forms/dates/WeeklyHourPicker";
import UseDaysOfTheWeek from "../../../hooks/constants/UseDaysOfTheWeek";
import { useFormContext } from "react-hook-form";
import GetHoursBetweenTwoDates from "../../../helpers/dates/GetHoursBetweenTwoDates";
import UseUserClaims from "../../../hooks/auth/UseUserClaims";
import SuccessErrorToastsPair from "../../modals/toasts/SuccessErrorToastsPair";
import UseScheduleQuery from "../../../api/requests/schedule/queries/UseScheduleQuery";
import SetTime from "../../../helpers/dates/SetTime";
import { useQueryClient } from "@tanstack/react-query";
import UseScheduleMutation from "../../../api/requests/schedule/mutations/UseScheduleMutation";

function ScheduleForm() {
    const QueryClient = useQueryClient();
    const ScheduleQuery = UseScheduleQuery();
    const { mutate, isSuccess, isError, isLoading } = UseScheduleMutation(() => {
        QueryClient.invalidateQueries(["UserSchedule"]);
    });
    const CurrentDate = moment().tz('Europe/Warsaw');
    let DefaultValues = {};

    if (ScheduleQuery.data?.Id) {
        const ScheduleStartTimeMoment = SetTime(CurrentDate, typeof ScheduleQuery.data?.ScheduleStartTime === 'string' ? 
            ScheduleQuery.data?.ScheduleStartTime : '00:00');
        const ScheduleEndTimeMoment = SetTime(CurrentDate, typeof ScheduleQuery.data?.ScheduleEndTime === 'string' ? 
            ScheduleQuery.data?.ScheduleEndTime : '00:00');

        DefaultValues = {
            Id: ScheduleQuery.data.Id,
            TutorId: ScheduleQuery.data.TutorId,
            Timezone: "Warszawa / Polska",
            ScheduleStartTime: ScheduleStartTimeMoment,
            ScheduleEndTime: ScheduleEndTimeMoment,
            LessonDuration: ScheduleQuery.data.LessonDuration,
            AvaliableHours: ScheduleQuery.data.AvaliableHours,
            ExceptionDates: ScheduleQuery.data.ExceptionDates,
            AdditionDates: ScheduleQuery.data.AdditionDates
        };
    } else {
        DefaultValues = {
            Id: undefined,
            TutorId: UseUserClaims()?.Id,
            Timezone: "Warszawa / Polska",
            ScheduleStartTime: CurrentDate,
            ScheduleEndTime: CurrentDate,
            LessonDuration: 60,
            AvaliableHours: [],
            ExceptionDates: [],
            AdditionDates: []
        };
    }

    return (
        <MyFormProvider<IScheduleForm> FormResolver={IScheduleFormResolver} DefaultValues={DefaultValues} 
            IsFetched={ScheduleQuery.isFetched} OnSubmit={(FormData: IScheduleForm) => mutate(FormData)} 
            ClassName="mx-auto max-w-[750px] my-6" IsLoading={ScheduleQuery.isLoading || isLoading}
        >
            <InnerForm />
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

const InnerForm = () => {
    const { watch, setValue, clearErrors, setError, formState: { errors } } = useFormContext();
    const DaysOfTheWeek = UseDaysOfTheWeek();

    const OnChangeAvaliableHours = () => {
        const AvaliableHours = new Array<{ Item1: string; Item2: string[] }>();
        const Hours = GetHoursBetweenTwoDates(watch("ScheduleStartTime"), watch("ScheduleEndTime"), 
            parseInt(watch("LessonDuration")));

        if (Hours.length === 0) {
            setError("ScheduleStartTime", { type: 'custom', message: 'Godzina rozpoczęcia musi być wcześniejsza niż godzina zakończenia' });
            setError("ScheduleEndTime", { type: 'custom', message: 'Godzina rozpoczęcia musi być wcześniejsza niż godzina zakończenia' });
        }
        else {
            clearErrors("ScheduleStartTime");
            clearErrors("ScheduleEndTime");
        }

        DaysOfTheWeek.forEach((Day) => {
            AvaliableHours.push({ Item1: Day, Item2: Hours });
        });

        setValue("AvaliableHours", AvaliableHours);
    };

    return (
        <>
            <div className="w-full flex flex-row flex-wrap justify-between mb-5">
                <MyTextField 
                    Name="Timezone" 
                    Label="Strefa czasowa" 
                    Placeholder="Wybierz swoją strefę czasową" 
                    FullWidth 
                    Readonly
                    ClassNameRow="mb-5 w-full md:w-[45%] md:mb-0"
                />
                <MySelectField<string> 
                    Label="Czas trwania zajęć"
                    Name="LessonDuration"
                    Options={[
                        { value: "30", inputDisplay: <span>00:30</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Pół godziny</span> },
                        { value: "60", inputDisplay: <span>01:00</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Godzina zegarowa</span> },
                        { value: "120", inputDisplay: <span>02:00</span>, dropdownDisplay: <span className="text-sm text-semi-dark-alt font-semibold">Dwie godziny zegarowe</span> }
                    ]}
                    OnChange={OnChangeAvaliableHours}
                    FullWidth
                    ClassNameRow="w-full md:w-[45%] MarginTopNoneImportant"
                    IsValueNumber
                />
            </div>
            <MyTimeRangeField 
                Label="Godzina ropoczęcia i zakończenia"
                Name={["ScheduleStartTime", "ScheduleEndTime"]}
                OnChange={[OnChangeAvaliableHours, OnChangeAvaliableHours]}
                FullWidth
            />  
            {errors['AvaliableHours']?.message && <p className="text-sm font-semibold text-red-600 mt-1.5 cursor-default">
                {errors['AvaliableHours']?.message.toString()}
            </p>}  
            <WeeklyHourPicker />       
            <MyStandardButton Type="submit" Text="Zapisz harmonogram" onClick={() => {}} 
                Icon="icon-[mingcute--schedule-fill]" 
                ClassName="mt-8 bg-brand-purple-light hover:text-dark px-8 mx-auto md:px-20 md:ml-auto md:mr-0 w-auto" 
            />
        </>
    );
};

export default ScheduleForm;