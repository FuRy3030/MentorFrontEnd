import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface IRegisterForm {
    FirstName: string;
    Surname: string;
    Email: string;
    Password: string;
};

export const IRegisterFormZodObject = z.object({
    FirstName: z.string({ required_error: 'Imię jest obowiązkowe' }),
    Surname: z.string({ required_error: 'Nazwisko jest obowiązkowe' }),
    Email: z.string().email(),
    Password: z.string().min(4)
});

export const IRegisterFormResolver = zodResolver(IRegisterFormZodObject);
