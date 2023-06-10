import moment from "moment";
import { Moment } from "moment";
import { z } from "zod";

const MomentType = z.custom<Moment>((Value) => {
    if (!moment.isMoment(Value)) {
        throw new Error('Invalid date object!');
    }
    return Value;
});

export default MomentType;