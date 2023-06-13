import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Moment } from "moment";
import MomentType from "../ZodMoment";

export default interface IScheduleForm {
    Id?: string;
    TutorId?: string;
    Timezone: string;
    ScheduleStartTime: Moment | string;
    ScheduleEndTime: Moment | string;
    LessonDuration: number;
    AvaliableHours: { item1: string; item2: string[] }[];
    ExceptionDates: string [];
    AdditionDates: string[];
};

export const IScheduleFormZodObject = z.object({
    Id: z.string().optional(),
    TutorId: z.string().optional(),
    Timezone: z.string(),
    ScheduleStartTime: MomentType,
    ScheduleEndTime: MomentType,
    LessonDuration: z.number(),
    AvaliableHours: z.array(z.object({
        item1: z.string(),
        item2: z.array(z.string()),
    })).refine((arr) => arr.length > 0, {
        message: "Twój harmonogram musi zawierać przynajmniej jeden aktywny termin",
    }),
    ExceptionDates: z.array(z.string()),
    AdditionDates: z.array(z.string())
});

export const IScheduleFormResolver = zodResolver(IScheduleFormZodObject);