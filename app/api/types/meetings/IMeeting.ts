export default interface IMeeting {
    Id: string;
    StudentName: string;
    EducationalServiceName: "OWE" | "OP" | "OM" | "OI" | "OFIZ" | "OLCHEM" | "OBIOL" | "OHIS" | "OGEO" | "OLIJP" | "LOSY" | "OFIL" | "OWOPISW" | "OASTRO" | "OJA" | "OJN" | "OJFR" | "OSTAT";
    Date: string;
    IsPaid: boolean;
};