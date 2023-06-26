import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { RequiredNumber } from "../ZodBase";

export default interface IPricingForm {
    Id?: string;
    TutorId?: string;
    Name: "OWE" | "OP" | "OM" | "OI" | "OFIZ" | "OLCHEM" | "OBIOL" | "OHIS" | "OGEO" | "OLIJP" | "LOSY" | "OFIL" | "OWOPISW" | "OASTRO" | "OJA" | "OJN" | "OJFR";
    BasePrice: number;
    DoublePackagePrice: number;
    TriplePackagePrice: number;
    FivePackagePrice: number;
    TenPackagePrice: number;
    IsDoublePackagePriceActive: boolean;
    IsTriplePackagePriceActive: boolean;
    IsFivePackagePriceActive: boolean;
    IsTenPackagePriceActive : boolean;
};

export const IPricingFormZodObject = z.array(z.object({
    Id: z.string().optional(),
    TutorId: z.string().optional(),
    Name: z.union([z.literal("OWE"), z.literal("OP"), z.literal("OM"), z.literal("OI"), z.literal("OFIZ"), z.literal("OLCHEM"), z.literal("OBIOL"), z.literal("OHIS"), z.literal("OGEO"), z.literal("OLIJP"), z.literal("LOSY"), z.literal("OFIL"), z.literal("OWOPISW"), z.literal("OASTRO"), z.literal("OJA"), z.literal("OJN"), z.literal("OJFR")], { required_error: "Pole jest wymagane" }),
    BasePrice: RequiredNumber,
    DoublePackagePrice: RequiredNumber,
    TriplePackagePrice: RequiredNumber,
    FivePackagePrice: RequiredNumber,
    TenPackagePrice: RequiredNumber,
    IsDoublePackagePriceActive: z.boolean(),
    IsTriplePackagePriceActive: z.boolean(),
    IsFivePackagePriceActive: z.boolean(),
    IsTenPackagePriceActive : z.boolean()
}), { required_error: "Musisz posiadać cennik dla przynajmniej jednej olimpiady" }).min(1, { message: "Musisz posiadać cennik dla przynajmniej jednej olimpiady" });

export const IPricingFormResolver = zodResolver(IPricingFormZodObject);