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
        const AvaliableHours: { item1: string; item2: string[] } [] = watch("AvaliableHours");
        const HoursForGivenDayIndex: number = AvaliableHours
            .findIndex((AvaliableHoursDay) => AvaliableHoursDay.item1 === Day);

        if (Action === 'ADD' && HoursForGivenDayIndex >= 0) {
            AvaliableHours[HoursForGivenDayIndex].item2.push(Hour);
        } else if (HoursForGivenDayIndex >= 0) {
            AvaliableHours[HoursForGivenDayIndex].item2 = AvaliableHours[HoursForGivenDayIndex].item2
                .filter(ExistingHour => ExistingHour !== Hour);
        }

        setValue("AvaliableHours", AvaliableHours);
    };
    
    if (Hours.length > 0) {
        return (
            <div className="flex flex-row justify-evenly my-7">
                {AvaliableHours.map((AvaliableHoursDay: { item1: string; item2: string[] }) => (
                    <MyDaySchedulePicker 
                        Day={AvaliableHoursDay.item1} 
                        key={AvaliableHoursDay.item1}
                        Hours={Hours} 
                        ActiveHours={AvaliableHoursDay.item2}
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