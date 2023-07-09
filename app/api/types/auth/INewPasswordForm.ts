import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface INewPasswordForm {
    Token?: string;
    Password: string;
};

export const INewPasswordFormZodObject = z.object({
    Token: z.string().optional(),
    Password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków").refine((Value) => {
        const HasCapitalLetter = /[A-Z]/.test(Value);
        const HasNumber = /\d/.test(Value);
        const HasSpecialChar = /[!@#$%^&*]/.test(Value);
        return HasCapitalLetter && HasNumber && HasSpecialChar;
    }, {
        message: 'Hasło musi zawierać przynajmniej jedną wielką literę, cyfrę i znak specjalny',
    })
});

export const INewPasswordFormFormResolver = zodResolver(INewPasswordFormZodObject);