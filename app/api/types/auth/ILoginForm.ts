import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface ILoginForm {
    Email: string;
    Password: string;
};

export const ILoginFormZodObject = z.object({
    Email: z.string().email("Adres email jest nieprawidłowy"),
    Password: z.string().min(1, "Hasło jest obowiązkowe")
});

export const ILoginFormResolver = zodResolver(ILoginFormZodObject);