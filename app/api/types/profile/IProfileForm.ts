import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { RequiredNumber, RequiredString } from "../ZodBase";
import { ExtractRawTextFromHtml } from "../../../components/atoms/forms/MyTinyMCETextEditor";

export default interface IProfileForm {
    Id?: string;
    TutorId?: string;
    GeoLocation: {
        Longitude?: number;
        Latitude?: number;
    };
    City: string;
    Country: string;
    FullLocation: string;
    Education?: 'STUDENT' | 'BACHELOR' | 'MASTERS' | 'PHD';
    Olympiads: {
        Name: "OWE" | "OP" | "OM" | "OI" | "OFIZ" | "OLCHEM" | "OBIOL" | "OHIS" | "OGEO" | "OLIJP" | "LOSY" | "OFIL" | "OWOPISW" | "OASTRO" | "OJA" | "OJN" | "OJFR" | "OSTAT";
        Experience: 'FINALIST' | 'LAUREATE' | 'INTERNATIONAL' | 'WINNER';
    } [];
    IsRemote: boolean;
    IsStationary: boolean;
    Description: string;
};

export const IProfileFormZodObject = z.object({
    Id: z.string().optional(),
    TutorId: z.string().optional(),
    City: z.string({required_error: "Pole jest wymagane"})
        .min(2, {message: "Nazwa miasta musi zawierać przynajmniej dwa znaki"}),
    Country: RequiredString,
    FullLocation: RequiredString,
    GeoLocation: z.object({
        Longitude: RequiredNumber,
        Latitude: RequiredNumber,
    }),
    Education: z.nativeEnum({
        STUDENT: "STUDENT",
        BACHELOR: "BACHELOR",
        MASTERS: "MASTERS",
        PHD: "PHD",
    }, { required_error: "Pole jest wymagane" }),
    Olympiads: z.array(
        z.object({
            Name: z.union([z.literal("OWE"), z.literal("OP"), z.literal("OM"), z.literal("OI"), z.literal("OFIZ"), z.literal("OLCHEM"), z.literal("OBIOL"), z.literal("OHIS"), z.literal("OGEO"), z.literal("OLIJP"), z.literal("LOSY"), z.literal("OFIL"), z.literal("OWOPISW"), z.literal("OASTRO"), z.literal("OJA"), z.literal("OJN"), z.literal("OJFR"), z.literal("OSTAT")], { required_error: "Pole jest wymagane" }),
            Experience: z.enum(["FINALIST", "LAUREATE", "INTERNATIONAL", "WINNER"], { required_error: "Pole jest wymagane", invalid_type_error: "Pole jest wymagane" }),
        }), 
        { required_error: "Musisz wybrać przynajmniej jedną olimpiadę" })
        .min(1, { message: "Musisz wybrać przynajmniej jedną olimpiadę" }),
    IsRemote: z.boolean(),
    IsStationary: z.boolean(),
    Description: RequiredString.refine((Value) => 
        ExtractRawTextFromHtml(Value).length > 0, { message: "Pole jest wymagane" }),
});

export const IProfileFormResolver = zodResolver(IProfileFormZodObject);
