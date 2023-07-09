import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export interface SideBarLinkProps {
    To: string;
    Text: string;
    Icon: string;
}

function SideBarLink(Props: SideBarLinkProps) {
    const Router = useRouter();
    const IsLinkActive = Router.pathname === Props.To;

    return (
        <Link href={Props.To} className={clsx("font-bold text-base p-2 my-0.5 rounded-lg flex items-center hover:bg-brand-purple-extra-light hover:text-brand-purple-light transition-all duration-300",
            IsLinkActive ? "bg-brand-purple-extra-light text-brand-purple-light" : "text-semi-dark-alt")}
        >
            <span className={clsx('mr-3 text-lg', Props.Icon)}></span>{Props.Text}
        </Link>
    );
};

export default SideBarLink;