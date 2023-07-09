import { useFormContext } from "react-hook-form";
import GetHoursBetweenTwoDates from "../../../../helpers/dates/GetHoursBetweenTwoDates";
import MyDaySchedulePicker from "../../../atoms/forms/dates/MyDaySchedulePicker";
import EmptyNotification from "../../../EmptyNotification";

function WeeklyHourPicker() {
    const { watch, setValue } = useFormContext();
    const Hours = GetHoursBetweenTwoDates(watch("ScheduleStartTime"), watch("ScheduleEndTime"), 
        parseInt(watch("LessonDuration")));
    const AvaliableHours = watch("AvaliableHours");
    
    const ToggleHour = (Day: string, Hour: string, Action: string) => {
        const AvaliableHours: { Item1: string; Item2: string[] } [] = watch("AvaliableHours");
        const HoursForGivenDayIndex: number = AvaliableHours
            .findIndex((AvaliableHoursDay) => AvaliableHoursDay.Item1 === Day);

        if (Action === 'ADD' && HoursForGivenDayIndex >= 0) {
            AvaliableHours[HoursForGivenDayIndex].Item2.push(Hour);
        } else if (HoursForGivenDayIndex >= 0) {
            AvaliableHours[HoursForGivenDayIndex].Item2 = AvaliableHours[HoursForGivenDayIndex].Item2
                .filter(ExistingHour => ExistingHour !== Hour);
        }

        setValue("AvaliableHours", AvaliableHours);
    };
    
    if (Hours.length > 0) {
        return (
            <div className="flex flex-row justify-evenly my-7">
                {AvaliableHours.map((AvaliableHoursDay: { Item1: string; Item2: string[] }) => (
                    <MyDaySchedulePicker 
                        Day={AvaliableHoursDay.Item1} 
                        key={AvaliableHoursDay.Item1}
                        Hours={Hours} 
                        ActiveHours={AvaliableHoursDay.Item2}
                        ToggleHour={ToggleHour} 
                    />
                ))}
            </div>
        );
    } else {
        return <EmptyNotification Message="Dodaj swój harmonogram" />;
    }
};

export default WeeklyHourPicker;