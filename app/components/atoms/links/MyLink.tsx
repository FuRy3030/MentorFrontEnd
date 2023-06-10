import clsx from "clsx";
import Link from "next/link";

export interface MyLinkProps {
    To: string;
    Text: string;
    ClassName?: string;
    Variant?: "primary" | "grey";
}

function MyLink(Props: MyLinkProps) {
    if (Props.Variant === "grey") {
        return (
            <Link href={Props.To} className={clsx('text-sm decoration-dotted underline text-semi-dark font-medium', Props.ClassName)}>
                {Props.Text}
            </Link>
        );
    } else {
        return (
            <Link href={Props.To} className={clsx('text-sm decoration-dotted underline text-brand-purple-light font-medium', Props.ClassName)}>
                {Props.Text}
            </Link>
        );
    }
};

export default MyLink;