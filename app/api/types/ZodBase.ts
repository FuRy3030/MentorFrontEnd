import { z } from "zod";

export const RequiredString = z.string({required_error: "Pole jest obowiązkowe"})
    .min(2, {message: "Pole musi zawierać przynajmniej dwa znaki"});

export const RequiredNumber = z.number({required_error: "Pole jest obowiązkowe i musi mieć postać liczby"});

