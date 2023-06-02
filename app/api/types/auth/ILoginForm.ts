import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface ILoginForm {
    Email: string;
    Password: string;
};

export const ILoginFormZodObject = z.object({
    Email: z.string().email(),
    Password: z.string().min(4)
});

export const ILoginFormResolver = zodResolver(ILoginFormZodObject);