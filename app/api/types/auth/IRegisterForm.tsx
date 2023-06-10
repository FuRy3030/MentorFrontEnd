import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface IRegisterForm {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    PolicyConsent: boolean;
};

export const IRegisterFormZodObject = z.object({
    FirstName: z.string({ required_error: 'Imię jest obowiązkowe' }).min(1, "Imię jest obowiązkowe"),
    LastName: z.string({ required_error: 'Nazwisko jest obowiązkowe' }).min(1, "Nazwisko jest obowiązkowe"),
    Email: z.string().email("Adres email jest nieprawidłowy"),
    Password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków").refine((Value) => {
        const HasCapitalLetter = /[A-Z]/.test(Value);
        const HasNumber = /\d/.test(Value);
        const HasSpecialChar = /[!@#$%^&*]/.test(Value);
        return HasCapitalLetter && HasNumber && HasSpecialChar;
    }, {
        message: 'Hasło musi zawierać przynajmniej jedną wielką literę, cyfrę i znak specjalny',
    }),
    PolicyConsent: z.boolean().refine((Value) => Value === true, {
        message: 'Zgoda jest obowiązkowa',
    })
});

export const IRegisterFormResolver = zodResolver(IRegisterFormZodObject);
