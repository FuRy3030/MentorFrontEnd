import { Moment } from "moment";

export default function SetTime(Date: Moment, TimeString: string) {
    const [Hours, Minutes] = TimeString.split(':'); 
    return Date.clone().hours(parseInt(Hours)).minutes(parseInt(Minutes)).seconds(0);
};