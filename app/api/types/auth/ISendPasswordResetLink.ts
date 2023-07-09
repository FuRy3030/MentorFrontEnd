import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export default interface ISendPasswordResetLinkForm {
    Email: string;
};

export const ISendPasswordResetLinkFormZodObject = z.object({
    Email: z.string().email("Adres email jest nieprawidłowy")
});

export const ISendPasswordResetLinkFormResolver = zodResolver(ISendPasswordResetLinkFormZodObject);