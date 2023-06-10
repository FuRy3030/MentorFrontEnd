import moment from "moment";
import { Moment } from "moment";

export default function GetHoursBetweenTwoDates(StartDate: Moment, EndDate: Moment, Interval: number): string[] {
    const Hours: string[] = [];
    const CurrentHour = moment(StartDate);
  
    while (CurrentHour.isBefore(EndDate)) {
        Hours.push(CurrentHour.format('HH:mm'));
        CurrentHour.add(Interval, 'minutes');
    }
  
    return Hours;
};