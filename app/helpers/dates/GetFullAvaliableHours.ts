import moment from "moment";
import { Moment } from "moment";

export default function GetFullAvaliableHours(BaseAvaliableHours: string [], AvaliableHoursDate: Moment,
    ExceptionDates: string [], AdditionDates: string []) 
{
    const MatchingAdditionDates = AdditionDates.filter((AdditionDate) => 
        AvaliableHoursDate.startOf('day').isSame(moment(AdditionDate).startOf('day')));

    const MatchingExceptionDates = ExceptionDates.filter((ExceptionDate) => 
        AvaliableHoursDate.startOf('day').isSame(moment(ExceptionDate).startOf('day')));

    // Add hours to the array if they don't already exist
    MatchingAdditionDates.forEach((Date) => {
        const Hour = moment(Date).format('HH:mm');
        if (!BaseAvaliableHours.includes(Hour)) {
            BaseAvaliableHours.push(Hour);
        }
    });

    MatchingExceptionDates.forEach((Date) => {
        const Hour = moment(Date).format('HH:mm');
        if (BaseAvaliableHours.includes(Hour)) {
            BaseAvaliableHours = BaseAvaliableHours.filter((BaseHour) => BaseHour !== Hour);
        }
    });

    return BaseAvaliableHours;
}