import MyLink, { MyLinkProps } from "../../atoms/links/MyLink";

interface MySimpleLinksNavigationProps {
    Heading: string;
    Links: MyLinkProps[];  
    ClassName?: string;
};

function MySimpleLinksNavigation(Props: MySimpleLinksNavigationProps) {
    return (
        <div className={Props.ClassName}>
            <h6 className="text-dark font-semibold text-base mb-4 text-center">{Props.Heading}</h6>
            <div className="flex flex-row justify-center w-full divide-x">
                {Props.Links.map((Link, index) => (
                    <MyLink {...Link} ClassName="px-3" key={index} />
                ))}
            </div>
        </div>
    );
};

export default MySimpleLinksNavigation