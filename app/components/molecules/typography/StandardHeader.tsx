interface StandardHeaderProps {
    UpperHeader?: string;
    Header: string;
    SubHeader?: string;
    Variant: "blue" | "purple" | "azure";
}

function StandardHeader(Props: StandardHeaderProps) {
    if (Props.Variant === "blue") {
        return (
            <div className="flex flex-col w-full cursor-default">
                {Props.UpperHeader && <h5 className="text-lg font-bold text-neon-blue mb-3.5">{Props.UpperHeader}</h5>}
                <h2 className="text-3xl font-extrabold text-dark mb-2.5">{Props.Header}</h2>
                {Props.SubHeader && <h6 className="text-lg font-medium text-semi-dark mb-5">{Props.SubHeader}</h6>}
            </div>
        );
    } else if (Props.Variant === "purple") {
        return (
            <div className="flex flex-col w-full cursor-default">
                {Props.UpperHeader && <h5 className="text-lg font-bold text-brand-purple mb-3.5">{Props.UpperHeader}</h5>}
                <h2 className="text-3xl font-extrabold text-dark mb-2.5">{Props.Header}</h2>
                {Props.SubHeader && <h6 className="text-lg font-medium text-semi-dark mb-5">{Props.SubHeader}</h6>}
            </div>
        );
    } else {
        return (
            <div className="flex flex-col w-full cursor-default">
                {Props.UpperHeader && <h5 className="text-lg font-bold text-neon-light-blue mb-3.5">{Props.UpperHeader}</h5>}
                <h2 className="text-3xl font-extrabold text-dark mb-2.5">{Props.Header}</h2>
                {Props.SubHeader && <h6 className="text-lg font-medium text-semi-dark mb-5">{Props.SubHeader}</h6>}
            </div>
        );
    }
};

export default StandardHeader;