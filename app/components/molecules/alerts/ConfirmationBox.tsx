import clsx from "clsx";

interface ConfirmationBoxProps {
    Icon: string;
    Heading: string;
    Description: string;
    ClassName?: string;
};

function ConfirmationBox(Props: ConfirmationBoxProps) {
    return (
        <div className={clsx("flex items-center p-5 rounded-xl bg-soft-green w-full", Props.ClassName)}>
            <span className={clsx('text-5xl text-light-green', Props.Icon)}></span>
            <div className="flex flex-col gap-y-3 flex-1 pl-8">
                <h6 className="text-lg font-bold text-light-green w-full">{Props.Heading}</h6>
                <p className="text-sm font-medium text-dark-green text-justify w-full">{Props.Description}</p>
            </div>
        </div>
    );
};

export default ConfirmationBox;