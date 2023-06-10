import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Moment } from "moment";
import MomentType from "../ZodMoment";

export default interface IScheduleForm {
    Id?: string;
    UserId?: string;
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
    UserId: z.string().optional(),
    Timezone: z.string(),
    ScheduleStartTime: MomentType,
    ScheduleEndTime: MomentType,
    LessonDuration: z.number(),
    AvaliableHours: z.array(z.object({
        item1: z.string(),
        item2: z.array(z.string())
    })),
    ExceptionDates: z.array(z.string()),
    AdditionDates: z.array(z.string())
});

export const IScheduleFormResolver = zodResolver(IScheduleFormZodObject);